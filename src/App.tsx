import { useState, useEffect, useRef } from "react";

// ── THEME ─────────────────────────────────────────────────────────────────────
const GOLD    = "#B8860B";
const GOLD_L  = "#D4A017";
const GOLD_LL = "#FDF6E3";
const GOLD_B  = "#7A5C0A";
const DARK    = "#0F0E09";
const GRAY    = "#6B7280";
const LIGHT   = "#FAFAF8";
const BORDER  = "#E8E0CC";
const CREAM   = "#FFFDF5";

// ── SHARED COMPONENTS ─────────────────────────────────────────────────────────
function FP({ size=32, color=GOLD }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <path d="M30 52 C16 52 8 42 8 30"  stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.3"/>
      <path d="M30 47 C19 47 13 39 13 30" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M30 42 C21 42 18 35 18 30 C18 24 23 19 30 19" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.7"/>
      <path d="M30 37 C24 37 23 33 23 30 C23 26 26 24 30 24 C34 24 37 26 37 30 C37 33 36 37 30 37" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.9"/>
      <circle cx="30" cy="30" r="2.5" fill={color}/>
      <path d="M30 52 C44 52 52 42 52 30" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.3"/>
      <path d="M30 47 C41 47 47 39 47 30" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M30 42 C39 42 42 35 42 30 C42 24 37 19 30 19" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.7"/>
      <path d="M22 18 C24 12 36 12 38 18" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.5"/>
      <path d="M17 23 C18 14 42 14 43 23" stroke={color} strokeWidth="2.2" strokeLinecap="round" opacity="0.3"/>
    </svg>
  );
}

function Logo({ light=false }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
      <div style={{ width:36, height:36, borderRadius:"9px", background:light?`linear-gradient(135deg,${GOLD_LL},#FFF8DC)`:"linear-gradient(135deg,#1A1600,#2A2200)", border:`1.5px solid ${GOLD}55`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 2px 10px ${GOLD}25` }}>
        <FP size={24} color={light?GOLD:"#C9A84C"}/>
      </div>
      <div>
        <div style={{ fontSize:"16px", fontWeight:"800", letterSpacing:"1.5px", lineHeight:1.1 }}>
          <span style={{ color:light?DARK:"white" }}>VERI</span>
          <span style={{ color:light?GOLD_L:"#C9A84C" }}>SCAN</span>
        </div>
        <div style={{ fontSize:"8px", color:`${GOLD}88`, letterSpacing:"2.5px" }}>COMPLIANCE INTELLIGENCE</div>
      </div>
    </div>
  );
}

// Light navbar for all inner pages
function InnerNav({ activeTab, setActiveTab, user, onLogout }) {
  const NAVS = [
    { id:"screening", icon:"🔍", label:"Screening" },
    { id:"rps",       icon:"📋", label:"RPS Lists" },
    { id:"kyc",       icon:"👤", label:"KYC" },
    { id:"countries", icon:"🌍", label:"Country Risk" },
    { id:"vessels",   icon:"🚢", label:"Vessels" },
    { id:"products",  icon:"📦", label:"Products" },
    { id:"settings",  icon:"⚙️", label:"Settings" },
  ];
  return (
    <nav style={{ background:CREAM, height:"60px", display:"flex", alignItems:"center", padding:"0 24px", justifyContent:"space-between", flexShrink:0, borderBottom:`1px solid ${BORDER}`, boxShadow:"0 1px 8px rgba(184,134,11,0.08)" }}>
      <Logo light={true}/>
      <div style={{ display:"flex", gap:"2px" }}>
        {NAVS.map(n=>(
          <button key={n.id} onClick={()=>setActiveTab(n.id)} style={{
            display:"flex", alignItems:"center", gap:"5px", padding:"7px 13px",
            background:activeTab===n.id?GOLD_LL:"transparent",
            border:activeTab===n.id?`1px solid ${GOLD}44`:"1px solid transparent",
            borderRadius:"8px", color:activeTab===n.id?GOLD_B:GRAY,
            fontSize:"12px", fontWeight:activeTab===n.id?"700":"400",
            cursor:"pointer", fontFamily:"inherit", transition:"all .2s",
          }}
            onMouseEnter={e=>{ if(activeTab!==n.id){ e.currentTarget.style.background=GOLD_LL+"88"; e.currentTarget.style.color=GOLD_B; }}}
            onMouseLeave={e=>{ if(activeTab!==n.id){ e.currentTarget.style.background="transparent"; e.currentTarget.style.color=GRAY; }}}
          >
            <span>{n.icon}</span><span>{n.label}</span>
          </button>
        ))}
      </div>
      <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
          <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#16A34A", boxShadow:"0 0 6px #16A34A55" }}/>
          <span style={{ fontSize:"10px", color:"#16A34A", fontWeight:"600", letterSpacing:"1px" }}>LIVE</span>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"6px 12px", borderRadius:"20px", background:GOLD_LL, border:`1px solid ${GOLD}33` }}>
          <div style={{ width:"26px", height:"26px", borderRadius:"6px", background:`${GOLD}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:"700", color:GOLD_B }}>
            {user?.name?.split(" ").map(w=>w[0]).join("").slice(0,2)}
          </div>
          <span style={{ fontSize:"11px", fontWeight:"600", color:GOLD_B }}>{user?.name?.split(" ")[0]}</span>
          <button onClick={onLogout} style={{ background:"none", border:"none", cursor:"pointer", fontSize:"11px", color:GRAY, fontFamily:"inherit", padding:"0" }}>↩</button>
        </div>
      </div>
    </nav>
  );
}

function Toggle({ active, onChange, disabled=false }) {
  return (
    <div onClick={()=>!disabled&&onChange(!active)} style={{ width:"40px", height:"22px", borderRadius:"11px", cursor:disabled?"not-allowed":"pointer", background:active?`linear-gradient(135deg,${GOLD_L},${GOLD_B})`:"#E5E7EB", position:"relative", transition:"background .25s", flexShrink:0, boxShadow:active?`0 2px 8px ${GOLD}40`:"none", opacity:disabled?0.5:1 }}>
      <div style={{ position:"absolute", top:"3px", left:active?"21px":"3px", width:"16px", height:"16px", borderRadius:"50%", background:"white", transition:"left .25s", boxShadow:"0 1px 4px rgba(0,0,0,0.2)" }}/>
    </div>
  );
}

function Check({ ok }) {
  return ok
    ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#16A34A" opacity="0.15"/><circle cx="8" cy="8" r="7" stroke="#16A34A" strokeWidth="1.2"/><path d="M5 8l2 2 4-4" stroke="#16A34A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    : <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" fill="#F3F4F6"/><circle cx="8" cy="8" r="7" stroke="#D1D5DB" strokeWidth="1.2"/><path d="M5.5 10.5l5-5M10.5 10.5l-5-5" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/></svg>;
}

// ── SCREENING ENGINE ──────────────────────────────────────────────────────────
async function screenLive(name, type="both", extra={}) {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2000,
      messages: [{ role: "user", content:
`You are a sanctions screening expert. Check if "${name}" appears on OFAC SDN, UN, EU, or UK OFSI sanctions lists.

Reply with ONLY a JSON array. No text before or after. No markdown. Just the raw JSON.

If found on sanctions lists:
[{"name":"Full Name As Listed","type":"Individual","score":0.95,"risk":"HIGH","lists":["OFAC SDN","EU"],"sourceFlags":[{"label":"🇺🇸 OFAC SDN","color":"#DC2626"},{"label":"🇪🇺 EU","color":"#7C3AED"}],"program":"SYRIA","country":"Syria","dob":"11 Sep 1965","aliases":["Bashar Assad","بشار الأسد"],"reason":"President of Syria, responsible for human rights violations"}]

If NOT found on any sanctions list:
[]`
      }]
    })
  });

  if (!resp.ok) throw new Error(`API error ${resp.status}`);
  const d = await resp.json();
  const raw = d.content?.[0]?.text ?? "[]";

  // Find JSON array anywhere in response
  const s = raw.indexOf("[");
  const e = raw.lastIndexOf("]");
  if (s === -1 || e === -1 || e < s) return [];

  try {
    const arr = JSON.parse(raw.slice(s, e+1));
    if (!Array.isArray(arr)) return [];
    return arr.map((m,i) => ({
      id:`r${i}`,
      name: String(m.name||name),
      type: String(m.type||"Individual"),
      score: Math.min(1,Math.max(0,+m.score||0.9)),
      risk: ["HIGH","MEDIUM","LOW"].includes(m.risk)?m.risk:"HIGH",
      lists: Array.isArray(m.lists)?m.lists:["OFAC SDN"],
      sourceFlags: Array.isArray(m.sourceFlags)?m.sourceFlags:[{label:"🇺🇸 OFAC SDN",color:"#DC2626"}],
      program: String(m.program||"—"),
      country: String(m.country||extra.country||"—"),
      dob: String(m.dob||"—"),
      aliases: Array.isArray(m.aliases)?m.aliases:[],
      reason: String(m.reason||"—"),
      address: extra.address||"—",
      url:"https://sanctionssearch.ofac.treas.gov/",
    })).slice(0,8);
  } catch { return []; }
}

async function callAI(prompt, system="You are a senior AML compliance analyst. Plain text only. Max 100 words.") {
  const resp = await fetch("https://api.anthropic.com/v1/messages", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body:JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000, system, messages:[{ role:"user", content:prompt }] })
  });
  const d = await resp.json();
  return d.content?.[0]?.text || "Analysis unavailable.";
}

// ── USERS ─────────────────────────────────────────────────────────────────────
const USERS = [
  { id:"1", email:"admin@veriscan.io",   password:"admin123",   name:"Ahmed Al Mansouri", role:"Admin",              avatar:"AM" },
  { id:"2", email:"officer@veriscan.io", password:"officer123", name:"Sara Al Rashidi",   role:"Compliance Officer", avatar:"SR" },
  { id:"3", email:"viewer@veriscan.io",  password:"viewer123",  name:"Khalid Ibrahim",    role:"Viewer",             avatar:"KI" },
];

// ── COUNTRY DATA (condensed) ───────────────────────────────────────────────────
const COUNTRIES = [
  { code:"IR", name:"Iran",         flag:"🇮🇷", region:"Middle East",  risk:"CRITICAL", score:96, aml:"High",   stability:"Very Low",  fatf:"Blacklist", cpi:24, listedCount:1840, sanctionBodies:["OFAC","UN SC","EU","UK OFSI","Canada","Australia"], prohibitions:[{cat:"Oil & Energy",icon:"🛢️",items:["Oil & gas exports","Energy technology imports","Oil tanker insurance"]},{cat:"Financial",icon:"💰",items:["SWIFT access","USD/EUR transactions","International banking"]},{cat:"Military",icon:"🔫",items:["Arms imports/exports","Nuclear materials","Ballistic missiles"]}], embargo:["Comprehensive arms embargo","Oil export embargo","Financial system embargo","Technology embargo"] },
  { code:"KP", name:"North Korea",  flag:"🇰🇵", region:"Asia Pacific", risk:"CRITICAL", score:99, aml:"High",   stability:"Very Low",  fatf:"Blacklist", cpi:8,  listedCount:440,  sanctionBodies:["OFAC","UN SC","EU","UK OFSI","Japan","South Korea"], prohibitions:[{cat:"Trade",icon:"📦",items:["Coal, iron, seafood exports","Petroleum imports (capped)","Luxury goods","Machinery"]},{cat:"Financial",icon:"💰",items:["All international banking","Joint ventures","Bulk cash transfers"]},{cat:"Military",icon:"🔫",items:["All arms imports/exports","WMD & missile technology"]}], embargo:["Comprehensive trade embargo","Arms embargo (total)","Petroleum import cap","Luxury goods ban"] },
  { code:"SY", name:"Syria",        flag:"🇸🇾", region:"Middle East",  risk:"CRITICAL", score:97, aml:"High",   stability:"Very Low",  fatf:"Standard",  cpi:13, listedCount:920,  sanctionBodies:["OFAC","EU","UK OFSI","Arab League"], prohibitions:[{cat:"Oil",icon:"🛢️",items:["Oil imports (EU ban)","Energy investment"]},{cat:"Financial",icon:"💰",items:["Central Bank of Syria","Trade finance"]},{cat:"Military",icon:"🔫",items:["Arms & military equipment","Internal repression goods"]}], embargo:["Arms embargo (EU/US/UK)","Oil embargo (EU)","Aviation restrictions"] },
  { code:"RU", name:"Russia",       flag:"🇷🇺", region:"Europe",       risk:"HIGH",     score:85, aml:"High",   stability:"Low",      fatf:"Standard",  cpi:26, listedCount:2800, sanctionBodies:["OFAC","EU","UK OFSI","G7","Canada","Australia","Japan","Switzerland"], prohibitions:[{cat:"Financial",icon:"💰",items:["SWIFT (7 major banks)","Western capital markets","USD/EUR for designated entities"]},{cat:"Energy",icon:"🛢️",items:["Oil price cap ($60/barrel)","Coal imports banned","Energy technology"]},{cat:"Military",icon:"🔫",items:["Arms & defense equipment","Semiconductors","Aerospace components"]},{cat:"Trade",icon:"📦",items:["Luxury goods","Aviation parts","Maritime port access"]}], embargo:["Arms embargo","Technology embargo","Energy sector restrictions","Aviation ban","SWIFT restriction (partial)"] },
  { code:"BY", name:"Belarus",      flag:"🇧🇾", region:"Europe",       risk:"HIGH",     score:80, aml:"Medium", stability:"Low",      fatf:"Standard",  cpi:41, listedCount:312,  sanctionBodies:["OFAC","EU","UK OFSI","Canada"], prohibitions:[{cat:"Trade",icon:"📦",items:["Potash exports","Petroleum products","Tobacco & steel"]},{cat:"Financial",icon:"💰",items:["EU capital markets","State loans","Correspondent banking"]},{cat:"Transport",icon:"✈️",items:["EU airspace closed","Road transport restrictions"]}], embargo:["Arms embargo (EU)","Sectoral trade sanctions","Aviation ban"] },
  { code:"MM", name:"Myanmar",      flag:"🇲🇲", region:"Asia Pacific", risk:"HIGH",     score:78, aml:"High",   stability:"Low",      fatf:"Greylist",  cpi:20, listedCount:162,  sanctionBodies:["OFAC","EU","UK OFSI","Canada","Australia"], prohibitions:[{cat:"Military",icon:"🔫",items:["Arms & equipment","Jet fuel for military"]},{cat:"Financial",icon:"💰",items:["Myanmar Economic Corp","Myanmar Economic Holdings"]},{cat:"Trade",icon:"📦",items:["Jade & gemstones (US)","Timber (EU/UK)"]}], embargo:["Arms embargo","Jade & gems ban","Timber ban"] },
  { code:"VE", name:"Venezuela",    flag:"🇻🇪", region:"Americas",     risk:"HIGH",     score:79, aml:"High",   stability:"Low",      fatf:"Standard",  cpi:13, listedCount:240,  sanctionBodies:["OFAC","EU","Canada"], prohibitions:[{cat:"Oil",icon:"🛢️",items:["PDVSA sanctioned","Oil sector transactions"]},{cat:"Financial",icon:"💰",items:["Government debt & equity","Central Bank transactions"]}], embargo:["Oil sector embargo","Arms embargo","Financial restrictions"] },
  { code:"SD", name:"Sudan",        flag:"🇸🇩", region:"Africa",       risk:"HIGH",     score:84, aml:"High",   stability:"Very Low", fatf:"Standard",  cpi:22, listedCount:94,   sanctionBodies:["OFAC","UN SC (Darfur)","EU"], prohibitions:[{cat:"Military",icon:"🔫",items:["Arms to Darfur (UN)","Financing armed militias"]}], embargo:["Arms embargo on Darfur (UN)","Asset freeze on designated individuals"] },
  { code:"PK", name:"Pakistan",     flag:"🇵🇰", region:"Asia Pacific", risk:"MEDIUM",   score:60, aml:"Medium", stability:"Medium",   fatf:"Greylist",  cpi:29, listedCount:187,  sanctionBodies:["OFAC (targeted)","UN SC (individual)"], prohibitions:[{cat:"Targeted",icon:"🎯",items:["Terrorist organization transactions","Al-Qaeda financing"]}], embargo:["No comprehensive embargo","FATF Greylist — EDD required"] },
  { code:"CN", name:"China",        flag:"🇨🇳", region:"Asia Pacific", risk:"MEDIUM",   score:55, aml:"Medium", stability:"Medium",   fatf:"Standard",  cpi:42, listedCount:320,  sanctionBodies:["OFAC (targeted)","EU (Xinjiang)","UK (Xinjiang)"], prohibitions:[{cat:"Technology",icon:"💻",items:["Advanced semiconductors","AI chips (BIS)","Huawei & SMIC"]},{cat:"Xinjiang",icon:"⚠️",items:["Forced labor goods (US UFLPA)","Cotton from Xinjiang","Polysilicon"]}], embargo:["Arms embargo (EU — since 1989)","Technology export controls","Xinjiang import ban (US)"] },
  { code:"TR", name:"Turkey",       flag:"🇹🇷", region:"Europe",       risk:"MEDIUM",   score:52, aml:"Medium", stability:"Medium",   fatf:"Greylist",  cpi:34, listedCount:24,   sanctionBodies:["OFAC (CAATSA)"], prohibitions:[{cat:"CAATSA",icon:"⚠️",items:["US sanctions on SSB (defense agency)","Defense export restrictions"]}], embargo:["No comprehensive embargo","Limited CAATSA sanctions","FATF Greylist"] },
  { code:"EG", name:"Egypt",        flag:"🇪🇬", region:"Middle East",  risk:"MEDIUM",   score:48, aml:"Medium", stability:"Medium",   fatf:"Standard",  cpi:35, listedCount:12,   sanctionBodies:["OFAC (limited)"], prohibitions:[{cat:"Targeted",icon:"🎯",items:["Individual designations only"]}], embargo:["No active country-level embargo"] },
  { code:"AE", name:"UAE",          flag:"🇦🇪", region:"Middle East",  risk:"LOW",      score:22, aml:"Low",    stability:"High",     fatf:"Standard",  cpi:68, listedCount:4,    sanctionBodies:["OFAC (rare)"], prohibitions:[{cat:"None",icon:"✅",items:["No country-level sanctions"]}], embargo:["No active embargo"] },
  { code:"SA", name:"Saudi Arabia", flag:"🇸🇦", region:"Middle East",  risk:"LOW",      score:24, aml:"Low",    stability:"High",     fatf:"Standard",  cpi:52, listedCount:6,    sanctionBodies:["OFAC (rare)"], prohibitions:[{cat:"None",icon:"✅",items:["No country-level sanctions"]}], embargo:["No active embargo"] },
  { code:"QA", name:"Qatar",        flag:"🇶🇦", region:"Middle East",  risk:"LOW",      score:18, aml:"Low",    stability:"Very High",fatf:"Standard",  cpi:58, listedCount:2,    sanctionBodies:["OFAC (minimal)"], prohibitions:[{cat:"None",icon:"✅",items:["No country-level sanctions"]}], embargo:["No active embargo"] },
  { code:"GB", name:"United Kingdom",flag:"🇬🇧",region:"Europe",       risk:"LOW",      score:12, aml:"Low",    stability:"Very High",fatf:"Standard",  cpi:71, listedCount:0,    sanctionBodies:["N/A — issuing authority"], prohibitions:[{cat:"None",icon:"✅",items:["Sanctions issuing authority"]}], embargo:["No active embargo"] },
  { code:"US", name:"United States",flag:"🇺🇸", region:"Americas",     risk:"LOW",      score:10, aml:"Low",    stability:"Very High",fatf:"Standard",  cpi:69, listedCount:0,    sanctionBodies:["N/A — issuing authority"], prohibitions:[{cat:"None",icon:"✅",items:["Primary sanctions authority"]}], embargo:["No active embargo"] },
  { code:"DE", name:"Germany",      flag:"🇩🇪", region:"Europe",       risk:"LOW",      score:11, aml:"Low",    stability:"Very High",fatf:"Standard",  cpi:78, listedCount:0,    sanctionBodies:["N/A"], prohibitions:[{cat:"None",icon:"✅",items:["No sanctions"]}], embargo:["No active embargo"] },
  { code:"SG", name:"Singapore",    flag:"🇸🇬", region:"Asia Pacific", risk:"LOW",      score:8,  aml:"Low",    stability:"Very High",fatf:"Standard",  cpi:84, listedCount:0,    sanctionBodies:["N/A"], prohibitions:[{cat:"None",icon:"✅",items:["No sanctions"]}], embargo:["No active embargo"] },
  { code:"JP", name:"Japan",        flag:"🇯🇵", region:"Asia Pacific", risk:"LOW",      score:9,  aml:"Low",    stability:"Very High",fatf:"Standard",  cpi:73, listedCount:0,    sanctionBodies:["N/A — issuing authority"], prohibitions:[{cat:"None",icon:"✅",items:["Sanctions issuing authority"]}], embargo:["No active embargo"] },
  { code:"FR", name:"France",       flag:"🇫🇷", region:"Europe",       risk:"LOW",      score:13, aml:"Low",    stability:"Very High",fatf:"Standard",  cpi:71, listedCount:0,    sanctionBodies:["N/A"], prohibitions:[{cat:"None",icon:"✅",items:["No sanctions"]}], embargo:["No active embargo"] },
  { code:"AU", name:"Australia",    flag:"🇦🇺", region:"Asia Pacific", risk:"LOW",      score:10, aml:"Low",    stability:"Very High",fatf:"Standard",  cpi:75, listedCount:0,    sanctionBodies:["N/A — issuing authority"], prohibitions:[{cat:"None",icon:"✅",items:["No sanctions"]}], embargo:["No active embargo"] },
  { code:"KR", name:"South Korea",  flag:"🇰🇷", region:"Asia Pacific", risk:"LOW",      score:12, aml:"Low",    stability:"High",     fatf:"Standard",  cpi:63, listedCount:0,    sanctionBodies:["N/A"], prohibitions:[{cat:"None",icon:"✅",items:["No sanctions"]}], embargo:["No active embargo"] },
  { code:"CA", name:"Canada",       flag:"🇨🇦", region:"Americas",     risk:"LOW",      score:11, aml:"Low",    stability:"Very High",fatf:"Standard",  cpi:76, listedCount:0,    sanctionBodies:["N/A — issuing authority"], prohibitions:[{cat:"None",icon:"✅",items:["No sanctions"]}], embargo:["No active embargo"] },
];

const RC = {
  CRITICAL: { color:"#DC2626", bg:"#FEF2F2", border:"#FECACA", label:"Critical" },
  HIGH:     { color:"#EA580C", bg:"#FFF7ED", border:"#FED7AA", label:"High" },
  MEDIUM:   { color:GOLD,      bg:GOLD_LL,   border:"#E8D5A3", label:"Medium" },
  LOW:      { color:"#16A34A", bg:"#F0FDF4", border:"#BBF7D0", label:"Low" },
};

const CPI_COLOR = s => s>=60?"#16A34A":s>=40?GOLD:s>=20?"#EA580C":"#DC2626";
const CPI_LABEL = s => s>=60?"Clean":s>=40?"Moderate":s>=20?"Corrupt":"Highly Corrupt";
const LIST_COLOR = l => l==="OFAC SDN"?"#DC2626":l==="UN"?"#2563EB":l==="EU"?"#7C3AED":l==="UK OFSI"?"#0891B2":"#6B7280";
const uid = () => Math.random().toString(36).slice(2,9);

// ── RPS SOURCES (condensed) ───────────────────────────────────────────────────
const RPS_SOURCES = [
  { id:"us_treasury", name:"US Treasury — OFAC", flag:"🇺🇸", color:"#DC2626", description:"OFAC administers US economic sanctions. Compliance mandatory for all US persons worldwide.",
    lists:[ { id:"ofac_sdn", name:"Specially Designated Nationals (SDN)", abbr:"SDN", entries:13842, updated:"Daily", critical:true, fullDesc:"Primary OFAC sanctions list. Individuals and entities owned or controlled by targeted countries. US persons prohibited from all dealings. Assets blocked. Secondary sanctions risk for non-US persons." }, { id:"ofac_cons", name:"Consolidated Sanctions List", abbr:"CONS", entries:5421, updated:"Daily", critical:true, fullDesc:"Combines FSE, SSI, NS-PLC, CAPTA, NS-MBS lists into one dataset. Must be screened alongside SDN for complete OFAC compliance." }, { id:"ofac_fse", name:"Foreign Sanctions Evaders", abbr:"FSE", entries:312, updated:"Weekly", critical:true, fullDesc:"Foreign individuals/entities that violated US sanctions on Iran or Syria. US persons prohibited from transacting without OFAC authorization." }, { id:"ofac_ssi", name:"Sectoral Sanctions Identifications", abbr:"SSI", entries:604, updated:"Weekly", critical:true, fullDesc:"Persons in Russian economy sectors under EO 13662. Targeted restrictions on specific transaction types rather than comprehensive block." }, { id:"ofac_ns_mbs", name:"Menu-Based Sanctions (NS-MBS)", abbr:"NS-MBS", entries:84, updated:"Monthly", critical:false, fullDesc:"Persons subject to menu-based sanctions under CAATSA and other statutes. Various sanctions may be imposed from a statutory menu." }, { id:"ofac_capta", name:"CAPTA List", abbr:"CAPTA", entries:4, updated:"Monthly", critical:false, fullDesc:"Foreign banks subject to correspondent account sanctions under USA PATRIOT Act. US banks prohibited from maintaining accounts for listed institutions." }, ] },
  { id:"us_commerce", name:"US Commerce — BIS", flag:"🇺🇸", color:"#B45309", description:"Bureau of Industry and Security administers export controls under the Export Administration Regulations.",
    lists:[ { id:"bis_el", name:"Entity List", abbr:"BIS-EL", entries:1724, updated:"Monthly", critical:true, fullDesc:"Foreign parties prohibited from receiving EAR-controlled items without BIS license. Applications reviewed with presumption of denial." }, { id:"bis_dpl", name:"Denied Persons List", abbr:"BIS-DPL", entries:89, updated:"Monthly", critical:true, fullDesc:"Persons with denied US export privileges. Absolute prohibition on involvement in any US export transaction." }, { id:"bis_uv", name:"Unverified List", abbr:"BIS-UV", entries:218, updated:"Monthly", critical:false, fullDesc:"Parties where BIS couldn't verify end-user. Additional information required; License Exceptions may not be used." }, ] },
  { id:"us_state", name:"US State Department", flag:"🇺🇸", color:"#1D4ED8", description:"State Department administers arms export controls and non-proliferation sanctions under ITAR and other statutes.",
    lists:[ { id:"state_ddtc", name:"DDTC Debarred Parties", abbr:"DDTC", entries:254, updated:"Monthly", critical:false, fullDesc:"Persons debarred from ITAR-controlled defense articles transactions for up to 3 years." }, { id:"state_nsa", name:"Non-Proliferation Sanctions", abbr:"NSA", entries:89, updated:"Monthly", critical:true, fullDesc:"Foreign persons contributing to WMD proliferation. Restrictions on US contracts, imports, and export licenses." }, ] },
  { id:"un", name:"United Nations", flag:"🇺🇳", color:"#2563EB", description:"UN Security Council mandatory sanctions binding on all 193 member states under Chapter VII of the UN Charter.",
    lists:[ { id:"un_sc", name:"UN SC Consolidated List", abbr:"UNSC", entries:814, updated:"Daily", critical:true, fullDesc:"Master list of all UN Security Council sanctions. All 193 member states must freeze assets, impose travel bans, and apply arms embargoes to listed parties." }, { id:"un_isil", name:"ISIL & Al-Qaida List", abbr:"ISIL", entries:426, updated:"Weekly", critical:true, fullDesc:"Individuals and entities associated with ISIL, Al-Qaida and affiliates. Mandatory asset freeze, travel ban, and arms embargo for all UN members." }, { id:"un_dprk", name:"DPRK Sanctions List", abbr:"DPRK", entries:80, updated:"Monthly", critical:true, fullDesc:"Individuals and entities linked to North Korea's WMD programs. Comprehensive measures including sectoral sanctions on key commodities." }, ] },
  { id:"eu", name:"European Union", flag:"🇪🇺", color:"#7C3AED", description:"EU Council restrictive measures binding on all EU member states and EU persons worldwide.",
    lists:[ { id:"eu_cons", name:"EU Consolidated Sanctions", abbr:"EU-CONS", entries:2341, updated:"Daily", critical:true, fullDesc:"All persons subject to EU financial sanctions across all regimes. Legally binding on all EU member states." }, { id:"eu_russia", name:"EU Russia Sanctions", abbr:"EU-RUS", entries:1874, updated:"Weekly", critical:true, fullDesc:"14 packages of sanctions following Russia's invasion of Ukraine. Includes individual designations, sectoral measures, and trade restrictions." }, { id:"eu_iran", name:"EU Iran Sanctions", abbr:"EU-IRN", entries:214, updated:"Monthly", critical:true, fullDesc:"Nuclear-related and human rights-related sanctions. Oil embargo, financial sector restrictions." }, ] },
  { id:"uk", name:"United Kingdom", flag:"🇬🇧", color:"#0891B2", description:"UK OFSI sanctions operate independently post-Brexit. UK and EU lists may differ — both must be checked.",
    lists:[ { id:"uk_ofsi", name:"UK OFSI Consolidated List", abbr:"OFSI", entries:3124, updated:"Daily", critical:true, fullDesc:"All persons subject to UK financial sanctions. Independent from EU post-Brexit under SAMLA 2018." }, { id:"uk_russia", name:"UK Russia Sanctions", abbr:"UK-RUS", entries:1521, updated:"Weekly", critical:true, fullDesc:"Over 1,500 designations following Ukraine invasion. Financial, trade, and transport measures." }, { id:"uk_global", name:"UK Global Human Rights", abbr:"UK-GHR", entries:94, updated:"Monthly", critical:false, fullDesc:"UK Magnitsky-style sanctions on human rights abusers worldwide." }, ] },
  { id:"pep", name:"PEP & Adverse Media", flag:"👤", color:"#D97706", description:"PEP databases and adverse media screening required by FATF Recommendation 12.",
    lists:[ { id:"pep_global", name:"Global PEP Database", abbr:"PEP", entries:180000, updated:"Daily", critical:true, fullDesc:"PEPs from 200+ countries including heads of state, ministers, senior officials. Includes current and former PEPs and family members." }, { id:"adv_media", name:"Adverse Media Screening", abbr:"ADV", entries:null, updated:"Real-time", critical:false, fullDesc:"AI-powered screening of 100,000+ global news sources in 50+ languages. Detects negative coverage of financial crime, corruption, fraud, and other AML red flags." }, ] },
];

// ── EXISTING PARTIES ──────────────────────────────────────────────────────────
const SAMPLE_PARTIES = [
  { id:uid(), name:"Al Baraka Trading LLC",   type:"Entity",     category:"Supplier", country:"UAE",    addedDate:"12 Jan 2026", lastScreen:"—", status:"pending" },
  { id:uid(), name:"Mohammed Al Rashidi",      type:"Individual", category:"Customer", country:"Kuwait", addedDate:"08 Jan 2026", lastScreen:"—", status:"pending" },
  { id:uid(), name:"Gulf Star Shipping Co",    type:"Entity",     category:"Vendor",   country:"Oman",   addedDate:"05 Jan 2026", lastScreen:"—", status:"pending" },
  { id:uid(), name:"Eastern Bridge Logistics", type:"Entity",     category:"Partner",  country:"Jordan", addedDate:"28 Dec 2025", lastScreen:"—", status:"pending" },
  { id:uid(), name:"Khalid Al Farsi",          type:"Individual", category:"Customer", country:"Saudi",  addedDate:"24 Dec 2025", lastScreen:"—", status:"pending" },
  { id:uid(), name:"Trans Arabia Transport",   type:"Entity",     category:"Supplier", country:"Qatar",  addedDate:"20 Dec 2025", lastScreen:"—", status:"pending" },
];

// ── LANDING PAGE ──────────────────────────────────────────────────────────────
function useVisible(t=0.15) {
  const ref=useRef(null); const [vis,setVis]=useState(false);
  useEffect(()=>{ const o=new IntersectionObserver(([e])=>{ if(e.isIntersecting)setVis(true); },{threshold:t}); if(ref.current)o.observe(ref.current); return()=>o.disconnect(); },[]);
  return [ref,vis];
}

const SERVICES=[
  { icon:"🔍",title:"Sanctions Screening",desc:"Screen individuals and entities against 100+ global sanctions lists including OFAC SDN, UN, EU, and UK OFSI in real time.",features:["OFAC SDN · UN · EU · UK OFSI","Fuzzy matching for Arabic names","AI false positive reduction"] },
  { icon:"👤",title:"Know Your Customer",desc:"Full KYC workflows with PEP screening, identity verification, and risk scoring for corporate onboarding.",features:["PEP & adverse media screening","Risk-based due diligence","Full audit trail"] },
  { icon:"🌍",title:"Country Risk Assessment",desc:"Real-time country risk ratings covering 190+ countries with FATF status, CPI, sanctions exposure and embargo details.",features:["190+ countries","CPI & listed parties","Prohibitions & embargo detail"] },
  { icon:"🚢",title:"Vessel Screening",desc:"Screen ships and tankers against sanctions lists. Identify ownership chains and dark vessel activity.",features:["IMO number screening","Flag & ownership check","Dark vessel alerts"] },
  { icon:"📦",title:"Products Review",desc:"Export control and trade compliance checks on products and commodities.",features:["Dual-use goods detection","Export license check","HS code risk classification"] },
];

function LandingPage({ onLogin }) {
  const [scrolled,setScrolled]=useState(false);
  const [form,setForm]=useState({name:"",company:"",email:"",message:""});
  const [sent,setSent]=useState(false);
  const [sending,setSending]=useState(false);
  const [heroRef,heroVis]=useVisible(0.1);
  const [servRef,servVis]=useVisible(0.1);
  const [howRef,howVis]=useVisible(0.2);
  const [ctaRef,ctaVis]=useVisible(0.2);
  const [contactRef,contactVis]=useVisible(0.1);

  useEffect(()=>{ const fn=()=>setScrolled(window.scrollY>40); window.addEventListener("scroll",fn); return()=>window.removeEventListener("scroll",fn); },[]);
  const scrollTo=id=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"});
  const handleSend=async()=>{ if(!form.name||!form.email)return; setSending(true); await new Promise(r=>setTimeout(r,1200)); setSent(true); setSending(false); };

  return (
    <div style={{ minHeight:"100vh", background:LIGHT, fontFamily:"'Cormorant Garamond','Georgia',serif", color:DARK, overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0} html{scroll-behavior:smooth}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
        input::placeholder,textarea::placeholder{color:#C4B89A;font-family:'Inter',sans-serif}
        input,textarea,button{font-family:'Inter',sans-serif}
      `}</style>

      {/* Fixed Navbar */}
      <nav style={{ position:"fixed", top:0, left:0, right:0, zIndex:100, background:scrolled?"rgba(255,253,246,0.95)":"rgba(255,252,240,0.85)", backdropFilter:"blur(12px)", borderBottom:`1px solid ${BORDER}`, height:"64px", display:"flex", alignItems:"center", padding:"0 40px", justifyContent:"space-between", transition:"all .3s", boxShadow:scrolled?"0 2px 20px rgba(0,0,0,0.06)":"none" }}>
        <Logo light={true}/>
        <div style={{ display:"flex", gap:"28px" }}>
          {[["services","Services"],["how","How It Works"],["contact","Contact"]].map(([id,l])=>(
            <button key={id} onClick={()=>scrollTo(id)} style={{ background:"none", border:"none", fontSize:"13px", color:GRAY, cursor:"pointer", fontFamily:"'Inter',sans-serif", fontWeight:"500" }} onMouseEnter={e=>e.target.style.color=GOLD_L} onMouseLeave={e=>e.target.style.color=GRAY}>{l}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:"10px" }}>
          <button onClick={onLogin} style={{ padding:"9px 20px", background:"white", border:`1px solid ${BORDER}`, borderRadius:"8px", color:DARK, fontSize:"13px", fontWeight:"600", cursor:"pointer" }}>Sign In</button>
          <button onClick={()=>scrollTo("contact")} style={{ padding:"9px 22px", background:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`, border:"none", borderRadius:"8px", color:"white", fontSize:"13px", fontWeight:"600", cursor:"pointer", boxShadow:`0 4px 14px ${GOLD}40` }}>Request Demo</button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={heroRef} style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", position:"relative", overflow:"hidden", background:`linear-gradient(160deg,${CREAM} 0%,${GOLD_LL} 50%,#FFF8E8 100%)`, paddingTop:"64px" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(${GOLD}18 1px,transparent 1px)`, backgroundSize:"36px 36px", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", right:"-4%", top:"8%", opacity:0.07, animation:"float 8s ease-in-out infinite" }}><FP size={500} color={GOLD}/></div>
        <div style={{ textAlign:"center", position:"relative", zIndex:1, padding:"80px 20px 60px", opacity:heroVis?1:0, transform:heroVis?"none":"translateY(30px)", transition:"all .9s" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:"32px" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
              <div style={{ width:"56px", height:"56px", borderRadius:"14px", background:`linear-gradient(135deg,${GOLD_LL},#FFF0C0)`, border:`2px solid ${GOLD}55`, display:"flex", alignItems:"center", justifyContent:"center", boxShadow:`0 6px 24px ${GOLD}30` }}><FP size={38} color={GOLD}/></div>
              <div style={{ textAlign:"left" }}>
                <div style={{ fontSize:"32px", fontWeight:"800", letterSpacing:"2px", lineHeight:1.1 }}><span style={{ color:DARK }}>VERI</span><span style={{ color:GOLD_L }}>SCAN</span></div>
                <div style={{ fontSize:"10px", color:`${GOLD}99`, letterSpacing:"3px" }}>COMPLIANCE INTELLIGENCE</div>
              </div>
            </div>
          </div>
          <div style={{ display:"inline-flex", alignItems:"center", gap:"8px", background:`${GOLD}18`, border:`1px solid ${GOLD}44`, borderRadius:"20px", padding:"6px 18px", marginBottom:"28px" }}>
            <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:GOLD }}/>
            <span style={{ fontSize:"12px", color:GOLD_B, fontFamily:"'Inter',sans-serif", fontWeight:"600" }}>AI-Powered Compliance Platform</span>
          </div>
          <h1 style={{ fontSize:"clamp(40px,7vw,76px)", fontWeight:"300", color:DARK, lineHeight:"1.1", marginBottom:"10px", letterSpacing:"-1px" }}>Screen Smarter.</h1>
          <h1 style={{ fontSize:"clamp(40px,7vw,76px)", fontWeight:"700", color:GOLD_L, lineHeight:"1.1", marginBottom:"24px", letterSpacing:"-1px" }}>Comply Faster.</h1>
          <p style={{ fontSize:"17px", color:GRAY, maxWidth:"520px", margin:"0 auto 40px", lineHeight:"1.8", fontFamily:"'Inter',sans-serif" }}>Veriscan brings together sanctions screening, KYC, country risk, vessel tracking, and product review — in one intelligent platform.</p>
          <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>scrollTo("contact")} style={{ padding:"14px 36px", background:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`, border:"none", borderRadius:"10px", color:"white", fontSize:"15px", fontWeight:"600", cursor:"pointer", boxShadow:`0 6px 24px ${GOLD}45` }} onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"} onMouseLeave={e=>e.currentTarget.style.transform="none"}>Request a Demo →</button>
            <button onClick={onLogin} style={{ padding:"14px 36px", background:"white", border:`1px solid ${BORDER}`, borderRadius:"10px", color:DARK, fontSize:"15px", fontWeight:"500", cursor:"pointer", boxShadow:"0 2px 8px rgba(0,0,0,0.06)" }} onMouseEnter={e=>{ e.currentTarget.style.borderColor=`${GOLD}66`; }} onMouseLeave={e=>{ e.currentTarget.style.borderColor=BORDER; }}>Sign In →</button>
          </div>
        </div>
        <div style={{ position:"absolute", bottom:0, left:0, right:0, height:"80px", background:`linear-gradient(to top,${LIGHT},transparent)`, pointerEvents:"none" }}/>
      </section>

      {/* Stats */}
      <section style={{ background:"white", padding:"48px 40px", borderBottom:`1px solid ${BORDER}` }}>
        <div style={{ maxWidth:"900px", margin:"0 auto", display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"20px" }}>
          {[{ value:"190+",label:"Countries Covered" },{ value:"100+",label:"Sanctions Lists" },{ value:"<2s",label:"Screening Time" },{ value:"AI",label:"Powered Analysis" }].map((s,i)=>(
            <div key={i} style={{ textAlign:"center", padding:"20px" }}>
              <div style={{ fontSize:"36px", fontWeight:"700", color:GOLD_L, lineHeight:1, marginBottom:"6px" }}>{s.value}</div>
              <div style={{ fontSize:"12px", color:GRAY, fontFamily:"'Inter',sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" ref={servRef} style={{ background:LIGHT, padding:"80px 40px" }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"52px", opacity:servVis?1:0, transition:"all .6s" }}>
            <div style={{ fontSize:"10px", color:GOLD, letterSpacing:"4px", fontFamily:"'Inter',sans-serif", fontWeight:"600", marginBottom:"10px" }}>OUR SERVICES</div>
            <h2 style={{ fontSize:"clamp(28px,5vw,48px)", fontWeight:"600", color:DARK, lineHeight:"1.2", marginBottom:"12px" }}>Everything you need for<br/><span style={{ color:GOLD_L }}>complete compliance</span></h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"18px" }}>
            {SERVICES.map((s,i)=>(
              <div key={i} style={{ padding:"28px", borderRadius:"14px", background:"white", border:`1px solid ${BORDER}`, opacity:servVis?1:0, transform:servVis?"none":"translateY(20px)", transition:`all .5s ${i*.07}s`, cursor:"default" }}
                onMouseEnter={e=>{ e.currentTarget.style.background=GOLD_LL; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow=`0 12px 32px ${GOLD}15`; }}
                onMouseLeave={e=>{ e.currentTarget.style.background="white"; e.currentTarget.style.transform="none"; e.currentTarget.style.boxShadow="none"; }}
              >
                <div style={{ fontSize:"32px", marginBottom:"14px" }}>{s.icon}</div>
                <h3 style={{ fontSize:"18px", fontWeight:"600", color:DARK, marginBottom:"8px" }}>{s.title}</h3>
                <p style={{ fontSize:"12px", color:GRAY, lineHeight:"1.8", marginBottom:"14px", fontFamily:"'Inter',sans-serif" }}>{s.desc}</p>
                {s.features.map((f,j)=><div key={j} style={{ display:"flex", alignItems:"center", gap:"7px", fontSize:"11px", color:GRAY, marginBottom:"4px", fontFamily:"'Inter',sans-serif" }}><div style={{ width:"4px", height:"4px", borderRadius:"50%", background:GOLD }}/>{f}</div>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" ref={howRef} style={{ background:`linear-gradient(135deg,${DARK} 0%,#1C1A10 100%)`, padding:"80px 40px", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:`radial-gradient(${GOLD}06 1px,transparent 1px)`, backgroundSize:"32px 32px", pointerEvents:"none" }}/>
        <div style={{ maxWidth:"880px", margin:"0 auto", position:"relative", zIndex:1 }}>
          <div style={{ textAlign:"center", marginBottom:"52px", opacity:howVis?1:0, transition:"all .6s" }}>
            <div style={{ fontSize:"10px", color:GOLD, letterSpacing:"4px", fontFamily:"'Inter',sans-serif", fontWeight:"600", marginBottom:"10px" }}>HOW IT WORKS</div>
            <h2 style={{ fontSize:"clamp(28px,5vw,44px)", fontWeight:"600", color:"white", lineHeight:"1.2" }}>Up and running in<br/><span style={{ color:GOLD }}>three simple steps</span></h2>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"28px" }}>
            {[{ step:"01",title:"Request Access",desc:"Fill out the contact form. Our team sets up your account within 24 hours." },{ step:"02",title:"Configure Profile",desc:"Define your industry, risk appetite, and relevant screening lists." },{ step:"03",title:"Start Screening",desc:"Screen entities, vessels, and countries in real time with AI analysis." }].map((h,i)=>(
              <div key={i} style={{ textAlign:"center", padding:"28px 20px", opacity:howVis?1:0, transform:howVis?"none":"translateY(20px)", transition:`all .5s ${i*.1}s` }}>
                <div style={{ fontSize:"44px", fontWeight:"700", color:`${GOLD}30`, lineHeight:1, marginBottom:"12px" }}>{h.step}</div>
                <div style={{ width:"36px", height:"1px", background:`${GOLD}60`, margin:"0 auto 16px" }}/>
                <h3 style={{ fontSize:"18px", fontWeight:"600", color:"white", marginBottom:"10px" }}>{h.title}</h3>
                <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", lineHeight:"1.8", fontFamily:"'Inter',sans-serif" }}>{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section ref={ctaRef} style={{ background:GOLD_LL, borderTop:`1px solid ${BORDER}`, borderBottom:`1px solid ${BORDER}`, padding:"56px 40px" }}>
        <div style={{ maxWidth:"600px", margin:"0 auto", textAlign:"center", opacity:ctaVis?1:0, transform:ctaVis?"none":"translateY(16px)", transition:"all .6s" }}>
          <FP size={36} color={GOLD}/>
          <h2 style={{ fontSize:"clamp(24px,4vw,38px)", fontWeight:"600", color:DARK, margin:"16px 0 10px", lineHeight:"1.2" }}>Ready to transform your compliance program?</h2>
          <p style={{ fontSize:"14px", color:GRAY, marginBottom:"28px", fontFamily:"'Inter',sans-serif", lineHeight:"1.7" }}>Join corporates and transport companies using Veriscan to screen smarter.</p>
          <button onClick={()=>scrollTo("contact")} style={{ padding:"14px 36px", background:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`, border:"none", borderRadius:"10px", color:"white", fontSize:"14px", fontWeight:"600", cursor:"pointer", boxShadow:`0 6px 24px ${GOLD}40` }}>Get Started Today →</button>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" ref={contactRef} style={{ background:"white", padding:"80px 40px" }}>
        <div style={{ maxWidth:"620px", margin:"0 auto" }}>
          <div style={{ textAlign:"center", marginBottom:"40px", opacity:contactVis?1:0, transition:"all .6s" }}>
            <div style={{ fontSize:"10px", color:GOLD, letterSpacing:"4px", fontFamily:"'Inter',sans-serif", fontWeight:"600", marginBottom:"10px" }}>CONTACT US</div>
            <h2 style={{ fontSize:"clamp(26px,4vw,42px)", fontWeight:"600", color:DARK, marginBottom:"12px" }}>Want to know more?<br/><span style={{ color:GOLD_L }}>Let's talk.</span></h2>
          </div>
          {sent ? (
            <div style={{ textAlign:"center", padding:"48px", borderRadius:"14px", background:GOLD_LL, border:`1px solid ${GOLD}44` }}>
              <div style={{ fontSize:"44px", marginBottom:"12px" }}>✅</div>
              <h3 style={{ fontSize:"20px", fontWeight:"600", color:DARK, marginBottom:"6px" }}>Message Sent!</h3>
              <p style={{ fontSize:"13px", color:GRAY, fontFamily:"'Inter',sans-serif" }}>Our team will reach out within 24 hours.</p>
            </div>
          ) : (
            <div style={{ background:LIGHT, borderRadius:"14px", padding:"36px", border:`1px solid ${BORDER}`, opacity:contactVis?1:0, transition:"all .5s .1s" }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"14px", marginBottom:"14px" }}>
                {[{k:"name",l:"Full Name",p:"Ahmed Al Mansouri"},{k:"company",l:"Company",p:"Your Company"}].map(f=>(
                  <div key={f.k}>
                    <label style={{ display:"block", fontSize:"10px", fontWeight:"600", color:GRAY, letterSpacing:"1px", marginBottom:"6px" }}>{f.l.toUpperCase()}</label>
                    <input value={form[f.k]} onChange={e=>setForm(d=>({...d,[f.k]:e.target.value}))} placeholder={f.p} style={{ width:"100%", padding:"11px 13px", background:"white", border:`1px solid ${BORDER}`, borderRadius:"8px", fontSize:"13px", color:DARK, outline:"none" }} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
                  </div>
                ))}
              </div>
              <div style={{ marginBottom:"14px" }}>
                <label style={{ display:"block", fontSize:"10px", fontWeight:"600", color:GRAY, letterSpacing:"1px", marginBottom:"6px" }}>EMAIL</label>
                <input type="email" value={form.email} onChange={e=>setForm(d=>({...d,email:e.target.value}))} placeholder="your@company.com" style={{ width:"100%", padding:"11px 13px", background:"white", border:`1px solid ${BORDER}`, borderRadius:"8px", fontSize:"13px", color:DARK, outline:"none" }} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
              </div>
              <div style={{ marginBottom:"20px" }}>
                <label style={{ display:"block", fontSize:"10px", fontWeight:"600", color:GRAY, letterSpacing:"1px", marginBottom:"6px" }}>MESSAGE</label>
                <textarea rows={3} value={form.message} onChange={e=>setForm(d=>({...d,message:e.target.value}))} placeholder="Tell us about your compliance needs..." style={{ width:"100%", padding:"11px 13px", background:"white", border:`1px solid ${BORDER}`, borderRadius:"8px", fontSize:"13px", color:DARK, outline:"none", resize:"vertical", fontFamily:"'Inter',sans-serif" }} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
              </div>
              <button onClick={handleSend} disabled={sending} style={{ width:"100%", padding:"13px", background:sending?`${GOLD}55`:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`, border:"none", borderRadius:"9px", color:"white", fontSize:"14px", fontWeight:"600", cursor:sending?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", boxShadow:`0 4px 16px ${GOLD}30` }}>
                {sending?<><span style={{ width:"14px",height:"14px",border:"2px solid white",borderTopColor:"transparent",borderRadius:"50%",display:"inline-block",animation:"spin .8s linear infinite" }}/>Sending...</>:"Send Message →"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background:DARK, padding:"40px 40px 24px", borderTop:`2px solid ${GOLD}30` }}>
        <div style={{ maxWidth:"1100px", margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"32px", flexWrap:"wrap", gap:"24px" }}>
            <div><Logo light={false}/><p style={{ fontSize:"12px", color:"rgba(255,255,255,0.3)", marginTop:"12px", maxWidth:"240px", lineHeight:"1.7", fontFamily:"'Inter',sans-serif" }}>AI-powered compliance intelligence for corporates and transport companies worldwide.</p></div>
            <div style={{ display:"flex", gap:"48px", flexWrap:"wrap" }}>
              <div><div style={{ fontSize:"10px", color:GOLD, letterSpacing:"2px", marginBottom:"14px", fontFamily:"'Inter',sans-serif", fontWeight:"600" }}>SERVICES</div>{SERVICES.map(s=><div key={s.title} style={{ fontSize:"12px", color:"rgba(255,255,255,0.35)", marginBottom:"7px", fontFamily:"'Inter',sans-serif" }}>{s.title}</div>)}</div>
              <div><div style={{ fontSize:"10px", color:GOLD, letterSpacing:"2px", marginBottom:"14px", fontFamily:"'Inter',sans-serif", fontWeight:"600" }}>COMPANY</div>{["About Us","Contact","Privacy Policy"].map(s=><div key={s} style={{ fontSize:"12px", color:"rgba(255,255,255,0.35)", marginBottom:"7px", fontFamily:"'Inter',sans-serif", cursor:"pointer" }} onMouseEnter={e=>e.target.style.color=GOLD} onMouseLeave={e=>e.target.style.color="rgba(255,255,255,0.35)"}>{s}</div>)}</div>
            </div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:"20px", display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:"8px" }}>
            <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.2)", fontFamily:"'Inter',sans-serif" }}>© 2026 Veriscan. All rights reserved.</span>
            <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.2)", fontFamily:"'Inter',sans-serif" }}>Powered by OpenSanctions · Claude AI</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ── LOGIN PAGE ────────────────────────────────────────────────────────────────
function LoginPage({ onLogin, onBack }) {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [showPass,setShowPass]=useState(false); const [error,setError]=useState(""); const [loading,setLoading]=useState(false); const [scanY,setScanY]=useState(20);
  useEffect(()=>{ const t=setInterval(()=>setScanY(y=>y>=80?20:y+0.4),30); return()=>clearInterval(t); },[]);
  const handleLogin=async()=>{ if(!email||!password){setError("Please enter email and password.");return;} setLoading(true); setError(""); await new Promise(r=>setTimeout(r,1200)); const found=USERS.find(u=>u.email===email&&u.password===password); if(found){onLogin(found);}else{setError("Invalid credentials. Try a demo account below.");setLoading(false);} };
  return (
    <div style={{ minHeight:"100vh", background:`linear-gradient(160deg,${CREAM},${GOLD_LL},#FFF8E8)`, display:"flex", flexDirection:"column", fontFamily:"'Inter','Segoe UI',sans-serif" }}>
      <div style={{ height:"3px", background:`linear-gradient(90deg,transparent,${GOLD},transparent)` }}/>
      <nav style={{ background:"rgba(255,252,240,0.9)", backdropFilter:"blur(12px)", height:"60px", display:"flex", alignItems:"center", padding:"0 40px", justifyContent:"space-between", borderBottom:`1px solid ${BORDER}` }}>
        <Logo light={true}/>
        <button onClick={onBack} style={{ background:"none", border:"none", fontSize:"13px", color:GRAY, cursor:"pointer", fontFamily:"inherit" }}>← Back to Home</button>
      </nav>
      <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:"40px 20px" }}>
        <div style={{ display:"flex", width:"100%", maxWidth:"960px", gap:"56px", alignItems:"center" }}>
          {/* Left */}
          <div style={{ flex:1 }}>
            <div style={{ fontSize:"9px", color:GOLD, letterSpacing:"4px", marginBottom:"20px", fontWeight:"600" }}>SECURE ACCESS</div>
            <h1 style={{ fontSize:"38px", fontWeight:"800", color:DARK, lineHeight:"1.15", marginBottom:"14px" }}>Identify Risk.<br/><span style={{ color:GOLD_L }}>Verify Identity.</span><br/><span style={{ color:GRAY, fontWeight:"300", fontSize:"32px" }}>Stay Compliant.</span></h1>
            <p style={{ fontSize:"14px", color:GRAY, lineHeight:"1.8", marginBottom:"28px", maxWidth:"360px" }}>Veriscan — AI-powered compliance intelligence for corporates and transport companies across global markets.</p>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              {[{icon:"🔍",l:"Sanctions Screening",s:"OFAC · UN · EU · 100+ lists"},{icon:"👤",l:"KYC & PEP",s:"Identity & due diligence"},{icon:"🌍",l:"Country Risk + CPI",s:"Prohibitions & embargo detail"},{icon:"🚢",l:"Vessel Screening",s:"IMO · Flag · Ownership"},{icon:"📦",l:"Products Review",s:"Trade & export control"}].map((f,i)=>(
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"12px", padding:"11px 14px", borderRadius:"9px", background:"white", border:`1px solid ${BORDER}`, borderLeft:`3px solid ${GOLD}` }}>
                  <span style={{ fontSize:"16px" }}>{f.icon}</span>
                  <div><div style={{ fontSize:"12px", fontWeight:"700", color:DARK }}>{f.l}</div><div style={{ fontSize:"10px", color:GRAY }}>{f.s}</div></div>
                </div>
              ))}
            </div>
          </div>
          {/* Right — card */}
          <div style={{ width:"390px", flexShrink:0, borderRadius:"16px", overflow:"hidden", background:"white", border:`1px solid ${GOLD}22`, boxShadow:`0 8px 48px rgba(184,134,11,0.12)` }}>
            <div style={{ background:`linear-gradient(135deg,${DARK},#1C1A10)`, padding:"28px 30px", position:"relative", overflow:"hidden", borderBottom:`1px solid ${GOLD}18` }}>
              <div style={{ position:"absolute", left:"20px", right:"20px", top:`${scanY}%`, height:"1px", background:`linear-gradient(90deg,transparent,${GOLD}60,transparent)`, transition:"top .03s linear" }}/>
              <div style={{ position:"absolute", right:"-10px", top:"-10px", opacity:0.06 }}><FP size={110} color={GOLD}/></div>
              <div style={{ position:"relative", zIndex:1 }}><Logo light={false}/><p style={{ marginTop:"14px", fontSize:"12px", color:"rgba(255,255,255,0.4)" }}>Sign in to your compliance dashboard</p></div>
            </div>
            <div style={{ padding:"26px 30px" }}>
              <label style={{ display:"block", fontSize:"10px", fontWeight:"600", color:GRAY, letterSpacing:"1px", marginBottom:"7px" }}>EMAIL ADDRESS</label>
              <input value={email} onChange={e=>{setEmail(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&handleLogin()} type="email" placeholder="your@veriscan.io" style={{ width:"100%", padding:"11px 13px", border:`1.5px solid ${BORDER}`, borderRadius:"8px", fontSize:"13px", color:DARK, outline:"none", fontFamily:"inherit", marginBottom:"14px" }} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
              <label style={{ display:"block", fontSize:"10px", fontWeight:"600", color:GRAY, letterSpacing:"1px", marginBottom:"7px" }}>PASSWORD</label>
              <div style={{ position:"relative", marginBottom:"18px" }}>
                <input value={password} onChange={e=>{setPassword(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&handleLogin()} type={showPass?"text":"password"} placeholder="••••••••" style={{ width:"100%", padding:"11px 38px 11px 13px", border:`1.5px solid ${BORDER}`, borderRadius:"8px", fontSize:"13px", color:DARK, outline:"none", fontFamily:"inherit" }} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
                <button onClick={()=>setShowPass(!showPass)} style={{ position:"absolute", right:"11px", top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", fontSize:"14px", color:GRAY }}>{ showPass?"🙈":"👁" }</button>
              </div>
              {error&&<div style={{ padding:"9px 13px", borderRadius:"7px", background:"#FEF2F2", border:"1px solid #FECACA", color:"#DC2626", fontSize:"11px", marginBottom:"14px" }}>⚠ {error}</div>}
              <button onClick={handleLogin} disabled={loading} style={{ width:"100%", padding:"13px", background:loading?`${GOLD}55`:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`, border:"none", borderRadius:"8px", color:"white", fontSize:"14px", fontWeight:"600", cursor:loading?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px", boxShadow:`0 4px 16px ${GOLD}35`, marginBottom:"20px" }}>
                {loading?<><span style={{ width:"14px",height:"14px",border:"2px solid white",borderTopColor:"transparent",borderRadius:"50%",display:"inline-block",animation:"spin .8s linear infinite" }}/>Verifying...</>:"Sign In →"}
              </button>
              <div style={{ display:"flex", alignItems:"center", gap:"10px", marginBottom:"14px" }}>
                <div style={{ flex:1, height:"1px", background:"#F3F4F6" }}/><span style={{ fontSize:"9px", color:"#9CA3AF", letterSpacing:"1px" }}>DEMO ACCOUNTS</span><div style={{ flex:1, height:"1px", background:"#F3F4F6" }}/>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                {USERS.map(u=>(
                  <button key={u.id} onClick={()=>{setEmail(u.email);setPassword(u.password);setError("");}} style={{ display:"flex", alignItems:"center", gap:"9px", padding:"9px 11px", background:LIGHT, border:`1.5px solid ${BORDER}`, borderRadius:"8px", cursor:"pointer", fontFamily:"inherit", textAlign:"left" }} onMouseEnter={e=>{e.currentTarget.style.background=GOLD_LL;e.currentTarget.style.borderColor=`${GOLD}44`;}} onMouseLeave={e=>{e.currentTarget.style.background=LIGHT;e.currentTarget.style.borderColor=BORDER;}}>
                    <div style={{ width:"28px", height:"28px", borderRadius:"6px", background:`${GOLD}18`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:"700", color:GOLD_B }}>{u.avatar}</div>
                    <div style={{ flex:1 }}><div style={{ fontSize:"12px", fontWeight:"600", color:DARK }}>{u.name}</div><div style={{ fontSize:"10px", color:GRAY }}>{u.email}</div></div>
                    <span style={{ fontSize:"9px", padding:"2px 7px", borderRadius:"20px", background:`${GOLD}15`, color:GOLD_B, fontWeight:"600" }}>{u.role}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── SCREENING PAGE ────────────────────────────────────────────────────────────
function ScreeningPage() {
  const [screenTab,setScreenTab]=useState("adhoc");
  // Ad hoc fields
  const [query,setQuery]=useState("");
  const [address,setAddress]=useState("");
  const [city,setCity]=useState("");
  const [countryField,setCountryField]=useState("");
  const [eType,setEType]=useState("both");
  const [results,setResults]=useState(null); const [loading,setLoading]=useState(false); const [error,setError]=useState(""); const [aiText,setAiText]=useState(""); const [aiLoad,setAiLoad]=useState(false); const [expanded,setExpanded]=useState(null); const [decision,setDecision]=useState(null);
  const [parties,setParties]=useState(SAMPLE_PARTIES); const [screening,setScreening]=useState({}); const [batchRunning,setBatchRunning]=useState(false); const [batchProgress,setBatchProgress]=useState(0);
  const [auditLog,setAuditLog]=useState([]);
  const addAudit=(action,subject,risk="—",detail="")=>setAuditLog(a=>[{id:uid(),action,subject,risk,detail,user:"Compliance Officer",time:new Date().toLocaleString("en-GB",{day:"2-digit",month:"short",hour:"2-digit",minute:"2-digit"})},...a]);
  const DEMOS=["Bashar al-Assad","Vladimir Putin","Kim Jong Un","Viktor Bout","Al Baraka Exchange"];

  const clearForm=()=>{ setQuery(""); setAddress(""); setCity(""); setCountryField(""); setError(""); };

  const runAdHoc=async()=>{
    if(!query.trim())return;
    setLoading(true);setResults(null);setError("");setAiText("");setExpanded(null);setDecision(null);
    try{
      const extra={};
      if(address.trim()) extra.address=address.trim();
      if(countryField.trim()) extra.country=countryField.trim();
      const m=await screenLive(query.trim(),eType,extra);
      const risk=m.length===0?"CLEAR":m[0].risk;
      setResults(m);
      const detail=[address,city,countryField].filter(Boolean).join(", ");
      addAudit("AD HOC SCREEN",query.trim(),risk,`${m.length} match(es)${detail?` · ${detail}`:""}`);
      setAiLoad(true);
      const ai=await callAI(
        m.length===0
          ?`"${query}" — no sanctions matches. Brief clearance.`
          :`"${query}" — ${m.length} match(es): ${m.map(x=>`${x.name}|${x.lists.join(",")}|${(x.score*100).toFixed(0)}%|${x.country}`).join(" / ")}. Risk assessment. End with ✅ APPROVE | ⚠️ EDD | 🚫 BLOCK`
      );
      setAiText(ai);setAiLoad(false);
    } catch(e){ setError(`Error: ${e?.message||e}`); setAiLoad(false); }
    setLoading(false);
  };

  const screenParty=async(party)=>{ setScreening(s=>({...s,[party.id]:{loading:true}}));
    try{ const m=await screenLive(party.name,party.type==="Individual"?"person":"org"); const risk=m.length===0?"CLEAR":m[0].risk; setScreening(s=>({...s,[party.id]:{loading:false,matches:m,risk}})); setParties(ps=>ps.map(p=>p.id===party.id?{...p,lastScreen:new Date().toLocaleTimeString(),status:risk==="CLEAR"?"clear":risk==="HIGH"?"blocked":"review"}:p)); addAudit("PARTY SCREEN",party.name,risk,`${m.length} match(es)`);
    } catch{ setScreening(s=>({...s,[party.id]:{loading:false,error:true}})); } };

  const runBatch=async()=>{ setBatchRunning(true);setBatchProgress(0); const pending=parties.filter(p=>p.status==="pending");
    for(let i=0;i<pending.length;i++){ await screenParty(pending[i]); setBatchProgress(Math.round(((i+1)/pending.length)*100)); await new Promise(r=>setTimeout(r,400)); }
    setBatchRunning(false);setBatchProgress(0); addAudit("BATCH SCREEN",`${pending.length} parties`,"—","Completed"); };

  const pStats={ total:parties.length, clear:parties.filter(p=>p.status==="clear").length, review:parties.filter(p=>p.status==="review").length, blocked:parties.filter(p=>p.status==="blocked").length, pending:parties.filter(p=>p.status==="pending").length };

  const [bulkOpen, setBulkOpen] = useState(false);
  const TABS=[{id:"adhoc",label:"⚡ Ad Hoc Screening"},{id:"existing",label:"🏢 Existing Parties"},{id:"audit",label:`📋 Audit Trail ${auditLog.length>0?`(${auditLog.length})`:""}`}];

  // Active sources display
  const SOURCES_LIST=[
    {label:"🇺🇸 OFAC SDN",     color:"#DC2626"},
    {label:"🇺🇳 UN SC",         color:"#2563EB"},
    {label:"🇪🇺 EU",            color:"#7C3AED"},
    {label:"🇬🇧 UK OFSI",      color:"#0891B2"},
    {label:"🌐 Interpol",       color:"#059669"},
    {label:"🤖 AI Powered",     color:GOLD_B},
  ];

  const inputStyle={ width:"100%", padding:"9px 12px", background:LIGHT, border:`1px solid ${BORDER}`, borderRadius:"7px", fontSize:"12px", color:DARK, outline:"none", fontFamily:"inherit" };
  const labelStyle={ fontSize:"9px", color:GRAY, letterSpacing:"2px", display:"block", marginBottom:"5px", fontWeight:"600" };

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      {/* Sub-tabs */}
      <div style={{ background:"white", borderBottom:`1px solid ${BORDER}`, padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex", alignItems:"center" }}>
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>{setScreenTab(t.id);setBulkOpen(false);}} style={{ padding:"13px 18px", background:"none", border:"none", borderBottom:screenTab===t.id?`2px solid ${GOLD}`:"2px solid transparent", color:screenTab===t.id?GOLD_B:GRAY, fontSize:"12px", fontWeight:screenTab===t.id?"700":"400", cursor:"pointer", fontFamily:"inherit", transition:"all .2s", marginBottom:"-1px" }}>{t.label}</button>
          ))}

          {/* Bulk dropdown */}
          <div style={{ position:"relative" }}>
            <button onClick={()=>setBulkOpen(o=>!o)} style={{
              padding:"13px 18px", background:"none", border:"none",
              borderBottom:(screenTab==="bulk-upload"||screenTab==="bulk-search")?`2px solid ${GOLD}`:"2px solid transparent",
              color:(screenTab==="bulk-upload"||screenTab==="bulk-search")?GOLD_B:GRAY,
              fontSize:"12px", fontWeight:(screenTab==="bulk-upload"||screenTab==="bulk-search")?"700":"400",
              cursor:"pointer", fontFamily:"inherit", transition:"all .2s", marginBottom:"-1px",
              display:"flex", alignItems:"center", gap:"5px",
            }}>
              📦 Bulk {bulkOpen?"▲":"▼"}
            </button>

            {/* Dropdown menu */}
            {bulkOpen && (
              <div style={{
                position:"absolute", top:"100%", left:0, zIndex:50,
                background:"white", borderRadius:"10px", border:`1px solid ${BORDER}`,
                boxShadow:`0 8px 24px rgba(0,0,0,0.10)`, minWidth:"220px", overflow:"hidden",
                marginTop:"4px",
              }}>
                <button onClick={()=>{setScreenTab("bulk-upload");setBulkOpen(false);}} style={{
                  display:"flex", alignItems:"center", gap:"12px", width:"100%",
                  padding:"14px 16px", background:"none", border:"none", cursor:"pointer",
                  fontFamily:"inherit", textAlign:"left", borderBottom:`1px solid ${BORDER}`,
                  transition:"background .15s",
                }}
                  onMouseEnter={e=>e.currentTarget.style.background=GOLD_LL}
                  onMouseLeave={e=>e.currentTarget.style.background="none"}
                >
                  <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:`${GOLD}15`, border:`1px solid ${GOLD}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", flexShrink:0 }}>📤</div>
                  <div>
                    <div style={{ fontSize:"12px", fontWeight:"700", color:DARK }}>Bulk Screening Upload</div>
                    <div style={{ fontSize:"10px", color:GRAY, marginTop:"2px" }}>Upload Excel/CSV with names</div>
                  </div>
                </button>
                <button onClick={()=>{setScreenTab("bulk-search");setBulkOpen(false);}} style={{
                  display:"flex", alignItems:"center", gap:"12px", width:"100%",
                  padding:"14px 16px", background:"none", border:"none", cursor:"pointer",
                  fontFamily:"inherit", textAlign:"left", transition:"background .15s",
                }}
                  onMouseEnter={e=>e.currentTarget.style.background=GOLD_LL}
                  onMouseLeave={e=>e.currentTarget.style.background="none"}
                >
                  <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:`${GOLD}15`, border:`1px solid ${GOLD}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", flexShrink:0 }}>🔍</div>
                  <div>
                    <div style={{ fontSize:"12px", fontWeight:"700", color:DARK }}>Bulk Screening Search</div>
                    <div style={{ fontSize:"10px", color:GRAY, marginTop:"2px" }}>Type or paste multiple names</div>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
          {SOURCES_LIST.map(s=><span key={s.label} style={{ fontSize:"9px", padding:"2px 8px", borderRadius:"20px", background:`${s.color}12`, border:`1px solid ${s.color}25`, color:s.color, fontWeight:"600" }}>{s.label}</span>)}
        </div>
      </div>

      {/* AD HOC */}
      {screenTab==="adhoc"&&(
        <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
          {/* Left panel */}
          <div style={{ width:"340px", flexShrink:0, borderRight:`1px solid ${BORDER}`, background:"white", display:"flex", flexDirection:"column", overflowY:"auto" }}>
            <div style={{ padding:"18px" }}>
              <div style={{ fontSize:"9px", color:`${GOLD}99`, letterSpacing:"3px", marginBottom:"4px" }}>AD HOC SCREENING</div>
              <div style={{ fontSize:"15px", fontWeight:"800", color:DARK, marginBottom:"14px" }}>Single Entity Check</div>

              {/* Name — required */}
              <label style={labelStyle}>NAME OR ENTITY <span style={{ color:"#DC2626" }}>*</span></label>
              <input value={query} onChange={e=>{setQuery(e.target.value);setError("");}} onKeyDown={e=>e.key==="Enter"&&runAdHoc()} placeholder="Full name or company..." style={{ ...inputStyle, marginBottom:"10px", fontSize:"13px", padding:"10px 13px" }} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>

              {/* Entity type */}
              <div style={{ display:"flex", gap:"5px", marginBottom:"14px" }}>
                {[["both","Both"],["person","Individual"],["org","Entity"]].map(([v,l])=>(
                  <button key={v} onClick={()=>setEType(v)} style={{ flex:1, padding:"7px", borderRadius:"6px", fontSize:"10px", cursor:"pointer", fontFamily:"inherit", background:eType===v?GOLD_LL:"white", border:`1px solid ${eType===v?GOLD+"55":BORDER}`, color:eType===v?GOLD_B:GRAY, fontWeight:eType===v?"600":"400" }}>{l}</button>
                ))}
              </div>

              {/* Divider */}
              <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                <div style={{ flex:1, height:"1px", background:BORDER }}/>
                <span style={{ fontSize:"9px", color:GRAY, letterSpacing:"1px" }}>ADDITIONAL DETAILS (OPTIONAL)</span>
                <div style={{ flex:1, height:"1px", background:BORDER }}/>
              </div>

              {/* Address */}
              <label style={labelStyle}>ADDRESS</label>
              <input value={address} onChange={e=>setAddress(e.target.value)} placeholder="Street address..." style={{ ...inputStyle, marginBottom:"10px" }} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>

              {/* City + Country in 2 columns */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"8px", marginBottom:"14px" }}>
                <div>
                  <label style={labelStyle}>CITY</label>
                  <input value={city} onChange={e=>setCity(e.target.value)} placeholder="City..." style={inputStyle} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
                </div>
                <div>
                  <label style={labelStyle}>COUNTRY</label>
                  <input value={countryField} onChange={e=>setCountryField(e.target.value)} placeholder="e.g. Iran..." style={inputStyle} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
                </div>
              </div>

              {/* Active sources */}
              <div style={{ padding:"10px 12px", borderRadius:"8px", background:GOLD_LL, border:`1px solid ${GOLD}22`, marginBottom:"14px" }}>
                <div style={{ fontSize:"9px", color:GOLD_B, letterSpacing:"2px", fontWeight:"600", marginBottom:"7px" }}>SCREENING AGAINST</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"4px" }}>
                  {SOURCES_LIST.map(s=>(
                    <span key={s.label} style={{ fontSize:"9px", padding:"2px 8px", borderRadius:"20px", background:"white", border:`1px solid ${s.color}30`, color:s.color, fontWeight:"600" }}>{s.label}</span>
                  ))}
                </div>
              </div>

              {/* Quick test */}
              <div style={{ marginBottom:"12px" }}>
                <div style={{ fontSize:"9px", color:GRAY, letterSpacing:"2px", marginBottom:"6px" }}>QUICK TEST</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"5px" }}>
                  {DEMOS.map(n=><button key={n} onClick={()=>{setQuery(n);setAddress("");setCity("");setCountryField("");}} style={{ padding:"3px 8px", borderRadius:"20px", fontSize:"10px", background:GOLD_LL, border:`1px solid ${GOLD}33`, color:GOLD_B, cursor:"pointer", fontFamily:"inherit" }}>{n}</button>)}
                </div>
              </div>

              {/* Buttons */}
              <div style={{ display:"flex", gap:"7px" }}>
                <button onClick={runAdHoc} disabled={loading||!query.trim()} style={{ flex:1, padding:"11px", background:loading||!query.trim()?`${GOLD}44`:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`, border:"none", borderRadius:"8px", color:"white", fontSize:"12px", fontWeight:"700", cursor:loading||!query.trim()?"not-allowed":"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", justifyContent:"center", gap:"7px", boxShadow:loading?"none":`0 4px 14px ${GOLD}30` }}>
                  {loading?<><span style={{ width:"12px",height:"12px",border:"2px solid white",borderTopColor:"transparent",borderRadius:"50%",display:"inline-block",animation:"spin .8s linear infinite" }}/>Scanning...</>:"🔍 Run Screening"}
                </button>
                <button onClick={clearForm} style={{ padding:"11px 13px", borderRadius:"8px", background:"white", border:`1px solid ${BORDER}`, color:GRAY, fontSize:"11px", cursor:"pointer", fontFamily:"inherit" }}>✕ Clear</button>
              </div>
              {error&&<div style={{ marginTop:"8px", padding:"8px", borderRadius:"6px", background:"#FEF2F2", border:"1px solid #FECACA", color:"#DC2626", fontSize:"11px" }}>⚠ {error}</div>}
            </div>
          </div>
          <div style={{ flex:1, overflow:"auto", background:"#F9F7F2", padding:"20px" }}>
            {!results&&!loading&&<div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", flexDirection:"column", gap:"12px", opacity:0.4 }}><FP size={52} color={GOLD}/><div style={{ fontSize:"14px", color:GRAY }}>Enter a name and click Run Screening</div></div>}
            {loading&&<div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", flexDirection:"column", gap:"16px" }}>
              <div style={{ position:"relative", width:"64px", height:"64px" }}>
                <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:`3px solid ${BORDER}` }}/>
                <div style={{ position:"absolute", inset:0, borderRadius:"50%", border:`3px solid transparent`, borderTopColor:GOLD, animation:"spin 1s linear infinite" }}/>
                <div style={{ position:"absolute", inset:"14px", display:"flex", alignItems:"center", justifyContent:"center" }}><FP size={22} color={GOLD}/></div>
              </div>
              <div style={{ textAlign:"center" }}>
                <div style={{ fontSize:"13px", fontWeight:"700", color:DARK, marginBottom:"4px" }}>Screening Against Sanctions Lists</div>
                <div style={{ fontSize:"11px", color:GRAY, marginBottom:"8px" }}>OFAC · UN · EU · UK OFSI · AI-Powered</div>
                <div style={{ display:"flex", gap:"5px", justifyContent:"center", flexWrap:"wrap" }}>
                  {["🇺🇸 OFAC SDN","🇺🇳 UN SC","🇪🇺 EU","🇬🇧 UK OFSI","🤖 AI Analysis"].map(s=>(
                    <span key={s} style={{ fontSize:"9px", padding:"3px 10px", borderRadius:"20px", background:GOLD_LL, border:`1px solid ${GOLD}33`, color:GOLD_B }}>{s}</span>
                  ))}
                </div>
              </div>
            </div>}
            {results&&!loading&&(
              <div style={{ maxWidth:"660px" }}>
                <div style={{ padding:"14px 18px", borderRadius:"9px", marginBottom:"14px", background:results.length===0?"#F0FDF4":"#FEF2F2", border:`1px solid ${results.length===0?"#BBF7D0":"#FECACA"}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                    <span style={{ fontSize:"20px" }}>{results.length===0?"✅":"🚨"}</span>
                    <div><div style={{ fontSize:"13px", fontWeight:"700", color:results.length===0?"#16A34A":"#DC2626" }}>{results.length===0?"NO MATCHES — CLEAR":`${results.length} MATCH${results.length>1?"ES":""} FOUND`}</div><div style={{ fontSize:"9px", color:GRAY }}>{`"${query}" · ${new Date().toLocaleTimeString()}`}</div></div>
                  </div>
                  {results.length>0&&<span style={{ padding:"3px 10px", borderRadius:"4px", background:"#DC2626", color:"white", fontSize:"9px", fontWeight:"700", letterSpacing:"1px" }}>REVIEW REQUIRED</span>}
                </div>
                {results.map((r,i)=>{ const rc=RC[r.risk]; const isOpen=expanded===i; return (
                  <div key={r.id||i} style={{ borderRadius:"9px", marginBottom:"7px", background:"white", border:`1px solid ${rc.border}`, overflow:"hidden" }}>
                    <div onClick={()=>setExpanded(isOpen?null:i)} style={{ padding:"13px 16px", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"12px" }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"6px", flexWrap:"wrap", marginBottom:"6px" }}>
                          <span style={{ fontSize:"13px", fontWeight:"700", color:DARK }}>{r.name}</span>
                          <span style={{ padding:"2px 6px", borderRadius:"3px", fontSize:"9px", background:rc.bg, color:rc.color, border:`1px solid ${rc.border}`, fontWeight:"700" }}>{r.risk}</span>
                          <span style={{ padding:"2px 6px", borderRadius:"3px", fontSize:"9px", background:LIGHT, color:GRAY, border:`1px solid ${BORDER}` }}>{r.type}</span>
                        </div>
                        {/* Source flags */}
                        {r.sourceFlags&&r.sourceFlags.length>0&&(
                          <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"5px" }}>
                            <span style={{ fontSize:"9px", color:GRAY, marginRight:"2px" }}>Found in:</span>
                            {r.sourceFlags.map(sf=><span key={sf.label} style={{ padding:"2px 8px", borderRadius:"20px", fontSize:"9px", background:`${sf.color}12`, border:`1px solid ${sf.color}30`, color:sf.color, fontWeight:"700" }}>{sf.label}</span>)}
                          </div>
                        )}
                        <div style={{ display:"flex", gap:"5px", flexWrap:"wrap", alignItems:"center" }}>
                          {r.country!=="—"&&<span style={{ fontSize:"10px", color:GRAY }}>🌍 {r.country}</span>}
                          {r.dob&&r.dob!=="—"&&<span style={{ fontSize:"10px", color:GRAY }}>🎂 {r.dob}</span>}
                        </div>
                      </div>
                      <div style={{ textAlign:"right", flexShrink:0 }}>
                        <div style={{ fontSize:"22px", fontWeight:"800", color:r.score>=.85?"#DC2626":r.score>=.65?GOLD_L:"#16A34A", lineHeight:1 }}>{(r.score*100).toFixed(0)}%</div>
                        <div style={{ fontSize:"8px", color:GRAY }}>MATCH</div>
                        <div style={{ height:"3px", width:"52px", background:BORDER, borderRadius:"2px", marginTop:"4px" }}><div style={{ height:"100%", width:`${r.score*100}%`, background:r.score>=.85?"#DC2626":r.score>=.65?GOLD_L:"#16A34A", borderRadius:"2px" }}/></div>
                        <div style={{ fontSize:"9px", color:GRAY, marginTop:"4px" }}>{isOpen?"▲":"▼"}</div>
                      </div>
                    </div>
                    {isOpen&&(
                      <div style={{ padding:"0 16px 14px", borderTop:`1px solid ${BORDER}` }}>
                        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px", paddingTop:"12px" }}>
                          {r.aliases.length>0&&<div><div style={{ fontSize:"9px", color:GRAY, letterSpacing:"2px", marginBottom:"5px" }}>ALIASES</div>{r.aliases.map((a,j)=><div key={j} style={{ fontSize:"11px", color:"#374151", marginBottom:"2px" }}>• {a}</div>)}</div>}
                          <div>
                            <div style={{ fontSize:"9px", color:GRAY, letterSpacing:"2px", marginBottom:"5px" }}>DETAILS</div>
                            {r.country!=="—"&&<div style={{ fontSize:"11px", color:"#374151", marginBottom:"2px" }}>🌍 Country: {r.country}</div>}
                            {r.address&&r.address!=="—"&&<div style={{ fontSize:"11px", color:"#374151", marginBottom:"2px" }}>📍 {r.address}</div>}
                            {r.dob&&r.dob!=="—"&&<div style={{ fontSize:"11px", color:"#374151", marginBottom:"2px" }}>🎂 DOB: {r.dob}</div>}
                          </div>
                        </div>
                        {/* All lists */}
                        {r.lists.length>0&&<div style={{ marginTop:"10px" }}><div style={{ fontSize:"9px", color:GRAY, letterSpacing:"2px", marginBottom:"5px" }}>SANCTIONS LISTS</div><div style={{ display:"flex", gap:"4px", flexWrap:"wrap" }}>{r.lists.map(l=><span key={l} style={{ padding:"2px 8px", borderRadius:"3px", fontSize:"9px", background:`${LIST_COLOR(l)}12`, border:`1px solid ${LIST_COLOR(l)}30`, color:LIST_COLOR(l), fontWeight:"600" }}>{l}</span>)}</div></div>}
                        <a href={r.url} target="_blank" rel="noreferrer" style={{ display:"inline-block", marginTop:"12px", padding:"5px 12px", background:GOLD_LL, border:`1px solid ${GOLD}44`, borderRadius:"5px", color:GOLD_B, fontSize:"10px", fontWeight:"600", textDecoration:"none" }}>VIEW FULL PROFILE ↗</a>
                      </div>
                    )}
                  </div>
                ); })}
                <div style={{ padding:"16px", borderRadius:"9px", background:"white", border:`1px solid ${BORDER}`, marginTop:"6px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"9px" }}><FP size={14} color={GOLD}/><span style={{ fontSize:"9px", color:GOLD_B, letterSpacing:"2px", fontWeight:"700" }}>AI ANALYST</span>{aiLoad&&<span style={{ fontSize:"9px", color:GRAY }}>analyzing...</span>}</div>
                  {aiLoad?<div style={{ height:"56px", background:LIGHT, borderRadius:"6px" }}/>:<p style={{ fontSize:"12px", color:"#374151", lineHeight:"1.8" }}>{aiText}</p>}
                </div>
                {!aiLoad&&aiText&&(
                  <div style={{ marginTop:"10px" }}>
                    <div style={{ fontSize:"9px", color:GRAY, letterSpacing:"2px", marginBottom:"7px" }}>COMPLIANCE DECISION</div>
                    <div style={{ display:"flex", gap:"7px" }}>
                      {[{d:"✅ Approve",c:"#16A34A",bg:"#F0FDF4",b:"#BBF7D0"},{d:"⚠️ EDD",c:GOLD_B,bg:GOLD_LL,b:"#E8D5A3"},{d:"🚫 Block",c:"#DC2626",bg:"#FEF2F2",b:"#FECACA"},{d:"📋 Escalate",c:"#374151",bg:"white",b:BORDER}].map(a=>(
                        <button key={a.d} onClick={()=>{ setDecision(a.d); addAudit("DECISION",query,results[0]?.risk||"CLEAR",a.d); }} style={{ flex:1, padding:"9px 4px", borderRadius:"7px", fontSize:"10px", fontWeight:"600", background:decision===a.d?a.bg:"white", border:`1.5px solid ${decision===a.d?a.b:BORDER}`, color:decision===a.d?a.c:GRAY, cursor:"pointer", fontFamily:"inherit" }}>{a.d}</button>
                      ))}
                    </div>
                    {decision&&<div style={{ marginTop:"8px", padding:"9px 12px", borderRadius:"7px", background:GOLD_LL, border:`1px solid ${GOLD}33`, fontSize:"11px", color:GOLD_B, fontWeight:"600" }}>✓ Decision recorded: {decision}</div>}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* EXISTING PARTIES */}
      {screenTab==="existing"&&(
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div style={{ background:"white", borderBottom:`1px solid ${BORDER}`, padding:"12px 20px", display:"flex", alignItems:"center", gap:"10px", flexWrap:"wrap" }}>
            <div style={{ display:"flex", gap:"7px" }}>
              {[{label:"Total",v:pStats.total,c:GOLD},{label:"Clear",v:pStats.clear,c:"#16A34A"},{label:"Review",v:pStats.review,c:GOLD},{label:"Blocked",v:pStats.blocked,c:"#DC2626"},{label:"Pending",v:pStats.pending,c:GRAY}].map(s=>(
                <div key={s.label} style={{ textAlign:"center", padding:"6px 12px", borderRadius:"7px", background:LIGHT, border:`1px solid ${BORDER}` }}>
                  <div style={{ fontSize:"15px", fontWeight:"800", color:s.c }}>{s.v}</div>
                  <div style={{ fontSize:"9px", color:GRAY }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div style={{ marginLeft:"auto" }}>
              <button onClick={runBatch} disabled={batchRunning||pStats.pending===0} style={{ padding:"8px 18px", background:batchRunning||pStats.pending===0?LIGHT:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`, border:`1px solid ${batchRunning||pStats.pending===0?BORDER:"transparent"}`, borderRadius:"7px", color:batchRunning||pStats.pending===0?GRAY:"white", fontSize:"11px", fontWeight:"600", cursor:batchRunning||pStats.pending===0?"not-allowed":"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"6px" }}>
                {batchRunning?<><span style={{ width:"11px",height:"11px",border:`2px solid ${GRAY}`,borderTopColor:GOLD,borderRadius:"50%",display:"inline-block",animation:"spin .8s linear infinite" }}/>{batchProgress}% Screening...</>:`⚡ Screen All Pending (${pStats.pending})`}
              </button>
            </div>
          </div>
          {batchRunning&&<div style={{ height:"3px", background:BORDER }}><div style={{ height:"100%", width:`${batchProgress}%`, background:`linear-gradient(90deg,${GOLD_L},${GOLD_B})`, transition:"width .3s" }}/></div>}
          <div style={{ flex:1, overflow:"auto", padding:"14px 20px" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead><tr style={{ background:"white" }}>{["Name","Type","Category","Country","Added","Last Screen","Status","Action"].map(h=><th key={h} style={{ padding:"9px 12px", textAlign:"left", fontSize:"9px", color:GRAY, letterSpacing:"2px", borderBottom:`1px solid ${BORDER}`, fontWeight:"600", whiteSpace:"nowrap" }}>{h}</th>)}</tr></thead>
              <tbody>
                {parties.map(p=>{ const sc=screening[p.id]; const stConf={pending:{color:GRAY,bg:LIGHT,border:BORDER,label:"Pending"},clear:{color:"#16A34A",bg:"#F0FDF4",border:"#BBF7D0",label:"Clear"},review:{color:GOLD_B,bg:GOLD_LL,border:"#E8D5A3",label:"Review"},blocked:{color:"#DC2626",bg:"#FEF2F2",border:"#FECACA",label:"Blocked"}}; const st=stConf[p.status]||stConf.pending; return (
                  <tr key={p.id} style={{ borderBottom:`1px solid ${BORDER}` }} onMouseEnter={e=>e.currentTarget.style.background=GOLD_LL+"55"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                    <td style={{ padding:"11px 12px", fontSize:"12px", fontWeight:"600", color:DARK }}>{p.name}</td>
                    <td style={{ padding:"11px 12px", fontSize:"11px", color:GRAY }}>{p.type}</td>
                    <td style={{ padding:"11px 12px" }}><span style={{ padding:"2px 8px", borderRadius:"20px", fontSize:"10px", background:GOLD_LL, color:GOLD_B, border:`1px solid ${GOLD}33` }}>{p.category}</span></td>
                    <td style={{ padding:"11px 12px", fontSize:"11px", color:GRAY }}>🌍 {p.country}</td>
                    <td style={{ padding:"11px 12px", fontSize:"10px", color:GRAY, whiteSpace:"nowrap" }}>{p.addedDate}</td>
                    <td style={{ padding:"11px 12px", fontSize:"10px", color:GRAY, whiteSpace:"nowrap" }}>{p.lastScreen==="—"?"Never":p.lastScreen}</td>
                    <td style={{ padding:"11px 12px" }}><span style={{ padding:"2px 8px", borderRadius:"20px", fontSize:"9px", background:st.bg, color:st.color, border:`1px solid ${st.border}`, fontWeight:"600" }}>{st.label}</span></td>
                    <td style={{ padding:"11px 12px" }}>
                      <button onClick={()=>screenParty(p)} disabled={sc?.loading} style={{ padding:"5px 11px", borderRadius:"5px", fontSize:"10px", fontWeight:"600", background:sc?.loading?LIGHT:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`, border:`1px solid ${sc?.loading?BORDER:"transparent"}`, color:sc?.loading?GRAY:"white", cursor:sc?.loading?"not-allowed":"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"4px" }}>
                        {sc?.loading?<><span style={{ width:"9px",height:"9px",border:`1.5px solid ${GRAY}`,borderTopColor:GOLD,borderRadius:"50%",display:"inline-block",animation:"spin .8s linear infinite" }}/>Checking...</>:"🔍 Screen"}
                      </button>
                    </td>
                  </tr>
                ); })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AUDIT TRAIL */}
      {screenTab==="audit"&&(
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          <div style={{ background:"white", borderBottom:`1px solid ${BORDER}`, padding:"12px 20px" }}>
            <div style={{ fontSize:"9px", color:`${GOLD}99`, letterSpacing:"3px", marginBottom:"2px" }}>COMPLIANCE TRAIL</div>
            <div style={{ fontSize:"15px", fontWeight:"800", color:DARK }}>Audit Log — {auditLog.length} records</div>
          </div>
          <div style={{ flex:1, overflow:"auto", padding:"14px 20px" }}>
            {auditLog.length===0?<div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", flexDirection:"column", gap:"10px", opacity:0.4 }}><div style={{ fontSize:"36px" }}>📋</div><div style={{ fontSize:"13px", color:GRAY }}>No audit records yet</div><div style={{ fontSize:"11px", color:GRAY }}>All actions are automatically logged here</div></div>:(
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead><tr>{["Time","Action","Subject","Risk","Detail","Officer"].map(h=><th key={h} style={{ padding:"9px 12px", textAlign:"left", fontSize:"9px", color:GRAY, letterSpacing:"2px", borderBottom:`1px solid ${BORDER}`, fontWeight:"600" }}>{h}</th>)}</tr></thead>
                <tbody>
                  {auditLog.map(a=>(
                    <tr key={a.id} style={{ borderBottom:`1px solid ${BORDER}` }} onMouseEnter={e=>e.currentTarget.style.background=GOLD_LL+"44"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                      <td style={{ padding:"10px 12px", fontSize:"10px", color:GRAY, whiteSpace:"nowrap", fontFamily:"monospace" }}>{a.time}</td>
                      <td style={{ padding:"10px 12px" }}><span style={{ padding:"2px 8px", borderRadius:"4px", fontSize:"9px", background:GOLD_LL, color:GOLD_B, border:`1px solid ${GOLD}33`, fontWeight:"600" }}>{a.action}</span></td>
                      <td style={{ padding:"10px 12px", fontSize:"12px", fontWeight:"600", color:DARK }}>{a.subject}</td>
                      <td style={{ padding:"10px 12px" }}>{a.risk!=="—"&&<span style={{ padding:"2px 7px", borderRadius:"3px", fontSize:"9px", background:RC[a.risk]?.bg||LIGHT, color:RC[a.risk]?.color||GRAY, border:`1px solid ${RC[a.risk]?.border||BORDER}`, fontWeight:"600" }}>{a.risk}</span>}</td>
                      <td style={{ padding:"10px 12px", fontSize:"11px", color:GRAY }}>{a.detail}</td>
                      <td style={{ padding:"10px 12px", fontSize:"11px", color:GRAY }}>{a.user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}

      {/* BULK SCREENING UPLOAD */}
      {screenTab==="bulk-upload"&&(
        <BulkUploadPage addAudit={addAudit}/>
      )}

      {/* BULK SCREENING SEARCH */}
      {screenTab==="bulk-search"&&(
        <BulkSearchPage addAudit={addAudit}/>
      )}
    </div>
  );
}

// ── BULK UPLOAD PAGE ──────────────────────────────────────────────────────────
function BulkUploadPage({ addAudit }) {
  const [file,setFile]=useState(null); const [rows,setRows]=useState([]); const [results,setResults]=useState([]); const [running,setRunning]=useState(false); const [progress,setProgress]=useState(0); const [done,setDone]=useState(false);
  const fileRef=useRef(null);

  const parseFile=(f)=>{ setFile(f);setRows([]);setResults([]);setDone(false);
    const r=new FileReader(); r.onload=e=>{ const lines=e.target.result.split("\n").map(l=>l.trim().replace(/^"|"$/g,"")).filter(l=>l.length>1).slice(0,500); setRows(lines); }; r.readAsText(f); };

  const runBulk=async()=>{ if(!rows.length)return; setRunning(true);setProgress(0);setResults([]);setDone(false);
    const out=[];
    for(let i=0;i<rows.length;i++){
      const name=rows[i];
      try{ const m=await screenLive(name,"both",{}); const risk=m.length===0?"CLEAR":m[0].risk; out.push({name,risk,matches:m,status:risk==="CLEAR"?"✅ Clear":risk==="HIGH"?"🚨 High Risk":"⚠️ Review"}); addAudit("BULK UPLOAD",name,risk,`${m.length} match(es)`);
      }catch{ out.push({name,risk:"ERROR",matches:[],status:"❌ Error"}); }
      setProgress(Math.round(((i+1)/rows.length)*100)); setResults([...out]);
      await new Promise(r=>setTimeout(r,200));
    }
    setRunning(false);setDone(true); };

  const exportCSV=()=>{ const csv=["Name,Risk,Matches,Lists\n",...results.map(r=>`"${r.name}","${r.risk}","${r.matches.length}","${r.matches.flatMap(m=>m.lists||[]).join("|")}"`)].join("\n"); const a=document.createElement("a"); a.href="data:text/csv;charset=utf-8,"+encodeURIComponent(csv); a.download="bulk_results.csv"; document.body.appendChild(a);a.click();document.body.removeChild(a); };

  return (
    <div style={{ flex:1,display:"flex",overflow:"hidden" }}>
      <div style={{ width:"320px",flexShrink:0,borderRight:`1px solid ${BORDER}`,background:"white",padding:"20px",display:"flex",flexDirection:"column",gap:"14px" }}>
        <div><div style={{ fontSize:"9px",color:`${GOLD}99`,letterSpacing:"3px",marginBottom:"4px" }}>BULK SCREENING</div><div style={{ fontSize:"15px",fontWeight:"800",color:DARK }}>Upload File</div><div style={{ fontSize:"11px",color:GRAY,marginTop:"4px" }}>Upload CSV with one name per row. Max 500 names.</div></div>
        <div onClick={()=>fileRef.current?.click()} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();const f=e.dataTransfer.files[0];if(f)parseFile(f);}} style={{ border:`2px dashed ${file?GOLD:BORDER}`,borderRadius:"10px",padding:"28px 16px",textAlign:"center",cursor:"pointer",background:file?GOLD_LL:LIGHT }}>
          <div style={{ fontSize:"28px",marginBottom:"8px" }}>📤</div>
          {file?<><div style={{ fontSize:"12px",fontWeight:"700",color:GOLD_B }}>{file.name}</div><div style={{ fontSize:"10px",color:GRAY,marginTop:"4px" }}>{rows.length} names detected</div></>:<><div style={{ fontSize:"12px",fontWeight:"600",color:GRAY }}>Drop CSV file here</div><div style={{ fontSize:"10px",color:GRAY,marginTop:"4px" }}>or click to browse</div></>}
        </div>
        <input ref={fileRef} type="file" accept=".csv,.txt" onChange={e=>e.target.files[0]&&parseFile(e.target.files[0])} style={{ display:"none" }}/>
        <button onClick={()=>{const csv="Name\nBashar al-Assad\nVladimir Putin\nAl Baraka Exchange\n";const a=document.createElement("a");a.href="data:text/csv;charset=utf-8,"+encodeURIComponent(csv);a.download="template.csv";document.body.appendChild(a);a.click();document.body.removeChild(a);}} style={{ padding:"8px",borderRadius:"7px",background:LIGHT,border:`1px solid ${BORDER}`,color:GRAY,fontSize:"11px",cursor:"pointer",fontFamily:"inherit" }}>📥 Download Template CSV</button>
        <button onClick={runBulk} disabled={running||!rows.length} style={{ padding:"12px",background:running||!rows.length?`${GOLD}44`:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`,border:"none",borderRadius:"8px",color:"white",fontSize:"12px",fontWeight:"700",cursor:running||!rows.length?"not-allowed":"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px" }}>
          {running?<><span style={{ width:"12px",height:"12px",border:"2px solid white",borderTopColor:"transparent",borderRadius:"50%",display:"inline-block",animation:"spin .8s linear infinite" }}/>{progress}% Screening...</>:`🔍 Run Bulk Screening (${rows.length})`}
        </button>
        {running&&<div style={{ height:"4px",background:BORDER,borderRadius:"2px",overflow:"hidden" }}><div style={{ height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${GOLD_L},${GOLD_B})`,transition:"width .3s" }}/></div>}
        {results.length>0&&<div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px" }}>{[{l:"High Risk",v:results.filter(r=>r.risk==="HIGH").length,c:"#DC2626"},{l:"Review",v:results.filter(r=>r.risk==="MEDIUM").length,c:GOLD},{l:"Clear",v:results.filter(r=>r.risk==="CLEAR").length,c:"#16A34A"}].map(s=><div key={s.l} style={{ textAlign:"center",padding:"8px 4px",borderRadius:"7px",background:LIGHT,border:`1px solid ${BORDER}` }}><div style={{ fontSize:"18px",fontWeight:"800",color:s.c }}>{s.v}</div><div style={{ fontSize:"9px",color:GRAY }}>{s.l}</div></div>)}</div>}
        {done&&<button onClick={exportCSV} style={{ padding:"10px",borderRadius:"8px",background:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`,border:"none",color:"white",fontSize:"11px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit" }}>📥 Export Results CSV</button>}
      </div>
      <div style={{ flex:1,overflow:"auto",background:"#F9F7F2",padding:"20px" }}>
        {!results.length&&!running&&<div style={{ display:"flex",alignItems:"center",justifyContent:"center",height:"100%",flexDirection:"column",gap:"12px",opacity:0.4 }}><div style={{ fontSize:"44px" }}>📤</div><div style={{ fontSize:"14px",color:GRAY }}>Upload a file and click Run</div></div>}
        {results.length>0&&<div style={{ maxWidth:"700px" }}>
          <div style={{ fontSize:"9px",color:`${GOLD}99`,letterSpacing:"3px",marginBottom:"12px" }}>RESULTS — {results.length}/{rows.length}</div>
          <div style={{ background:"white",borderRadius:"11px",border:`1px solid ${BORDER}`,overflow:"hidden" }}>
            <table style={{ width:"100%",borderCollapse:"collapse" }}>
              <thead><tr style={{ background:LIGHT }}>{["#","Name","Status","Matches","Lists"].map(h=><th key={h} style={{ padding:"9px 12px",textAlign:"left",fontSize:"9px",color:GRAY,letterSpacing:"2px",borderBottom:`1px solid ${BORDER}`,fontWeight:"600" }}>{h}</th>)}</tr></thead>
              <tbody>{results.map((r,i)=><tr key={i} style={{ borderBottom:`1px solid ${BORDER}` }} onMouseEnter={e=>e.currentTarget.style.background=GOLD_LL+"44"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <td style={{ padding:"10px 12px",fontSize:"11px",color:GRAY }}>{i+1}</td>
                <td style={{ padding:"10px 12px",fontSize:"12px",fontWeight:"600",color:DARK }}>{r.name}</td>
                <td style={{ padding:"10px 12px",fontSize:"12px" }}>{r.status}</td>
                <td style={{ padding:"10px 12px",fontSize:"12px",fontWeight:"700",color:r.matches.length>0?"#DC2626":"#16A34A" }}>{r.matches.length}</td>
                <td style={{ padding:"10px 12px" }}><div style={{ display:"flex",gap:"4px",flexWrap:"wrap" }}>{r.matches.flatMap(m=>m.lists||[]).filter((v,i,a)=>a.indexOf(v)===i).slice(0,3).map(l=><span key={l} style={{ fontSize:"9px",padding:"1px 6px",borderRadius:"3px",background:`${LIST_COLOR(l)}12`,color:LIST_COLOR(l),border:`1px solid ${LIST_COLOR(l)}25`,fontWeight:"600" }}>{l}</span>)}</div></td>
              </tr>)}</tbody>
            </table>
          </div>
        </div>}
      </div>
    </div>
  );
}

// ── BULK SEARCH PAGE ──────────────────────────────────────────────────────────
function BulkSearchPage({ addAudit }) {
  const [text,setText]=useState(""); const [results,setResults]=useState([]); const [running,setRunning]=useState(false); const [progress,setProgress]=useState(0); const [done,setDone]=useState(false);
  const names=text.split("\n").map(n=>n.trim()).filter(n=>n.length>1).slice(0,100);

  const runBulk=async()=>{ if(!names.length)return; setRunning(true);setProgress(0);setResults([]);setDone(false);
    const out=[];
    for(let i=0;i<names.length;i++){
      const name=names[i];
      try{ const m=await screenLive(name,"both",{}); const risk=m.length===0?"CLEAR":m[0].risk; out.push({name,risk,matches:m,status:risk==="CLEAR"?"✅ Clear":risk==="HIGH"?"🚨 High Risk":"⚠️ Review"}); addAudit("BULK SEARCH",name,risk,`${m.length} match(es)`);
      }catch{ out.push({name,risk:"ERROR",matches:[],status:"❌ Error"}); }
      setProgress(Math.round(((i+1)/names.length)*100)); setResults([...out]);
      await new Promise(r=>setTimeout(r,200));
    }
    setRunning(false);setDone(true); };

  const exportCSV=()=>{ const csv=["Name,Risk,Matches\n",...results.map(r=>`"${r.name}","${r.risk}","${r.matches.length}"`)].join("\n"); const a=document.createElement("a"); a.href="data:text/csv;charset=utf-8,"+encodeURIComponent(csv); a.download="bulk_search_results.csv"; document.body.appendChild(a);a.click();document.body.removeChild(a); };

  return (
    <div style={{ flex:1,display:"flex",overflow:"hidden" }}>
      <div style={{ width:"320px",flexShrink:0,borderRight:`1px solid ${BORDER}`,background:"white",padding:"20px",display:"flex",flexDirection:"column",gap:"14px" }}>
        <div><div style={{ fontSize:"9px",color:`${GOLD}99`,letterSpacing:"3px",marginBottom:"4px" }}>BULK SCREENING</div><div style={{ fontSize:"15px",fontWeight:"800",color:DARK }}>Search Multiple Names</div><div style={{ fontSize:"11px",color:GRAY,marginTop:"4px" }}>Type or paste names — one per line. Max 100.</div></div>
        <textarea value={text} onChange={e=>setText(e.target.value)} placeholder={"Bashar al-Assad\nVladimir Putin\nKim Jong Un\n..."} rows={12} style={{ width:"100%",padding:"12px",background:LIGHT,border:`1px solid ${BORDER}`,borderRadius:"8px",fontSize:"12px",color:DARK,outline:"none",fontFamily:"'Inter',sans-serif",resize:"vertical",lineHeight:"1.6" }} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
        <div style={{ fontSize:"10px",color:GRAY }}>{names.length} name{names.length!==1?"s":""} · max 100</div>
        <button onClick={runBulk} disabled={running||!names.length||names.length>100} style={{ padding:"12px",background:running||!names.length?`${GOLD}44`:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`,border:"none",borderRadius:"8px",color:"white",fontSize:"12px",fontWeight:"700",cursor:running||!names.length?"not-allowed":"pointer",fontFamily:"inherit",display:"flex",alignItems:"center",justifyContent:"center",gap:"8px" }}>
          {running?<><span style={{ width:"12px",height:"12px",border:"2px solid white",borderTopColor:"transparent",borderRadius:"50%",display:"inline-block",animation:"spin .8s linear infinite" }}/>{progress}% Screening...</>:`🔍 Screen ${names.length} Names`}
        </button>
        {running&&<div style={{ height:"4px",background:BORDER,borderRadius:"2px",overflow:"hidden" }}><div style={{ height:"100%",width:`${progress}%`,background:`linear-gradient(90deg,${GOLD_L},${GOLD_B})`,transition:"width .3s" }}/></div>}
        {results.length>0&&<div style={{ display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:"6px" }}>{[{l:"High Risk",v:results.filter(r=>r.risk==="HIGH").length,c:"#DC2626"},{l:"Review",v:results.filter(r=>r.risk==="MEDIUM").length,c:GOLD},{l:"Clear",v:results.filter(r=>r.risk==="CLEAR").length,c:"#16A34A"}].map(s=><div key={s.l} style={{ textAlign:"center",padding:"8px 4px",borderRadius:"7px",background:LIGHT,border:`1px solid ${BORDER}` }}><div style={{ fontSize:"18px",fontWeight:"800",color:s.c }}>{s.v}</div><div style={{ fontSize:"9px",color:GRAY }}>{s.l}</div></div>)}</div>}
        {done&&<button onClick={exportCSV} style={{ padding:"10px",borderRadius:"8px",background:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`,border:"none",color:"white",fontSize:"11px",fontWeight:"700",cursor:"pointer",fontFamily:"inherit" }}>📥 Export Results CSV</button>}
      </div>
      <div style={{ flex:1,overflow:"auto",background:"#F9F7F2",padding:"20px" }}>
        {!results.length&&!running&&<div style={{ display:"flex",alignItems:"center",justifyContent:"center",height:"100%",flexDirection:"column",gap:"12px",opacity:0.4 }}><div style={{ fontSize:"44px" }}>🔍</div><div style={{ fontSize:"14px",color:GRAY }}>Enter names and click Screen</div></div>}
        {results.length>0&&<div style={{ maxWidth:"700px" }}>
          <div style={{ fontSize:"9px",color:`${GOLD}99`,letterSpacing:"3px",marginBottom:"12px" }}>RESULTS — {results.length}/{names.length}</div>
          <div style={{ background:"white",borderRadius:"11px",border:`1px solid ${BORDER}`,overflow:"hidden" }}>
            <table style={{ width:"100%",borderCollapse:"collapse" }}>
              <thead><tr style={{ background:LIGHT }}>{["#","Name","Status","Matches","Lists"].map(h=><th key={h} style={{ padding:"9px 12px",textAlign:"left",fontSize:"9px",color:GRAY,letterSpacing:"2px",borderBottom:`1px solid ${BORDER}`,fontWeight:"600" }}>{h}</th>)}</tr></thead>
              <tbody>{results.map((r,i)=><tr key={i} style={{ borderBottom:`1px solid ${BORDER}` }} onMouseEnter={e=>e.currentTarget.style.background=GOLD_LL+"44"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <td style={{ padding:"10px 12px",fontSize:"11px",color:GRAY }}>{i+1}</td>
                <td style={{ padding:"10px 12px",fontSize:"12px",fontWeight:"600",color:DARK }}>{r.name}</td>
                <td style={{ padding:"10px 12px",fontSize:"12px" }}>{r.status}</td>
                <td style={{ padding:"10px 12px",fontSize:"12px",fontWeight:"700",color:r.matches.length>0?"#DC2626":"#16A34A" }}>{r.matches.length}</td>
                <td style={{ padding:"10px 12px" }}><div style={{ display:"flex",gap:"4px",flexWrap:"wrap" }}>{r.matches.flatMap(m=>m.lists||[]).filter((v,i,a)=>a.indexOf(v)===i).slice(0,3).map(l=><span key={l} style={{ fontSize:"9px",padding:"1px 6px",borderRadius:"3px",background:`${LIST_COLOR(l)}12`,color:LIST_COLOR(l),border:`1px solid ${LIST_COLOR(l)}25`,fontWeight:"600" }}>{l}</span>)}</div></td>
              </tr>)}</tbody>
            </table>
          </div>
        </div>}
      </div>
    </div>
  );
}

function RPSPage() {
  const [expandedDesc,setExpandedDesc]=useState(null); const [lastChanged,setLastChanged]=useState(null); const [exporting,setExporting]=useState(false); const [search,setSearch]=useState(""); const [filterSource,setFilterSource]=useState("ALL"); const [filterStatus,setFilterStatus]=useState("ALL");
  const init={}; RPS_SOURCES.forEach(s=>s.lists.forEach(l=>{ init[l.id]=true; }));
  const [active,setActive]=useState(init);

  const toggle=id=>{ setActive(a=>({...a,[id]:!a[id]})); setLastChanged(id); setTimeout(()=>setLastChanged(null),2000); };
  const toggleAll=(sid,val)=>{ const src=RPS_SOURCES.find(s=>s.id===sid); if(!src)return; const upd={}; src.lists.forEach(l=>{upd[l.id]=val;}); setActive(a=>({...a,...upd})); };

  const exportCSV=async()=>{ setExporting(true); await new Promise(r=>setTimeout(r,600));
    const rows=[["Source","List Name","Abbr","Entries","Updated","Critical","Status","Description"]];
    RPS_SOURCES.forEach(s=>s.lists.forEach(l=>{ rows.push([s.name,l.name,l.abbr,l.entries?l.entries.toLocaleString():"Real-time",l.updated,l.critical?"Yes":"No",active[l.id]?"Active":"Inactive",l.fullDesc]); }));
    const csv=rows.map(r=>r.map(c=>`"${String(c).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob=new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"});
    const url=URL.createObjectURL(blob); const a=document.createElement("a"); a.href=url; a.download=`Veriscan_RPS_${new Date().toISOString().slice(0,10)}.csv`; document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
    setExporting(false); };

  const totalActive=Object.values(active).filter(Boolean).length; const totalLists=Object.values(active).length;
  const allLists=RPS_SOURCES.flatMap(s=>s.lists.map(l=>({...l,sourceId:s.id,sourceName:s.name,sourceFlag:s.flag,sourceColor:s.color})));
  const filtered=allLists.filter(l=>{ const q=search.toLowerCase(); return (l.name.toLowerCase().includes(q)||l.abbr.toLowerCase().includes(q))&&(filterSource==="ALL"||l.sourceId===filterSource)&&(filterStatus==="ALL"||(filterStatus==="active"?active[l.id]:!active[l.id])); });
  const isFiltered=search||filterSource!=="ALL"||filterStatus!=="ALL";

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      <div style={{ background:"white", borderBottom:`1px solid ${BORDER}`, padding:"14px 24px" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"12px" }}>
          <div>
            <div style={{ fontSize:"9px", color:`${GOLD}99`, letterSpacing:"3px", marginBottom:"2px" }}>RESTRICTED PARTY SCREENING</div>
            <div style={{ fontSize:"16px", fontWeight:"800", color:DARK }}>RPS Lists Management</div>
          </div>
          <div style={{ display:"flex", gap:"7px" }}>
            <button onClick={exportCSV} disabled={exporting} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"8px 14px", background:exporting?LIGHT:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`, border:`1px solid ${exporting?BORDER:"transparent"}`, borderRadius:"7px", color:exporting?GRAY:"white", fontSize:"11px", fontWeight:"600", cursor:exporting?"not-allowed":"pointer", fontFamily:"inherit" }}>
              {exporting?<><span style={{ width:"11px",height:"11px",border:`2px solid ${GRAY}`,borderTopColor:GOLD,borderRadius:"50%",display:"inline-block",animation:"spin .8s linear infinite" }}/>Exporting...</>:"📥 Export Excel"}
            </button>
            <button onClick={()=>{const u={};RPS_SOURCES.forEach(s=>s.lists.forEach(l=>{u[l.id]=true;}));setActive(u);}} style={{ padding:"8px 12px", borderRadius:"7px", fontSize:"11px", background:GOLD_LL, border:`1px solid ${GOLD}33`, color:GOLD_B, cursor:"pointer", fontFamily:"inherit", fontWeight:"600" }}>Enable All</button>
          </div>
        </div>
        <div style={{ display:"flex", gap:"7px", flexWrap:"wrap", alignItems:"center", marginBottom:"10px" }}>
          {[{label:"Total",v:totalLists,c:GOLD},{label:"Active",v:totalActive,c:"#16A34A"},{label:"Inactive",v:totalLists-totalActive,c:GRAY}].map(s=>(
            <div key={s.label} style={{ padding:"6px 12px", borderRadius:"7px", background:LIGHT, border:`1px solid ${BORDER}`, textAlign:"center" }}><div style={{ fontSize:"15px", fontWeight:"800", color:s.c }}>{s.v}</div><div style={{ fontSize:"9px", color:GRAY }}>{s.label}</div></div>
          ))}
        </div>
        <div style={{ display:"flex", gap:"6px", flexWrap:"wrap", alignItems:"center" }}>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍 Search lists..." style={{ width:"160px", padding:"6px 11px", background:LIGHT, border:`1px solid ${BORDER}`, borderRadius:"7px", fontSize:"12px", color:DARK, outline:"none", fontFamily:"inherit" }} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
          {["ALL",...RPS_SOURCES.map(s=>s.id)].map(id=>{ const src=RPS_SOURCES.find(s=>s.id===id); return <button key={id} onClick={()=>setFilterSource(id)} style={{ padding:"5px 9px", borderRadius:"20px", fontSize:"10px", cursor:"pointer", fontFamily:"inherit", background:filterSource===id?GOLD_LL:"white", border:`1px solid ${filterSource===id?GOLD+"44":BORDER}`, color:filterSource===id?GOLD_B:GRAY, fontWeight:filterSource===id?"600":"400" }}>{src?`${src.flag} ${src.name.split("—")[0].trim()}`:"All"}</button>; })}
          {[["ALL","All"],["active","✓ Active"],["inactive","✗ Inactive"]].map(([v,l])=><button key={v} onClick={()=>setFilterStatus(v)} style={{ padding:"5px 9px", borderRadius:"20px", fontSize:"10px", cursor:"pointer", fontFamily:"inherit", background:filterStatus===v?GOLD_LL:"white", border:`1px solid ${filterStatus===v?GOLD+"44":BORDER}`, color:filterStatus===v?GOLD_B:GRAY, fontWeight:filterStatus===v?"600":"400" }}>{l}</button>)}
        </div>
      </div>

      <div style={{ flex:1, overflow:"auto", padding:"16px 24px" }}>
        {(isFiltered?[{id:"_s",name:"Results",flag:"🔍",color:GOLD,description:"",lists:filtered}]:RPS_SOURCES).map(src=>{
          const srcLists=isFiltered?filtered:src.lists; const srcActive=srcLists.filter(l=>active[l.id]).length;
          return (
            <div key={src.id} style={{ background:"white", borderRadius:"11px", border:`1px solid ${BORDER}`, marginBottom:"12px", overflow:"hidden", boxShadow:"0 2px 6px rgba(0,0,0,0.04)" }}>
              {!isFiltered&&<div style={{ padding:"11px 16px", background:LIGHT, borderBottom:`1px solid ${BORDER}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <div style={{ width:"30px", height:"30px", borderRadius:"7px", background:`${src.color}12`, border:`1px solid ${src.color}22`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px" }}>{src.flag}</div>
                  <div><div style={{ fontSize:"13px", fontWeight:"800", color:DARK }}>{src.name}</div><div style={{ fontSize:"10px", color:GRAY, maxWidth:"480px" }}>{src.description}</div></div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:"7px", flexShrink:0 }}>
                  <span style={{ padding:"2px 9px", borderRadius:"20px", fontSize:"9px", background:"#F0FDF4", border:"1px solid #BBF7D0", color:"#16A34A", fontWeight:"600" }}>✓ {srcActive}/{srcLists.length}</span>
                  <button onClick={()=>toggleAll(src.id,true)}  style={{ padding:"3px 9px", borderRadius:"5px", fontSize:"10px", background:GOLD_LL, border:`1px solid ${GOLD}33`, color:GOLD_B, cursor:"pointer", fontFamily:"inherit", fontWeight:"600" }}>All On</button>
                  <button onClick={()=>toggleAll(src.id,false)} style={{ padding:"3px 9px", borderRadius:"5px", fontSize:"10px", background:"white", border:`1px solid ${BORDER}`, color:GRAY, cursor:"pointer", fontFamily:"inherit" }}>All Off</button>
                </div>
              </div>}
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead><tr style={{ background:"#FDFCF8" }}>{["List Name","Abbr","Entries","Updated","Critical","Status","Info","Toggle"].map(h=><th key={h} style={{ padding:"7px 12px", textAlign:"left", fontSize:"9px", color:GRAY, letterSpacing:"1.5px", borderBottom:`1px solid ${BORDER}`, fontWeight:"600", whiteSpace:"nowrap" }}>{h}</th>)}</tr></thead>
                <tbody>
                  {srcLists.map((l,i)=>{ const lColor=isFiltered?(l.sourceColor||GOLD):src.color; return (
                    <>
                      <tr key={l.id} style={{ borderBottom:expandedDesc===l.id?"none":i<srcLists.length-1?`1px solid ${BORDER}`:"none" }} onMouseEnter={e=>e.currentTarget.style.background=GOLD_LL+"44"} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <td style={{ padding:"10px 12px", fontSize:"12px", fontWeight:"600", color:active[l.id]?DARK:"#9CA3AF" }}>{l.name}</td>
                        <td style={{ padding:"10px 12px" }}><span style={{ padding:"2px 7px", borderRadius:"3px", fontSize:"9px", fontWeight:"700", background:`${lColor}12`, color:active[l.id]?lColor:"#9CA3AF", border:`1px solid ${lColor}22` }}>{l.abbr}</span></td>
                        <td style={{ padding:"10px 12px", fontSize:"11px", fontWeight:"600", color:active[l.id]?DARK:"#9CA3AF" }}>{l.entries?l.entries.toLocaleString():"Real-time"}</td>
                        <td style={{ padding:"10px 12px" }}><span style={{ display:"flex", alignItems:"center", gap:"4px", fontSize:"10px", color:GRAY }}><span style={{ width:"5px",height:"5px",borderRadius:"50%",background:l.updated==="Daily"||l.updated==="Real-time"?"#16A34A":l.updated==="Weekly"?GOLD:"#9CA3AF",flexShrink:0 }}/>{l.updated}</span></td>
                        <td style={{ padding:"10px 12px" }}><div style={{ display:"flex", alignItems:"center", gap:"4px" }}><Check ok={l.critical}/><span style={{ fontSize:"10px", color:l.critical?"#16A34A":"#9CA3AF" }}>{l.critical?"Yes":"No"}</span></div></td>
                        <td style={{ padding:"10px 12px" }}><div style={{ display:"flex", alignItems:"center", gap:"5px" }}><div style={{ width:"6px",height:"6px",borderRadius:"50%",background:active[l.id]?"#16A34A":"#D1D5DB",transition:"background .25s" }}/><span style={{ fontSize:"10px",fontWeight:"600",color:active[l.id]?"#16A34A":"#9CA3AF" }}>{active[l.id]?"Active":"Inactive"}</span></div></td>
                        <td style={{ padding:"10px 12px" }}><button onClick={()=>setExpandedDesc(expandedDesc===l.id?null:l.id)} style={{ width:"22px",height:"22px",borderRadius:"50%",background:expandedDesc===l.id?GOLD_LL:"#F3F4F6",border:`1px solid ${expandedDesc===l.id?GOLD+"44":BORDER}`,color:expandedDesc===l.id?GOLD_B:GRAY,cursor:"pointer",fontSize:"10px",fontWeight:"700",display:"flex",alignItems:"center",justifyContent:"center" }}>ℹ</button></td>
                        <td style={{ padding:"10px 12px" }}><div style={{ display:"flex", alignItems:"center", gap:"7px" }}><Toggle active={active[l.id]} onChange={()=>toggle(l.id)}/>{lastChanged===l.id&&<span style={{ fontSize:"9px",color:"#16A34A",fontWeight:"600" }}>✓</span>}</div></td>
                      </tr>
                      {expandedDesc===l.id&&<tr key={l.id+"_d"} style={{ borderBottom:i<srcLists.length-1?`1px solid ${BORDER}`:"none" }}><td colSpan={8} style={{ padding:"0 12px 12px 40px", background:GOLD_LL+"33" }}><div style={{ padding:"12px 14px", borderRadius:"7px", background:"white", border:`1px solid ${GOLD}22`, fontSize:"11px", color:"#374151", lineHeight:"1.85" }}><div style={{ fontSize:"8px", color:GOLD_B, letterSpacing:"2px", fontWeight:"700", marginBottom:"5px" }}>ABOUT THIS LIST</div>{l.fullDesc}</div></td></tr>}
                    </>
                  ); })}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── COUNTRY RISK PAGE ─────────────────────────────────────────────────────────
function CountryRiskPage() {
  const [search,setSearch]=useState(""); const [filterRisk,setFilterRisk]=useState("ALL"); const [filterRegion,setFilterRegion]=useState("ALL"); const [selected,setSelected]=useState(null); const [detailTab,setDetailTab]=useState("overview"); const [aiText,setAiText]=useState(""); const [aiLoading,setAiLoading]=useState(false);
  const regions=["ALL",...new Set(COUNTRIES.map(c=>c.region))];
  const filtered=COUNTRIES.filter(c=>(c.name.toLowerCase().includes(search.toLowerCase())||c.code.toLowerCase().includes(search.toLowerCase()))&&(filterRisk==="ALL"||c.risk===filterRisk)&&(filterRegion==="ALL"||c.region===filterRegion));
  const stats={ critical:COUNTRIES.filter(c=>c.risk==="CRITICAL").length, high:COUNTRIES.filter(c=>c.risk==="HIGH").length, medium:COUNTRIES.filter(c=>c.risk==="MEDIUM").length, low:COUNTRIES.filter(c=>c.risk==="LOW").length };
  const selectCountry=async c=>{ setSelected(c);setDetailTab("overview");setAiText("");setAiLoading(true);
    const ai=await callAI(`Country risk for ${c.name}: Risk=${c.risk}, Score=${c.score}/100, CPI=${c.cpi}/100, FATF=${c.fatf}, AML=${c.aml}, Listed=${c.listedCount}, Sanctions from: ${c.sanctionBodies.join(",")}. Focus on compliance risks and recommended due diligence level.`,"You are a senior compliance analyst. Concise country risk assessment for compliance officers. Plain text only. Max 110 words. Include key risks and recommended action.");
    setAiText(ai);setAiLoading(false); };

  return (
    <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
      {/* Left */}
      <div style={{ width:"320px", flexShrink:0, borderRight:`1px solid ${BORDER}`, display:"flex", flexDirection:"column", background:"white" }}>
        <div style={{ padding:"14px 14px 0", flexShrink:0 }}>
          <div style={{ fontSize:"9px", color:`${GOLD}99`, letterSpacing:"3px", marginBottom:"3px" }}>RISK INTELLIGENCE</div>
          <div style={{ fontSize:"15px", fontWeight:"800", color:DARK, marginBottom:"11px" }}>Country Risk Assessment</div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:"5px", marginBottom:"10px" }}>
            {[{label:"Critical",key:"CRITICAL",count:stats.critical,color:"#DC2626",bg:"#FEF2F2",border:"#FECACA"},{label:"High",key:"HIGH",count:stats.high,color:"#EA580C",bg:"#FFF7ED",border:"#FED7AA"},{label:"Medium",key:"MEDIUM",count:stats.medium,color:GOLD,bg:GOLD_LL,border:"#E8D5A3"},{label:"Low",key:"LOW",count:stats.low,color:"#16A34A",bg:"#F0FDF4",border:"#BBF7D0"}].map(s=>(
              <div key={s.key} onClick={()=>setFilterRisk(filterRisk===s.key?"ALL":s.key)} style={{ padding:"7px 4px", borderRadius:"7px", textAlign:"center", cursor:"pointer", background:filterRisk===s.key?s.bg:"white", border:`1px solid ${filterRisk===s.key?s.border:BORDER}`, transition:"all .2s" }}>
                <div style={{ fontSize:"16px", fontWeight:"800", color:s.color }}>{s.count}</div>
                <div style={{ fontSize:"8px", color:GRAY }}>{s.label}</div>
              </div>
            ))}
          </div>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search..." style={{ width:"100%", padding:"8px 11px", background:LIGHT, border:`1px solid ${BORDER}`, borderRadius:"7px", fontSize:"12px", color:DARK, outline:"none", fontFamily:"inherit", marginBottom:"7px" }} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
          <div style={{ display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"8px" }}>{regions.map(r=><button key={r} onClick={()=>setFilterRegion(r)} style={{ padding:"3px 7px", borderRadius:"20px", fontSize:"9px", cursor:"pointer", fontFamily:"inherit", background:filterRegion===r?GOLD_LL:"white", border:`1px solid ${filterRegion===r?GOLD+"44":BORDER}`, color:filterRegion===r?GOLD_B:GRAY }}>{r==="ALL"?"All":r}</button>)}</div>
          <div style={{ fontSize:"9px", color:GRAY, marginBottom:"7px" }}>{filtered.length} countries</div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"0 10px 10px" }}>
          {filtered.map(c=>{ const rc=RC[c.risk]; const isSel=selected?.code===c.code; return (
            <div key={c.code} onClick={()=>selectCountry(c)} style={{ display:"flex", alignItems:"center", gap:"9px", padding:"9px", borderRadius:"7px", marginBottom:"4px", cursor:"pointer", background:isSel?GOLD_LL:"white", border:`1px solid ${isSel?GOLD+"44":"#F3F4F6"}`, transition:"all .15s" }} onMouseEnter={e=>{ if(!isSel)e.currentTarget.style.background="#FAFAFA"; }} onMouseLeave={e=>{ if(!isSel)e.currentTarget.style.background="white"; }}>
              <span style={{ fontSize:"18px", flexShrink:0 }}>{c.flag}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:"12px", fontWeight:"600", color:DARK }}>{c.name}</div>
                <div style={{ fontSize:"9px", color:GRAY }}>CPI: {c.cpi} · {c.listedCount} listed</div>
              </div>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontSize:"13px", fontWeight:"800", color:rc.color }}>{c.score}</div>
                <div style={{ fontSize:"8px", padding:"1px 5px", borderRadius:"3px", background:rc.bg, color:rc.color, border:`1px solid ${rc.border}` }}>{rc.label}</div>
              </div>
            </div>
          ); })}
        </div>
      </div>

      {/* Right */}
      <div style={{ flex:1, overflow:"auto", background:"#F9F7F2", padding:"18px" }}>
        {!selected?<div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:"100%", flexDirection:"column", gap:"12px", opacity:0.4 }}><div style={{ fontSize:"44px" }}>🌍</div><div style={{ fontSize:"13px", color:GRAY }}>Select a country to view full risk profile</div></div>:(
          <div style={{ maxWidth:"720px" }}>
            {/* Header card */}
            <div style={{ background:"white", borderRadius:"11px", padding:"18px", marginBottom:"12px", border:`1px solid ${BORDER}` }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"12px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
                  <span style={{ fontSize:"44px" }}>{selected.flag}</span>
                  <div><div style={{ fontSize:"9px", color:`${GOLD}99`, letterSpacing:"3px", marginBottom:"2px" }}>COUNTRY RISK PROFILE</div><h2 style={{ fontSize:"20px", fontWeight:"800", color:DARK, marginBottom:"2px" }}>{selected.name}</h2><div style={{ fontSize:"10px", color:GRAY }}>{selected.region} · {selected.code}</div></div>
                </div>
                <div style={{ textAlign:"right" }}><div style={{ fontSize:"38px", fontWeight:"900", color:RC[selected.risk].color, lineHeight:1 }}>{selected.score}</div><div style={{ fontSize:"9px", color:GRAY }}>RISK /100</div></div>
              </div>
              <div style={{ height:"5px", background:"#F3F4F6", borderRadius:"3px", overflow:"hidden", marginBottom:"12px" }}><div style={{ height:"100%", width:`${selected.score}%`, background:`linear-gradient(90deg,${RC[selected.risk].color}88,${RC[selected.risk].color})`, borderRadius:"3px" }}/></div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(5,1fr)", gap:"7px" }}>
                {[{label:"Risk Level",value:RC[selected.risk].label,color:RC[selected.risk].color,bg:RC[selected.risk].bg},{label:"FATF",value:selected.fatf,color:selected.fatf==="Blacklist"?"#DC2626":selected.fatf==="Greylist"?GOLD:"#16A34A",bg:selected.fatf==="Blacklist"?"#FEF2F2":selected.fatf==="Greylist"?GOLD_LL:"#F0FDF4"},{label:"AML Risk",value:selected.aml,color:selected.aml==="High"?"#DC2626":selected.aml==="Medium"?GOLD:"#16A34A",bg:LIGHT},{label:`CPI ${selected.cpi}/100`,value:CPI_LABEL(selected.cpi),color:CPI_COLOR(selected.cpi),bg:LIGHT},{label:"Listed Parties",value:selected.listedCount.toLocaleString(),color:selected.listedCount>100?"#DC2626":selected.listedCount>10?GOLD:"#16A34A",bg:LIGHT}].map(d=>(
                  <div key={d.label} style={{ padding:"9px 7px", borderRadius:"7px", background:d.bg, border:`1px solid ${BORDER}`, textAlign:"center" }}><div style={{ fontSize:"12px", fontWeight:"800", color:d.color }}>{d.value}</div><div style={{ fontSize:"8px", color:GRAY, marginTop:"1px" }}>{d.label}</div></div>
                ))}
              </div>
            </div>

            {/* Detail tabs */}
            <div style={{ display:"flex", gap:"1px", background:"white", borderRadius:"9px 9px 0 0", border:`1px solid ${BORDER}`, borderBottom:"none", padding:"0 4px" }}>
              {[{id:"overview",l:"📊 Overview"},{id:"sanctions",l:"🚫 Sanctions"},{id:"prohibitions",l:"⛔ Prohibitions"},{id:"embargo",l:"⚔️ Embargo"},{id:"ai",l:"🤖 AI Analysis"}].map(t=>(
                <button key={t.id} onClick={()=>setDetailTab(t.id)} style={{ padding:"10px 13px", background:"none", border:"none", borderBottom:detailTab===t.id?`2px solid ${GOLD}`:"2px solid transparent", color:detailTab===t.id?GOLD_B:GRAY, fontSize:"11px", fontWeight:detailTab===t.id?"700":"400", cursor:"pointer", fontFamily:"inherit", transition:"all .2s", marginBottom:"-1px" }}>{t.l}</button>
              ))}
            </div>

            <div style={{ background:"white", borderRadius:"0 0 11px 11px", border:`1px solid ${BORDER}`, borderTop:"none", padding:"18px", marginBottom:"12px" }}>
              {detailTab==="overview"&&<div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"10px" }}>
                {[{label:"Corruption Perceptions Index (CPI)",value:`${selected.cpi}/100 — ${CPI_LABEL(selected.cpi)}`,color:CPI_COLOR(selected.cpi),bar:selected.cpi,note:"Source: Transparency International 2024"},{label:"Listed Parties in Global Databases",value:`${selected.listedCount.toLocaleString()} individuals & entities`,color:selected.listedCount>100?"#DC2626":selected.listedCount>10?GOLD:"#16A34A",note:"Across OFAC, UN, EU, UK OFSI & other lists"},{label:"Political Stability",value:selected.stability,color:selected.stability.includes("Very High")||selected.stability==="High"?"#16A34A":selected.stability==="Medium"?GOLD:"#DC2626",note:""},{label:"Active Sanction Regimes",value:selected.sanctionBodies[0]?.includes("N/A")?"None":selected.sanctionBodies.length+" bodies",color:selected.sanctionBodies[0]?.includes("N/A")?"#16A34A":selected.sanctionBodies.length>3?"#DC2626":GOLD,note:""}].map(d=>(
                  <div key={d.label} style={{ padding:"13px", borderRadius:"8px", background:LIGHT, border:`1px solid ${BORDER}` }}>
                    <div style={{ fontSize:"9px", color:GRAY, letterSpacing:"1.5px", marginBottom:"6px" }}>{d.label.toUpperCase()}</div>
                    <div style={{ fontSize:"13px", fontWeight:"700", color:d.color, marginBottom:"4px" }}>{d.value}</div>
                    {d.bar!==undefined&&<div style={{ height:"3px", background:"#E5E7EB", borderRadius:"2px", overflow:"hidden", marginBottom:"4px" }}><div style={{ height:"100%", width:`${d.bar}%`, background:d.color, borderRadius:"2px" }}/></div>}
                    {d.note&&<div style={{ fontSize:"9px", color:GRAY }}>{d.note}</div>}
                  </div>
                ))}
              </div>}

              {detailTab==="sanctions"&&<div>
                <div style={{ fontSize:"11px", color:GRAY, marginBottom:"12px" }}>Bodies with active sanctions against {selected.name}:</div>
                {selected.sanctionBodies[0]?.includes("N/A")?<div style={{ padding:"18px", borderRadius:"8px", background:"#F0FDF4", border:"1px solid #BBF7D0", color:"#16A34A", fontSize:"12px", fontWeight:"600", textAlign:"center" }}>✅ No active international sanctions</div>:(
                  <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
                    {selected.sanctionBodies.map((b,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"11px 13px", borderRadius:"7px", background:LIGHT, border:`1px solid ${BORDER}` }}><div style={{ width:"7px",height:"7px",borderRadius:"50%",background:"#DC2626",flexShrink:0 }}/><span style={{ fontSize:"12px",fontWeight:"600",color:DARK }}>{b}</span></div>)}
                  </div>
                )}
              </div>}

              {detailTab==="prohibitions"&&<div>
                <div style={{ fontSize:"11px", color:GRAY, marginBottom:"12px" }}>{selected.name} is prohibited from — by category:</div>
                <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                  {selected.prohibitions.map((p,i)=>(
                    <div key={i} style={{ borderRadius:"9px", background:LIGHT, border:`1px solid ${BORDER}`, overflow:"hidden" }}>
                      <div style={{ padding:"9px 13px", background:GOLD_LL, borderBottom:`1px solid ${BORDER}`, display:"flex", alignItems:"center", gap:"7px" }}><span style={{ fontSize:"15px" }}>{p.icon}</span><span style={{ fontSize:"11px",fontWeight:"700",color:GOLD_B }}>{p.cat}</span></div>
                      <div style={{ padding:"11px 13px" }}>{p.items.map((item,j)=><div key={j} style={{ display:"flex", alignItems:"flex-start", gap:"7px", marginBottom:j<p.items.length-1?"7px":"0" }}><span style={{ color:"#DC2626",fontSize:"11px",marginTop:"1px",flexShrink:0 }}>🚫</span><span style={{ fontSize:"11px",color:"#374151",lineHeight:"1.5" }}>{item}</span></div>)}</div>
                    </div>
                  ))}
                </div>
              </div>}

              {detailTab==="embargo"&&<div>
                <div style={{ fontSize:"11px", color:GRAY, marginBottom:"12px" }}>Active embargoes on {selected.name}:</div>
                {selected.embargo.length===1&&selected.embargo[0].includes("No active")?<div style={{ padding:"18px", borderRadius:"8px", background:"#F0FDF4", border:"1px solid #BBF7D0", color:"#16A34A", fontSize:"12px", fontWeight:"600", textAlign:"center" }}>✅ No active embargoes</div>:(
                  <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
                    {selected.embargo.map((e,i)=><div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px 14px", borderRadius:"7px", background:"#FEF2F2", border:"1px solid #FECACA" }}><span style={{ fontSize:"14px",flexShrink:0 }}>⚔️</span><span style={{ fontSize:"12px",color:"#374151",lineHeight:"1.4" }}>{e}</span></div>)}
                  </div>
                )}
              </div>}

              {detailTab==="ai"&&<div>
                <div style={{ display:"flex", alignItems:"center", gap:"7px", marginBottom:"10px" }}><FP size={16} color={GOLD}/><span style={{ fontSize:"9px",color:GOLD_B,letterSpacing:"2px",fontWeight:"700" }}>AI COMPLIANCE ANALYST</span>{aiLoading&&<span style={{ fontSize:"9px",color:GRAY }}>analyzing...</span>}</div>
                {aiLoading?<div style={{ height:"80px", background:LIGHT, borderRadius:"7px" }}/>:<p style={{ fontSize:"12px",color:"#374151",lineHeight:"1.85" }}>{aiText||"Loading..."}</p>}
                {!aiLoading&&aiText&&<div style={{ marginTop:"12px", padding:"11px 14px", borderRadius:"8px", background:RC[selected.risk].bg, border:`1px solid ${RC[selected.risk].border}`, display:"flex", alignItems:"center", gap:"10px" }}><span style={{ fontSize:"16px" }}>{selected.risk==="LOW"?"✅":selected.risk==="MEDIUM"?"⚠️":"🚫"}</span><div><div style={{ fontSize:"11px",fontWeight:"700",color:RC[selected.risk].color }}>{selected.risk==="LOW"?"STANDARD DUE DILIGENCE":selected.risk==="MEDIUM"?"ENHANCED DUE DILIGENCE REQUIRED":"HIGH ALERT — ESCALATE TO COMPLIANCE OFFICER"}</div><div style={{ fontSize:"9px",color:GRAY,marginTop:"1px" }}>Recommended action based on full risk profile</div></div></div>}
              </div>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── COMING SOON ───────────────────────────────────────────────────────────────
function ComingSoon({ icon, label }) {
  return <div style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:"12px", background:"#F9F7F2" }}><div style={{ width:"72px",height:"72px",borderRadius:"18px",background:GOLD_LL,border:`1px solid ${GOLD}33`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"32px" }}>{icon}</div><div style={{ fontSize:"16px",fontWeight:"700",color:DARK }}>{label}</div><div style={{ fontSize:"12px",color:GRAY }}>Coming soon — under development</div></div>;
}

// ── DASHBOARD (main shell after login) ────────────────────────────────────────
function Dashboard({ user, onLogout }) {
  const [activeTab,setActiveTab]=useState("screening");
  return (
    <div style={{ minHeight:"100vh", background:LIGHT, display:"flex", flexDirection:"column", fontFamily:"'Inter','Segoe UI',sans-serif", color:DARK }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        input::placeholder{color:#C4B89A}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#F5F5F0}::-webkit-scrollbar-thumb{background:#E8D5A3;border-radius:2px}
      `}</style>
      <div style={{ height:"2px", background:`linear-gradient(90deg,transparent,${GOLD},transparent)` }}/>
      <InnerNav activeTab={activeTab} setActiveTab={setActiveTab} user={user} onLogout={onLogout}/>
      {activeTab==="screening"&&<ScreeningPage/>}
      {activeTab==="rps"&&<RPSPage/>}
      {activeTab==="countries"&&<CountryRiskPage/>}
      {activeTab==="kyc"&&<ComingSoon icon="👤" label="KYC"/>}
      {activeTab==="vessels"&&<ComingSoon icon="🚢" label="Vessel Screening"/>}
      {activeTab==="products"&&<ComingSoon icon="📦" label="Products Review"/>}
      {activeTab==="settings"&&<SettingsPage user={user}/>}
    </div>
  );
}

// ── SETTINGS PAGE ─────────────────────────────────────────────────────────────
function SettingsPage({ user }) {
  const isAdmin = user?.role === "Admin";
  const [settingsTab, setSettingsTab] = useState("whitelist");

  // Whitelist
  const [whitelist, setWhitelist]   = useState(["John Smith & Sons Ltd","Al Farsi General Trading","Gulf Bridge Logistics"]);
  const [wlInput, setWlInput]       = useState("");

  // Warning words
  const [warnings, setWarnings]     = useState(["arms","weapons","nuclear","terrorist","militia","smuggling","laundering"]);
  const [warnInput, setWarnInput]   = useState("");

  // Hot words (auto-flag)
  const [hotwords, setHotwords]     = useState(["OFAC","SDN","sanctioned","blacklisted","designated","Hezbollah","Hamas","ISIS","Al-Qaeda","Taliban"]);
  const [hotInput, setHotInput]     = useState("");

  // Users
  const [users, setUsers] = useState([
    { id:"1", name:"Ahmed Al Mansouri", email:"admin@veriscan.io",   role:"Admin",              active:true,  lastLogin:"22 Apr 2026, 20:00" },
    { id:"2", name:"Sara Al Rashidi",   email:"officer@veriscan.io", role:"Compliance Officer", active:true,  lastLogin:"22 Apr 2026, 18:30" },
    { id:"3", name:"Khalid Ibrahim",    email:"viewer@veriscan.io",  role:"Viewer",             active:true,  lastLogin:"21 Apr 2026, 09:15" },
    { id:"4", name:"Layla Hassan",      email:"layla@veriscan.io",   role:"Compliance Officer", active:false, lastLogin:"10 Apr 2026, 14:00" },
  ]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser]         = useState({ name:"", email:"", role:"Viewer" });

  const addTag  = (list, setList, input, setInput) => { if(input.trim()&&!list.includes(input.trim())){ setList([...list,input.trim()]); setInput(""); } };
  const removeTag = (list, setList, val) => setList(list.filter(x=>x!==val));
  const toggleUser = (id) => setUsers(us=>us.map(u=>u.id===id?{...u,active:!u.active}:u));
  const addUser = () => {
    if(!newUser.name||!newUser.email)return;
    setUsers(us=>[...us,{id:Date.now()+"",name:newUser.name,email:newUser.email,role:newUser.role,active:true,lastLogin:"Never"}]);
    setNewUser({name:"",email:"",role:"Viewer"}); setShowAddUser(false);
  };

  const STABS = [
    { id:"whitelist", icon:"✅", label:"Whitelist" },
    { id:"warnings",  icon:"⚠️", label:"Warning Words" },
    { id:"hotwords",  icon:"🔥", label:"Hot Words" },
    { id:"users",     icon:"👥", label:"User Management" },
  ];

  const tagStyle = (color="#16A34A") => ({
    display:"inline-flex", alignItems:"center", gap:"5px",
    padding:"4px 10px", borderRadius:"20px", fontSize:"11px",
    background:`${color}12`, border:`1px solid ${color}30`, color:color,
    fontWeight:"600",
  });

  const inputStyle = { width:"100%", padding:"9px 12px", background:LIGHT, border:`1px solid ${BORDER}`, borderRadius:"7px", fontSize:"12px", color:DARK, outline:"none", fontFamily:"inherit" };
  const labelStyle = { fontSize:"9px", color:GRAY, letterSpacing:"2px", display:"block", marginBottom:"6px", fontWeight:"600" };

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ background:"white", borderBottom:`1px solid ${BORDER}`, padding:"0 28px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ display:"flex" }}>
          {STABS.map(t=>(
            <button key={t.id} onClick={()=>setSettingsTab(t.id)} style={{ padding:"13px 18px", background:"none", border:"none", borderBottom:settingsTab===t.id?`2px solid ${GOLD}`:"2px solid transparent", color:settingsTab===t.id?GOLD_B:GRAY, fontSize:"12px", fontWeight:settingsTab===t.id?"700":"400", cursor:"pointer", fontFamily:"inherit", transition:"all .2s", marginBottom:"-1px", display:"flex", alignItems:"center", gap:"6px" }}>
              <span>{t.icon}</span><span>{t.label}</span>
            </button>
          ))}
        </div>
        {!isAdmin && <span style={{ fontSize:"11px", color:"#DC2626", background:"#FEF2F2", border:"1px solid #FECACA", padding:"4px 12px", borderRadius:"20px" }}>🔒 Admin access required to edit</span>}
      </div>

      <div style={{ flex:1, overflow:"auto", padding:"28px", background:"#F9F7F2" }}>
        <div style={{ maxWidth:"760px" }}>

          {/* ── WHITELIST ── */}
          {settingsTab==="whitelist" && (
            <div>
              <div style={{ marginBottom:"20px" }}>
                <div style={{ fontSize:"9px", color:`${GOLD}99`, letterSpacing:"3px", marginBottom:"4px" }}>SCREENING SETTINGS</div>
                <h2 style={{ fontSize:"18px", fontWeight:"800", color:DARK, marginBottom:"6px" }}>Whitelist</h2>
                <p style={{ fontSize:"12px", color:GRAY, lineHeight:"1.7" }}>Entities on the whitelist will automatically be marked as <strong style={{ color:"#16A34A" }}>Clear</strong> during screening, even if they appear on sanctions lists. Use for known false positives or pre-approved counterparties.</p>
              </div>

              {/* Add */}
              {isAdmin && (
                <div style={{ background:"white", borderRadius:"11px", padding:"18px", border:`1px solid ${BORDER}`, marginBottom:"16px" }}>
                  <label style={labelStyle}>ADD TO WHITELIST</label>
                  <div style={{ display:"flex", gap:"8px" }}>
                    <input value={wlInput} onChange={e=>setWlInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTag(whitelist,setWhitelist,wlInput,setWlInput)} placeholder="Enter entity name or company..." style={{ ...inputStyle }} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
                    <button onClick={()=>addTag(whitelist,setWhitelist,wlInput,setWlInput)} style={{ padding:"9px 18px", background:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`, border:"none", borderRadius:"7px", color:"white", fontSize:"12px", fontWeight:"600", cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>+ Add</button>
                  </div>
                </div>
              )}

              {/* List */}
              <div style={{ background:"white", borderRadius:"11px", border:`1px solid ${BORDER}`, overflow:"hidden" }}>
                <div style={{ padding:"12px 18px", borderBottom:`1px solid ${BORDER}`, display:"flex", justifyContent:"space-between" }}>
                  <span style={{ fontSize:"12px", fontWeight:"700", color:DARK }}>Whitelisted Entities</span>
                  <span style={{ fontSize:"11px", color:GRAY }}>{whitelist.length} entries</span>
                </div>
                {whitelist.length===0 ? <div style={{ padding:"32px", textAlign:"center", color:GRAY, fontSize:"12px" }}>No entries. Add entities above.</div>
                : whitelist.map((w,i)=>(
                  <div key={i} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"13px 18px", borderBottom:i<whitelist.length-1?`1px solid ${BORDER}`:"none" }}
                    onMouseEnter={e=>e.currentTarget.style.background=GOLD_LL+"55"}
                    onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                  >
                    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                      <span style={{ fontSize:"14px" }}>✅</span>
                      <span style={{ fontSize:"13px", fontWeight:"600", color:DARK }}>{w}</span>
                    </div>
                    {isAdmin && <button onClick={()=>removeTag(whitelist,setWhitelist,w)} style={{ padding:"3px 10px", borderRadius:"5px", background:"#FEF2F2", border:"1px solid #FECACA", color:"#DC2626", fontSize:"10px", cursor:"pointer", fontFamily:"inherit" }}>Remove</button>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── WARNING WORDS ── */}
          {settingsTab==="warnings" && (
            <div>
              <div style={{ marginBottom:"20px" }}>
                <div style={{ fontSize:"9px", color:`${GOLD}99`, letterSpacing:"3px", marginBottom:"4px" }}>SCREENING SETTINGS</div>
                <h2 style={{ fontSize:"18px", fontWeight:"800", color:DARK, marginBottom:"6px" }}>Warning Words</h2>
                <p style={{ fontSize:"12px", color:GRAY, lineHeight:"1.7" }}>If any of these words appear in a name, address, or remarks during screening, a <strong style={{ color:GOLD_B }}>⚠️ Warning</strong> flag will be shown on the result. Compliance officer review is recommended.</p>
              </div>

              {isAdmin && (
                <div style={{ background:"white", borderRadius:"11px", padding:"18px", border:`1px solid ${BORDER}`, marginBottom:"16px" }}>
                  <label style={labelStyle}>ADD WARNING WORD</label>
                  <div style={{ display:"flex", gap:"8px" }}>
                    <input value={warnInput} onChange={e=>setWarnInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTag(warnings,setWarnings,warnInput,setWarnInput)} placeholder="e.g. arms, weapons, smuggling..." style={inputStyle} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
                    <button onClick={()=>addTag(warnings,setWarnings,warnInput,setWarnInput)} style={{ padding:"9px 18px", background:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`, border:"none", borderRadius:"7px", color:"white", fontSize:"12px", fontWeight:"600", cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>+ Add</button>
                  </div>
                </div>
              )}

              <div style={{ background:"white", borderRadius:"11px", border:`1px solid ${BORDER}`, padding:"18px" }}>
                <div style={{ fontSize:"12px", fontWeight:"700", color:DARK, marginBottom:"14px" }}>Active Warning Words — {warnings.length}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                  {warnings.map((w,i)=>(
                    <span key={i} style={{ ...tagStyle(GOLD_B), cursor:isAdmin?"default":"default" }}>
                      ⚠️ {w}
                      {isAdmin && <span onClick={()=>removeTag(warnings,setWarnings,w)} style={{ cursor:"pointer", marginLeft:"2px", opacity:0.7 }}>×</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── HOT WORDS ── */}
          {settingsTab==="hotwords" && (
            <div>
              <div style={{ marginBottom:"20px" }}>
                <div style={{ fontSize:"9px", color:`${GOLD}99`, letterSpacing:"3px", marginBottom:"4px" }}>SCREENING SETTINGS</div>
                <h2 style={{ fontSize:"18px", fontWeight:"800", color:DARK, marginBottom:"6px" }}>Hot Words</h2>
                <p style={{ fontSize:"12px", color:GRAY, lineHeight:"1.7" }}>If any of these words appear during screening, the result is automatically flagged as <strong style={{ color:"#DC2626" }}>🔥 HIGH RISK</strong> and escalated immediately, regardless of match score.</p>
              </div>

              {isAdmin && (
                <div style={{ background:"white", borderRadius:"11px", padding:"18px", border:`1px solid ${BORDER}`, marginBottom:"16px" }}>
                  <label style={labelStyle}>ADD HOT WORD</label>
                  <div style={{ display:"flex", gap:"8px" }}>
                    <input value={hotInput} onChange={e=>setHotInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&addTag(hotwords,setHotwords,hotInput,setHotInput)} placeholder="e.g. OFAC, sanctioned, Hamas..." style={inputStyle} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
                    <button onClick={()=>addTag(hotwords,setHotwords,hotInput,setHotInput)} style={{ padding:"9px 18px", background:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`, border:"none", borderRadius:"7px", color:"white", fontSize:"12px", fontWeight:"600", cursor:"pointer", fontFamily:"inherit", whiteSpace:"nowrap" }}>+ Add</button>
                  </div>
                </div>
              )}

              <div style={{ background:"white", borderRadius:"11px", border:`1px solid ${BORDER}`, padding:"18px" }}>
                <div style={{ fontSize:"12px", fontWeight:"700", color:DARK, marginBottom:"14px" }}>Active Hot Words — {hotwords.length}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                  {hotwords.map((w,i)=>(
                    <span key={i} style={{ ...tagStyle("#DC2626"), cursor:"default" }}>
                      🔥 {w}
                      {isAdmin && <span onClick={()=>removeTag(hotwords,setHotwords,w)} style={{ cursor:"pointer", marginLeft:"2px", opacity:0.7 }}>×</span>}
                    </span>
                  ))}
                </div>
              </div>

              {/* Info box */}
              <div style={{ marginTop:"14px", padding:"14px 16px", borderRadius:"9px", background:"#FEF2F2", border:"1px solid #FECACA", fontSize:"12px", color:"#374151", lineHeight:"1.7" }}>
                <strong style={{ color:"#DC2626" }}>🔥 How Hot Words work:</strong> When a screening result contains any hot word in the name, program, or remarks field, the system automatically overrides the risk score to HIGH and adds it to the Audit Trail with an escalation flag.
              </div>
            </div>
          )}

          {/* ── USER MANAGEMENT ── */}
          {settingsTab==="users" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"20px" }}>
                <div>
                  <div style={{ fontSize:"9px", color:`${GOLD}99`, letterSpacing:"3px", marginBottom:"4px" }}>SYSTEM SETTINGS</div>
                  <h2 style={{ fontSize:"18px", fontWeight:"800", color:DARK, marginBottom:"6px" }}>User Management</h2>
                  <p style={{ fontSize:"12px", color:GRAY }}>Manage user access, roles, and activation status.</p>
                </div>
                {isAdmin && <button onClick={()=>setShowAddUser(true)} style={{ padding:"9px 18px", background:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`, border:"none", borderRadius:"8px", color:"white", fontSize:"12px", fontWeight:"600", cursor:"pointer", fontFamily:"inherit", display:"flex", alignItems:"center", gap:"6px" }}>+ Add User</button>}
              </div>

              {/* Add user form */}
              {showAddUser && (
                <div style={{ background:"white", borderRadius:"11px", padding:"20px", border:`1px solid ${GOLD}44`, marginBottom:"16px", boxShadow:`0 4px 16px ${GOLD}12` }}>
                  <div style={{ fontSize:"12px", fontWeight:"700", color:DARK, marginBottom:"14px" }}>New User</div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"12px" }}>
                    <div>
                      <label style={labelStyle}>FULL NAME</label>
                      <input value={newUser.name} onChange={e=>setNewUser(u=>({...u,name:e.target.value}))} placeholder="Ahmed Al Mansouri" style={inputStyle} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
                    </div>
                    <div>
                      <label style={labelStyle}>EMAIL</label>
                      <input value={newUser.email} onChange={e=>setNewUser(u=>({...u,email:e.target.value}))} placeholder="user@veriscan.io" style={inputStyle} onFocus={e=>e.target.style.borderColor=GOLD} onBlur={e=>e.target.style.borderColor=BORDER}/>
                    </div>
                  </div>
                  <div style={{ marginBottom:"14px" }}>
                    <label style={labelStyle}>ROLE</label>
                    <div style={{ display:"flex", gap:"8px" }}>
                      {["Admin","Compliance Officer","Viewer"].map(r=>(
                        <button key={r} onClick={()=>setNewUser(u=>({...u,role:r}))} style={{ flex:1, padding:"8px", borderRadius:"7px", fontSize:"11px", cursor:"pointer", fontFamily:"inherit", background:newUser.role===r?GOLD_LL:"white", border:`1px solid ${newUser.role===r?GOLD+"55":BORDER}`, color:newUser.role===r?GOLD_B:GRAY, fontWeight:newUser.role===r?"700":"400" }}>{r}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:"8px" }}>
                    <button onClick={addUser} style={{ flex:1, padding:"10px", background:`linear-gradient(135deg,${GOLD_L},${GOLD_B})`, border:"none", borderRadius:"8px", color:"white", fontSize:"12px", fontWeight:"700", cursor:"pointer", fontFamily:"inherit" }}>Create User</button>
                    <button onClick={()=>setShowAddUser(false)} style={{ padding:"10px 18px", background:"white", border:`1px solid ${BORDER}`, borderRadius:"8px", color:GRAY, fontSize:"12px", cursor:"pointer", fontFamily:"inherit" }}>Cancel</button>
                  </div>
                </div>
              )}

              {/* Users table */}
              <div style={{ background:"white", borderRadius:"11px", border:`1px solid ${BORDER}`, overflow:"hidden" }}>
                <table style={{ width:"100%", borderCollapse:"collapse" }}>
                  <thead>
                    <tr style={{ background:LIGHT }}>
                      {["User","Email","Role","Last Login","Status","Action"].map(h=>(
                        <th key={h} style={{ padding:"10px 14px", textAlign:"left", fontSize:"9px", color:GRAY, letterSpacing:"2px", borderBottom:`1px solid ${BORDER}`, fontWeight:"600" }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u=>(
                      <tr key={u.id} style={{ borderBottom:`1px solid ${BORDER}` }}
                        onMouseEnter={e=>e.currentTarget.style.background=GOLD_LL+"44"}
                        onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                      >
                        <td style={{ padding:"13px 14px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                            <div style={{ width:"32px", height:"32px", borderRadius:"8px", background:`${GOLD}18`, border:`1px solid ${GOLD}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:"700", color:GOLD_B }}>
                              {u.name.split(" ").map(w=>w[0]).join("").slice(0,2)}
                            </div>
                            <span style={{ fontSize:"13px", fontWeight:"600", color:u.active?DARK:"#9CA3AF" }}>{u.name}</span>
                          </div>
                        </td>
                        <td style={{ padding:"13px 14px", fontSize:"11px", color:GRAY }}>{u.email}</td>
                        <td style={{ padding:"13px 14px" }}>
                          <span style={{ padding:"3px 10px", borderRadius:"20px", fontSize:"10px", fontWeight:"600",
                            background:u.role==="Admin"?`${GOLD}15`:u.role==="Compliance Officer"?"rgba(34,197,94,0.1)":"#F3F4F6",
                            color:u.role==="Admin"?GOLD_B:u.role==="Compliance Officer"?"#16A34A":"#6B7280",
                            border:`1px solid ${u.role==="Admin"?GOLD+"33":u.role==="Compliance Officer"?"rgba(34,197,94,0.3)":BORDER}`
                          }}>{u.role}</span>
                        </td>
                        <td style={{ padding:"13px 14px", fontSize:"11px", color:GRAY, whiteSpace:"nowrap" }}>{u.lastLogin}</td>
                        <td style={{ padding:"13px 14px" }}>
                          <span style={{ display:"flex", alignItems:"center", gap:"5px", fontSize:"11px", fontWeight:"600", color:u.active?"#16A34A":"#9CA3AF" }}>
                            <div style={{ width:"7px", height:"7px", borderRadius:"50%", background:u.active?"#16A34A":"#D1D5DB" }}/>
                            {u.active?"Active":"Inactive"}
                          </span>
                        </td>
                        <td style={{ padding:"13px 14px" }}>
                          {isAdmin && (
                            <button onClick={()=>toggleUser(u.id)} style={{ padding:"5px 12px", borderRadius:"6px", fontSize:"10px", fontWeight:"600", cursor:"pointer", fontFamily:"inherit", background:u.active?"#FEF2F2":GOLD_LL, border:`1px solid ${u.active?"#FECACA":GOLD+"44"}`, color:u.active?"#DC2626":GOLD_B, transition:"all .2s" }}>
                              {u.active?"Deactivate":"Activate"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Role legend */}
              <div style={{ marginTop:"14px", padding:"14px 16px", borderRadius:"9px", background:"white", border:`1px solid ${BORDER}`, fontSize:"12px", color:"#374151", lineHeight:"1.8" }}>
                <div style={{ fontWeight:"700", color:DARK, marginBottom:"8px" }}>Role Permissions</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px" }}>
                  {[
                    { role:"Admin",              color:GOLD_B,     bg:GOLD_LL,  perms:"Full access — all settings, users, lists" },
                    { role:"Compliance Officer", color:"#16A34A",  bg:"#F0FDF4",perms:"Screen, review cases, view reports" },
                    { role:"Viewer",             color:"#6B7280",  bg:"#F9FAFB",perms:"View-only access, no editing" },
                  ].map(r=>(
                    <div key={r.role} style={{ padding:"12px", borderRadius:"8px", background:r.bg, border:`1px solid ${BORDER}` }}>
                      <div style={{ fontSize:"11px", fontWeight:"700", color:r.color, marginBottom:"4px" }}>{r.role}</div>
                      <div style={{ fontSize:"10px", color:GRAY }}>{r.perms}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

// ── APP ROOT ──────────────────────────────────────────────────────────────────
export default function App() {
  const [page,setPage]=useState("landing"); // landing | login | dashboard
  const [user,setUser]=useState(null);
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap'); *{box-sizing:border-box;margin:0;padding:0} @keyframes spin{to{transform:rotate(360deg)}} @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}} @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}} input::placeholder,textarea::placeholder{color:#C4B89A}`}</style>
      {page==="landing"&&<LandingPage onLogin={()=>setPage("login")}/>}
      {page==="login"&&<LoginPage onLogin={u=>{setUser(u);setPage("dashboard");}} onBack={()=>setPage("landing")}/>}
      {page==="dashboard"&&<Dashboard user={user} onLogout={()=>{setUser(null);setPage("landing");}}/>}
    </>
  );
}