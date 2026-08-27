// ============================================================================
// VERCEL CRON API ROUTE
// Place this file at: /api/cron/sync-sanctions.js in your Vercel project
// (create the /api/cron/ folders if they don't exist yet)
// ============================================================================

const { syncAll } = require('../../sync-sanctions-v2');

module.exports = async function handler(req, res) {
  // Protects this endpoint so only Vercel's cron system (with the secret) can trigger it
  const authHeader = req.headers['authorization'];
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const result = await syncAll();
    return res.status(200).json({ success: true, result });
  } catch (err) {
    console.error('Cron sync failed:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
};