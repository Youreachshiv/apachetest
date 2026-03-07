import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');`;

const css = `
  *{box-sizing:border-box;margin:0;padding:0}
  body{background:#0a0c10;color:#e2e8f0;font-family:'Space Grotesk',sans-serif}
  ::-webkit-scrollbar{width:6px;height:6px}
  ::-webkit-scrollbar-track{background:#1a1f2e}
  ::-webkit-scrollbar-thumb{background:#3a4460;border-radius:3px}
  code,pre,.mono{font-family:'JetBrains Mono',monospace}
  .title-font{font-family:'Syne',sans-serif}
`;

// ── Palette ──────────────────────────────────────────────
const P = {
  bg0:"#0a0c10", bg1:"#0f1117", bg2:"#161b27", bg3:"#1e2438",
  border:"#2a3248", borderLight:"#3a4460",
  red:"#e05252", redDim:"#c0392b", redGlow:"rgba(224,82,82,0.15)",
  green:"#4ade80", greenDim:"#22c55e", greenGlow:"rgba(74,222,128,0.12)",
  blue:"#60a5fa", blueDim:"#3b82f6", blueGlow:"rgba(96,165,250,0.12)",
  orange:"#fb923c", orangeDim:"#f97316", orangeGlow:"rgba(251,146,60,0.12)",
  purple:"#c084fc", purpleDim:"#a855f7", purpleGlow:"rgba(192,132,252,0.12)",
  teal:"#2dd4bf", tealDim:"#14b8a6", tealGlow:"rgba(45,212,191,0.12)",
  gold:"#fbbf24", goldDim:"#f59e0b", goldGlow:"rgba(251,191,36,0.12)",
  text:"#e2e8f0", textDim:"#94a3b8", textFaint:"#475569",
};

// ── Shared Components ────────────────────────────────────
const Tag = ({c,children,small}) => (
  <span style={{
    display:"inline-flex",alignItems:"center",gap:4,
    padding:small?"2px 7px":"3px 10px",
    borderRadius:4,fontSize:small?10:11,fontWeight:700,letterSpacing:0.5,
    fontFamily:"'JetBrains Mono',monospace",
    background:`${c}22`,color:c,border:`1px solid ${c}44`,
  }}>{children}</span>
);

const Badge = ({label,color}) => (
  <span style={{padding:"2px 8px",borderRadius:12,fontSize:10,fontWeight:700,letterSpacing:1,
    background:`${color}20`,color,border:`1px solid ${color}40`,fontFamily:"'JetBrains Mono',monospace",
    textTransform:"uppercase"}}>{label}</span>
);

const Card = ({children,style={}}) => (
  <div style={{background:P.bg2,border:`1px solid ${P.border}`,borderRadius:10,padding:20,...style}}>
    {children}
  </div>
);

const SectionTitle = ({icon,title,sub,color=P.blue}) => (
  <div style={{marginBottom:24}}>
    <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
      <span style={{fontSize:22}}>{icon}</span>
      <h2 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color,letterSpacing:-0.5}}>{title}</h2>
    </div>
    {sub && <p style={{color:P.textDim,fontSize:13,paddingLeft:32}}>{sub}</p>}
  </div>
);

// ── Tabs ─────────────────────────────────────────────────
const TABS = [
  {id:"mental",  icon:"🧠", label:"Mental Model"},
  {id:"flow",    icon:"⚡", label:"Run Flow"},
  {id:"commands",icon:"⌨️",  label:"Command Impact"},
  {id:"checks",  icon:"✅", label:"Pre/Post Checks"},
  {id:"rollback",icon:"↩️",  label:"Rollback Trees"},
];

// ══════════════════════════════════════════════════════════
// TAB 1: MENTAL MODEL — Architecture Mindmap
// ══════════════════════════════════════════════════════════
const MentalModelTab = () => {
  const [hover, setHover] = useState(null);
  const concepts = [
    {id:"ws",  x:50,  y:50,  w:200, h:90,  color:P.blue,   title:"🖥️ Workstation",
     items:["chef generate cookbook","knife upload/show/edit","knife bootstrap node","cookbooks live here (git)"]},
    {id:"srv", x:330, y:50,  w:200, h:90,  color:P.purple, title:"🗄️ Chef Server",
     items:["Stores cookbooks+versions","Stores node objects","Stores roles+environments","REST API on port 443"]},
    {id:"nd",  x:610, y:50,  w:200, h:90,  color:P.green,  title:"⚙️ Node",
     items:["Runs chef-client every 30m","Pulls run-list from server","Ohai collects node facts","Applies converge phase"]},
    {id:"cb",  x:50,  y:230, w:180, h:80,  color:P.orange, title:"📦 Cookbook",
     items:["recipes/ — resources","attributes/ — defaults","templates/ — ERB files","metadata.rb — version"]},
    {id:"res", x:260, y:230, w:180, h:80,  color:P.red,    title:"🧱 Resource",
     items:["package file service","directory template","execute user cron","IDEMPOTENT by default"]},
    {id:"rec", x:470, y:230, w:180, h:80,  color:P.teal,   title:"📜 Recipe",
     items:["Ordered list of resources","Runs top→bottom","include_recipe for reuse","One .rb file per recipe"]},
    {id:"att", x:50,  y:400, w:175, h:80,  color:P.gold,   title:"🏷️ Attributes",
     items:["default < override","node['key'] in recipe","@var in ERB template","Ohai auto-attributes"]},
    {id:"tpl", x:253, y:400, w:175, h:80,  color:P.purple, title:"📋 ERB Template",
     items:["<%= @var %> outputs","<% %> logic (no output)","node[] accessible","→ rendered config file"]},
    {id:"rl",  x:456, y:400, w:175, h:80,  color:P.blue,   title:"📋 Run-List",
     items:["recipe[cb::recipe]","role[web-server]","Ordered execution","Per-node on Chef Server"]},
    {id:"env", x:659, y:400, w:175, h:80,  color:P.green,  title:"🌍 Environment",
     items:["dev / staging / prod","Pin cookbook versions","= 1.0.0 exact pin","Applies to all nodes in env"]},
  ];

  const arrows = [
    {x1:250,y1:95, x2:330,y2:95, label:"knife upload"},
    {x1:530,y1:95, x2:610,y2:95, label:"pull policy"},
    {x1:150,y1:140,x2:150,y2:230,label:"contains"},
    {x1:350,y1:140,x2:350,y2:230,label:"stored on"},
    {x1:240,y1:275,x2:260,y2:275,label:""},
    {x1:440,y1:275,x2:470,y2:275,label:"grouped in"},
    {x1:150,y1:310,x2:150,y2:400,label:"defines"},
    {x1:340,y1:310,x2:340,y2:400,label:"uses"},
    {x1:540,y1:310,x2:540,y2:400,label:"has a"},
    {x1:700,y1:140,x2:746,y2:400,label:"assigned to"},
  ];

  return (
    <div>
      <SectionTitle icon="🧠" title="Chef Architecture Mental Model"
        sub="How all Chef concepts connect — hover any node to highlight it"
        color={P.blue}/>

      {/* SVG Architecture Map */}
      <Card style={{padding:0,overflow:"hidden",marginBottom:24}}>
        <div style={{padding:"16px 20px",borderBottom:`1px solid ${P.border}`,
          display:"flex",gap:16,alignItems:"center"}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.textDim}}>
            CHEF THREE-TIER ARCHITECTURE
          </span>
          {[{l:"Workstation",c:P.blue},{l:"Chef Server",c:P.purple},{l:"Node",c:P.green}].map(({l,c})=>(
            <Badge key={l} label={l} color={c}/>
          ))}
        </div>
        <svg viewBox="0 0 860 510" style={{width:"100%",background:P.bg1,display:"block"}}>
          <defs>
            <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
              <path d="M0,0 L0,6 L8,3 z" fill={P.borderLight}/>
            </marker>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          {/* Layer labels */}
          <text x="15" y="100" fill={P.textFaint} fontSize="11" fontFamily="JetBrains Mono" transform="rotate(-90,15,100)">LAYER 1</text>
          <text x="15" y="275" fill={P.textFaint} fontSize="11" fontFamily="JetBrains Mono" transform="rotate(-90,15,275)">LAYER 2</text>
          <text x="15" y="445" fill={P.textFaint} fontSize="11" fontFamily="JetBrains Mono" transform="rotate(-90,15,445)">LAYER 3</text>

          {/* Layer separators */}
          <line x1="30" y1="160" x2="840" y2="160" stroke={P.border} strokeWidth="1" strokeDasharray="4,4"/>
          <line x1="30" y1="330" x2="840" y2="330" stroke={P.border} strokeWidth="1" strokeDasharray="4,4"/>

          {/* Arrows */}
          {arrows.map((a,i)=>(
            <line key={i} x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2}
              stroke={P.borderLight} strokeWidth="1.5" markerEnd="url(#arr)"
              strokeDasharray={a.label?"":"none"}/>
          ))}
          {arrows.filter(a=>a.label).map((a,i)=>(
            <text key={"l"+i} x={(a.x1+a.x2)/2} y={(a.y1+a.y2)/2-5}
              fill={P.textFaint} fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">{a.label}</text>
          ))}

          {/* Concept nodes */}
          {concepts.map(c=>{
            const isHov = hover===c.id;
            return (
              <g key={c.id} onMouseEnter={()=>setHover(c.id)} onMouseLeave={()=>setHover(null)}
                style={{cursor:"pointer"}}>
                <rect x={c.x} y={c.y} width={c.w} height={c.h} rx="8"
                  fill={isHov ? `${c.color}22` : `${c.color}11`}
                  stroke={isHov ? c.color : `${c.color}55`}
                  strokeWidth={isHov?2:1}
                  filter={isHov?"url(#glow)":undefined}/>
                <text x={c.x+10} y={c.y+18} fill={c.color} fontSize="12"
                  fontFamily="Syne,sans-serif" fontWeight="700">{c.title}</text>
                {c.items.map((item,ii)=>(
                  <text key={ii} x={c.x+10} y={c.y+34+ii*15} fill={isHov?P.text:P.textDim}
                    fontSize="10" fontFamily="JetBrains Mono">{item}</text>
                ))}
              </g>
            );
          })}

          {/* Data flow annotation */}
          <rect x="30" y="470" width="800" height="28" rx="5" fill={`${P.bg3}`} stroke={P.border}/>
          <text x="430" y="489" fill={P.textDim} fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">
            chef-client FLOW: Workstation writes code → Server stores policy → Node pulls &amp; applies every 30 min
          </text>
        </svg>
      </Card>

      {/* Idempotence diagram */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:16}}>
        <Card>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.gold,marginBottom:12}}>
            ⚡ IDEMPOTENCE — The Core Mental Model
          </div>
          {[
            {state:"Package missing",action:"Install it",result:"✓ Installed",c:P.green},
            {state:"Package present",action:"Skip",result:"✓ Up to date",c:P.blue},
            {state:"Service stopped",action:"Start it",result:"✓ Running",c:P.green},
            {state:"Service running",action:"Skip",result:"✓ Up to date",c:P.blue},
            {state:"File content differs",action:"Update it",result:"✓ Updated",c:P.orange},
            {state:"File content matches",action:"Skip",result:"✓ Up to date",c:P.blue},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,
              padding:"6px 10px",marginBottom:4,borderRadius:6,
              background:i%2===0?P.bg3:P.bg1,fontSize:12}}>
              <span style={{color:P.textDim,minWidth:160,fontFamily:"'JetBrains Mono',monospace"}}>{r.state}</span>
              <span style={{color:P.textFaint,minWidth:16}}>→</span>
              <span style={{color:P.orange,minWidth:80}}>{r.action}</span>
              <span style={{color:P.textFaint,minWidth:16}}>→</span>
              <span style={{color:r.c,fontWeight:700}}>{r.result}</span>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.purple,marginBottom:12}}>
            🔄 ATTRIBUTE PRECEDENCE — Low → High
          </div>
          {[
            {level:1,name:"default (cookbook)",key:"default['x'] = val",color:P.blue,note:"Always overridden"},
            {level:2,name:"default (role)",key:"role default attrs",color:P.blue,note:"Overrides cookbook default"},
            {level:3,name:"default (environment)",key:"env default attrs",color:P.teal,note:"Overrides role default"},
            {level:4,name:"normal (saved to node)",key:"normal['x'] = val",color:P.gold,note:"Persists between runs"},
            {level:5,name:"override (cookbook)",key:"override['x'] = val",color:P.orange,note:"Beats all defaults"},
            {level:6,name:"override (role/env/node)",key:"node.override['x']",color:P.red,note:"Highest — wins always"},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,
              padding:"6px 10px",marginBottom:4,borderRadius:6,
              background:P.bg3,borderLeft:`3px solid ${r.color}`}}>
              <span style={{color:r.color,fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:700,minWidth:16}}>{r.level}</span>
              <div style={{flex:1}}>
                <div style={{color:P.text,fontSize:12,fontWeight:600}}>{r.name}</div>
                <div style={{color:P.textFaint,fontSize:10,fontFamily:"'JetBrains Mono',monospace"}}>{r.key}</div>
              </div>
              <span style={{color:P.textDim,fontSize:10}}>{r.note}</span>
            </div>
          ))}
          <div style={{marginTop:10,padding:"8px 12px",borderRadius:6,background:`${P.gold}11`,
            border:`1px solid ${P.gold}33`,fontSize:11,color:P.gold}}>
            💡 Practical rule: default (cookbook) &lt; role &lt; environment &lt; node.override
          </div>
        </Card>
      </div>

      {/* ERB template mental model */}
      <Card>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.teal,marginBottom:14}}>
          📋 ERB Template Mental Model — Mail Merge for Config Files
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr auto 1fr",gap:16,alignItems:"center"}}>
          <div>
            <div style={{color:P.textDim,fontSize:11,marginBottom:8,fontFamily:"'JetBrains Mono',monospace"}}>httpd.conf.erb (template)</div>
            {[
              "Listen <%= @port %>",
              "ServerName <%= @server_name %>",
              "DocumentRoot <%= @doc_root %>",
              "<% if @ssl %>",
              "  SSLEngine On",
              "  SSLPort <%= @ssl_port %>",
              "<% end %>",
            ].map((l,i)=>{
              const isTag = l.includes("<%");
              return <div key={i} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,
                padding:"3px 10px",background:P.bg1,
                color:isTag?P.orange:P.text,borderRadius:4,marginBottom:2}}>{l}</div>;
            })}
          </div>
          <div style={{textAlign:"center"}}>
            <div style={{fontSize:24}}>⚡</div>
            <div style={{color:P.textFaint,fontSize:11,marginTop:4}}>chef-client<br/>renders</div>
            <div style={{fontSize:20,marginTop:4}}>→</div>
          </div>
          <div>
            <div style={{color:P.textDim,fontSize:11,marginBottom:8,fontFamily:"'JetBrains Mono',monospace"}}>httpd.conf (on node: web-prod-01)</div>
            {[
              "Listen 80",
              "ServerName web-prod-01",
              "DocumentRoot /var/www/html",
              "SSLEngine On",
              "SSLPort 443",
            ].map((l,i)=>(
              <div key={i} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,
                padding:"3px 10px",background:`${P.green}11`,
                color:P.green,borderRadius:4,marginBottom:2,border:`1px solid ${P.green}22`}}>{l}</div>
            ))}
          </div>
        </div>
        <div style={{marginTop:12,display:"flex",gap:16,flexWrap:"wrap"}}>
          {[
            {tag:"<%= @var %>",desc:"Output value",c:P.orange},
            {tag:"<% code %>",desc:"Execute (no output)",c:P.blue},
            {tag:"<%# comment %>",desc:"Never rendered",c:P.textFaint},
            {tag:"node['key']",desc:"Direct node attr access",c:P.purple},
          ].map(({tag,desc,c})=>(
            <div key={tag} style={{display:"flex",alignItems:"center",gap:8}}>
              <code style={{background:P.bg3,padding:"2px 8px",borderRadius:4,color:c,fontSize:12}}>{tag}</code>
              <span style={{color:P.textDim,fontSize:12}}>{desc}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// TAB 2: CHEF-CLIENT RUN FLOW
// ══════════════════════════════════════════════════════════
const RunFlowTab = () => {
  const [expanded, setExpanded] = useState({});
  const toggle = id => setExpanded(e=>({...e,[id]:!e[id]}));

  const phases = [
    {
      id:"auth", phase:"PHASE 0", name:"Startup & Auth", icon:"🔐",
      color:P.blue, timing:"< 1 sec",
      what:"chef-client starts, reads /etc/chef/client.rb, authenticates to Chef Server using RSA key pair",
      how:"Uses client.pem (private key on node) ↔ chef-server holds matching public key. HTTPS on port 443.",
      check:"knife ssl check  # verify SSL cert",
      files:["/etc/chef/client.rb","/etc/chef/client.pem","/etc/chef/validation.pem (bootstrap only)"],
      impact:"Failure = chef-client aborts. Check: ping chef-server, knife ssl fetch",
      localMode:"In local mode (-z): skips auth, uses temp in-memory server",
    },
    {
      id:"ohai", phase:"PHASE 1", name:"Ohai — Collect Facts", icon:"📡",
      color:P.teal, timing:"1-5 sec",
      what:"Ohai scans the system and populates the node[] attribute hash with ~4000+ facts",
      how:"Reads /proc, runs commands, checks installed packages, network interfaces, etc.",
      check:"ohai platform\nohai hostname\nohai memory/total\nohai | wc -l  # count attrs",
      files:["node['platform'], node['hostname'], node['ipaddress']","node['memory']['total'], node['cpu']['total']","node['packages']['httpd']['version']"],
      impact:"Ohai attrs drive platform conditionals in recipes. Stale Ohai = wrong config applied.",
      localMode:"Ohai runs identically in local mode — same attribute collection",
    },
    {
      id:"policy", phase:"PHASE 2", name:"Get Policy (Run-List)", icon:"📋",
      color:P.purple, timing:"< 1 sec",
      what:"Chef-client asks server: 'What should I run?' Gets back the expanded run-list",
      how:"HTTP GET to Chef Server API → returns run_list, environments, role assignments",
      check:"knife node show NODE_NAME  # see current run_list\nknife node show NODE_NAME -a chef_environment",
      files:["Run-list stored on Chef Server per-node","Roles expanded inline","Environment cookbook version pins applied here"],
      impact:"Wrong run-list = wrong cookbooks applied. Wrong env = wrong cookbook version.",
      localMode:"In local mode: run-list passed via -r flag on command line",
    },
    {
      id:"sync", phase:"PHASE 3", name:"Cookbook Sync", icon:"⬇️",
      color:P.gold, timing:"1-30 sec",
      what:"Downloads required cookbooks from Chef Server to node's local cache",
      how:"Only downloads cookbooks not already cached or with version changes",
      check:"ls /var/chef/cache/cookbooks/  # cached cookbooks on node\nknife cookbook show CB VERSION  # what's on server",
      files:["/var/chef/cache/cookbooks/ (on node)"],
      impact:"Slow if many cookbooks. Version pin controls which version downloads.",
      localMode:"In local mode: reads cookbooks from ./cookbooks/ directory",
    },
    {
      id:"compile", phase:"PHASE 4", name:"Compile Phase", icon:"⚙️",
      color:P.orange, timing:"< 2 sec",
      what:"Chef loads ALL recipe Ruby code into memory. Builds the Resource Collection. NO system changes yet.",
      how:"Evaluates Ruby conditionals, attribute lookups, include_recipe calls. Orders all resources.",
      check:"chef-client --why-run  # dry-run: shows compile + what WOULD run in converge",
      files:["In-memory Resource Collection built here","All 'if' conditions evaluated here"],
      impact:"Syntax errors appear here. Ruby outside resources runs at compile time (unexpected order issues).",
      localMode:"Same in local mode",
    },
    {
      id:"converge", phase:"PHASE 5", name:"Converge Phase ★", icon:"🎯",
      color:P.green, timing:"5-120 sec",
      what:"Chef walks the Resource Collection. For each resource: compare current state vs desired state. Apply if different.",
      how:"Resource providers check system state, apply changes if needed, fire notifies at end",
      check:"# After run, look in output for:\n# * package[httpd] action install (up to date)  ← no change\n# * file[/etc/motd] action create              ← CHANGED",
      files:["Every resource in the run-list executed here","notifies fire at :delayed point","System actually changes here"],
      impact:"THIS is where config changes happen. Failures here = partial converge. Chef retries on next run.",
      localMode:"Same in local mode",
    },
    {
      id:"report", phase:"PHASE 6", name:"Report", icon:"📊",
      color:P.blue, timing:"< 1 sec",
      what:"Chef-client sends run summary to Chef Server: success/failure, resources updated, timing.",
      how:"HTTP POST to Chef Server analytics/reporting endpoint",
      check:"knife runs list NODE_NAME  # see run history on Chef Server",
      files:["Run report stored on Chef Server","visible in Chef Manage web UI"],
      impact:"Failed runs show in Chef Server dashboard. Alert on failures.",
      localMode:"In local mode: no report sent, summary printed to stdout only",
    },
  ];

  return (
    <div>
      <SectionTitle icon="⚡" title="chef-client Run Flow — 7 Phases Deep Dive"
        sub="Every phase of what happens when chef-client runs on a node — click any phase to expand"
        color={P.green}/>

      {/* Timeline */}
      <Card style={{marginBottom:20,padding:"16px 20px"}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:P.textDim,marginBottom:12,letterSpacing:1}}>
          EXECUTION TIMELINE
        </div>
        <div style={{display:"flex",alignItems:"center",gap:0,overflowX:"auto",paddingBottom:8}}>
          {phases.map((p,i)=>(
            <div key={p.id} style={{display:"flex",alignItems:"center",flex:1}}>
              <div onClick={()=>toggle(p.id)} style={{cursor:"pointer",
                background:expanded[p.id]?`${p.color}22`:P.bg3,
                border:`1px solid ${expanded[p.id]?p.color:P.border}`,
                borderRadius:8,padding:"8px 12px",textAlign:"center",
                transition:"all 0.2s",minWidth:90}}>
                <div style={{fontSize:16,marginBottom:2}}>{p.icon}</div>
                <div style={{fontSize:9,fontFamily:"'JetBrains Mono',monospace",color:p.color,fontWeight:700}}>{p.phase}</div>
                <div style={{fontSize:10,color:P.textDim,marginTop:2}}>{p.name}</div>
                <div style={{fontSize:9,color:P.textFaint,marginTop:2}}>{p.timing}</div>
              </div>
              {i<phases.length-1 && (
                <div style={{display:"flex",alignItems:"center",padding:"0 4px"}}>
                  <div style={{width:24,height:1,background:P.borderLight}}/>
                  <span style={{color:P.textFaint,fontSize:10}}>▶</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Phase details */}
      {phases.map(p=>(
        expanded[p.id] && (
          <Card key={p.id} style={{marginBottom:12,borderColor:p.color,
            borderLeft:`3px solid ${p.color}`,background:`${p.color}08`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14}}>
              <div>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
                  <span style={{fontSize:20}}>{p.icon}</span>
                  <span style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,color:p.color}}>{p.name}</span>
                  <Badge label={p.phase} color={p.color}/>
                  <Badge label={p.timing} color={P.textFaint}/>
                </div>
                <p style={{color:P.text,fontSize:13,lineHeight:1.6}}>{p.what}</p>
              </div>
              <button onClick={()=>toggle(p.id)} style={{background:"none",border:"none",color:P.textFaint,cursor:"pointer",fontSize:18}}>✕</button>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div>
                <div style={{color:P.textDim,fontSize:11,fontWeight:700,marginBottom:6,letterSpacing:1}}>HOW IT WORKS</div>
                <p style={{color:P.textDim,fontSize:12,lineHeight:1.6,marginBottom:10}}>{p.how}</p>
                <div style={{color:P.textDim,fontSize:11,fontWeight:700,marginBottom:6,letterSpacing:1}}>FILES INVOLVED</div>
                {p.files.map((f,i)=>(
                  <div key={i} style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,
                    color:P.teal,padding:"2px 0"}}>{f}</div>
                ))}
              </div>
              <div>
                <div style={{color:P.textDim,fontSize:11,fontWeight:700,marginBottom:6,letterSpacing:1}}>VERIFY / INSPECT</div>
                <pre style={{background:P.bg1,padding:"10px 12px",borderRadius:6,fontSize:11,
                  color:P.codeFg,border:`1px solid ${P.border}`,fontFamily:"'JetBrains Mono',monospace",
                  lineHeight:1.6,marginBottom:10,overflowX:"auto"}}>{p.check}</pre>
                <div style={{padding:"8px 12px",borderRadius:6,background:`${P.orange}11`,
                  border:`1px solid ${P.orange}33`,fontSize:12,color:P.orange}}>
                  <strong>⚠ Impact if fails:</strong> {p.impact}
                </div>
                {p.localMode && (
                  <div style={{marginTop:8,padding:"6px 12px",borderRadius:6,background:`${P.blue}11`,
                    border:`1px solid ${P.blue}33`,fontSize:11,color:P.blue}}>
                    <strong>Local mode:</strong> {p.localMode}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )
      ))}

      {/* Compile vs Converge callout */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <Card style={{borderColor:P.orange,borderLeft:`3px solid ${P.orange}`}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.orange,marginBottom:10}}>
            ⚙️ COMPILE PHASE — No System Changes
          </div>
          {[
            "Reads all recipe .rb files",
            "Evaluates Ruby conditionals",
            "Resolves include_recipe calls",
            "Builds Resource Collection",
            "Runs Ruby outside resource blocks",
            "✗ Does NOT touch the system",
          ].map((l,i)=>(
            <div key={i} style={{padding:"4px 0",fontSize:12,color:l.startsWith("✗")?P.red:P.textDim,
              borderBottom:i<5?`1px solid ${P.border}`:"none"}}>{l}</div>
          ))}
        </Card>
        <Card style={{borderColor:P.green,borderLeft:`3px solid ${P.green}`}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.green,marginBottom:10}}>
            🎯 CONVERGE PHASE — System Changes Happen Here
          </div>
          {[
            "Walks Resource Collection in order",
            "Checks current state vs desired state",
            "State matches → 'up to date' → skip",
            "State differs → applies change → logs",
            "Fires :delayed notifies at end",
            "✓ THIS is where config is applied",
          ].map((l,i)=>(
            <div key={i} style={{padding:"4px 0",fontSize:12,color:l.startsWith("✓")?P.green:P.textDim,
              borderBottom:i<5?`1px solid ${P.border}`:"none"}}>{l}</div>
          ))}
        </Card>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// TAB 3: COMMAND IMPACT MAP
// ══════════════════════════════════════════════════════════
const CommandImpactTab = () => {
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  const RISK = {
    SAFE: {color:P.blue, bg:P.blueGlow},
    LOW:  {color:P.green, bg:P.greenGlow},
    MED:  {color:P.gold, bg:P.goldGlow},
    HIGH: {color:P.orange, bg:P.orangeGlow},
    CRIT: {color:P.red, bg:P.redGlow},
  };

  const commands = [
    // READ / INSPECT
    {cmd:"knife node list",            risk:"SAFE", type:"READ",    target:"Chef Server",  undo:"N/A",  impact:"Reads node list from Chef Server. Zero system changes.",desc:"Lists all registered nodes"},
    {cmd:"knife node show NODE",       risk:"SAFE", type:"READ",    target:"Chef Server",  undo:"N/A",  impact:"Reads node object. Zero system changes.",desc:"Shows node details, attributes, run-list"},
    {cmd:"knife cookbook list",        risk:"SAFE", type:"READ",    target:"Chef Server",  undo:"N/A",  impact:"Lists all cookbooks and versions on server.",desc:"Audits what is deployed"},
    {cmd:"knife role list",            risk:"SAFE", type:"READ",    target:"Chef Server",  undo:"N/A",  impact:"Lists all roles. Zero changes.",desc:"View all defined roles"},
    {cmd:"knife environment list",     risk:"SAFE", type:"READ",    target:"Chef Server",  undo:"N/A",  impact:"Lists all environments. Zero changes.",desc:"See dev/staging/prod environments"},
    {cmd:"knife status",               risk:"SAFE", type:"READ",    target:"Chef Server",  undo:"N/A",  impact:"Shows last chef-client run time for all nodes.",desc:"Health check — see which nodes are stale"},
    {cmd:"knife search node 'role:X'", risk:"SAFE", type:"READ",    target:"Chef Server",  undo:"N/A",  impact:"Searches node index. Zero changes.",desc:"Find all nodes with a specific role"},
    {cmd:"chef-client --why-run",      risk:"SAFE", type:"DRYRUN",  target:"Node",         undo:"N/A",  impact:"Shows what WOULD change without actually changing anything. Safe to run always.",desc:"Dry-run — preview changes"},
    {cmd:"ohai",                       risk:"SAFE", type:"READ",    target:"Node",         undo:"N/A",  impact:"Collects and prints node attributes. Read-only.",desc:"Inspect Ohai-collected node facts"},
    // WRITE — Workstation only
    {cmd:"chef generate cookbook CB",  risk:"SAFE", type:"CREATE",  target:"Workstation",  undo:"rm -rf cookbooks/CB",impact:"Creates local files only. Nothing on Chef Server.",desc:"Generate cookbook directory structure"},
    {cmd:"chef generate recipe NAME",  risk:"SAFE", type:"CREATE",  target:"Workstation",  undo:"rm file",impact:"Creates local .rb file only.",desc:"Add a new recipe to existing cookbook"},
    {cmd:"knife ssl fetch",            risk:"SAFE", type:"CONFIG",  target:"Workstation",  undo:"rm .chef/trusted_certs",impact:"Downloads Chef Server SSL cert. No server state changes.",desc:"Establish SSL trust"},
    // WRITE — Chef Server
    {cmd:"knife cookbook upload CB",   risk:"LOW",  type:"WRITE",   target:"Chef Server",  undo:"knife cookbook delete CB VER",impact:"Adds cookbook to Chef Server. Nodes unaffected until next chef-client run.",desc:"Upload cookbook to Chef Server"},
    {cmd:"knife role from file R.rb",  risk:"MED",  type:"WRITE",   target:"Chef Server",  undo:"knife role from file BACKUP.rb",impact:"Updates role definition on Chef Server. All nodes with this role will get new run-list on next run.",desc:"Upload/update a role definition"},
    {cmd:"knife environment from file E.rb",risk:"MED",type:"WRITE",target:"Chef Server",  undo:"knife environment from file BACKUP.rb",impact:"Updates environment on Chef Server. Version pins change. Affects all nodes in that env on next run.",desc:"Update environment cookbook version pins"},
    {cmd:"knife node run_list add NODE R",risk:"MED",type:"WRITE",  target:"Chef Server",  undo:"knife node run_list remove NODE R",impact:"Updates node's run-list immediately on Chef Server. Takes effect on next chef-client run.",desc:"Add recipe or role to node's run-list"},
    {cmd:"knife node environment_set NODE ENV",risk:"LOW",type:"WRITE",target:"Chef Server",undo:"knife node environment_set NODE _default",impact:"Changes node's environment. Cookbook version pins of new environment apply next run.",desc:"Move node to a different environment"},
    // RUN — Triggers chef-client
    {cmd:"knife ssh 'name:NODE' 'sudo chef-client'",risk:"MED",type:"RUN",target:"Node",undo:"Reverse changes in cookbook, re-run",impact:"Runs chef-client NOW on target node. Applies all run-list recipes. System changes happen.",desc:"Manual trigger chef-client on one node"},
    {cmd:"knife ssh 'role:X' 'sudo chef-client'",risk:"HIGH",type:"RUN",target:"Multiple Nodes",undo:"Reverse cookbook changes, re-run fleet",impact:"Runs chef-client on ALL nodes in role simultaneously. Multi-server system changes.",desc:"Run chef-client across entire role"},
    {cmd:"knife ssh 'chef_environment:prod' '...' -C 5",risk:"HIGH",type:"RUN",target:"Production Fleet",undo:"30-second rollback procedure",impact:"Triggers chef-client on all production nodes, 5 concurrent. Major infrastructure change.",desc:"Production fleet-wide deploy (concurrency 5)"},
    // DELETE
    {cmd:"knife cookbook delete CB VER",risk:"HIGH",type:"DELETE",  target:"Chef Server",  undo:"knife cookbook upload CB",impact:"Removes cookbook version from Chef Server. Nodes that need it will fail next chef-client run.",desc:"Delete a cookbook version"},
    {cmd:"knife node delete NODE",     risk:"HIGH",type:"DELETE",   target:"Chef Server",  undo:"Re-bootstrap: knife bootstrap IP -N NODE",impact:"Removes node object from Chef Server. Node's chef-client will fail auth until re-bootstrapped.",desc:"Unregister a node from Chef Server"},
    {cmd:"knife role delete ROLE",     risk:"CRIT",type:"DELETE",   target:"Chef Server",  undo:"knife role from file BACKUP.rb",impact:"Deletes role. All nodes referencing this role will get converge error next run.",desc:"Delete a role — breaks dependent nodes"},
    // BOOTSTRAP
    {cmd:"knife bootstrap IP -N NAME", risk:"LOW",  type:"INSTALL", target:"New Node",     undo:"knife node delete NAME + rm chef-client",impact:"Installs chef-client on remote server. Registers node. Runs any initial run-list.",desc:"Install chef-client and register node"},
  ];

  const types = ["ALL","READ","WRITE","RUN","DELETE","CREATE","DRYRUN","INSTALL","CONFIG"];
  const filtered = commands.filter(c =>
    (filter==="ALL" || c.type===filter) &&
    (search==="" || c.cmd.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <SectionTitle icon="⌨️" title="Command Impact Map"
        sub="Every knife/chef command — what it touches, risk level, and how to undo it"
        color={P.orange}/>

      {/* Legend */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:16}}>
        {Object.entries(RISK).map(([k,v])=>(
          <div key={k} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",
            borderRadius:20,background:v.bg,border:`1px solid ${v.color}44`}}>
            <div style={{width:8,height:8,borderRadius:"50%",background:v.color}}/>
            <span style={{fontSize:11,color:v.color,fontFamily:"'JetBrains Mono',monospace",fontWeight:700}}>{k}</span>
          </div>
        ))}
        <span style={{color:P.textFaint,fontSize:11,alignSelf:"center"}}>— risk escalates →</span>
      </div>

      {/* Filter + Search */}
      <div style={{display:"flex",gap:10,marginBottom:16,flexWrap:"wrap"}}>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          placeholder="Search commands..." style={{
            flex:1,minWidth:200,padding:"8px 14px",borderRadius:6,
            background:P.bg2,border:`1px solid ${P.border}`,color:P.text,
            fontSize:13,fontFamily:"'Space Grotesk',sans-serif",outline:"none"
          }}/>
        <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
          {types.map(t=>(
            <button key={t} onClick={()=>setFilter(t)} style={{
              padding:"6px 12px",borderRadius:6,cursor:"pointer",fontSize:11,
              fontFamily:"'JetBrains Mono',monospace",fontWeight:700,
              background:filter===t?`${P.orange}22`:P.bg2,
              border:`1px solid ${filter===t?P.orange:P.border}`,
              color:filter===t?P.orange:P.textDim
            }}>{t}</button>
          ))}
        </div>
      </div>

      {/* Command cards */}
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {filtered.map((c,i)=>{
          const r = RISK[c.risk];
          return (
            <div key={i} style={{background:P.bg2,border:`1px solid ${P.border}`,
              borderLeft:`3px solid ${r.color}`,borderRadius:8,padding:"12px 16px"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12,flexWrap:"wrap"}}>
                <div style={{flex:"0 0 auto"}}>
                  <Badge label={c.risk} color={r.color}/>
                </div>
                <div style={{flex:"0 0 auto"}}>
                  <Badge label={c.type} color={P.textFaint}/>
                </div>
                <code style={{flex:"1 1 300px",fontFamily:"'JetBrains Mono',monospace",fontSize:12,
                  color:P.teal,background:P.bg1,padding:"4px 10px",borderRadius:4}}>{c.cmd}</code>
                <div style={{flex:"1 1 200px"}}>
                  <div style={{color:P.textDim,fontSize:12}}>{c.desc}</div>
                  <div style={{color:P.textFaint,fontSize:11,marginTop:2}}>→ {c.target}</div>
                </div>
              </div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginTop:10}}>
                <div style={{padding:"6px 10px",borderRadius:4,background:`${r.color}11`,fontSize:11,color:P.textDim,lineHeight:1.5}}>
                  <span style={{color:r.color,fontWeight:700}}>Impact: </span>{c.impact}
                </div>
                <div style={{padding:"6px 10px",borderRadius:4,background:`${P.blue}11`,fontSize:11,color:P.textDim,lineHeight:1.5}}>
                  <span style={{color:P.blue,fontWeight:700}}>Undo: </span>
                  <code style={{fontFamily:"'JetBrains Mono',monospace",color:P.blue,fontSize:11}}>{c.undo}</code>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// TAB 4: PRE/POST CHECKS
// ══════════════════════════════════════════════════════════
const ChecksTab = () => {
  const [active, setActive] = useState("deploy");
  const [checked, setChecked] = useState({});
  const toggleCheck = id => setChecked(c=>({...c,[id]:!c[id]}));

  const scenarios = {
    deploy: {
      title:"🚀 Cookbook Deploy", color:P.green,
      pre:[
        {id:"p1", cmd:"knife cookbook show CB VERSION", desc:"Verify correct version is being uploaded"},
        {id:"p2", cmd:"knife node show NODE -a chef_environment", desc:"Confirm node is in correct environment"},
        {id:"p3", cmd:"knife environment show ENV", desc:"Check version pins won't break anything"},
        {id:"p4", cmd:"knife node show NODE | grep run_list", desc:"Verify run-list is correct before running"},
        {id:"p5", cmd:"cookstyle cookbooks/CB/", desc:"Lint check — no syntax errors"},
        {id:"p6", cmd:"knife cookbook upload CB && knife cookbook list | grep CB", desc:"Upload and verify it landed on server"},
        {id:"p7", cmd:"knife ssh 'name:NODE' 'sudo chef-client --why-run'", desc:"Dry-run — preview what will change"},
      ],
      post:[
        {id:"q1", cmd:"systemctl status SERVICE", desc:"Service is running post-converge"},
        {id:"q2", cmd:"curl -s http://NODE_IP/ | head", desc:"Application is responding"},
        {id:"q3", cmd:"diff /etc/service/config <(knife cookbook show CB VER templates)", desc:"Config rendered correctly"},
        {id:"q4", cmd:"tail -50 /var/log/chef/client.log", desc:"No errors in chef-client log"},
        {id:"q5", cmd:"knife node show NODE | grep 'normal.*CB'", desc:"Node attributes updated correctly"},
        {id:"q6", cmd:"knife runs list NODE --limit 1", desc:"Latest run shows success on Chef Server"},
      ]
    },
    bootstrap: {
      title:"⚙️ Bootstrap New Node", color:P.blue,
      pre:[
        {id:"b1", cmd:"ping NODE_IP", desc:"Node is network reachable"},
        {id:"b2", cmd:"ssh vagrant@NODE_IP 'hostname'", desc:"SSH access works with correct user"},
        {id:"b3", cmd:"cat /etc/hosts | grep chef-server", desc:"Chef Server hostname resolves on workstation"},
        {id:"b4", cmd:"knife client list | grep validator", desc:"Validator key is present"},
        {id:"b5", cmd:"knife ssl check", desc:"SSL certificate is trusted"},
        {id:"b6", cmd:"knife node list | grep NODE_NAME", desc:"Confirm node name not already in use"},
      ],
      post:[
        {id:"c1", cmd:"knife node list | grep NODE_NAME", desc:"Node registered successfully"},
        {id:"c2", cmd:"knife node show NODE_NAME", desc:"Node shows correct platform and Ohai facts"},
        {id:"c3", cmd:"ssh vagrant@NODE_IP 'chef-client --version'", desc:"chef-client installed and functional"},
        {id:"c4", cmd:"ssh vagrant@NODE_IP 'sudo chef-client'", desc:"Manual run completes with no errors"},
      ]
    },
    template: {
      title:"📋 Template Change", color:P.purple,
      pre:[
        {id:"t1", cmd:"httpd -t  # OR nginx -t", desc:"Verify current config is valid BEFORE changing"},
        {id:"t2", cmd:"cp /etc/httpd/conf/httpd.conf /tmp/httpd.conf.bak.$(date +%Y%m%d)", desc:"Backup current config file"},
        {id:"t3", cmd:"grep -n 'Listen\\|ServerName\\|KeepAlive' /etc/httpd/conf/httpd.conf", desc:"Record current key values"},
        {id:"t4", cmd:"diff templates/default/httpd.conf.erb <(ssh root@NODE cat /etc/httpd/conf/httpd.conf)", desc:"Understand what will change"},
        {id:"t5", cmd:"knife node show NODE -a apache", desc:"Check current attribute values"},
        {id:"t6", cmd:"sudo chef-client --why-run", desc:"Dry-run the template change"},
      ],
      post:[
        {id:"u1", cmd:"httpd -t", desc:"Config syntax is valid after template render"},
        {id:"u2", cmd:"diff /tmp/httpd.conf.bak.DATE /etc/httpd/conf/httpd.conf", desc:"Diff shows only expected changes"},
        {id:"u3", cmd:"systemctl status httpd", desc:"Apache restarted and running"},
        {id:"u4", cmd:"curl -I http://127.0.0.1/ | head -3", desc:"HTTP returning 200 OK"},
        {id:"u5", cmd:"tail -20 /var/log/httpd/error_log", desc:"No errors in Apache log"},
        {id:"u6", cmd:"grep 'Listen' /etc/httpd/conf/httpd.conf", desc:"Port is set to expected value"},
      ]
    },
    attribute: {
      title:"🏷️ Attribute Change", color:P.gold,
      pre:[
        {id:"a1", cmd:"knife node show NODE -a cookbook_name", desc:"Record CURRENT attribute values before change"},
        {id:"a2", cmd:"knife environment show ENV | grep cookbook_name", desc:"Check if env overrides exist"},
        {id:"a3", cmd:"grep -r \"\\['key'\\]\" cookbooks/CB/recipes/", desc:"Find all places the attribute is used"},
        {id:"a4", cmd:"grep -r \"@key\" cookbooks/CB/templates/", desc:"Find all template references to the attribute"},
        {id:"a5", cmd:"sudo chef-client --why-run", desc:"Dry run shows what templates/files will regenerate"},
      ],
      post:[
        {id:"d1", cmd:"knife node show NODE -a cookbook_name", desc:"Attribute has new value on Chef Server node object"},
        {id:"d2", cmd:"cat /etc/service/config | grep key", desc:"Rendered file has new value"},
        {id:"d3", cmd:"systemctl status SERVICE", desc:"Service restarted after config change"},
        {id:"d4", cmd:"ohai | grep key", desc:"Ohai-level attributes updated correctly"},
      ]
    },
  };

  const scene = scenarios[active];
  const sceneDone = (items) => items.filter(i=>checked[i.id]).length;

  return (
    <div>
      <SectionTitle icon="✅" title="Pre/Post Check Flows"
        sub="Mandatory checks before and after every Chef operation — check off as you go"
        color={P.teal}/>

      {/* Scenario selector */}
      <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
        {Object.entries(scenarios).map(([k,s])=>(
          <button key={k} onClick={()=>setActive(k)} style={{
            padding:"10px 18px",borderRadius:8,cursor:"pointer",
            background:active===k?`${s.color}22`:P.bg2,
            border:`1px solid ${active===k?s.color:P.border}`,
            color:active===k?s.color:P.textDim,
            fontFamily:"'Space Grotesk',sans-serif",fontSize:13,fontWeight:active===k?700:400,
            transition:"all 0.2s"
          }}>{s.title}</button>
        ))}
        <button onClick={()=>setChecked({})} style={{
          padding:"10px 18px",borderRadius:8,cursor:"pointer",marginLeft:"auto",
          background:"none",border:`1px solid ${P.border}`,color:P.textFaint,fontSize:12
        }}>Reset Checks</button>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        {/* PRE-CHECKS */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,
              color:scene.color}}>⬡ PRE-CHECKS</div>
            <span style={{color:P.textDim,fontSize:12}}>
              {sceneDone(scene.pre)}/{scene.pre.length} done
            </span>
          </div>
          <div style={{height:6,background:P.bg3,borderRadius:3,marginBottom:14,overflow:"hidden"}}>
            <div style={{height:"100%",background:scene.color,borderRadius:3,
              width:`${(sceneDone(scene.pre)/scene.pre.length)*100}%`,transition:"width 0.3s"}}/>
          </div>
          {scene.pre.map((item,i)=>(
            <div key={item.id} onClick={()=>toggleCheck(item.id)}
              style={{cursor:"pointer",marginBottom:6,padding:"10px 14px",borderRadius:8,
                background:checked[item.id]?`${scene.color}15`:P.bg2,
                border:`1px solid ${checked[item.id]?scene.color:P.border}`,
                transition:"all 0.15s"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                <span style={{fontSize:16,lineHeight:1,flexShrink:0,color:checked[item.id]?scene.color:P.borderLight}}>
                  {checked[item.id]?"☑":"☐"}
                </span>
                <div style={{flex:1}}>
                  <code style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,
                    color:checked[item.id]?scene.color:P.teal,
                    display:"block",marginBottom:3,lineHeight:1.4}}>{item.cmd}</code>
                  <span style={{color:P.textDim,fontSize:11}}>{item.desc}</span>
                </div>
                <span style={{color:P.textFaint,fontSize:11,flexShrink:0}}>{i+1}/{scene.pre.length}</span>
              </div>
            </div>
          ))}
        </div>

        {/* POST-CHECKS */}
        <div>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:16,fontWeight:800,
              color:P.green}}>✓ POST-CHECKS</div>
            <span style={{color:P.textDim,fontSize:12}}>
              {sceneDone(scene.post)}/{scene.post.length} done
            </span>
          </div>
          <div style={{height:6,background:P.bg3,borderRadius:3,marginBottom:14,overflow:"hidden"}}>
            <div style={{height:"100%",background:P.green,borderRadius:3,
              width:`${(sceneDone(scene.post)/scene.post.length)*100}%`,transition:"width 0.3s"}}/>
          </div>
          {scene.post.map((item,i)=>(
            <div key={item.id} onClick={()=>toggleCheck(item.id)}
              style={{cursor:"pointer",marginBottom:6,padding:"10px 14px",borderRadius:8,
                background:checked[item.id]?`${P.green}15`:P.bg2,
                border:`1px solid ${checked[item.id]?P.green:P.border}`,
                transition:"all 0.15s"}}>
              <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
                <span style={{fontSize:16,lineHeight:1,flexShrink:0,color:checked[item.id]?P.green:P.borderLight}}>
                  {checked[item.id]?"☑":"☐"}
                </span>
                <div style={{flex:1}}>
                  <code style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,
                    color:checked[item.id]?P.green:P.teal,
                    display:"block",marginBottom:3,lineHeight:1.4}}>{item.cmd}</code>
                  <span style={{color:P.textDim,fontSize:11}}>{item.desc}</span>
                </div>
                <span style={{color:P.textFaint,fontSize:11,flexShrink:0}}>{i+1}/{scene.post.length}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick snapshot command */}
      <Card style={{marginTop:20,borderColor:P.gold,borderLeft:`3px solid ${P.gold}`,background:`${P.gold}08`}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:P.gold,marginBottom:10}}>
          💡 ALWAYS RUN THIS BEFORE ANY CHANGE — 2-Minute Snapshot
        </div>
        <pre style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:P.teal,
          background:P.bg1,padding:14,borderRadius:6,lineHeight:1.7,overflowX:"auto"}}>{`# Save to: ~/snapshots/$(date +%Y%m%d_%H%M%S)/
SNAP=~/snapshots/$(date +%Y%m%d_%H%M%S) && mkdir -p $SNAP

# Chef Server state
knife cookbook list > $SNAP/cookbooks.txt
knife role list     > $SNAP/roles.txt
knife environment list > $SNAP/environments.txt
knife node show NODE_NAME > $SNAP/node.txt

# Affected config files (on the node)
cp /etc/httpd/conf/httpd.conf  $SNAP/httpd.conf.bak  2>/dev/null
cp /etc/nginx/nginx.conf       $SNAP/nginx.conf.bak   2>/dev/null

# Auto-generate rollback commands
echo "knife cookbook upload CB $(knife cookbook show CB | grep Version | head -1 | awk '{print $2}')" > $SNAP/ROLLBACK.sh
echo "Change saved. Rollback: cat $SNAP/ROLLBACK.sh"`}</pre>
      </Card>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// TAB 5: ROLLBACK DECISION TREE
// ══════════════════════════════════════════════════════════
const RollbackTab = () => {
  const [active, setActive] = useState(null);

  const scenarios = [
    {
      id:"before_merge",
      icon:"🌿",color:P.blue,
      title:"Broke in Dev — Before PR Merge",
      risk:"SAFE",
      when:"You made changes locally or in a feature branch. Nothing uploaded to Chef Server yet.",
      steps:[
        {type:"cmd",text:"git diff HEAD                   # see all local changes"},
        {type:"cmd",text:"git checkout -- recipes/default.rb  # restore one file"},
        {type:"cmd",text:"git checkout -- .                   # restore EVERYTHING (nuclear)"},
        {type:"cmd",text:"git stash                           # save changes without discarding"},
        {type:"note",text:"No Chef Server state was changed. No nodes affected. Git undo is sufficient."},
      ],
      impact:"Zero — nothing reached Chef Server",
      time:"< 30 seconds"
    },
    {
      id:"uploaded_not_deployed",
      icon:"📦",color:P.gold,
      title:"Cookbook Uploaded, Not Yet Run",
      risk:"LOW",
      when:"knife cookbook upload ran but chef-client has NOT run on any node yet.",
      steps:[
        {type:"note",text:"Nodes are still running the OLD cookbook version — you have time."},
        {type:"cmd",text:"knife cookbook upload COOKBOOK  # re-upload the PREVIOUS good version"},
        {type:"note",text:"OR pin environment back to old version:"},
        {type:"cmd",text:"knife environment show ENV      # note current pin"},
        {type:"cmd",text:"knife environment edit ENV      # change version pin back"},
        {type:"note",text:"If bad version must be removed entirely:"},
        {type:"cmd",text:"knife cookbook delete COOKBOOK BAD_VERSION --yes"},
        {type:"cmd",text:"git revert HEAD --no-edit && git push  # revert in git"},
      ],
      impact:"No nodes affected yet — clean window to fix",
      time:"2-5 minutes"
    },
    {
      id:"one_node_failed",
      icon:"🖥️",color:P.orange,
      title:"Canary Node Failed",
      risk:"MED",
      when:"chef-client ran on the first (canary) node and something broke. Other nodes not yet run.",
      steps:[
        {type:"note",text:"STOP — do not run chef-client on remaining nodes."},
        {type:"cmd",text:"# Option 1: Restore environment version pin (fastest)"},
        {type:"cmd",text:"knife environment from file $SNAP/environments/ENV.json"},
        {type:"cmd",text:"knife node run_list set CANARY_NODE 'role[web-server]'  # reset run-list"},
        {type:"cmd",text:"knife ssh 'name:CANARY_NODE' 'sudo chef-client' -x user  # reconverge"},
        {type:"cmd",text:""},
        {type:"cmd",text:"# Option 2: Re-upload working cookbook version"},
        {type:"cmd",text:"git checkout GOOD_TAG -- cookbooks/COOKBOOK/"},
        {type:"cmd",text:"knife cookbook upload COOKBOOK"},
        {type:"cmd",text:"knife ssh 'name:CANARY_NODE' 'sudo chef-client' -x user"},
        {type:"cmd",text:""},
        {type:"note",text:"Verify canary is healthy BEFORE touching fleet:"},
        {type:"cmd",text:"curl http://CANARY_IP/  &&  systemctl status SERVICE"},
      ],
      impact:"One node affected. Fleet is safe if you stop now.",
      time:"5-10 minutes"
    },
    {
      id:"full_fleet",
      icon:"🔥",color:P.red,
      title:"Full Production Fleet Affected",
      risk:"CRIT",
      when:"chef-client ran on all production nodes. Service is down or degraded.",
      steps:[
        {type:"warn",text:"INCIDENT IN PROGRESS — communicate to team immediately."},
        {type:"note",text:"STEP 1: Pin environment back to last known good version"},
        {type:"cmd",text:"knife environment from file $SNAP/environments/prod.json"},
        {type:"note",text:"STEP 2: Restore roles from snapshot"},
        {type:"cmd",text:"knife role from file $SNAP/roles/web_server.json"},
        {type:"note",text:"STEP 3: Restore node run-lists if changed"},
        {type:"cmd",text:"knife node from file $SNAP/nodes/NODE.json"},
        {type:"note",text:"STEP 4: Re-upload the last good cookbook version"},
        {type:"cmd",text:"git checkout LAST_GOOD_TAG -- cookbooks/COOKBOOK/"},
        {type:"cmd",text:"knife cookbook upload COOKBOOK"},
        {type:"note",text:"STEP 5: Re-converge all production nodes"},
        {type:"cmd",text:"knife ssh 'chef_environment:production' 'sudo chef-client' -x user -C 5"},
        {type:"note",text:"STEP 6: Verify health"},
        {type:"cmd",text:"knife status 'chef_environment:production'  # all nodes recent"},
        {type:"cmd",text:"for node in $(knife node list); do curl -s http://$node/ | head -1; done"},
        {type:"note",text:"STEP 7: Revert git AFTER system is stable"},
        {type:"cmd",text:"git revert HEAD --no-edit && git push origin main"},
      ],
      impact:"All production nodes. Requires incident response.",
      time:"10-30 minutes depending on fleet size"
    },
    {
      id:"template_broke",
      icon:"📋",color:P.purple,
      title:"Bad Template — Service Won't Start",
      risk:"HIGH",
      when:"ERB template rendered a broken config file. Service fails to start.",
      steps:[
        {type:"note",text:"IMMEDIATE: Check config syntax on the node"},
        {type:"cmd",text:"httpd -t       # Apache: Syntax OK or error details"},
        {type:"cmd",text:"nginx -t       # Nginx: test configuration"},
        {type:"note",text:"OPTION A: Restore config from backup (fastest)"},
        {type:"cmd",text:"cp /tmp/httpd.conf.bak.DATE /etc/httpd/conf/httpd.conf"},
        {type:"cmd",text:"systemctl start httpd  && httpd -t"},
        {type:"note",text:"OPTION B: Fix template, re-upload, re-run chef-client"},
        {type:"cmd",text:"vi cookbooks/CB/templates/default/httpd.conf.erb  # fix the ERB"},
        {type:"cmd",text:"knife cookbook upload CB"},
        {type:"cmd",text:"sudo chef-client -z -r 'recipe[webserver]'"},
        {type:"note",text:"OPTION C: Emergency manual fix on the node (then fix code)"},
        {type:"cmd",text:"ssh root@NODE_IP"},
        {type:"cmd",text:"vi /etc/httpd/conf/httpd.conf  # direct edit"},
        {type:"cmd",text:"systemctl restart httpd"},
        {type:"warn",text:"WARNING: Manual edit will be overwritten on next chef-client run. Fix the template immediately."},
      ],
      impact:"Service down on affected nodes until config fixed",
      time:"2-15 minutes"
    },
    {
      id:"drift_detected",
      icon:"🔄",color:P.teal,
      title:"Configuration Drift Detected",
      risk:"LOW",
      when:"A node diverged from desired state (manual change detected). Not broken, just inconsistent.",
      steps:[
        {type:"note",text:"Chef's normal converge will fix drift automatically. But verify first:"},
        {type:"cmd",text:"sudo chef-client --why-run  # see what chef-client WOULD change"},
        {type:"note",text:"If why-run shows expected changes, just converge normally:"},
        {type:"cmd",text:"sudo chef-client  # converge — reverts drift"},
        {type:"note",text:"If why-run shows unexpected changes, investigate first:"},
        {type:"cmd",text:"knife node show NODE -a recipe  # what cookbooks are running?"},
        {type:"cmd",text:"git log --oneline -10 cookbooks/CB/  # recent changes?"},
        {type:"note",text:"After converge, confirm node is back to desired state:"},
        {type:"cmd",text:"knife node show NODE  # check all attributes"},
        {type:"cmd",text:"systemctl status SERVICE && curl http://NODE_IP/"},
      ],
      impact:"Node inconsistent but functional. Normal chef-client run fixes it.",
      time:"< 5 minutes"
    },
  ];

  return (
    <div>
      <SectionTitle icon="↩️" title="Rollback Decision Trees"
        sub="What to do when things go wrong — choose your scenario"
        color={P.red}/>

      {/* Scenario selector */}
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20}}>
        {scenarios.map(s=>(
          <div key={s.id} onClick={()=>setActive(active===s.id?null:s.id)}
            style={{cursor:"pointer",padding:"14px 16px",borderRadius:10,
              background:active===s.id?`${s.color}18`:P.bg2,
              border:`1px solid ${active===s.id?s.color:P.border}`,
              transition:"all 0.2s"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:6}}>
              <span style={{fontSize:22}}>{s.icon}</span>
              <Badge label={s.risk} color={s.color}/>
            </div>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,
              color:active===s.id?s.color:P.text,lineHeight:1.3,marginBottom:4}}>{s.title}</div>
            <div style={{color:P.textFaint,fontSize:10}}>⏱ {s.time}</div>
          </div>
        ))}
      </div>

      {/* Active scenario detail */}
      {scenarios.filter(s=>s.id===active).map(s=>(
        <Card key={s.id} style={{borderColor:s.color,borderLeft:`4px solid ${s.color}`,background:`${s.color}06`}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:16}}>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
                <span style={{fontSize:24}}>{s.icon}</span>
                <span style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:s.color}}>{s.title}</span>
                <Badge label={s.risk+" RISK"} color={s.color}/>
              </div>
              <div style={{padding:"8px 14px",borderRadius:6,background:P.bg3,fontSize:12,color:P.textDim,
                borderLeft:`2px solid ${s.color}66`,marginBottom:6}}>
                <strong style={{color:P.text}}>When to use: </strong>{s.when}
              </div>
              <div style={{display:"flex",gap:16,fontSize:12,color:P.textDim}}>
                <span><strong style={{color:P.text}}>Impact: </strong>{s.impact}</span>
                <span><strong style={{color:P.text}}>Time: </strong>{s.time}</span>
              </div>
            </div>
          </div>

          <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:P.textDim,
            letterSpacing:1,marginBottom:10}}>ROLLBACK STEPS</div>
          <div style={{display:"flex",flexDirection:"column",gap:4}}>
            {s.steps.map((step,i)=>{
              if(step.type==="cmd") return (
                <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                  <span style={{color:P.textFaint,fontSize:11,fontFamily:"'JetBrains Mono',monospace",
                    minWidth:20,textAlign:"right"}}>{step.text?`${i+1}.`:""}</span>
                  {step.text && <pre style={{flex:1,fontFamily:"'JetBrains Mono',monospace",fontSize:12,
                    color:P.teal,background:P.bg1,padding:"6px 12px",borderRadius:6,
                    border:`1px solid ${P.border}`,margin:0,overflowX:"auto"}}>{step.text}</pre>}
                </div>
              );
              if(step.type==="note") return (
                <div key={i} style={{padding:"6px 12px",borderRadius:4,
                  background:`${P.blue}11`,borderLeft:`2px solid ${P.blue}`,
                  fontSize:12,color:P.blue,fontStyle:"italic"}}>{step.text}</div>
              );
              if(step.type==="warn") return (
                <div key={i} style={{padding:"8px 14px",borderRadius:4,
                  background:`${P.red}11`,border:`1px solid ${P.red}33`,
                  fontSize:12,color:P.red,fontWeight:600}}>⚠️ {step.text}</div>
              );
              return null;
            })}
          </div>
        </Card>
      ))}

      {/* 30-second rollback */}
      <Card style={{marginTop:16,borderColor:P.red,borderLeft:`3px solid ${P.red}`,background:`${P.red}06`}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,color:P.red,marginBottom:10}}>
          🔥 30-SECOND EMERGENCY ROLLBACK — Production Fleet
        </div>
        <pre style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color:P.teal,
          background:P.bg1,padding:14,borderRadius:6,lineHeight:1.8,overflowX:"auto"}}>{`# Replace $SNAP with your snapshot directory from before the change
SNAP=~/snapshots/YYYYMMDD_HHMMSS

knife environment from file $SNAP/environments/env_production.json  # restore env pins
knife role from file $SNAP/roles/role_web_server.json               # restore role
knife ssh 'chef_environment:production' 'sudo chef-client' \\
  -x rhel-user -C 5                                                  # reconverge 5-at-a-time
knife cookbook delete COOKBOOK BAD_VERSION --yes                     # remove bad version
git revert HEAD --no-edit && git push origin main                    # revert git

# Verify
knife status 'chef_environment:production'   # all green?
curl -s http://PRODUCTION_VIP/health         # app healthy?`}</pre>
      </Card>
    </div>
  );
};

// ══════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════
export default function App() {
  const [tab, setTab] = useState("mental");

  return (
    <div style={{minHeight:"100vh",background:P.bg0,color:P.text}}>
      <style>{FONTS+css}</style>

      {/* Header */}
      <div style={{background:P.bg1,borderBottom:`1px solid ${P.border}`,
        padding:"0 24px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:1200,margin:"0 auto",display:"flex",alignItems:"center",gap:20}}>
          <div style={{padding:"14px 0"}}>
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,
              color:P.red,letterSpacing:-0.5}}>Chef</span>
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:400,
              color:P.textDim,letterSpacing:-0.5}}> Mental Model</span>
            <span style={{marginLeft:12,fontSize:11,color:P.textFaint,
              fontFamily:"'JetBrains Mono',monospace"}}>v2.0 · Deep Reference</span>
          </div>
          <div style={{display:"flex",gap:2,marginLeft:"auto",flexWrap:"wrap"}}>
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)} style={{
                padding:"8px 16px",border:"none",cursor:"pointer",
                background:tab===t.id?`${P.red}22`:"transparent",
                borderBottom:tab===t.id?`2px solid ${P.red}`:"2px solid transparent",
                color:tab===t.id?P.red:P.textDim,
                fontFamily:"'Space Grotesk',sans-serif",fontSize:13,fontWeight:tab===t.id?700:400,
                transition:"all 0.15s",display:"flex",alignItems:"center",gap:6,
              }}>
                <span>{t.icon}</span><span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{maxWidth:1200,margin:"0 auto",padding:"28px 24px"}}>
        {tab==="mental"   && <MentalModelTab/>}
        {tab==="flow"     && <RunFlowTab/>}
        {tab==="commands" && <CommandImpactTab/>}
        {tab==="checks"   && <ChecksTab/>}
        {tab==="rollback" && <RollbackTab/>}
      </div>
    </div>
  );
}
