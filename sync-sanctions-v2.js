// ============================================================================
// VERISCANS — Sanctions Data Sync Script (v2: tracks new entries + email alerts)
//
// WHAT'S NEW vs v1:
//   - Before syncing, records which source_ids already exist
//   - After syncing, compares to find genuinely NEW entries (not just updates)
//   - Sends an email via Resend summarizing what changed
//
// REQUIRED ENV VARS (in addition to the ones from v1):
//   RESEND_API_KEY   - from resend.com (free tier: 100 emails/day, 3000/month)
//   NOTIFY_EMAIL      - the email address that should receive update summaries
//
// REQUIRED PACKAGES (same as before, no new installs needed):
//   npm install @supabase/supabase-js fast-xml-parser
// ============================================================================

const { createClient } = require('@supabase/supabase-js');
const { XMLParser } = require('fast-xml-parser');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_' });

async function logSyncStart(source) {
  const { data, error } = await supabase
    .from('sanctions_sync_log')
    .insert({ source, status: 'running' })
    .select()
    .single();
  if (error) console.error(`[${source}] Failed to create sync log:`, error.message);
  return data?.id;
}

async function logSyncEnd(logId, source, count, status, errorMessage = null) {
  if (!logId) return;
  await supabase
    .from('sanctions_sync_log')
    .update({
      finished_at: new Date().toISOString(),
      records_processed: count,
      status,
      error_message: errorMessage,
    })
    .eq('id', logId);
  console.log(`[${source}] ${status.toUpperCase()} — ${count} records`);
}

// ── Get the set of source_ids that already exist for a given source ────────
async function getExistingIds(source) {
  const existing = new Set();
  let from = 0;
  const pageSize = 1000;
  while (true) {
    const { data, error } = await supabase
      .from('sanctioned_entities')
      .select('source_id')
      .eq('source', source)
      .range(from, from + pageSize - 1);
    if (error) throw new Error(`Failed reading existing ids: ${error.message}`);
    if (!data || data.length === 0) break;
    data.forEach(r => existing.add(r.source_id));
    if (data.length < pageSize) break;
    from += pageSize;
  }
  return existing;
}

async function upsertBatch(rows) {
  if (!rows.length) return;
  for (let i = 0; i < rows.length; i += 500) {
    const chunk = rows.slice(i, i + 500);
    const { error } = await supabase
      .from('sanctioned_entities')
      .upsert(chunk, { onConflict: 'source,source_id' });
    if (error) throw new Error(`Upsert failed: ${error.message}`);
  }
}

// ── OFAC SDN LIST ────────────────────────────────────────────────────────
async function syncOFAC() {
  const source = 'OFAC_SDN';
  const logId = await logSyncStart(source);
  try {
    const existingIds = await getExistingIds(source);

    const res = await fetch('https://www.treasury.gov/ofac/downloads/sdn.xml');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const json = parser.parse(xml);

    const entries = json?.sdnList?.sdnEntry || [];
    const list = Array.isArray(entries) ? entries : [entries];

    const rows = list.map(e => {
      const aliases = [];
      const akaList = e.akaList?.aka;
      if (akaList) {
        const akas = Array.isArray(akaList) ? akaList : [akaList];
        akas.forEach(a => a?.lastName && aliases.push(a.lastName));
      }
      const name = [e.firstName, e.lastName].filter(Boolean).join(' ') || e.lastName || 'Unknown';
      return {
        source,
        source_id: String(e['@_uid'] || e.uid),
        name,
        entity_type: e.sdnType === 'Individual' ? 'Individual' : 'Entity',
        aliases,
        dob: e.dateOfBirthList?.dateOfBirthItem?.dateOfBirth || null,
        country: e.placeOfBirthList?.placeOfBirthItem?.placeOfBirth || null,
        program: e.programList?.program
          ? (Array.isArray(e.programList.program) ? e.programList.program.join(', ') : e.programList.program)
          : null,
        reason: e.remarks || null,
        raw_data: e,
        last_synced_at: new Date().toISOString(),
      };
    });

    const newEntries = rows.filter(r => !existingIds.has(r.source_id));

    await upsertBatch(rows);
    await logSyncEnd(logId, source, rows.length, 'success');
    return { total: rows.length, newEntries };
  } catch (err) {
    await logSyncEnd(logId, source, 0, 'failed', err.message);
    console.error(`[${source}] Error:`, err);
    return { total: 0, newEntries: [] };
  }
}

// ── UN SECURITY COUNCIL CONSOLIDATED LIST ──────────────────────────────
async function syncUN() {
  const source = 'UN_SC';
  const logId = await logSyncStart(source);
  try {
    const existingIds = await getExistingIds(source);

    const res = await fetch('https://scsanctions.un.org/resources/xml/en/consolidated.xml');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const json = parser.parse(xml);

    const individuals = json?.CONSOLIDATED_LIST?.INDIVIDUALS?.INDIVIDUAL || [];
    const entities = json?.CONSOLIDATED_LIST?.ENTITIES?.ENTITY || [];
    const indList = Array.isArray(individuals) ? individuals : [individuals];
    const entList = Array.isArray(entities) ? entities : [entities];

    const mapAliases = (aliasNode) => {
      if (!aliasNode) return [];
      const list = Array.isArray(aliasNode) ? aliasNode : [aliasNode];
      return list.map(a => a.ALIAS_NAME).filter(Boolean);
    };

    const rows = [
      ...indList.filter(Boolean).map(e => ({
        source,
        source_id: String(e.DATAID),
        name: [e.FIRST_NAME, e.SECOND_NAME, e.THIRD_NAME].filter(Boolean).join(' '),
        entity_type: 'Individual',
        aliases: mapAliases(e.INDIVIDUAL_ALIAS),
        dob: e.INDIVIDUAL_DATE_OF_BIRTH?.DATE || null,
        country: e.NATIONALITY?.VALUE || null,
        program: e.UN_LIST_TYPE || null,
        reason: e.COMMENTS1 || null,
        raw_data: e,
        last_synced_at: new Date().toISOString(),
      })),
      ...entList.filter(Boolean).map(e => ({
        source,
        source_id: String(e.DATAID),
        name: e.FIRST_NAME || 'Unknown Entity',
        entity_type: 'Entity',
        aliases: mapAliases(e.ENTITY_ALIAS),
        dob: null,
        country: e.NATIONALITY?.VALUE || null,
        program: e.UN_LIST_TYPE || null,
        reason: e.COMMENTS1 || null,
        raw_data: e,
        last_synced_at: new Date().toISOString(),
      })),
    ];

    const newEntries = rows.filter(r => !existingIds.has(r.source_id));

    await upsertBatch(rows);
    await logSyncEnd(logId, source, rows.length, 'success');
    return { total: rows.length, newEntries };
  } catch (err) {
    await logSyncEnd(logId, source, 0, 'failed', err.message);
    console.error(`[${source}] Error:`, err);
    return { total: 0, newEntries: [] };
  }
}

// ── EU CONSOLIDATED LIST — requires a registered token, see setup guide ────
async function syncEU() {
  const source = 'EU_CONS';
  const logId = await logSyncStart(source);
  try {
    if (!process.env.EU_FSF_TOKEN) {
      throw new Error('EU_FSF_TOKEN not set — EU sync skipped until registered (see setup guide)');
    }
    const existingIds = await getExistingIds(source);

    const res = await fetch(
      `https://webgate.ec.europa.eu/fsd/fsf/public/files/xmlFullSanctionsList_1_1/content?token=${process.env.EU_FSF_TOKEN}`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const xml = await res.text();
    const json = parser.parse(xml);

    const entries = json?.export?.sanctionEntity || [];
    const list = Array.isArray(entries) ? entries : [entries];

    const rows = list.filter(Boolean).map(e => {
      const nameAliases = e.nameAlias
        ? (Array.isArray(e.nameAlias) ? e.nameAlias : [e.nameAlias])
        : [];
      const primaryName = nameAliases.find(n => n['@_wholeName'])?.['@_wholeName']
        || nameAliases[0]?.['@_wholeName']
        || 'Unknown';
      const aliases = nameAliases.slice(1).map(n => n['@_wholeName']).filter(Boolean);

      return {
        source,
        source_id: String(e['@_euReferenceNumber'] || e.logicalId),
        name: primaryName,
        entity_type: e.subjectType?.['@_code'] === 'P' ? 'Individual' : 'Entity',
        aliases,
        dob: e.birthdate?.['@_birthdate'] || null,
        country: e.citizenship?.['@_countryDescription'] || null,
        program: e.regulation?.['@_programme'] || null,
        reason: e.remark || null,
        raw_data: e,
        last_synced_at: new Date().toISOString(),
      };
    });

    const newEntries = rows.filter(r => !existingIds.has(r.source_id));

    await upsertBatch(rows);
    await logSyncEnd(logId, source, rows.length, 'success');
    return { total: rows.length, newEntries };
  } catch (err) {
    await logSyncEnd(logId, source, 0, 'failed', err.message);
    console.error(`[${source}] Error:`, err);
    return { total: 0, newEntries: [] };
  }
}

// ── EMAIL NOTIFICATION via Resend ───────────────────────────────────────
async function sendSummaryEmail({ ofac, un, eu }) {
  if (!process.env.RESEND_API_KEY || !process.env.NOTIFY_EMAIL) {
    console.log('Email not configured (RESEND_API_KEY / NOTIFY_EMAIL missing) — skipping email');
    return;
  }

  const allNew = [
    ...ofac.newEntries.map(e => ({ ...e, sourceLabel: 'OFAC SDN' })),
    ...un.newEntries.map(e => ({ ...e, sourceLabel: 'UN Security Council' })),
    ...(eu?.newEntries || []).map(e => ({ ...e, sourceLabel: 'EU Consolidated' })),
  ];

  const totalNew = allNew.length;
  const dateStr = new Date().toISOString().slice(0, 10);

  // Build a simple HTML list of new entries (capped at 100 for email size)
  const rowsHtml = allNew.slice(0, 100).map(e => `
    <tr>
      <td style="padding:6px 10px;border-bottom:1px solid #eee;">${e.name}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #eee;">${e.sourceLabel}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #eee;">${e.country || '—'}</td>
      <td style="padding:6px 10px;border-bottom:1px solid #eee;">${e.program || '—'}</td>
    </tr>
  `).join('');

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;">
      <h2 style="color:#B8860B;">Veriscans — Sanctions Data Sync Report</h2>
      <p><strong>Date:</strong> ${dateStr}</p>
      <p>
        <strong>OFAC SDN:</strong> ${ofac.total} total records (${ofac.newEntries.length} new)<br/>
        <strong>UN Security Council:</strong> ${un.total} total records (${un.newEntries.length} new)<br/>
        <strong>EU Consolidated:</strong> ${eu?.total || 0} total records (${eu?.newEntries?.length || 0} new)
      </p>
      ${totalNew > 0 ? `
        <h3>New Entries Added Today (${totalNew}${totalNew > 100 ? ', showing first 100' : ''})</h3>
        <table style="width:100%;border-collapse:collapse;font-size:13px;">
          <thead>
            <tr style="background:#FDF6E3;text-align:left;">
              <th style="padding:6px 10px;">Name</th>
              <th style="padding:6px 10px;">Source</th>
              <th style="padding:6px 10px;">Country</th>
              <th style="padding:6px 10px;">Program</th>
            </tr>
          </thead>
          <tbody>${rowsHtml}</tbody>
        </table>
      ` : '<p>No new entries today — all sources unchanged.</p>'}
    </div>
  `;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Veriscans Sync <alerts@veriscans.com>',
        to: [process.env.NOTIFY_EMAIL],
        subject: `Veriscans Sync Report — ${totalNew} new entries (${dateStr})`,
        html,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error('Failed to send email:', res.status, body);
    } else {
      console.log('Summary email sent successfully.');
    }
  } catch (err) {
    console.error('Email sending error:', err);
  }
}

async function syncAll() {
  console.log('Starting sanctions sync...');
  const [ofac, un, eu] = await Promise.all([syncOFAC(), syncUN(), syncEU()]);
  console.log(`Done. OFAC: ${ofac.total} (${ofac.newEntries.length} new), UN: ${un.total} (${un.newEntries.length} new), EU: ${eu.total} (${eu.newEntries.length} new)`);
  await sendSummaryEmail({ ofac, un, eu });
  return { ofac, un, eu };
}

if (require.main === module) {
  syncAll().then(() => process.exit(0)).catch(err => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { syncAll, syncOFAC, syncUN, syncEU };