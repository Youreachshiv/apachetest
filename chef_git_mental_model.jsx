import { useState } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Syne:wght@400;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap');`;
const css = `*{box-sizing:border-box;margin:0;padding:0}body{background:#0a0c10;color:#e2e8f0;font-family:'Space Grotesk',sans-serif}::-webkit-scrollbar{width:6px;height:6px}::-webkit-scrollbar-track{background:#1a1f2e}::-webkit-scrollbar-thumb{background:#3a4460;border-radius:3px}.mono{font-family:'JetBrains Mono',monospace}`;

const P = {
  bg0:"#0a0c10",bg1:"#0f1117",bg2:"#161b27",bg3:"#1e2438",bg4:"#252d42",
  border:"#2a3248",borderLight:"#3a4460",
  red:"#e05252",redDim:"#c0392b",redGlow:"rgba(224,82,82,0.15)",
  green:"#4ade80",greenDim:"#22c55e",greenGlow:"rgba(74,222,128,0.12)",
  blue:"#60a5fa",blueDim:"#3b82f6",blueGlow:"rgba(96,165,250,0.12)",
  orange:"#fb923c",orangeDim:"#f97316",orangeGlow:"rgba(251,146,60,0.12)",
  purple:"#c084fc",purpleDim:"#a855f7",purpleGlow:"rgba(192,132,252,0.12)",
  teal:"#2dd4bf",tealDim:"#14b8a6",tealGlow:"rgba(45,212,191,0.12)",
  gold:"#fbbf24",goldDim:"#f59e0b",goldGlow:"rgba(251,191,36,0.12)",
  pink:"#f472b6",
  text:"#e2e8f0",textDim:"#94a3b8",textFaint:"#475569",
};

// ── Shared ───────────────────────────────────────────────
const Tag=({c,children,sm})=>(<span style={{display:"inline-flex",alignItems:"center",gap:3,padding:sm?"2px 6px":"3px 10px",borderRadius:4,fontSize:sm?10:11,fontWeight:700,letterSpacing:0.5,fontFamily:"'JetBrains Mono',monospace",background:`${c}22`,color:c,border:`1px solid ${c}44`}}>{children}</span>);
const Badge=({label,color})=>(<span style={{padding:"2px 8px",borderRadius:12,fontSize:10,fontWeight:700,letterSpacing:1,background:`${color}20`,color,border:`1px solid ${color}40`,fontFamily:"'JetBrains Mono',monospace",textTransform:"uppercase"}}>{label}</span>);
const Card=({children,style={}})=>(<div style={{background:P.bg2,border:`1px solid ${P.border}`,borderRadius:10,padding:20,...style}}>{children}</div>);
const SectionTitle=({icon,title,sub,color=P.blue})=>(<div style={{marginBottom:24}}><div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}><span style={{fontSize:22}}>{icon}</span><h2 style={{fontFamily:"'Syne',sans-serif",fontSize:22,fontWeight:800,color,letterSpacing:-0.5}}>{title}</h2></div>{sub&&<p style={{color:P.textDim,fontSize:13,paddingLeft:32}}>{sub}</p>}</div>);
const Mono=({children,color=P.teal,bg=P.bg1,size=11})=>(<code style={{fontFamily:"'JetBrains Mono',monospace",fontSize:size,color,background:bg,padding:"2px 8px",borderRadius:4}}>{children}</code>);
const Pre=({children,color=P.teal})=>(<pre style={{fontFamily:"'JetBrains Mono',monospace",fontSize:12,color,background:P.bg1,padding:"12px 14px",borderRadius:7,border:`1px solid ${P.border}`,lineHeight:1.7,overflowX:"auto",margin:0}}>{children}</pre>);
const br=()=><div style={{height:12}}/>;
const Note=({children,c=P.blue})=>(<div style={{padding:"8px 14px",borderRadius:6,background:`${c}11`,borderLeft:`2px solid ${c}`,fontSize:12,color:P.textDim,lineHeight:1.6,marginTop:6}}>{children}</div>);
const Warn=({children})=>(<div style={{padding:"8px 14px",borderRadius:6,background:`${P.orange}10`,border:`1px solid ${P.orange}33`,fontSize:12,color:P.orange,lineHeight:1.6,marginTop:6}}>⚠️ {children}</div>);

// ── TABS ─────────────────────────────────────────────────
const TABS=[
  {id:"mental", icon:"🧠", label:"Mental Model"},
  {id:"git",    icon:"🌿", label:"Git + Chef Flow"},
  {id:"apache", icon:"🌐", label:"Apache Example"},
  {id:"flow",   icon:"⚡", label:"Run Flow"},
  {id:"commands",icon:"⌨️",label:"Command Impact"},
  {id:"checks", icon:"✅", label:"Pre/Post Checks"},
  {id:"rollback",icon:"↩️",label:"Rollback"},
];

// ══════════════════════════════════════════════════════════
// TAB 1 — MENTAL MODEL
// ══════════════════════════════════════════════════════════
const MentalModelTab=()=>{
  const [hov,setHov]=useState(null);
  const nodes=[
    {id:"ws", x:40, y:50, w:200,h:90, c:P.blue,   title:"🖥️ Workstation",  items:["chef generate cookbook","knife upload/bootstrap","cookbooks live here","git pull → edit → push"]},
    {id:"gh", x:280,y:50, w:200,h:90, c:P.orange,  title:"🐙 Git Remote",   items:["GitHub / GitLab / Bitbucket","Source of truth for code","PR review + CI/CD here","Tags = cookbook versions"]},
    {id:"ci", x:520,y:50, w:200,h:90, c:P.pink,    title:"🤖 CI/CD Pipeline",items:["cookstyle lint","ChefSpec unit tests","Berkshelf resolve","knife cookbook upload"]},
    {id:"cs", x:760,y:50, w:200,h:90, c:P.purple,  title:"🗄️ Chef Server",   items:["Stores cookbooks+versions","Stores node objects","Stores roles+environments","REST API on port 443"]},
    {id:"nd", x:760,y:230,w:200,h:90, c:P.green,   title:"⚙️ Node",          items:["chef-client every 30m","Pulls run-list from server","Ohai collects node facts","Applies converge phase"]},
    {id:"cb", x:40, y:230,w:180,h:80, c:P.orange,  title:"📦 Cookbook",      items:["recipes/ — resources","attributes/ — defaults","templates/ — ERB files","metadata.rb — version+depends"]},
    {id:"wr", x:250,y:230,w:180,h:80, c:P.red,     title:"🔧 Wrapper CB",   items:["depends 'apache2'","override attributes","include_recipe 'apache2'","Custom templates only"]},
    {id:"res",x:460,y:230,w:180,h:80, c:P.teal,    title:"🧱 Resource",      items:["package file service","directory template","execute user cron","IDEMPOTENT by default"]},
    {id:"att",x:40, y:400,w:175,h:80, c:P.gold,    title:"🏷️ Attributes",    items:["default < override","node['key'] in recipe","@var in ERB template","Ohai auto-attributes"]},
    {id:"tpl",x:245,y:400,w:175,h:80, c:P.purple,  title:"📋 ERB Template",  items:["<%= @var %> outputs","<% %> logic (no output)","node[] accessible","→ rendered config file"]},
    {id:"rl", x:450,y:400,w:175,h:80, c:P.blue,    title:"📋 Run-List",      items:["recipe[cb::recipe]","role[web-server]","Ordered execution","Per-node on Chef Server"]},
    {id:"env",x:655,y:400,w:175,h:80, c:P.green,   title:"🌍 Environment",   items:["dev / staging / prod","Pin cookbook versions","= '1.0.0' exact pin","Applies to all nodes in env"]},
  ];
  const arrows=[
    {x1:240,y1:90,x2:280,y2:90,lbl:"git push"},
    {x1:480,y1:90,x2:520,y2:90,lbl:"PR merge"},
    {x1:720,y1:90,x2:760,y2:90,lbl:"knife upload"},
    {x1:860,y1:140,x2:860,y2:230,lbl:"chef-client pull"},
    {x1:240,y1:270,x2:250,y2:270,lbl:""},
    {x1:430,y1:270,x2:460,y2:270,lbl:"uses"},
    {x1:140,y1:310,x2:140,y2:400,lbl:"defines"},
    {x1:340,y1:310,x2:340,y2:400,lbl:"owns"},
    {x1:550,y1:310,x2:550,y2:400,lbl:"has a"},
    {x1:760,y1:275,x2:655,y2:440,lbl:"assigned"},
  ];
  return(<div>
    <SectionTitle icon="🧠" title="Chef + Git Architecture Mental Model" sub="Full DevOps loop: code → git → CI → Chef Server → node convergence" color={P.blue}/>
    <Card style={{padding:0,overflow:"hidden",marginBottom:20}}>
      <div style={{padding:"12px 20px",borderBottom:`1px solid ${P.border}`,display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"}}>
        <span style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:P.textDim}}>FULL DEVOPS LOOP</span>
        {[{l:"Dev Tooling",c:P.blue},{l:"Git Layer",c:P.orange},{l:"CI/CD",c:P.pink},{l:"Chef Infra",c:P.purple},{l:"Node",c:P.green}].map(({l,c})=><Badge key={l} label={l} color={c}/>)}
      </div>
      <svg viewBox="0 0 980 510" style={{width:"100%",background:P.bg1,display:"block"}}>
        <defs>
          <marker id="arr" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={P.borderLight}/></marker>
          <filter id="glow"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        </defs>
        {/* Layer guides */}
        <text x="15" y="100" fill={P.textFaint} fontSize="10" fontFamily="JetBrains Mono" transform="rotate(-90,15,100)">TOP LAYER</text>
        <text x="15" y="275" fill={P.textFaint} fontSize="10" fontFamily="JetBrains Mono" transform="rotate(-90,15,275)">COOKBOOK</text>
        <text x="15" y="445" fill={P.textFaint} fontSize="10" fontFamily="JetBrains Mono" transform="rotate(-90,15,445)">POLICY</text>
        <line x1="30" y1="162" x2="970" y2="162" stroke={P.border} strokeWidth="1" strokeDasharray="4,4"/>
        <line x1="30" y1="335" x2="970" y2="335" stroke={P.border} strokeWidth="1" strokeDasharray="4,4"/>
        {arrows.map((a,i)=>(<g key={i}><line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke={P.borderLight} strokeWidth="1.5" markerEnd="url(#arr)"/>{a.lbl&&<text x={(a.x1+a.x2)/2} y={(a.y1+a.y2)/2-5} fill={P.textFaint} fontSize="9" fontFamily="JetBrains Mono" textAnchor="middle">{a.lbl}</text>}</g>))}
        {nodes.map(n=>{const isH=hov===n.id;return(<g key={n.id} onMouseEnter={()=>setHov(n.id)} onMouseLeave={()=>setHov(null)} style={{cursor:"pointer"}}>
          <rect x={n.x} y={n.y} width={n.w} height={n.h} rx="8" fill={isH?`${n.c}22`:`${n.c}0d`} stroke={isH?n.c:`${n.c}55`} strokeWidth={isH?2:1} filter={isH?"url(#glow)":undefined}/>
          <text x={n.x+10} y={n.y+18} fill={n.c} fontSize="12" fontFamily="Syne,sans-serif" fontWeight="700">{n.title}</text>
          {n.items.map((it,ii)=>(<text key={ii} x={n.x+10} y={n.y+34+ii*15} fill={isH?P.text:P.textDim} fontSize="10" fontFamily="JetBrains Mono">{it}</text>))}
        </g>);})}
        <rect x="30" y="470" width="940" height="28" rx="5" fill={P.bg3} stroke={P.border}/>
        <text x="490" y="489" fill={P.textDim} fontSize="11" fontFamily="JetBrains Mono" textAnchor="middle">GIT LOOP: code → push → PR → CI lint/test → merge → knife upload → chef-client converge on node every 30 min</text>
      </svg>
    </Card>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      <Card>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.gold,marginBottom:12}}>⚡ IDEMPOTENCE</div>
        {[["Package missing","Install it",P.green],["Package present","Skip (up to date)",P.blue],["Service stopped","Start it",P.green],["Service running","Skip",P.blue],["File differs","Update it",P.orange],["File matches","Skip",P.blue]].map(([s,a,c],i)=>(
          <div key={i} style={{display:"flex",gap:8,alignItems:"center",padding:"5px 8px",marginBottom:3,borderRadius:5,background:i%2===0?P.bg3:P.bg1,fontSize:11}}>
            <span style={{color:P.textDim,minWidth:150,fontFamily:"'JetBrains Mono',monospace"}}>{s}</span>
            <span style={{color:P.textFaint}}>→</span>
            <span style={{color:P.orange,minWidth:90}}>{a}</span>
            <span style={{color:c,fontWeight:700,marginLeft:"auto"}}>✓</span>
          </div>
        ))}
      </Card>
      <Card>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.purple,marginBottom:12}}>🔄 ATTRIBUTE PRECEDENCE</div>
        {[
          ["1","default (cookbook)","default['x'] = val",P.blue,"Lowest — always overridable"],
          ["2","default (role)","role attrs",P.blue,"Beats cookbook default"],
          ["3","default (environment)","env default attrs",P.teal,"Beats role default"],
          ["4","normal (saved)","normal['x'] = val",P.gold,"Persists between runs"],
          ["5","override (cookbook)","override['x'] = val",P.orange,"Beats all defaults"],
          ["6","override (role/env/node)","node.override['x']",P.red,"Highest — wins always"],
        ].map(([n,nm,k,c,note],i)=>(
          <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"5px 10px",marginBottom:3,borderRadius:5,background:P.bg3,borderLeft:`3px solid ${c}`}}>
            <span style={{color:c,fontFamily:"'JetBrains Mono',monospace",fontSize:11,fontWeight:700,minWidth:14}}>{n}</span>
            <div style={{flex:1}}><div style={{color:P.text,fontSize:11,fontWeight:600}}>{nm}</div><div style={{color:P.textFaint,fontSize:10,fontFamily:"'JetBrains Mono',monospace"}}>{k}</div></div>
            <span style={{color:P.textFaint,fontSize:10,textAlign:"right",maxWidth:120}}>{note}</span>
          </div>
        ))}
        <div style={{marginTop:8,padding:"6px 10px",borderRadius:5,background:`${P.gold}11`,border:`1px solid ${P.gold}33`,fontSize:11,color:P.gold}}>💡 Rule: cookbook default &lt; role &lt; environment &lt; node.override</div>
      </Card>
    </div>
  </div>);
};

// ══════════════════════════════════════════════════════════
// TAB 2 — GIT + CHEF FLOW
// ══════════════════════════════════════════════════════════
const GitTab=()=>{
  const [active,setActive]=useState("workflow");
  const [hovStep,setHovStep]=useState(null);

  const gitVsChef=[
    {what:"Create/edit recipe file",git:"✓ git add + commit + push",chef:"Edit locally, knife upload after commit",where:"GIT",color:P.orange},
    {what:"Create ERB template",git:"✓ git add + commit + push",chef:"Edit locally, knife upload after commit",where:"GIT",color:P.orange},
    {what:"Change attribute defaults",git:"✓ git add + commit + push",chef:"Edit locally, knife upload after commit",where:"GIT",color:P.orange},
    {what:"Update metadata.rb version",git:"✓ MUST commit before upload",chef:"knife cookbook upload",where:"GIT",color:P.orange},
    {what:"Upload cookbook to Chef Server",git:"Triggered by CI or manually after push",chef:"✓ knife cookbook upload CB",where:"CHEF",color:P.purple},
    {what:"Add recipe to node run-list",git:"Run-list stored on Chef Server (not git)",chef:"✓ knife node run_list add NODE recipe[CB]",where:"CHEF",color:P.purple},
    {what:"Create/update role",git:"✓ Keep role files in git (roles/*.rb)",chef:"✓ knife role from file roles/r.rb",where:"BOTH",color:P.teal},
    {what:"Create/update environment",git:"✓ Keep env files in git (environments/)",chef:"✓ knife environment from file e.rb",where:"BOTH",color:P.teal},
    {what:"Bootstrap a new node",git:"✗ Node registration not in git",chef:"✓ knife bootstrap IP -N NAME",where:"CHEF",color:P.purple},
    {what:"Pin cookbook version in env",git:"✓ environment/*.rb file in git",chef:"✓ knife environment from file e.rb",where:"BOTH",color:P.teal},
    {what:"Trigger chef-client on node",git:"✗ Not a git operation",chef:"✓ knife ssh 'name:NODE' 'sudo chef-client'",where:"CHEF",color:P.purple},
    {what:"Rollback to old cookbook version",git:"git revert or checkout tag",chef:"knife cookbook upload CB (old ver)",where:"BOTH",color:P.teal},
  ];

  const gitBranching=[
    {branch:"main / master",color:P.blue,desc:"Production-grade, always deployable. Tags here trigger releases.",rules:["Protected branch — no direct push","Merge via PR with review","CI must pass","Tag = cookbook version (e.g. v2.1.0)"]},
    {branch:"develop",color:P.green,desc:"Integration branch. Staging environment tracks this.",rules:["Feature PRs merge here first","Automated tests run","Upload to staging Chef Server","knife env edit staging → pin new version"]},
    {branch:"feature/TICKET-name",color:P.orange,desc:"Your working branch for a specific change.",rules:["Branch from develop","One feature/fix per branch","Run cookstyle + ChefSpec locally","PR to develop when done"]},
    {branch:"hotfix/fix-name",color:P.red,desc:"Emergency fix directly to main for production.",rules:["Branch from main","Fix only — no new features","Fast PR + merge to BOTH main and develop","Tag new patch version (v2.0.1)"]},
  ];

  const workflowSteps=[
    {n:1, icon:"🍴", title:"Branch from develop", who:"GIT", color:P.orange,
     cmd:"git checkout develop && git pull\ngit checkout -b feature/apache-keepalive-tweak",
     what:"Create your working branch. Never edit on main or develop directly.",
     impact:"Zero impact on Chef Server or nodes. Local only."},
    {n:2, icon:"✏️", title:"Edit cookbook files", who:"LOCAL", color:P.blue,
     cmd:"# Edit attributes:\nvi cookbooks/myapache/attributes/default.rb\n\n# Edit template:\nvi cookbooks/myapache/templates/default/httpd.conf.erb\n\n# Bump version in metadata.rb:\nversion '1.2.1'  # was 1.2.0",
     what:"Make changes to recipes, attributes, templates. Bump version.",
     impact:"Zero impact on Chef Server or nodes. Files on your workstation only."},
    {n:3, icon:"🧪", title:"Test locally (local mode)", who:"LOCAL", color:P.teal,
     cmd:"# Lint check\ncookstyle cookbooks/myapache/\n\n# Unit test (ChefSpec)\ncd cookbooks/myapache && rspec\n\n# Integration test in local mode\nsudo chef-client -z -r 'recipe[myapache]'\n\n# Dry-run preview\nsudo chef-client --why-run -z -r 'recipe[myapache]'",
     what:"Verify your change works before touching any shared environment.",
     impact:"chef-client --local-mode affects your LOCAL system only. No Chef Server."},
    {n:4, icon:"📤", title:"Git commit + push + PR", who:"GIT", color:P.orange,
     cmd:"git add cookbooks/myapache/\ngit commit -m 'feat: tune keepalive timeout to 10s'\ngit push origin feature/apache-keepalive-tweak\n# Open Pull Request → develop on GitHub/GitLab",
     what:"Share your change for review. CI runs cookstyle + ChefSpec on PR.",
     impact:"Triggers CI pipeline. No Chef Server changes yet."},
    {n:5, icon:"🤖", title:"CI/CD runs (auto)", who:"CI", color:P.pink,
     cmd:"# These run automatically on every PR:\ncookstyle cookbooks/myapache/     # style lint\nrspec cookbooks/myapache/          # ChefSpec unit tests\nberks install                      # dependency resolution\n# On merge to develop:\nknife cookbook upload myapache     # upload to STAGING server",
     what:"Pipeline enforces quality gates. Only clean code reaches staging.",
     impact:"On merge: cookbook uploaded to staging Chef Server. Staging nodes get it next run."},
    {n:6, icon:"🔍", title:"Test on staging node", who:"CHEF", color:P.purple,
     cmd:"# Manual trigger on staging canary:\nknife ssh 'name:staging-web-01' 'sudo chef-client' -x user\n\n# Verify:\nssh user@staging-web-01 'grep KeepAliveTimeout /etc/httpd/conf/httpd.conf'\nssh user@staging-web-01 'systemctl status httpd'\nssh user@staging-web-01 'curl -I http://127.0.0.1/'",
     what:"Validate the change on a real server before production.",
     impact:"staging-web-01 is converged with new cookbook. Config file changes."},
    {n:7, icon:"🚀", title:"Merge to main + production deploy", who:"BOTH", color:P.red,
     cmd:"# PR: develop → main (after staging passes)\ngit tag -a v1.2.1 -m 'KeepAlive timeout tuned' && git push --tags\n\n# CI uploads to PRODUCTION Chef Server\nknife cookbook upload myapache\n\n# Production environment pins new version:\nknife environment edit production\n# Set: cookbook_versions: { \"myapache\" => \"= 1.2.1\" }\n\n# Deploy to production (staggered):\nknife ssh 'chef_environment:production' 'sudo chef-client' -x user -C 5",
     what:"Controlled production release. Tag in git = version pin in Chef Server.",
     impact:"All production nodes converge with new cookbook. httpd.conf updated. Apache reloads."},
  ];

  return(<div>
    <SectionTitle icon="🌿" title="Git + Chef Workflow" sub="What lives in Git, what lives in Chef Server, and how they connect in a real CI/CD loop" color={P.orange}/>

    <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
      {[{id:"workflow",lbl:"📋 Full Workflow"},
        {id:"gitVsChef",lbl:"🔀 Git vs Chef"},
        {id:"branching",lbl:"🌿 Branching Strategy"},
        {id:"structure",lbl:"📁 Repo Structure"}].map(t=>(
        <button key={t.id} onClick={()=>setActive(t.id)} style={{padding:"8px 16px",borderRadius:8,cursor:"pointer",background:active===t.id?`${P.orange}22`:P.bg2,border:`1px solid ${active===t.id?P.orange:P.border}`,color:active===t.id?P.orange:P.textDim,fontFamily:"'Space Grotesk',sans-serif",fontSize:13,fontWeight:active===t.id?700:400}}>{t.lbl}</button>
      ))}
    </div>

    {active==="gitVsChef" && (
      <div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,auto) 1fr 1fr",gap:0,borderRadius:8,overflow:"hidden",border:`1px solid ${P.border}`,marginBottom:16}}>
          {["Operation","Where","Risk","Git Command","Chef Command"].map(h=>(
            <div key={h} style={{padding:"8px 12px",background:P.bg3,fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:P.textDim,letterSpacing:1,borderBottom:`1px solid ${P.border}`}}>{h}</div>
          ))}
          {gitVsChef.map((r,i)=>(
            [<div key={`a${i}`} style={{padding:"8px 12px",background:i%2===0?P.bg2:P.bg1,fontSize:12,color:P.text,borderBottom:`1px solid ${P.border}`,fontWeight:500}}>{r.what}</div>,
            <div key={`b${i}`} style={{padding:"8px 12px",background:i%2===0?P.bg2:P.bg1,borderBottom:`1px solid ${P.border}`}}><Badge label={r.where} color={r.color}/></div>,
            <div key={`c${i}`} style={{padding:"8px 12px",background:i%2===0?P.bg2:P.bg1,borderBottom:`1px solid ${P.border}`}}>
              {r.where==="GIT"&&<Badge label="LOW" color={P.green}/>}
              {r.where==="CHEF"&&<Badge label="MED" color={P.orange}/>}
              {r.where==="BOTH"&&<Badge label="MED" color={P.teal}/>}
            </div>,
            <div key={`d${i}`} style={{padding:"8px 12px",background:i%2===0?P.bg2:P.bg1,borderBottom:`1px solid ${P.border}`,fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:P.orange}}>{r.git}</div>,
            <div key={`e${i}`} style={{padding:"8px 12px",background:i%2===0?P.bg2:P.bg1,borderBottom:`1px solid ${P.border}`,fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:P.purple}}>{r.chef}</div>]
          ))}
        </div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          {[{lbl:"GIT — code change, git controls",c:P.orange},{lbl:"CHEF — server-side operation",c:P.purple},{lbl:"BOTH — code in git + apply via knife",c:P.teal}].map(({lbl,c})=>(
            <div key={lbl} style={{display:"flex",alignItems:"center",gap:6,padding:"4px 12px",borderRadius:20,background:`${c}11`,border:`1px solid ${c}33`}}>
              <div style={{width:8,height:8,borderRadius:"50%",background:c}}/><span style={{fontSize:11,color:c}}>{lbl}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {active==="branching" && (
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        {gitBranching.map(b=>(
          <Card key={b.branch} style={{borderLeft:`4px solid ${b.color}`,background:`${b.color}06`}}>
            <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:8}}>
              <Mono color={b.color} size={13}>{b.branch}</Mono>
            </div>
            <p style={{color:P.textDim,fontSize:12,lineHeight:1.5,marginBottom:10}}>{b.desc}</p>
            {b.rules.map((r,i)=>(
              <div key={i} style={{display:"flex",gap:8,padding:"4px 0",borderBottom:i<b.rules.length-1?`1px solid ${P.border}`:"none"}}>
                <span style={{color:b.color,flexShrink:0}}>▸</span>
                <span style={{fontSize:12,color:P.textDim}}>{r}</span>
              </div>
            ))}
          </Card>
        ))}
        <Card style={{gridColumn:"span 2"}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:P.textDim,marginBottom:10}}>BRANCH FLOW</div>
          <Pre color={P.teal}>{`feature/* ──► develop ──► main ──► [tag v1.2.1]
                          │                 │
                    staging Chef Server  prod Chef Server
                          │                 │
                   staging nodes converge  prod nodes converge

hotfix/* ──────────────────────────────────► main (+ back-merge to develop)`}</Pre>
        </Card>
      </div>
    )}

    {active==="structure" && (
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <Card>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.orange,marginBottom:12}}>📁 Recommended Repo Structure</div>
          <Pre color={P.teal}>{`chef-repo/
├── .chef/
│   └── knife.rb           ← chef server connection
├── cookbooks/
│   ├── myapache/          ← YOUR wrapper cookbook
│   │   ├── metadata.rb    ← name, version, depends
│   │   ├── recipes/
│   │   │   └── default.rb
│   │   ├── attributes/
│   │   │   └── default.rb
│   │   └── templates/
│   │       └── default/
│   │           └── httpd.conf.erb
│   └── Berksfile          ← community cookbook deps
├── roles/
│   ├── web_server.rb
│   └── db_server.rb
├── environments/
│   ├── development.rb
│   ├── staging.rb
│   └── production.rb
├── .cookstyle             ← linting rules
├── .gitignore
└── README.md`}</Pre>
        </Card>
        <Card>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.purple,marginBottom:12}}>🚫 What NOT to Put in Git</div>
          {[
            {file:".chef/client.pem","why":"Private key — NEVER commit. Add to .gitignore"},
            {file:".chef/validator.pem","why":"Bootstrap private key — NEVER commit"},
            {file:"cookbooks/community_cb/","why":"Downloaded deps. Use Berksfile instead"},
            {file:".berkshelf/","why":"Local Berkshelf cache — transient"},
            {file:"*.log","why":"Log files — no value in version control"},
            {file:"node object data","why":"Node data lives on Chef Server, not git"},
          ].map((r,i)=>(
            <div key={i} style={{display:"flex",gap:10,padding:"7px 0",borderBottom:i<5?`1px solid ${P.border}`:"none",alignItems:"flex-start"}}>
              <span style={{color:P.red,flexShrink:0,fontFamily:"'JetBrains Mono',monospace",fontSize:11}}>{r.file}</span>
              <span style={{color:P.textFaint,fontSize:11,lineHeight:1.5}}>{r.why}</span>
            </div>
          ))}
          <div style={{marginTop:10}}>
            <div style={{color:P.textDim,fontSize:11,fontWeight:700,marginBottom:6}}>SAMPLE .gitignore</div>
            <Pre>{`.chef/client.pem\n.chef/validator.pem\n.berkshelf/\ncookbooks/Berksfile.lock\n*.log\n.kitchen/`}</Pre>
          </div>
        </Card>
      </div>
    )}

    {active==="workflow" && (
      <div>
        {workflowSteps.map((s,i)=>(
          <div key={s.n} onClick={()=>setHovStep(hovStep===s.n?null:s.n)}
            style={{cursor:"pointer",marginBottom:8}}>
            <div style={{display:"flex",alignItems:"stretch",gap:0,borderRadius:10,overflow:"hidden",
              border:`1px solid ${hovStep===s.n?s.color:P.border}`,
              background:hovStep===s.n?`${s.color}0a`:P.bg2,transition:"all 0.2s"}}>
              <div style={{background:s.color,width:6,flexShrink:0}}/>
              <div style={{padding:"12px 16px",flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:hovStep===s.n?10:0}}>
                  <span style={{fontSize:18}}>{s.icon}</span>
                  <span style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:700,color:hovStep===s.n?s.color:P.text}}>
                    Step {s.n}: {s.title}
                  </span>
                  <Badge label={s.who} color={s.color}/>
                  <span style={{color:P.textFaint,fontSize:11,marginLeft:"auto"}}>{hovStep===s.n?"▲":"▼"}</span>
                </div>
                {hovStep===s.n&&(<div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:4}}>
                  <div>
                    <div style={{color:P.textDim,fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:6}}>COMMANDS</div>
                    <Pre color={P.teal}>{s.cmd}</Pre>
                  </div>
                  <div>
                    <div style={{color:P.textDim,fontSize:11,fontWeight:700,letterSpacing:1,marginBottom:6}}>WHAT HAPPENS</div>
                    <p style={{fontSize:12,color:P.textDim,lineHeight:1.6,marginBottom:8}}>{s.what}</p>
                    <div style={{padding:"8px 12px",borderRadius:6,background:`${s.color}11`,border:`1px solid ${s.color}33`,fontSize:12,color:s.color}}>
                      <strong>Impact: </strong>{s.impact}
                    </div>
                  </div>
                </div>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>);
};

// ══════════════════════════════════════════════════════════
// TAB 3 — APACHE EXAMPLE (Community CB → Wrapper → Tweaks)
// ══════════════════════════════════════════════════════════
const ApacheTab=()=>{
  const [phase,setPhase]=useState("overview");

  const phases=[
    {id:"overview",lbl:"🗺️ Overview"},
    {id:"community",lbl:"📦 Community CB"},
    {id:"wrapper",lbl:"🔧 Wrapper CB"},
    {id:"attributes",lbl:"🏷️ Attribute Tweaks"},
    {id:"template",lbl:"📋 Template Override"},
    {id:"role",lbl:"👥 Role Assignment"},
    {id:"flow",lbl:"⚡ Full Flow"},
  ];

  return(<div>
    <SectionTitle icon="🌐" title="Apache: Community Cookbook → Wrapper → Tweaks" sub="Real-world pattern: use a community cookbook, wrap it, override attributes and templates, assign via role" color={P.teal}/>

    <div style={{display:"flex",gap:6,marginBottom:20,flexWrap:"wrap"}}>
      {phases.map(p=>(<button key={p.id} onClick={()=>setPhase(p.id)} style={{padding:"8px 14px",borderRadius:8,cursor:"pointer",background:phase===p.id?`${P.teal}22`:P.bg2,border:`1px solid ${phase===p.id?P.teal:P.border}`,color:phase===p.id?P.teal:P.textDim,fontSize:12,fontWeight:phase===p.id?700:400}}>{p.lbl}</button>))}
    </div>

    {phase==="overview"&&(<div>
      <Card style={{marginBottom:14}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:800,color:P.teal,marginBottom:12}}>The Wrapper Cookbook Pattern — The Right Way to Use Community Cookbooks</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:0,borderRadius:8,overflow:"hidden",border:`1px solid ${P.border}`}}>
          {["Layer","Cookbook","Controls","Owner"].map(h=>(<div key={h} style={{padding:"8px 12px",background:P.bg3,fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:P.textDim,letterSpacing:1,borderBottom:`1px solid ${P.border}`}}>{h}</div>))}
          {[
            ["Community","apache2 (Supermarket)","Install Apache, base config, service","Chef Supermarket maintainers",P.blue],
            ["Wrapper","myapache (YOUR code)","Overrides, custom templates, attributes","YOU (your git repo)",P.orange],
            ["Role","web-server.rb","Which nodes use the wrapper cookbook","YOU (your roles/ in git)",P.purple],
            ["Environment","production.rb","Which VERSION of wrapper to use","YOU (your environments/)",P.green],
          ].map(([l,c,ctrl,own,col],i)=>(
            [<div key={`a${i}`} style={{padding:"8px 12px",background:i%2===0?P.bg2:P.bg1,borderBottom:`1px solid ${P.border}`,display:"flex",alignItems:"center",gap:6}}><Badge label={l} color={col}/></div>,
            <div key={`b${i}`} style={{padding:"8px 12px",background:i%2===0?P.bg2:P.bg1,borderBottom:`1px solid ${P.border}`,fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:col}}>{c}</div>,
            <div key={`c${i}`} style={{padding:"8px 12px",background:i%2===0?P.bg2:P.bg1,borderBottom:`1px solid ${P.border}`,fontSize:11,color:P.textDim}}>{ctrl}</div>,
            <div key={`d${i}`} style={{padding:"8px 12px",background:i%2===0?P.bg2:P.bg1,borderBottom:`1px solid ${P.border}`,fontSize:11,color:P.textFaint}}>{own}</div>]
          ))}
        </div>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
        {[
          {icon:"✅",title:"Why not edit community CB directly?",color:P.red,items:["Supermarket updates overwrite your changes","Your git now tracks someone else's code","Breaks Berkshelf dependency resolution","Community CBs update for security fixes — you want those"]},
          {icon:"✅",title:"What wrapper CBs let you do",color:P.green,items:["Override any attribute from the community CB","Supply your own templates for specific files","Add extra resources (firewall rules, custom logs)","include_recipe 'apache2' then customize on top"]},
          {icon:"✅",title:"What stays the same",color:P.blue,items:["Community CB handles OS differences (RHEL vs Ubuntu)","Community CB manages service lifecycle","Community CB keeps up with security patches","You get benefits without maintaining base code"]},
        ].map(s=>(<Card key={s.title} style={{borderLeft:`3px solid ${s.color}`}}>
          <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:s.color,marginBottom:8}}>{s.icon} {s.title}</div>
          {s.items.map((it,i)=>(<div key={i} style={{display:"flex",gap:8,padding:"3px 0",fontSize:12,color:P.textDim}}><span style={{color:s.color,flexShrink:0}}>▸</span>{it}</div>))}
        </Card>))}
      </div>
    </div>)}

    {phase==="community"&&(<div>
      <Card style={{marginBottom:14,borderLeft:`3px solid ${P.blue}`}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.blue,marginBottom:12}}>📦 Step 1 — Use the Community apache2 Cookbook</div>
        <Pre>{`# Find and inspect the community cookbook on Supermarket:
knife supermarket search apache

# Add to YOUR cookbook's Berksfile:
# cookbooks/myapache/Berksfile
source 'https://supermarket.chef.io'
metadata  # reads depends from metadata.rb

# Declare dependency in cookbooks/myapache/metadata.rb:
name             'myapache'
version          '1.0.0'
depends          'apache2'          # ← community cookbook dependency
depends          'apache2', '>= 8.0' # ← with version constraint

# Install community cookbook locally:
berks install
# Downloads: apache2 (latest), and all ITS dependencies
# Saved to: ~/.berkshelf/cookbooks/

# Upload everything to Chef Server (your CB + all dependencies):
berks upload
# OR: knife cookbook upload myapache apache2

# What the community apache2 cookbook gives you for free:
# ● Installs httpd (RHEL) or apache2 (Ubuntu) — platform-aware
# ● Creates /etc/httpd/ structure (RHEL) or /etc/apache2/ (Ubuntu)
# ● Starts and enables the apache service
# ● Manages modules (mod_ssl, mod_rewrite, etc.)
# ● Includes virtual host management resources`}</Pre>
      </Card>
      <Note c={P.blue}>The community <strong>apache2</strong> cookbook handles all the hard platform-specific work. Your wrapper cookbook only needs to declare <Mono>depends 'apache2'</Mono> in metadata.rb and call <Mono>include_recipe 'apache2'</Mono> in your recipe.</Note>
    </div>)}

    {phase==="wrapper"&&(<div>
      <Card style={{marginBottom:14,borderLeft:`3px solid ${P.orange}`}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.orange,marginBottom:12}}>🔧 Step 2 — Create the Wrapper Cookbook</div>
        <Pre>{`# Generate wrapper cookbook:
chef generate cookbook myapache
cd cookbooks/myapache/`}</Pre>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div>
          <Card style={{marginBottom:14}}>
            <div style={{color:P.textDim,fontSize:11,fontWeight:700,marginBottom:8}}>metadata.rb</div>
            <Pre>{`name             'myapache'
maintainer       'Ops Team'
maintainer_email 'ops@company.com'
version          '1.0.0'

# Declare community CB dependency:
depends 'apache2'

# What this means:
# Berkshelf will download apache2 cookbook
# Chef Server needs apache2 uploaded too
# Our recipe can call include_recipe 'apache2'`}</Pre>
          </Card>
          <Card>
            <div style={{color:P.textDim,fontSize:11,fontWeight:700,marginBottom:8}}>Berksfile</div>
            <Pre>{`source 'https://supermarket.chef.io'
metadata   # reads depends from metadata.rb

# After editing: run
# berks install  → downloads apache2
# berks upload   → uploads to Chef Server`}</Pre>
          </Card>
        </div>
        <Card>
          <div style={{color:P.textDim,fontSize:11,fontWeight:700,marginBottom:8}}>recipes/default.rb — The Wrapper Recipe</div>
          <Pre>{`# ── 1. Call the community cookbook first ──────────────
# This installs Apache, starts/enables the service
include_recipe 'apache2'
# Equivalent to: include_recipe 'apache2::default'

# ── 2. Our custom resources run AFTER ─────────────────
# Create custom document root:
directory node['myapache']['doc_root'] do
  owner     node['apache']['user']   # ← apache2 CB attribute
  group     node['apache']['group']
  mode      '755'
  recursive true
  action    :create
end

# Deploy our custom httpd.conf OVER the community one:
template node['apache']['dir'] + '/apache2.conf' do
  source    'httpd.conf.erb'   # OUR template
  owner     'root'
  group     'root'
  mode      '644'
  notifies  :restart, 'service[apache2]', :delayed
end

# Deploy our index page:
cookbook_file node['myapache']['doc_root'] + '/index.html' do
  source  'index.html'
  owner   node['apache']['user']
  mode    '644'
  action  :create
end

# ── 3. Custom firewall rule ────────────────────────────
execute 'allow-http' do
  command "firewall-cmd --permanent --add-service=http && firewall-cmd --reload"
  not_if  "firewall-cmd --list-services | grep http"
end`}</Pre>
        </Card>
      </div>
      <Note c={P.orange}>The golden rule: <strong>include_recipe 'apache2'</strong> FIRST, then our customizations. The community cookbook sets up the platform. We customize on top.</Note>
    </div>)}

    {phase==="attributes"&&(<div>
      <div style={{marginBottom:14}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.gold,marginBottom:10}}>🏷️ Step 3 — Override Attributes to Tweak Apache Settings</div>
        <Note c={P.gold}>The apache2 community cookbook exposes hundreds of attributes. Override only what you need. Everything else uses community defaults — and gets updated when the community CB updates.</Note>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <Card>
          <div style={{color:P.textDim,fontSize:11,fontWeight:700,marginBottom:8}}>attributes/default.rb — Our Attribute Overrides</div>
          <Pre>{`# ── Our own attributes ─────────────────────────────────
default['myapache']['doc_root']  = '/var/www/myapp'
default['myapache']['admin_email'] = 'ops@company.com'
default['myapache']['server_name'] = node['fqdn']

# ── Override apache2 community CB attributes ────────────
# Find what's available: knife cookbook show apache2 VER attrs
# Source: ~/.berkshelf/cookbooks/apache2/attributes/default.rb

# Performance tuning:
override['apache']['mpm']              = 'event'   # default: prefork
override['apache']['event']['startservers']      = 2
override['apache']['event']['minsparethreads']   = 25
override['apache']['event']['maxrequestworkers'] = 150
override['apache']['event']['maxconnectionsperchild'] = 1000

# KeepAlive settings:
override['apache']['keepalive']        = 'On'
override['apache']['keepalivetimeout'] = 10   # default: 5
override['apache']['maxkeepaliverequests'] = 200

# Logging:
override['apache']['log_level']        = 'warn'  # default: notice
override['apache']['log_dir']          = '/var/log/httpd'

# Modules to enable (community CB manages these):
override['apache']['default_modules']  = ['rewrite','headers','expires']

# Platform-conditional override:
case node['platform']
when 'centos', 'rhel'
  override['apache']['port'] = 80
  default['myapache']['config_dir'] = '/etc/httpd/conf.d'
when 'ubuntu', 'debian'
  override['apache']['port'] = 80
  default['myapache']['config_dir'] = '/etc/apache2/conf-available'
end`}</Pre>
        </Card>
        <div>
          <Card style={{marginBottom:14}}>
            <div style={{color:P.textDim,fontSize:11,fontWeight:700,marginBottom:8}}>How to Find Community CB Attributes</div>
            <Pre>{`# Option 1: Browse locally (after berks install):
cat ~/.berkshelf/cookbooks/apache2-*/attributes/default.rb

# Option 2: On Chef Server:
knife cookbook show apache2 8.6.0 attributes

# Option 3: On GitHub / Supermarket docs

# Key apache2 CB attributes you'll want to know:
# node['apache']['port']           → 80
# node['apache']['listen_ports']   → ['80']
# node['apache']['user']           → 'www-data' or 'apache'
# node['apache']['group']          → 'www-data' or 'apache'
# node['apache']['dir']            → '/etc/httpd' or '/etc/apache2'
# node['apache']['mpm']            → 'prefork'
# node['apache']['keepalive']      → 'Off'
# node['apache']['log_level']      → 'notice'`}</Pre>
          </Card>
          <Card style={{borderLeft:`3px solid ${P.gold}`}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:P.gold,marginBottom:8}}>Precedence in Action</div>
            {[
              {src:"apache2 community CB",val:"keepalivetimeout = 5",level:"default",c:P.blue},
              {src:"myapache attributes/default.rb",val:"keepalivetimeout = 10",level:"override",c:P.orange},
              {src:"staging environment",val:"keepalivetimeout = 15",level:"env override",c:P.purple},
              {src:"specific node override",val:"keepalivetimeout = 20",level:"node.override",c:P.red},
            ].map((r,i)=>(<div key={i} style={{display:"flex",gap:8,padding:"6px 0",borderBottom:i<3?`1px solid ${P.border}`:"none",alignItems:"center"}}>
              <Badge label={r.level} color={r.c}/>
              <div style={{flex:1}}>
                <div style={{fontSize:11,color:P.text}}>{r.src}</div>
                <div style={{fontSize:11,fontFamily:"'JetBrains Mono',monospace",color:r.c}}>{r.val}</div>
              </div>
            </div>))}
            <Note c={P.red}>Node on staging environment gets keepalivetimeout=15. Node with node.override gets 20.</Note>
          </Card>
        </div>
      </div>
    </div>)}

    {phase==="template"&&(<div>
      <Card style={{marginBottom:14}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.purple,marginBottom:12}}>📋 Step 4 — Override Specific Config Files with Custom Templates</div>
        <Note c={P.purple}>The community cookbook generates httpd.conf from its own template. Our wrapper supplies a different template for exactly the config file we want to control. Other files are still managed by the community CB.</Note>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div>
          <Card style={{marginBottom:14}}>
            <div style={{color:P.textDim,fontSize:11,fontWeight:700,marginBottom:8}}>templates/default/httpd.conf.erb — Our Custom Template</div>
            <Pre color={P.purple}>{`# httpd.conf.erb — our custom Apache config
# Uses ERB to insert node attributes dynamically

ServerRoot "/etc/httpd"
Listen <%= node['apache']['port'] %>

# Dynamic hostname — different on each node:
ServerName  <%= node['myapache']['server_name'] %>
ServerAdmin <%= node['myapache']['admin_email'] %>

# MPM settings from our attributes:
<IfModule mpm_event_module>
    StartServers         <%= node['apache']['event']['startservers'] %>
    MinSpareThreads      <%= node['apache']['event']['minsparethreads'] %>
    MaxRequestWorkers    <%= node['apache']['event']['maxrequestworkers'] %>
    MaxConnectionsPerChild  <%= node['apache']['event']['maxconnectionsperchild'] %>
</IfModule>

# KeepAlive — driven by override attribute:
KeepAlive           <%= node['apache']['keepalive'] %>
KeepAliveTimeout    <%= node['apache']['keepalivetimeout'] %>
MaxKeepAliveRequests  <%= node['apache']['maxkeepaliverequests'] %>

DocumentRoot "<%= node['myapache']['doc_root'] %>"

<% node['apache']['default_modules'].each do |mod| %>
LoadModule <%= mod %>_module modules/mod_<%= mod %>.so
<% end %>

LogLevel  <%= node['apache']['log_level'] %>
ErrorLog  "<%= node['apache']['log_dir'] %>/error_log"
CustomLog "<%= node['apache']['log_dir'] %>/access_log" combined

<Directory "<%= node['myapache']['doc_root'] %>">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>`}</Pre>
          </Card>
        </div>
        <div>
          <Card style={{marginBottom:14}}>
            <div style={{color:P.textDim,fontSize:11,fontWeight:700,marginBottom:8}}>Rendered Output on web-prod-01</div>
            <Pre color={P.green}>{`ServerRoot "/etc/httpd"
Listen 80
ServerName  web-prod-01.company.com
ServerAdmin ops@company.com

<IfModule mpm_event_module>
    StartServers         2
    MinSpareThreads      25
    MaxRequestWorkers    150
    MaxConnectionsPerChild  1000
</IfModule>

KeepAlive           On
KeepAliveTimeout    10
MaxKeepAliveRequests  200

DocumentRoot "/var/www/myapp"

LoadModule rewrite_module modules/mod_rewrite.so
LoadModule headers_module modules/mod_headers.so
LoadModule expires_module modules/mod_expires.so

LogLevel  warn
ErrorLog  "/var/log/httpd/error_log"
CustomLog "/var/log/httpd/access_log" combined

<Directory "/var/www/myapp">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>`}</Pre>
          </Card>
          <Card>
            <div style={{color:P.textDim,fontSize:11,fontWeight:700,marginBottom:8}}>Vhost Template: templates/default/vhost.conf.erb</div>
            <Pre color={P.purple}>{`<VirtualHost *:<%= node['apache']['port'] %>>
  ServerName   <%= node['myapache']['server_name'] %>
  DocumentRoot <%= node['myapache']['doc_root'] %>

  <% if node['myapache']['ssl'] %>
  SSLEngine on
  SSLCertificateFile    /etc/ssl/certs/cert.pem
  SSLCertificateKeyFile /etc/ssl/private/key.pem
  <% end %>

  ErrorLog  <%= node['apache']['log_dir'] %>/vhost-error.log
  CustomLog <%= node['apache']['log_dir'] %>/vhost-access.log combined
</VirtualHost>`}</Pre>
          </Card>
        </div>
      </div>
    </div>)}

    {phase==="role"&&(<div>
      <Card style={{marginBottom:14}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:700,color:P.purple,marginBottom:12}}>👥 Step 5 — Assign via Role and Environment</div>
      </Card>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div>
          <Card style={{marginBottom:14}}>
            <div style={{color:P.textDim,fontSize:11,fontWeight:700,marginBottom:8}}>roles/web_server.rb</div>
            <Pre>{`name        'web_server'
description 'Frontend Apache web server tier'

# Run-list — ordered, includes our wrapper:
run_list(
  'recipe[baseline]',       # company base config
  'recipe[ntp]',            # time sync
  'recipe[myapache]',       # our wrapper cookbook
  'recipe[myapache::ssl]'   # named recipe for SSL
)

# Role-level attribute overrides:
# These apply to ALL nodes with this role
default_attributes(
  'myapache' => {
    'doc_root'    => '/var/www/html',
    'server_name' => node['fqdn']
  }
)

override_attributes(
  'apache' => {
    'keepalive'        => 'On',
    'keepalivetimeout' => 10,
    'mpm'              => 'event'
  }
)

# Upload with:
# knife role from file roles/web_server.rb
# Assign to node:
# knife node run_list add NODE 'role[web_server]'`}</Pre>
          </Card>
        </div>
        <div>
          <Card style={{marginBottom:14}}>
            <div style={{color:P.textDim,fontSize:11,fontWeight:700,marginBottom:8}}>environments/production.rb</div>
            <Pre>{`name        'production'
description 'Production environment — stable versions only'

# Pin cookbook versions — exact pins for production safety:
cookbook_versions(
  'myapache'  => '= 1.2.1',   # exact version pinned
  'apache2'   => '>= 8.0.0',  # min version
  'baseline'  => '= 3.0.0'
)

# Environment-level attributes — override for production:
override_attributes(
  'apache' => {
    'log_level'        => 'error',    # less noise in prod
    'keepalivetimeout' => 5,          # tighter in prod
    'maxrequestworkers' => 400        # handle more load
  },
  'myapache' => {
    'admin_email' => 'ops-pager@company.com'
  }
)

# Upload with:
# knife environment from file environments/production.rb`}</Pre>
          </Card>
          <Card style={{borderLeft:`3px solid ${P.green}`}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:P.green,marginBottom:8}}>Node Assignment Commands</div>
            <Pre>{`# 1. Assign environment to node:
knife node environment_set web-prod-01 production

# 2. Assign role via run-list:
knife node run_list set web-prod-01 'role[web_server]'

# 3. Verify final run-list and env:
knife node show web-prod-01

# 4. Trigger converge:
knife ssh 'name:web-prod-01' 'sudo chef-client' -x user

# 5. Verify Apache is configured correctly:
ssh user@web-prod-01 'grep KeepAliveTimeout /etc/httpd/conf/httpd.conf'
ssh user@web-prod-01 'httpd -t && curl -I http://127.0.0.1/'`}</Pre>
          </Card>
        </div>
      </div>
    </div>)}

    {phase==="flow"&&(<div>
      <Card style={{padding:0,overflow:"hidden",marginBottom:14}}>
        <div style={{padding:"12px 20px",borderBottom:`1px solid ${P.border}`}}>
          <span style={{fontFamily:"'Syne',sans-serif",fontSize:14,fontWeight:800,color:P.teal}}>COMPLETE FLOW: Git push → Apache config changes on every web server</span>
        </div>
        <svg viewBox="0 0 960 560" style={{width:"100%",background:P.bg1,display:"block"}}>
          <defs>
            <marker id="a2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill={P.borderLight}/></marker>
          </defs>
          {/* Columns */}
          {[["👨‍💻 Dev",P.blue,80],["🌿 Git",P.orange,240],["🤖 CI",P.pink,400],["🗄️ Chef Server",P.purple,560],["⚙️ Nodes",P.green,760]].map(([lbl,c,x])=>(
            <g key={lbl}>
              <rect x={x-60} y={30} width={120} height={30} rx="5" fill={`${c}22`} stroke={c} strokeWidth="1"/>
              <text x={x} y={50} textAnchor="middle" fill={c} fontSize="12" fontFamily="Syne,sans-serif" fontWeight="700">{lbl}</text>
              <line x1={x} y1={60} x2={x} y2={520} stroke={`${c}30`} strokeWidth="1" strokeDasharray="3,3"/>
            </g>
          ))}
          {/* Steps */}
          {[
            [80,100,"Edit CB files",P.blue,"attributes/\ntemplates/\nrecipes/"],
            [80,170,"Bump version\nmetadata.rb",P.blue,"1.2.0 → 1.2.1"],
            [240,100,"git commit\ngit push",P.orange,"feature branch"],
            [240,200,"Open PR\n→ develop",P.orange,"code review"],
            [400,200,"cookstyle\nChefSpec",P.pink,"CI auto-runs"],
            [400,290,"berks resolve\n+ install",P.pink,"deps resolved"],
            [400,370,"knife cookbook\nupload",P.pink,"on PR merge"],
            [560,370,"Cookbook v1.2.1\nstored on server",P.purple,"+ attrs + templates"],
            [560,440,"Environment pin\nupdated",P.purple,"myapache = 1.2.1"],
            [760,440,"chef-client\npulls policy",P.green,"every 30 min"],
            [760,510,"httpd.conf\nrendered+applied",P.green,"Apache reloads"],
          ].map(([x,y,lbl,c,sub],i)=>(
            <g key={i}>
              <rect x={x-55} y={y-18} width={110} height={sub?48:28} rx="5" fill={`${c}18`} stroke={`${c}66`} strokeWidth="1"/>
              {lbl.split('\n').map((l,li)=>(<text key={li} x={x} y={y+li*14} textAnchor="middle" fill={c} fontSize="11" fontFamily="Syne,sans-serif" fontWeight="600">{l}</text>))}
              {sub&&sub.split('\n').map((l,li)=>(<text key={"s"+li} x={x} y={y+26+li*12} textAnchor="middle" fill={P.textFaint} fontSize="9" fontFamily="JetBrains Mono">{l}</text>))}
            </g>
          ))}
          {/* Arrows */}
          {[
            [80,122,240,100],[240,170,80,188],[240,218,400,200],[400,244,400,280],[400,308,400,360],
            [460,385,560,370],[560,388,560,430],[560,448,760,440],[760,458,760,502]
          ].map(([x1,y1,x2,y2],i)=>(
            <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={P.borderLight} strokeWidth="1.2" markerEnd="url(#a2)"/>
          ))}
          {/* Time annotations */}
          <text x={920} y={100} fill={P.textFaint} fontSize="9" fontFamily="JetBrains Mono">t=0min</text>
          <text x={920} y={200} fill={P.textFaint} fontSize="9" fontFamily="JetBrains Mono">t=2min</text>
          <text x={920} y={370} fill={P.textFaint} fontSize="9" fontFamily="JetBrains Mono">t=15min</text>
          <text x={920} y={440} fill={P.textFaint} fontSize="9" fontFamily="JetBrains Mono">t=16min</text>
          <text x={920} y={510} fill={P.textFaint} fontSize="9" fontFamily="JetBrains Mono">t=46min</text>
        </svg>
      </Card>
      <Note c={P.gold}>Total time from git push to production config change: ~46 minutes (30 min = chef-client poll interval). For urgent changes: manually trigger <Mono>knife ssh 'role:web_server' 'sudo chef-client'</Mono> to converge immediately.</Note>
    </div>)}
  </div>);
};

// ══════════════════════════════════════════════════════════
// TAB 4 — RUN FLOW
// ══════════════════════════════════════════════════════════
const RunFlowTab=()=>{
  const [exp,setExp]=useState({});
  const tog=id=>setExp(e=>({...e,[id]:!e[id]}));
  const phases=[
    {id:"auth",phase:"PHASE 0",name:"Startup & Auth",icon:"🔐",color:P.blue,timing:"<1s",
     what:"chef-client starts, reads /etc/chef/client.rb, authenticates to Chef Server using RSA key pair",
     check:"knife ssl check\nssh user@NODE 'chef-client --version'",
     impact:"Failure = chef-client aborts. Check: knife ssl fetch",local:"Skips auth — uses temp in-memory server"},
    {id:"ohai",phase:"PHASE 1",name:"Ohai — Collect Facts",icon:"📡",color:P.teal,timing:"1-5s",
     what:"Ohai scans the system and populates node[] with ~4000+ facts about the OS, hardware, network, packages",
     check:"ohai platform\nohai hostname\nohai ipaddress\nohai | wc -l",
     impact:"Stale Ohai = wrong platform detected = wrong package manager used",local:"Runs identically — same collection"},
    {id:"policy",phase:"PHASE 2",name:"Get Policy",icon:"📋",color:P.purple,timing:"<1s",
     what:"Gets run-list and environment from Chef Server. Expands roles to recipe list. Applies environment cookbook version pins.",
     check:"knife node show NODE | grep run_list\nknife node show NODE -a chef_environment",
     impact:"Wrong run-list = wrong cookbooks applied",local:"Run-list passed via -r flag on CLI"},
    {id:"sync",phase:"PHASE 3",name:"Cookbook Sync",icon:"⬇️",color:P.gold,timing:"1-30s",
     what:"Downloads cookbooks not in local cache or with changed versions",
     check:"ls /var/chef/cache/cookbooks/\nknife cookbook show CB VER",
     impact:"Missing dep = converge failure",local:"Reads from ./cookbooks/ directory"},
    {id:"compile",phase:"PHASE 4",name:"Compile Phase",icon:"⚙️",color:P.orange,timing:"<2s",
     what:"Loads ALL recipe Ruby into memory. Evaluates conditionals. include_recipe calls resolved. Builds Resource Collection. NO system changes.",
     check:"chef-client --why-run -z -r 'recipe[CB]'",
     impact:"Syntax errors surface here. Ruby outside resource blocks runs here.",local:"Same"},
    {id:"converge",phase:"PHASE 5",name:"Converge Phase ★",icon:"🎯",color:P.green,timing:"5-120s",
     what:"Walks Resource Collection. For each: check current state vs desired. If different → apply. If same → skip (idempotence). Fires :delayed notifies at end.",
     check:"# In output look for:\n# (up to date)  ← no change\n# (updated)     ← change applied",
     impact:"THIS is where config changes happen. Partial failures leave system in intermediate state.",local:"Same"},
    {id:"report",phase:"PHASE 6",name:"Report",icon:"📊",color:P.blue,timing:"<1s",
     what:"Sends run summary to Chef Server: success/failure, resources updated, timing.",
     check:"knife runs list NODE --limit 1",
     impact:"Failed runs visible in Chef Manage dashboard.",local:"Prints to stdout only"},
  ];
  return(<div>
    <SectionTitle icon="⚡" title="chef-client Run Flow — 7 Phases" sub="What happens inside every chef-client execution — click any phase" color={P.green}/>
    <Card style={{marginBottom:16,padding:"14px 16px"}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:11,fontWeight:700,color:P.textDim,marginBottom:10,letterSpacing:1}}>TIMELINE — CLICK TO EXPAND</div>
      <div style={{display:"flex",alignItems:"center",overflowX:"auto",gap:0}}>
        {phases.map((p,i)=>(<div key={p.id} style={{display:"flex",alignItems:"center",flex:1}}>
          <div onClick={()=>tog(p.id)} style={{cursor:"pointer",background:exp[p.id]?`${p.color}22`:P.bg3,border:`1px solid ${exp[p.id]?p.color:P.border}`,borderRadius:8,padding:"8px 10px",textAlign:"center",minWidth:90,transition:"all 0.2s"}}>
            <div style={{fontSize:16}}>{p.icon}</div>
            <div style={{fontSize:9,fontFamily:"'JetBrains Mono',monospace",color:p.color,fontWeight:700}}>{p.phase}</div>
            <div style={{fontSize:9,color:P.textDim,marginTop:2,lineHeight:1.3}}>{p.name}</div>
            <div style={{fontSize:9,color:P.textFaint}}>{p.timing}</div>
          </div>
          {i<phases.length-1&&<div style={{display:"flex",alignItems:"center",padding:"0 3px"}}><div style={{width:16,height:1,background:P.borderLight}}/><span style={{color:P.textFaint,fontSize:10}}>▶</span></div>}
        </div>))}
      </div>
    </Card>
    {phases.filter(p=>exp[p.id]).map(p=>(
      <Card key={p.id} style={{marginBottom:10,borderLeft:`3px solid ${p.color}`,background:`${p.color}07`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:10}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}><span style={{fontSize:20}}>{p.icon}</span><span style={{fontFamily:"'Syne',sans-serif",fontSize:17,fontWeight:800,color:p.color}}>{p.name}</span><Badge label={p.phase} color={p.color}/><Badge label={p.timing} color={P.textFaint}/></div>
          <button onClick={()=>tog(p.id)} style={{background:"none",border:"none",color:P.textFaint,cursor:"pointer",fontSize:16}}>✕</button>
        </div>
        <p style={{color:P.textDim,fontSize:12,lineHeight:1.6,marginBottom:10}}>{p.what}</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          <div><div style={{color:P.textDim,fontSize:10,fontWeight:700,letterSpacing:1,marginBottom:6}}>VERIFY / INSPECT</div><Pre>{p.check}</Pre></div>
          <div>
            <div style={{padding:"8px 12px",borderRadius:6,background:`${P.orange}11`,border:`1px solid ${P.orange}33`,fontSize:12,color:P.orange,marginBottom:8}}><strong>⚠ Failure impact: </strong>{p.impact}</div>
            <div style={{padding:"6px 12px",borderRadius:6,background:`${P.blue}11`,border:`1px solid ${P.blue}33`,fontSize:11,color:P.blue}}><strong>Local mode: </strong>{p.local}</div>
          </div>
        </div>
      </Card>
    ))}
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginTop:4}}>
      <Card style={{borderLeft:`3px solid ${P.orange}`}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:P.orange,marginBottom:8}}>⚙️ COMPILE — No System Changes</div>
        {["Reads all recipe .rb files","Evaluates Ruby conditionals","Resolves include_recipe calls","Builds Resource Collection","Ruby outside resource blocks runs here","✗ Does NOT touch the system"].map((l,i)=>(<div key={i} style={{padding:"3px 0",fontSize:12,color:l.startsWith("✗")?P.red:P.textDim,borderBottom:i<5?`1px solid ${P.border}`:"none"}}>{l}</div>))}
      </Card>
      <Card style={{borderLeft:`3px solid ${P.green}`}}>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:P.green,marginBottom:8}}>🎯 CONVERGE — Changes Happen Here</div>
        {["Walks Resource Collection in order","Checks current state vs desired","State matches → 'up to date' → skip","State differs → applies change → logs","Fires :delayed notifies at end","✓ THIS is where config is applied"].map((l,i)=>(<div key={i} style={{padding:"3px 0",fontSize:12,color:l.startsWith("✓")?P.green:P.textDim,borderBottom:i<5?`1px solid ${P.border}`:"none"}}>{l}</div>))}
      </Card>
    </div>
  </div>);
};

// ══════════════════════════════════════════════════════════
// TAB 5 — COMMAND IMPACT
// ══════════════════════════════════════════════════════════
const CommandsTab=()=>{
  const [filter,setFilter]=useState("ALL");
  const [search,setSearch]=useState("");
  const RISK={SAFE:{color:P.blue},LOW:{color:P.green},MED:{color:P.gold},HIGH:{color:P.orange},CRIT:{color:P.red}};
  const cmds=[
    {cmd:"knife node list",risk:"SAFE",type:"READ",target:"Chef Server",undo:"N/A",impact:"Lists all registered nodes. Zero changes.",desc:"Audit all managed nodes"},
    {cmd:"knife node show NODE",risk:"SAFE",type:"READ",target:"Chef Server",undo:"N/A",impact:"Reads node object. Zero changes.",desc:"Show node run-list, env, attributes"},
    {cmd:"knife cookbook list",risk:"SAFE",type:"READ",target:"Chef Server",undo:"N/A",impact:"Lists cookbooks+versions. Zero changes.",desc:"Audit what cookbooks are deployed"},
    {cmd:"knife role list",risk:"SAFE",type:"READ",target:"Chef Server",undo:"N/A",impact:"Lists roles. Zero changes.",desc:"View all defined roles"},
    {cmd:"knife environment list",risk:"SAFE",type:"READ",target:"Chef Server",undo:"N/A",impact:"Lists environments. Zero changes.",desc:"See dev/staging/prod environments"},
    {cmd:"knife status",risk:"SAFE",type:"READ",target:"Chef Server",undo:"N/A",impact:"Shows last chef-client run time per node.",desc:"Health check — find stale nodes"},
    {cmd:"chef-client --why-run",risk:"SAFE",type:"DRYRUN",target:"Node",undo:"N/A",impact:"Shows what WOULD change. Zero actual changes.",desc:"Dry-run — preview changes safely"},
    {cmd:"ohai",risk:"SAFE",type:"READ",target:"Node",undo:"N/A",impact:"Reads node attributes. Read-only.",desc:"Inspect Ohai-collected node facts"},
    {cmd:"chef generate cookbook CB",risk:"SAFE",type:"CREATE",target:"Workstation",undo:"rm -rf cookbooks/CB",impact:"Creates local files only. Nothing on Chef Server.",desc:"Generate cookbook directory structure"},
    {cmd:"knife ssl fetch",risk:"SAFE",type:"CONFIG",target:"Workstation",undo:"rm .chef/trusted_certs",impact:"Downloads SSL cert. No server state changes.",desc:"Establish SSL trust with Chef Server"},
    {cmd:"knife cookbook upload CB",risk:"LOW",type:"WRITE",target:"Chef Server",undo:"knife cookbook delete CB VER",impact:"Adds cookbook to Chef Server. Nodes unaffected until next run.",desc:"Upload cookbook to Chef Server"},
    {cmd:"berks upload",risk:"LOW",type:"WRITE",target:"Chef Server",undo:"knife cookbook delete each dep",impact:"Uploads your CB + all Berkshelf dependencies.",desc:"Upload CB + all community CB deps"},
    {cmd:"knife role from file R.rb",risk:"MED",type:"WRITE",target:"Chef Server",undo:"knife role from file BACKUP.rb",impact:"Updates role. All nodes with this role get new run-list next run.",desc:"Upload/update a role definition"},
    {cmd:"knife environment from file E.rb",risk:"MED",type:"WRITE",target:"Chef Server",undo:"knife environment from file BACKUP.rb",impact:"Updates env cookbook version pins. All nodes in env affected next run.",desc:"Update environment version pins"},
    {cmd:"knife node run_list add NODE R",risk:"MED",type:"WRITE",target:"Chef Server",undo:"knife node run_list remove NODE R",impact:"Updates node run-list. Takes effect next chef-client run.",desc:"Add recipe or role to node run-list"},
    {cmd:"knife node environment_set NODE ENV",risk:"LOW",type:"WRITE",target:"Chef Server",undo:"knife node environment_set NODE _default",impact:"Changes node environment. New cookbook version pins apply next run.",desc:"Move node to a different environment"},
    {cmd:"knife ssh 'name:NODE' 'sudo chef-client'",risk:"MED",type:"RUN",target:"Node",undo:"Reverse cookbook changes, re-run",impact:"Runs chef-client NOW. Applies full run-list. System changes.",desc:"Manually trigger chef-client on one node"},
    {cmd:"knife ssh 'role:X' 'sudo chef-client'",risk:"HIGH",type:"RUN",target:"Multiple Nodes",undo:"Reverse cookbook, re-run fleet",impact:"Runs chef-client on ALL nodes in role simultaneously.",desc:"Deploy to entire role (all web servers)"},
    {cmd:"knife cookbook delete CB VER --yes",risk:"HIGH",type:"DELETE",target:"Chef Server",undo:"knife cookbook upload CB",impact:"Removes cookbook. Nodes needing it fail next run.",desc:"Delete a cookbook version — dangerous"},
    {cmd:"knife bootstrap IP -N NAME",risk:"LOW",type:"INSTALL",target:"New Node",undo:"knife node delete NAME + rm chef-client",impact:"Installs chef-client. Registers node. Runs initial run-list.",desc:"Register new node with Chef Server"},
  ];
  const types=["ALL","READ","WRITE","RUN","DELETE","CREATE","DRYRUN","INSTALL","CONFIG"];
  const filtered=cmds.filter(c=>(filter==="ALL"||c.type===filter)&&(search===""||c.cmd.toLowerCase().includes(search.toLowerCase())||c.desc.toLowerCase().includes(search.toLowerCase())));
  return(<div>
    <SectionTitle icon="⌨️" title="Command Impact Map" sub="Every knife/chef command — what it touches, risk level, and how to undo it" color={P.orange}/>
    <div style={{display:"flex",gap:8,marginBottom:14,flexWrap:"wrap"}}>
      {Object.entries(RISK).map(([k,v])=>(<div key={k} style={{display:"flex",alignItems:"center",gap:5,padding:"3px 10px",borderRadius:20,background:`${v.color}18`,border:`1px solid ${v.color}44`}}><div style={{width:7,height:7,borderRadius:"50%",background:v.color}}/><span style={{fontSize:10,color:v.color,fontFamily:"'JetBrains Mono',monospace",fontWeight:700}}>{k}</span></div>))}
    </div>
    <div style={{display:"flex",gap:8,marginBottom:16,flexWrap:"wrap"}}>
      <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search commands..." style={{flex:1,minWidth:180,padding:"7px 12px",borderRadius:6,background:P.bg2,border:`1px solid ${P.border}`,color:P.text,fontSize:12,fontFamily:"'Space Grotesk',sans-serif",outline:"none"}}/>
      <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>{types.map(t=>(<button key={t} onClick={()=>setFilter(t)} style={{padding:"6px 10px",borderRadius:6,cursor:"pointer",fontSize:10,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,background:filter===t?`${P.orange}22`:P.bg2,border:`1px solid ${filter===t?P.orange:P.border}`,color:filter===t?P.orange:P.textDim}}>{t}</button>))}</div>
    </div>
    <div style={{display:"flex",flexDirection:"column",gap:6}}>
      {filtered.map((c,i)=>{const r=RISK[c.risk];return(
        <div key={i} style={{background:P.bg2,border:`1px solid ${P.border}`,borderLeft:`3px solid ${r.color}`,borderRadius:8,padding:"10px 14px"}}>
          <div style={{display:"flex",alignItems:"flex-start",gap:10,flexWrap:"wrap"}}>
            <Badge label={c.risk} color={r.color}/>
            <Badge label={c.type} color={P.textFaint}/>
            <Mono color={P.teal} bg={P.bg1} size={12}>{c.cmd}</Mono>
            <div style={{flex:"1 1 180px"}}><div style={{color:P.textDim,fontSize:12}}>{c.desc}</div><div style={{color:P.textFaint,fontSize:10,marginTop:2}}>→ {c.target}</div></div>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:8}}>
            <div style={{padding:"5px 10px",borderRadius:4,background:`${r.color}11`,fontSize:11,color:P.textDim}}><span style={{color:r.color,fontWeight:700}}>Impact: </span>{c.impact}</div>
            <div style={{padding:"5px 10px",borderRadius:4,background:`${P.blue}10`,fontSize:11,color:P.textDim}}><span style={{color:P.blue,fontWeight:700}}>Undo: </span><code style={{fontFamily:"'JetBrains Mono',monospace",color:P.blue,fontSize:10}}>{c.undo}</code></div>
          </div>
        </div>
      );})}
    </div>
  </div>);
};

// ══════════════════════════════════════════════════════════
// TAB 6 — PRE/POST CHECKS
// ══════════════════════════════════════════════════════════
const ChecksTab=()=>{
  const [active,setActive]=useState("deploy");
  const [chk,setChk]=useState({});
  const tog=id=>setChk(c=>({...c,[id]:!c[id]}));
  const scenarios={
    deploy:{title:"🚀 Deploy Cookbook",color:P.green,
      pre:[{id:"p1",cmd:"knife cookbook show CB VERSION",desc:"Verify correct version on server"},
           {id:"p2",cmd:"knife node show NODE -a chef_environment",desc:"Node in correct environment"},
           {id:"p3",cmd:"knife environment show ENV",desc:"Check version pins"},
           {id:"p4",cmd:"cookstyle cookbooks/CB/",desc:"Lint — no syntax errors"},
           {id:"p5",cmd:"knife cookbook upload CB",desc:"Upload new version"},
           {id:"p6",cmd:"knife ssh 'name:NODE' 'sudo chef-client --why-run'",desc:"Dry-run preview"}],
      post:[{id:"q1",cmd:"systemctl status httpd",desc:"Apache running"},
            {id:"q2",cmd:"curl -sI http://NODE_IP/ | head -3",desc:"HTTP 200 OK"},
            {id:"q3",cmd:"httpd -t",desc:"Config syntax valid"},
            {id:"q4",cmd:"tail -30 /var/log/chef/client.log",desc:"No errors in chef log"},
            {id:"q5",cmd:"knife runs list NODE --limit 1",desc:"Latest run shows success"}]},
    git:{title:"🌿 Git → Chef Deploy",color:P.orange,
      pre:[{id:"g1",cmd:"git status && git diff HEAD",desc:"Verify only intended changes staged"},
           {id:"g2",cmd:"cookstyle cookbooks/CB/",desc:"Lint before committing"},
           {id:"g3",cmd:"grep -n \"version\" cookbooks/CB/metadata.rb",desc:"Version bumped in metadata.rb"},
           {id:"g4",cmd:"git log --oneline -5",desc:"Confirm commit history is clean"},
           {id:"g5",cmd:"cat Berksfile && berks install",desc:"Dependencies resolve correctly"}],
      post:[{id:"h1",cmd:"knife cookbook list | grep CB",desc:"New version on Chef Server"},
            {id:"h2",cmd:"knife cookbook show CB",desc:"Confirm new version is available"},
            {id:"h3",cmd:"git tag -a vX.Y.Z -m 'message' && git push --tags",desc:"Tag release in git"},
            {id:"h4",cmd:"knife environment show production | grep CB",desc:"Env pinned to new version"}]},
    template:{title:"📋 Template Change",color:P.purple,
      pre:[{id:"t1",cmd:"httpd -t",desc:"Current config is valid BEFORE changing"},
           {id:"t2",cmd:"cp /etc/httpd/conf/httpd.conf /tmp/httpd.conf.bak.$(date +%Y%m%d)",desc:"Backup current config"},
           {id:"t3",cmd:"grep -n 'Listen\\|KeepAlive\\|ServerName' /etc/httpd/conf/httpd.conf",desc:"Record current key values"},
           {id:"t4",cmd:"chef-client --why-run -z",desc:"Dry-run to see what changes"},
           {id:"t5",cmd:"knife cookbook upload CB",desc:"Upload new template"}],
      post:[{id:"u1",cmd:"httpd -t",desc:"Config syntax valid after render"},
            {id:"u2",cmd:"diff /tmp/httpd.conf.bak.DATE /etc/httpd/conf/httpd.conf",desc:"Only expected lines changed"},
            {id:"u3",cmd:"systemctl status httpd",desc:"Apache running after reload"},
            {id:"u4",cmd:"curl -I http://127.0.0.1/",desc:"HTTP 200 OK"},
            {id:"u5",cmd:"tail -20 /var/log/httpd/error_log",desc:"No errors in Apache log"}]},
    attribute:{title:"🏷️ Attribute Change",color:P.gold,
      pre:[{id:"a1",cmd:"knife node show NODE -a cookbook_name",desc:"Record CURRENT attribute values"},
           {id:"a2",cmd:"grep -r \"\\['key'\\]\" cookbooks/CB/recipes/",desc:"Find all recipe references"},
           {id:"a3",cmd:"grep -r \"@key\" cookbooks/CB/templates/",desc:"Find all template references"},
           {id:"a4",cmd:"chef-client --why-run",desc:"Dry run shows what regenerates"}],
      post:[{id:"d1",cmd:"knife node show NODE -a cookbook_name",desc:"Attribute has new value"},
            {id:"d2",cmd:"cat /etc/service/config | grep key",desc:"Rendered file has new value"},
            {id:"d3",cmd:"systemctl status SERVICE",desc:"Service running after config change"}]},
  };
  const sc=scenarios[active];
  const done=(items)=>items.filter(i=>chk[i.id]).length;
  return(<div>
    <SectionTitle icon="✅" title="Pre/Post Check Flows" sub="Interactive checklists for every Chef + Git operation" color={P.teal}/>
    <div style={{display:"flex",gap:8,marginBottom:20,flexWrap:"wrap"}}>
      {Object.entries(scenarios).map(([k,s])=>(<button key={k} onClick={()=>setActive(k)} style={{padding:"9px 16px",borderRadius:8,cursor:"pointer",background:active===k?`${s.color}22`:P.bg2,border:`1px solid ${active===k?s.color:P.border}`,color:active===k?s.color:P.textDim,fontSize:12,fontWeight:active===k?700:400}}>{s.title}</button>))}
      <button onClick={()=>setChk({})} style={{padding:"9px 14px",borderRadius:8,cursor:"pointer",marginLeft:"auto",background:"none",border:`1px solid ${P.border}`,color:P.textFaint,fontSize:11}}>Reset</button>
    </div>
    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
      {[{label:"⬡ PRE-CHECKS",items:sc.pre,color:sc.color},{label:"✓ POST-CHECKS",items:sc.post,color:P.green}].map(({label,items,color})=>(
        <div key={label}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
            <div style={{fontFamily:"'Syne',sans-serif",fontSize:15,fontWeight:800,color}}>{label}</div>
            <span style={{color:P.textDim,fontSize:12}}>{done(items)}/{items.length}</span>
          </div>
          <div style={{height:5,background:P.bg3,borderRadius:3,marginBottom:12,overflow:"hidden"}}><div style={{height:"100%",background:color,borderRadius:3,width:`${(done(items)/items.length)*100}%`,transition:"width 0.3s"}}/></div>
          {items.map((item,i)=>(<div key={item.id} onClick={()=>tog(item.id)} style={{cursor:"pointer",marginBottom:5,padding:"9px 12px",borderRadius:8,background:chk[item.id]?`${color}14`:P.bg2,border:`1px solid ${chk[item.id]?color:P.border}`,transition:"all 0.15s"}}>
            <div style={{display:"flex",alignItems:"flex-start",gap:8}}>
              <span style={{fontSize:15,color:chk[item.id]?color:P.borderLight,flexShrink:0}}>{chk[item.id]?"☑":"☐"}</span>
              <div><code style={{fontFamily:"'JetBrains Mono',monospace",fontSize:11,color:chk[item.id]?color:P.teal,display:"block",marginBottom:2}}>{item.cmd}</code><span style={{color:P.textFaint,fontSize:11}}>{item.desc}</span></div>
            </div>
          </div>))}
        </div>
      ))}
    </div>
    <Card style={{marginTop:16,borderLeft:`3px solid ${P.gold}`,background:`${P.gold}07`}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:700,color:P.gold,marginBottom:8}}>💡 2-Minute Pre-Change Snapshot</div>
      <Pre>{`SNAP=~/snapshots/$(date +%Y%m%d_%H%M%S) && mkdir -p $SNAP
knife cookbook list > $SNAP/cookbooks.txt && knife environment show production > $SNAP/env.txt
knife role show web_server > $SNAP/role.txt && knife node show NODE > $SNAP/node.txt
cp /etc/httpd/conf/httpd.conf $SNAP/httpd.conf.bak 2>/dev/null
echo "Snapshot saved to $SNAP — rollback: knife environment from file $SNAP/env.txt"`}</Pre>
    </Card>
  </div>);
};

// ══════════════════════════════════════════════════════════
// TAB 7 — ROLLBACK
// ══════════════════════════════════════════════════════════
const RollbackTab=()=>{
  const [active,setActive]=useState(null);
  const scenarios=[
    {id:"local",icon:"🌿",color:P.blue,title:"Git Only — Before Upload",risk:"SAFE",when:"You edited cookbook locally. Nothing pushed to Chef Server.",time:"<1 min",
     steps:[{t:"note",v:"No Chef Server state changed. Git undo is sufficient."},{t:"cmd",v:"git checkout -- recipes/default.rb  # restore one file"},{t:"cmd",v:"git checkout -- .                   # restore all files"},{t:"cmd",v:"git stash                           # save without discarding"},{t:"cmd",v:"git revert HEAD --no-edit           # keep history, undo change"}]},
    {id:"uploaded",icon:"📦",color:P.gold,title:"Uploaded, Not Run Yet",risk:"LOW",when:"knife cookbook upload ran. No chef-client run on nodes yet.",time:"2-5 min",
     steps:[{t:"note",v:"Nodes still running old version — clean window to fix."},{t:"cmd",v:"knife cookbook upload CB    # re-upload the PREVIOUS good version"},{t:"note",v:"OR restore environment pin:"},{t:"cmd",v:"knife environment from file $SNAP/environments/ENV.json"},{t:"cmd",v:"knife cookbook delete CB BAD_VERSION --yes"}]},
    {id:"canary",icon:"🖥️",color:P.orange,title:"Canary Node Failed",risk:"MED",when:"chef-client ran on canary/first node and broke something.",time:"5-10 min",
     steps:[{t:"warn",v:"STOP — do not run chef-client on remaining nodes."},{t:"cmd",v:"knife environment from file $SNAP/environments/ENV.json"},{t:"cmd",v:"git checkout GOOD_TAG -- cookbooks/CB/"},{t:"cmd",v:"knife cookbook upload CB"},{t:"cmd",v:"knife ssh 'name:CANARY' 'sudo chef-client' -x user"},{t:"note",v:"Verify canary healthy BEFORE fleet: curl http://CANARY_IP/ && httpd -t"}]},
    {id:"fleet",icon:"🔥",color:P.red,title:"Production Fleet Affected",risk:"CRIT",when:"All production nodes got bad chef-client run. Service degraded.",time:"10-30 min",
     steps:[{t:"warn",v:"INCIDENT — communicate to team immediately."},{t:"cmd",v:"knife environment from file $SNAP/environments/prod.json"},{t:"cmd",v:"knife role from file $SNAP/roles/web_server.json"},{t:"cmd",v:"git checkout LAST_GOOD_TAG -- cookbooks/CB/"},{t:"cmd",v:"knife cookbook upload CB"},{t:"cmd",v:"knife ssh 'chef_environment:production' 'sudo chef-client' -x user -C 5"},{t:"cmd",v:"knife status 'chef_environment:production'  # all green?"},{t:"cmd",v:"git revert HEAD --no-edit && git push origin main"}]},
    {id:"template",icon:"📋",color:P.purple,title:"Bad Template — Service Down",risk:"HIGH",when:"ERB template rendered broken config. Apache fails to start.",time:"2-15 min",
     steps:[{t:"cmd",v:"httpd -t              # see exact error in config"},{t:"cmd",v:"cp /tmp/httpd.conf.bak.DATE /etc/httpd/conf/httpd.conf  # restore backup"},{t:"cmd",v:"systemctl start httpd && httpd -t"},{t:"note",v:"OR fix template and re-upload:"},{t:"cmd",v:"vi cookbooks/CB/templates/default/httpd.conf.erb"},{t:"cmd",v:"knife cookbook upload CB"},{t:"cmd",v:"sudo chef-client -z -r 'recipe[myapache]'"},{t:"warn",v:"Manual edits to /etc/httpd/conf/httpd.conf will be overwritten on next chef-client. Fix the template code."}]},
    {id:"gitattr",icon:"🏷️",color:P.teal,title:"Attribute Broke Config",risk:"MED",when:"Attribute change caused wrong values in rendered config.",time:"5-10 min",
     steps:[{t:"note",v:"Identify which attribute changed and what effect it had."},{t:"cmd",v:"knife node show NODE -a cookbook_name  # current attribute values"},{t:"cmd",v:"git diff HEAD attributes/default.rb      # what attribute changed"},{t:"cmd",v:"git revert HEAD --no-edit               # revert attribute file"},{t:"cmd",v:"knife cookbook upload CB"},{t:"cmd",v:"knife ssh 'name:NODE' 'sudo chef-client' -x user"},{t:"cmd",v:"grep KEY /etc/httpd/conf/httpd.conf       # verify old value restored"}]},
  ];
  const RISK={SAFE:{color:P.blue},LOW:{color:P.green},MED:{color:P.gold},HIGH:{color:P.orange},CRIT:{color:P.red}};
  return(<div>
    <SectionTitle icon="↩️" title="Rollback Decision Trees" sub="Git + Chef rollback paths for every scenario — click your situation" color={P.red}/>
    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:20}}>
      {scenarios.map(s=>(<div key={s.id} onClick={()=>setActive(active===s.id?null:s.id)} style={{cursor:"pointer",padding:"12px 14px",borderRadius:10,background:active===s.id?`${s.color}16`:P.bg2,border:`1px solid ${active===s.id?s.color:P.border}`,transition:"all 0.2s"}}>
        <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}><span style={{fontSize:20}}>{s.icon}</span><Badge label={s.risk} color={RISK[s.risk].color}/></div>
        <div style={{fontFamily:"'Syne',sans-serif",fontSize:12,fontWeight:700,color:active===s.id?s.color:P.text,lineHeight:1.3,marginBottom:4}}>{s.title}</div>
        <div style={{color:P.textFaint,fontSize:10}}>⏱ {s.time}</div>
      </div>))}
    </div>
    {scenarios.filter(s=>s.id===active).map(s=>(
      <Card key={s.id} style={{borderLeft:`4px solid ${s.color}`,background:`${s.color}06`}}>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:10}}><span style={{fontSize:22}}>{s.icon}</span><span style={{fontFamily:"'Syne',sans-serif",fontSize:18,fontWeight:800,color:s.color}}>{s.title}</span><Badge label={s.risk+" RISK"} color={RISK[s.risk].color}/></div>
        <div style={{padding:"7px 12px",borderRadius:5,background:P.bg3,fontSize:12,color:P.textDim,borderLeft:`2px solid ${s.color}66`,marginBottom:12}}><strong style={{color:P.text}}>When: </strong>{s.when} <strong style={{color:P.text,marginLeft:12}}>Time: </strong>{s.time}</div>
        <div style={{display:"flex",flexDirection:"column",gap:5}}>
          {s.steps.map((step,i)=>{
            if(step.t==="cmd") return(<div key={i} style={{display:"flex",gap:8,alignItems:"center"}}><span style={{color:P.textFaint,fontSize:10,fontFamily:"'JetBrains Mono',monospace",minWidth:18,textAlign:"right"}}>{i+1}.</span><Pre color={P.teal}>{step.v}</Pre></div>);
            if(step.t==="note") return(<div key={i} style={{padding:"6px 12px",borderRadius:4,background:`${P.blue}10`,borderLeft:`2px solid ${P.blue}`,fontSize:12,color:P.blue,fontStyle:"italic"}}>{step.v}</div>);
            if(step.t==="warn") return(<div key={i} style={{padding:"7px 12px",borderRadius:4,background:`${P.red}10`,border:`1px solid ${P.red}33`,fontSize:12,color:P.red,fontWeight:600}}>⚠️ {step.v}</div>);
            return null;
          })}
        </div>
      </Card>
    ))}
    <Card style={{marginTop:14,borderLeft:`3px solid ${P.red}`,background:`${P.red}06`}}>
      <div style={{fontFamily:"'Syne',sans-serif",fontSize:13,fontWeight:800,color:P.red,marginBottom:8}}>🔥 30-SECOND EMERGENCY ROLLBACK — Production Fleet</div>
      <Pre>{`SNAP=~/snapshots/YYYYMMDD_HHMMSS
knife environment from file $SNAP/environments/env_production.json  # restore env pins
knife role from file $SNAP/roles/role_web_server.json               # restore role
knife ssh 'chef_environment:production' 'sudo chef-client' -x user -C 5  # reconverge
git revert HEAD --no-edit && git push origin main                   # revert code
knife status 'chef_environment:production'                          # verify green`}</Pre>
    </Card>
  </div>);
};

// ══════════════════════════════════════════════════════════
// MAIN APP
// ══════════════════════════════════════════════════════════
export default function App(){
  const [tab,setTab]=useState("mental");
  return(
    <div style={{minHeight:"100vh",background:P.bg0,color:P.text}}>
      <style>{FONTS+css}</style>
      <div style={{background:P.bg1,borderBottom:`1px solid ${P.border}`,padding:"0 20px",position:"sticky",top:0,zIndex:100}}>
        <div style={{maxWidth:1300,margin:"0 auto",display:"flex",alignItems:"center",gap:16,flexWrap:"wrap"}}>
          <div style={{padding:"12px 0",flexShrink:0}}>
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:P.red,letterSpacing:-0.5}}>Chef</span>
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:400,color:P.textDim}}> + </span>
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:800,color:P.orange}}>Git</span>
            <span style={{fontFamily:"'Syne',sans-serif",fontSize:20,fontWeight:400,color:P.textDim}}> Deep Reference</span>
          </div>
          <div style={{display:"flex",gap:1,flexWrap:"wrap"}}>
            {TABS.map(t=>(<button key={t.id} onClick={()=>setTab(t.id)} style={{padding:"7px 13px",border:"none",cursor:"pointer",background:tab===t.id?`${P.red}22`:"transparent",borderBottom:tab===t.id?`2px solid ${P.red}`:"2px solid transparent",color:tab===t.id?P.red:P.textDim,fontFamily:"'Space Grotesk',sans-serif",fontSize:12,fontWeight:tab===t.id?700:400,display:"flex",alignItems:"center",gap:5,whiteSpace:"nowrap"}}><span>{t.icon}</span><span>{t.label}</span></button>))}
          </div>
        </div>
      </div>
      <div style={{maxWidth:1300,margin:"0 auto",padding:"24px 20px"}}>
        {tab==="mental"   && <MentalModelTab/>}
        {tab==="git"      && <GitTab/>}
        {tab==="apache"   && <ApacheTab/>}
        {tab==="flow"     && <RunFlowTab/>}
        {tab==="commands" && <CommandsTab/>}
        {tab==="checks"   && <ChecksTab/>}
        {tab==="rollback" && <RollbackTab/>}
      </div>
    </div>
  );
}
