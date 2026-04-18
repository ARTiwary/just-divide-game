import { useState, useEffect, useRef, useCallback } from "react";


const tileStyle = (v) => {
  const map = {
    2:  { bg:"#f9e784", shadow:"#c9a800", text:"#7a5c00" },
    3:  { bg:"#f4a261", shadow:"#c0622a", text:"#fff" },
    4:  { bg:"#e76f51", shadow:"#a03a20", text:"#fff" },
    5:  { bg:"#84c5f4", shadow:"#2a7abf", text:"#fff" },
    6:  { bg:"#a8edea", shadow:"#2a9d8f", text:"#1a5c58" },
    7:  { bg:"#b5ead7", shadow:"#2d9b6f", text:"#1b5e37" },
    8:  { bg:"#f5c900", shadow:"#b89000", text:"#7a5c00" },
    9:  { bg:"#f4845f", shadow:"#c0432a", text:"#fff" },
    10: { bg:"#90e0ef", shadow:"#0077b6", text:"#fff" },
    12: { bg:"#e63946", shadow:"#9b0b17", text:"#fff" },
    15: { bg:"#f77f00", shadow:"#b35a00", text:"#fff" },
    16: { bg:"#6a994e", shadow:"#3a6b22", text:"#fff" },
    18: { bg:"#e63946", shadow:"#9c0b17", text:"#fff" },
    20: { bg:"#2ec4b6", shadow:"#1a8a80", text:"#fff" },
    24: { bg:"#8ecae6", shadow:"#219ebc", text:"#fff" },
    25: { bg:"#ffb703", shadow:"#c8860a", text:"#fff" },
    30: { bg:"#3a0ca3", shadow:"#10002b", text:"#fff" },
    32: { bg:"#e9c46a", shadow:"#c09a2a", text:"#7a5c00" },
    35: { bg:"#b04dff", shadow:"#6a00c9", text:"#fff" },
    36: { bg:"#2a9d8f", shadow:"#1a6b64", text:"#fff" },
    6:  { bg:"#a8edea", shadow:"#2a9d8f", text:"#1a5c58" },
  };
  return map[v] || { bg:"#9b5de5", shadow:"#6a0dad", text:"#fff" };
};

const POOL = [2,3,4,5,6,8,9,10,12,15,16,18,20,24,25,30,32,35,36];
const randTile = () => POOL[Math.floor(Math.random() * POOL.length)];
const makeQueue = () => [randTile(), randTile(), randTile()];


function applyMerges(grid) {
  let g = [...grid], score = 0, changed = true;
  const DIRS = [-1, 1, -4, 4];
  while (changed) {
    changed = false;
    outer: for (let i = 0; i < 16; i++) {
      if (!g[i]) continue;
      for (let d of DIRS) {
        const j = i + d;
        if (j < 0 || j > 15) continue;
        if (d === -1 && i % 4 === 0) continue;
        if (d ===  1 && i % 4 === 3) continue;
        if (!g[j]) continue;
        const a = g[i], b = g[j];
        if (a === b) { g[i]=null; g[j]=null; score+=a; changed=true; break outer; }
        const big=Math.max(a,b), small=Math.min(a,b);
        if (big % small === 0) {
          const res=big/small, bi=g[i]===big?i:j, si=g[i]===small?i:j;
          g[si]=null;
          if (res===1) { g[bi]=null; score+=big; } else { g[bi]=res; score+=small; }
          changed=true; break outer;
        }
      }
    }
  }
  return { grid:g, score };
}

function computeHints(grid, val) {
  if (!val) return [];
  const hints=[], DIRS=[-1,1,-4,4];
  for (let i=0;i<16;i++) {
    if (grid[i]) continue;
    for (let d of DIRS) {
      const j=i+d;
      if (j<0||j>15) continue;
      if (d===-1&&i%4===0) continue;
      if (d===1&&i%4===3) continue;
      if (!grid[j]) continue;
      const n=grid[j];
      if (n===val){hints.push(i);break;}
      const big=Math.max(n,val),small=Math.min(n,val);
      if (big%small===0){hints.push(i);break;}
    }
  }
  return hints;
}

function CatFace() {
  const Y = "#f5a623";   // orange body
  const YL = "#ffc04d";  // lighter orange face
  const BD = "#c97a10";  // dark border/stripe
  const PK = "#f4a0a0";  // pink inner ear / blush

  return (
    <div style={{ position:"relative", width:160, height:95, flexShrink:0, zIndex:10 }}>

      
      <div style={{ position:"absolute", top:0, left:24, zIndex:8 }}>
        
        <div style={{ width:0, height:0,
          borderLeft:"18px solid transparent",
          borderRight:"18px solid transparent",
          borderBottom:`32px solid ${BD}`,
        }}/>
        
        <div style={{ position:"absolute", top:8, left:-10, width:0, height:0,
          borderLeft:"10px solid transparent",
          borderRight:"10px solid transparent",
          borderBottom:`20px solid ${PK}`,
        }}/>
      </div>

      
      <div style={{ position:"absolute", top:0, right:24, zIndex:8 }}>
        <div style={{ width:0, height:0,
          borderLeft:"18px solid transparent",
          borderRight:"18px solid transparent",
          borderBottom:`32px solid ${BD}`,
        }}/>
        <div style={{ position:"absolute", top:8, left:-10, width:0, height:0,
          borderLeft:"10px solid transparent",
          borderRight:"10px solid transparent",
          borderBottom:`20px solid ${PK}`,
        }}/>
      </div>

      
      <div style={{
        position:"absolute", top:18, left:"50%", transform:"translateX(-50%)",
        width:116, height:76,
        background:`linear-gradient(180deg, ${YL} 0%, ${Y} 100%)`,
        border:`3px solid ${BD}`,
        borderRadius:"52% 52% 48% 48%",
        zIndex:9,
        overflow:"visible",
      }}>

        
        <div style={{ position:"absolute", top:6, left:"50%", transform:"translateX(-50%)", display:"flex", gap:5 }}>
          {[0,1,2].map(i=>(
            <div key={i} style={{ width:5, height:16, background:BD, borderRadius:3 }}/>
          ))}
        </div>

        
        <div style={{ position:"absolute", top:30, left:0, right:0, display:"flex", justifyContent:"center", gap:26 }}>
          {[0,1].map(i=>(
            <div key={i} style={{ position:"relative" }}>
            
              <div style={{ width:20, height:15, background:"#2d1a00", borderRadius:"50%", overflow:"hidden" }}>
                
                <div style={{ position:"absolute", top:2, left:3, width:8, height:8, background:"#fff", borderRadius:"50%" }}/>
                <div style={{ position:"absolute", top:2, right:2, width:5, height:5, background:"#fff", borderRadius:"50%", opacity:0.5 }}/>
              </div>
              
              <div style={{
                position:"absolute", top:0, left:0, right:0, height:7,
                background:`${Y}`,
                borderRadius:"50% 50% 0 0",
                borderBottom:`2px solid ${BD}`,
              }}/>
            </div>
          ))}
        </div>

        
        <div style={{
          position:"absolute", top:48, left:"50%", transform:"translateX(-50%)",
          width:10, height:7,
          background:"#e87070",
          borderRadius:"50% 50% 50% 50% / 40% 40% 60% 60%",
        }}/>

        
        <div style={{ position:"absolute", top:56, left:"50%", transform:"translateX(-50%)", display:"flex" }}>
          <div style={{ width:11, height:7, borderBottom:`2.5px solid ${BD}`, borderLeft:`2.5px solid ${BD}`, borderRadius:"0 0 0 8px" }}/>
          <div style={{ width:11, height:7, borderBottom:`2.5px solid ${BD}`, borderRight:`2.5px solid ${BD}`, borderRadius:"0 0 8px 0" }}/>
        </div>

        
        <div style={{ position:"absolute", top:44, left:6, width:18, height:10, background:"#f4906050", borderRadius:"50%" }}/>
        <div style={{ position:"absolute", top:44, right:6, width:18, height:10, background:"#f4906050", borderRadius:"50%" }}/>

        
        <div style={{ position:"absolute", top:43, left:-36, display:"flex", flexDirection:"column", gap:5 }}>
          {[32,25,18].map((w,i)=>(
            <div key={i} style={{ width:w, height:2, background:BD, borderRadius:1, opacity:0.7 }}/>
          ))}
        </div>

        
        <div style={{ position:"absolute", top:43, right:-36, display:"flex", flexDirection:"column", gap:5, alignItems:"flex-end" }}>
          {[32,25,18].map((w,i)=>(
            <div key={i} style={{ width:w, height:2, background:BD, borderRadius:1, opacity:0.7 }}/>
          ))}
        </div>
      </div>

      
      <div style={{
        position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)",
        width:130, height:22,
        background:Y,
        border:`3px solid ${BD}`,
        borderTop:"none",
        borderRadius:"0 0 22px 22px",
        zIndex:8,
      }}/>

      
      <div style={{
        position:"absolute", bottom:0, left:0,
        width:44, height:20,
        background:Y,
        border:`3px solid ${BD}`,
        borderRadius:"50% 50% 14px 14px",
        zIndex:11,
      }}>
        {[5,15,25].map(l=>(
          <div key={l} style={{
            position:"absolute", top:-7, left:l,
            width:10, height:10,
            background:YL, border:`2.5px solid ${BD}`,
            borderRadius:"50%",
          }}/>
        ))}
      </div>

      {/* ── Right paw ── */}
      <div style={{
        position:"absolute", bottom:0, right:0,
        width:44, height:20,
        background:Y,
        border:`3px solid ${BD}`,
        borderRadius:"50% 50% 14px 14px",
        zIndex:11,
      }}>
        {[5,15,25].map(l=>(
          <div key={l} style={{
            position:"absolute", top:-7, left:l,
            width:10, height:10,
            background:YL, border:`2.5px solid ${BD}`,
            borderRadius:"50%",
          }}/>
        ))}
      </div>
    </div>
  );
}


function Tile({ value, size=62, draggable, onDragStart, onTouchStart, faded }) {
  if (!value) return null;
  const s = tileStyle(value);
  return (
    <div
      draggable={draggable}
      onDragStart={onDragStart}
      onTouchStart={onTouchStart}
      style={{
        width:size, height:size,
        background:s.bg,
        borderRadius:10,
        boxShadow:`0 5px 0 ${s.shadow}`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontFamily:"'Fredoka One',cursive",
        fontSize: size>55 ? 24 : size>42 ? 18 : 13,
        color:s.text,
        cursor: draggable ? "grab" : "default",
        userSelect:"none",
        opacity: faded ? 0.55 : 1,
        flexShrink:0,
        transition:"transform 0.08s",
        fontWeight:900,
      }}
    >
      {value}
    </div>
  );
}


const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@700;900&display=swap');

*, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
html, body { width:100%; height:100%; overflow:hidden; }
body { font-family:'Nunito',sans-serif; }

.root {
  width:100vw; height:100vh;
  display:flex; flex-direction:column;
  align-items:center; justify-content:center;
  background: #f9c5b0;
  position:relative; overflow:hidden;
}

/* pink bubble bg like screenshot */
.root::before {
  content:'';
  position:absolute; inset:0;
  background:
    radial-gradient(ellipse 55% 55% at 20% 30%, #ffd0be 0%, transparent 70%),
    radial-gradient(ellipse 45% 45% at 80% 70%, #f4a88880 0%, transparent 70%);
  pointer-events:none;
}

.bub { position:absolute; border-radius:50%; pointer-events:none; }

/* ── Top bar ── */
.topbar {
  position:absolute; top:0; left:0; right:0;
  display:flex; align-items:center; justify-content:space-between;
  padding:12px 18px; z-index:20;
}
.coin-badge {
  background:#6c3fc9;
  border-radius:50%;
  width:42px; height:42px;
  display:flex; align-items:center; justify-content:center;
  color:#fff; font-family:'Fredoka One',cursive; font-size:14px;
  box-shadow:0 4px 0 #3d1e8a, 0 0 0 3px #fff;
}
.title-wrap { flex:1; text-align:center; }
.game-title {
  font-family:'Fredoka One',cursive;
  font-size:26px; letter-spacing:2px; color:#2d1060;
}
.timer-row {
  display:flex; align-items:center; justify-content:center; gap:5px;
  font-family:'Fredoka One',cursive; font-size:16px; color:#555; margin-top:2px;
}
.help-btn {
  background:#22c55e; border-radius:50%;
  width:42px; height:42px; border:none;
  display:flex; align-items:center; justify-content:center;
  color:#fff; font-family:'Fredoka One',cursive; font-size:20px;
  box-shadow:0 4px 0 #15803d, 0 0 0 3px #fff; cursor:pointer;
}

/* ── Instruction banner ── */
.banner {
  position:absolute; top:80px; left:0; right:0;
  display:flex; justify-content:center; z-index:20;
}
.banner-inner {
  background:transparent;
  padding:4px 16px;
  font-family:'Fredoka One',cursive;
  font-size:12px; letter-spacing:1.5px;
  color:#e05020;
  text-align:center;
  text-shadow:0 1px 0 rgba(255,255,255,0.3);
}

/* ── Main layout ── */
.main {
  display:flex; gap:18px; align-items:flex-start;
  position:relative; z-index:10;
  margin-top:10px;
}

/* ── Left: cat + grid stacked ── */
.grid-section {
  display:flex; flex-direction:column; align-items:center;
  position:relative;
}

/* Cat sits on TOP of grid, overlapping it */
.cat-wrap {
  position:relative; z-index:15;
  margin-bottom:-12px; /* overlap with grid top */
}

/* Grid container with level/score badges on top edge */
.grid-block {
  position:relative;
  background:#1fa090;
  border-radius:20px;
  padding:10px;
  padding-top:36px; /* space for badges */
  box-shadow:0 8px 0 #0d6b5e, 0 12px 28px rgba(0,0,0,0.22);
}

/* Level badge — sits on left side of grid top edge */
.lvl-badge {
  position:absolute;
  top:-1px; left:10px;
  background:#c0392b;
  color:#fff;
  font-family:'Fredoka One',cursive;
  font-size:15px;
  padding:7px 20px;
  border-radius:10px;
  box-shadow:0 5px 0 #7b0b0b;
  white-space:nowrap;
  z-index:16;
}

/* Score badge — sits on right side of grid top edge */
.sc-badge {
  position:absolute;
  top:-1px; right:10px;
  background:#c0392b;
  color:#fff;
  font-family:'Fredoka One',cursive;
  font-size:15px;
  padding:7px 20px;
  border-radius:10px;
  box-shadow:0 5px 0 #7b0b0b;
  white-space:nowrap;
  z-index:16;
}

.grid {
  display:grid;
  grid-template-columns:repeat(4,70px);
  grid-template-rows:repeat(4,70px);
  gap:7px;
}
.cell {
  width:70px; height:70px;
  background:#22c4ae;
  border-radius:10px;
  border:2px solid #199e8a;
  display:flex; align-items:center; justify-content:center;
  cursor:pointer;
  transition:background 0.12s, transform 0.1s;
}
.cell.hint { background:#7fffd4; border-color:#00c896; box-shadow:0 0 10px #00ffa0; }
.cell.over { background:#4adecb; transform:scale(1.06); border-color:#fff; }

/* ── Right panel ── */
.panel {
  display:flex; flex-direction:column;
  gap:10px; align-items:center;
  margin-top:20px;
}

/* Wooden panel box */
.pbox {
  background:#fff8e8;
  border:3px solid #d4a030;
  border-radius:16px;
  padding:8px 8px 10px;
  display:flex; flex-direction:column; align-items:center; gap:6px;
  width:116px;
  box-shadow:0 6px 0 #a07010;
}
.plabel {
  font-family:'Fredoka One',cursive;
  font-size:12px; color:#a07010; letter-spacing:1px;
}

/* Keep slot — teal square */
.keep-inner {
  background:#64ddd0;
  border:3px solid #22c4ae;
  border-radius:12px;
  width:84px; height:84px;
  display:flex; align-items:center; justify-content:center;
  box-shadow:inset 0 2px 6px rgba(0,0,0,0.12);
  transition:background 0.12s;
}
.keep-inner.over { background:#7fffd4; border-color:#22c55e; }

/* Queue */
.queue-row { display:flex; gap:6px; align-items:center; justify-content:center; }

/* Trash */
.trash-inner {
  background:#c0392b;
  border-radius:12px;
  width:72px; height:62px;
  display:flex; flex-direction:column;
  align-items:center; justify-content:center; gap:3px;
  box-shadow:0 5px 0 #7b0b0b;
  transition:background 0.12s;
}
.trash-inner.over { background:#e74c3c; }
.trash-count { font-family:'Fredoka One',cursive; font-size:11px; color:#fff; letter-spacing:0.5px; }

/* Controls */
.ctrl-row {
  display:flex; gap:6px; align-items:center; justify-content:center;
  margin-top:6px;
}
.cbtn {
  font-family:'Fredoka One',cursive; font-size:10px;
  border:2px solid #a855f7; border-radius:8px;
  padding:2px 8px; background:transparent; color:#a855f7; cursor:pointer;
}
.cbtn.on { background:#a855f7; color:#fff; }

/* Game over */
.overlay {
  position:fixed; inset:0;
  background:rgba(0,0,0,0.6);
  display:flex; align-items:center; justify-content:center; z-index:100;
}
.ocard {
  background:#fff4f0; border-radius:24px;
  padding:36px 48px; text-align:center;
  box-shadow:0 12px 40px rgba(0,0,0,0.3);
  display:flex; flex-direction:column; align-items:center; gap:14px;
}
.otitle { font-family:'Fredoka One',cursive; font-size:36px; color:#c0392b; }
.oscore { font-family:'Fredoka One',cursive; font-size:20px; color:#f97316; }
.pbtn {
  font-family:'Fredoka One',cursive; font-size:16px;
  border:none; border-radius:12px; padding:10px 28px;
  cursor:pointer; color:#fff; background:#22c55e;
  box-shadow:0 4px 0 #15803d;
}
.pbtn:active { transform:translateY(2px); }

@media(max-width:580px){
  .grid { grid-template-columns:repeat(4,56px); grid-template-rows:repeat(4,56px); }
  .cell { width:56px; height:56px; }
  .pbox { width:92px; }
  .keep-inner { width:68px; height:68px; }
  .game-title { font-size:20px; }
}
`;


export default function JustDivide() {
  const getBest = () => parseInt(localStorage.getItem("jd_best") || "0");

  const fresh = () => ({
    grid: Array(16).fill(null),
    queue: makeQueue(),
    keepVal: null,
    score: 0,
    bestScore: getBest(),
    undoStack: [],
    level: 1,
    trashCount: 10,
    hintsEnabled: false,
    timer: 0,
    gameOver: false,
  });

  const [S, setS]           = useState(fresh);
  const [dragSrc, setDragSrc] = useState(null);
  const [over, setOver]     = useState(null);
  const timerRef = useRef(null);
  const touchRef = useRef(null);
  const srcRef   = useRef(null);

  useEffect(() => { srcRef.current = dragSrc; }, [dragSrc]);

  useEffect(() => {
    if (S.gameOver) { clearInterval(timerRef.current); return; }
    timerRef.current = setInterval(() => setS(s=>({...s, timer:s.timer+1})), 1000);
    return () => clearInterval(timerRef.current);
  }, [S.gameOver]);

  useEffect(() => {
    const h = e => {
      if (e.key==="r"||e.key==="R") setS(fresh());
      if (e.key==="z"||e.key==="Z") undo();
      if (e.key==="g"||e.key==="G") setS(s=>({...s,hintsEnabled:!s.hintsEnabled}));
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  });

  const snap = s => ({...s, grid:[...s.grid], queue:[...s.queue]});

  const undo = () => setS(s => {
    if (!s.undoStack.length) return s;
    const prev = s.undoStack[s.undoStack.length-1];
    return {...prev, undoStack:s.undoStack.slice(0,-1)};
  });

  const placeGrid = useCallback((idx) => {
    const src = srcRef.current;
    setS(s => {
      if (s.grid[idx] !== null) return s;
      const tile = src==="keep" ? s.keepVal : s.queue[0];
      if (!tile) return s;
      const prev = snap(s);
      let g = [...s.grid]; g[idx] = tile;
      const {grid:merged, score:gained} = applyMerges(g);
      const newQueue = src==="keep" ? [...s.queue] : [...s.queue.slice(1), randTile()];
      const newKeep  = src==="keep" ? null : s.keepVal;
      const newScore = s.score + gained;
      const newBest  = Math.max(newScore, s.bestScore);
      if (newBest > s.bestScore) localStorage.setItem("jd_best", newBest);
      const newLevel = Math.floor(newScore/10)+1;
      const lvlUp    = newLevel > s.level;
      const full     = merged.every(v=>v!==null);
      return {
        ...s, grid:merged, queue:newQueue, keepVal:newKeep,
        score:newScore, bestScore:newBest, level:newLevel,
        trashCount: lvlUp ? s.trashCount+2 : s.trashCount,
        undoStack:[...s.undoStack.slice(-9), prev],
        gameOver:full,
      };
    });
    setOver(null); setDragSrc(null); srcRef.current=null;
  }, []);

  const placeKeep = useCallback(() => {
    const src = srcRef.current;
    setS(s => {
      if (src==="keep") return s;
      const tile = s.queue[0]; if (!tile) return s;
      const prev = snap(s);
      const oldKeep = s.keepVal;
      const newQueue = oldKeep ? [oldKeep,...s.queue.slice(1)] : [...s.queue.slice(1), randTile()];
      return {...s, keepVal:tile, queue:newQueue, undoStack:[...s.undoStack.slice(-9),prev]};
    });
    setOver(null); setDragSrc(null); srcRef.current=null;
  }, []);

  const placeTrash = useCallback(() => {
    const src = srcRef.current;
    setS(s => {
      if (s.trashCount<=0) return s;
      const prev = snap(s);
      const newQueue = src==="keep" ? [...s.queue] : [...s.queue.slice(1), randTile()];
      const newKeep  = src==="keep" ? null : s.keepVal;
      return {
        ...s, queue:newQueue, keepVal:newKeep,
        trashCount:s.trashCount-1,
        undoStack:[...s.undoStack.slice(-9),prev],
      };
    });
    setOver(null); setDragSrc(null); srcRef.current=null;
  }, []);

  const fmt = t =>
    `${String(Math.floor(t/60)).padStart(2,"0")}:${String(t%60).padStart(2,"0")}`;

  const activeVal = dragSrc==="keep" ? S.keepVal : S.queue[0];
  const hints = S.hintsEnabled ? computeHints(S.grid, activeVal||S.queue[0]) : [];

  const startDrag  = src => () => { setDragSrc(src); srcRef.current=src; };
  const startTouch = src => () => { setDragSrc(src); srcRef.current=src; touchRef.current=src; };
  const cellTouch  = idx => () => { if (touchRef.current&&!S.grid[idx]) placeGrid(idx); touchRef.current=null; };
  const keepTouch  = () => { if (touchRef.current) placeKeep(); touchRef.current=null; };
  const trashTouch = () => { if (touchRef.current) placeTrash(); touchRef.current=null; };

  return (
    <>
      <style>{CSS}</style>
      <div className="root">

        
        {[
          { w:100, h:100, top:"8%",  left:"1%",    c:"#f4a26960" },
          { w:55,  h:55,  top:"55%", left:"0%",    c:"#f4a26950" },
          { w:150, h:150, top:"68%", left:"1%",    c:"#f4a26938" },
          { w:45,  h:45,  top:"32%", left:"8%",    c:"#f9c5b055" },
          { w:70,  h:70,  top:"10%", right:"1%",   c:"#f9e78448" },
          { w:110, h:110, top:"50%", right:"0%",   c:"#f4a26955" },
          { w:45,  h:45,  top:"80%", right:"6%",   c:"#84c5f448" },
          { w:60,  h:60,  top:"74%", right:"20%",  c:"#f4a26950" },
          { w:32,  h:32,  top:"40%", right:"4%",   c:"#f9e78448" },
          { w:70,  h:70,  top:"18%", left:"16%",   c:"#f9c5b040" },
          { w:38,  h:38,  top:"88%", left:"20%",   c:"#f4a26945" },
        ].map((b,i)=>(
          <div key={i} className="bub" style={{
            width:b.w, height:b.h, top:b.top, left:b.left, right:b.right, background:b.c,
          }}/>
        ))}

      
        <div className="topbar">
          <div className="coin-badge">00</div>
          <div className="title-wrap">
            <div className="game-title">JUST DIVIDE</div>
            <div className="timer-row">
              {/* hourglass */}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                stroke="#555" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 2h14M5 22h14M6 2v4l4 6-4 6v4M18 2v4l-4 6 4 6v4"/>
              </svg>
              {fmt(S.timer)}
            </div>
          </div>
          <button className="help-btn">?</button>
        </div>

        
        <div className="banner">
          <div className="banner-inner">
            ● DIVIDE WITH THE NUMBERS TO SOLVE THE ROWS AND COLUMNS.
          </div>
        </div>

        
        <div className="main">

          
          <div className="grid-section">

           
            <div className="cat-wrap">
              <CatFace />
            </div>

            
            <div className="grid-block">
              <div className="lvl-badge">LEVEL {S.level}</div>
              <div className="sc-badge">SCORE {S.score}</div>

              <div className="grid">
                {S.grid.map((val,idx)=>(
                  <div
                    key={idx}
                    className={`cell${hints.includes(idx)?" hint":""}${over===idx?" over":""}`}
                    onDragOver={e=>{e.preventDefault();if(!S.grid[idx])setOver(idx);}}
                    onDragLeave={()=>setOver(null)}
                    onDrop={e=>{e.preventDefault();if(!S.grid[idx])placeGrid(idx);}}
                    onTouchEnd={cellTouch(idx)}
                  >
                    {val && <Tile value={val} size={60}/>}
                  </div>
                ))}
              </div>
            </div>

            
            <div className="ctrl-row" style={{marginTop:8}}>
              <button
                className={`cbtn${S.hintsEnabled?" on":""}`}
                onClick={()=>setS(s=>({...s,hintsEnabled:!s.hintsEnabled}))}
              >💡 HINTS</button>
              <button className="cbtn" onClick={undo}>↩ UNDO</button>
              <button className="cbtn" onClick={()=>setS(fresh())}>🔄 NEW</button>
              <span style={{fontFamily:"'Fredoka One',cursive",fontSize:10,color:"#b06040"}}>
                BEST:{S.bestScore}
              </span>
            </div>
          </div>

          
          <div className="panel">

            
            <div
              className="pbox"
              onDragOver={e=>{e.preventDefault();setOver("keep");}}
              onDragLeave={()=>setOver(null)}
              onDrop={e=>{e.preventDefault();placeKeep();}}
              onTouchEnd={keepTouch}
            >
              <div className={`keep-inner${over==="keep"?" over":""}`}>
                {S.keepVal &&
                  <Tile value={S.keepVal} size={64} draggable
                    onDragStart={startDrag("keep")}
                    onTouchStart={startTouch("keep")}
                  />
                }
              </div>
              <div className="plabel">KEEP</div>
            </div>

            
            <div className="pbox">
              <div className="queue-row">
                <Tile value={S.queue[0]} size={58} draggable
                  onDragStart={startDrag("queue")}
                  onTouchStart={startTouch("queue")}
                />
                {S.queue[1] && <Tile value={S.queue[1]} size={46} faded/>}
              </div>
              {S.queue[2] &&
                <div style={{marginTop:2}}>
                  <Tile value={S.queue[2]} size={30} faded/>
                </div>
              }
            </div>

            
            <div
              className="pbox"
              onDragOver={e=>{e.preventDefault();setOver("trash");}}
              onDragLeave={()=>setOver(null)}
              onDrop={e=>{e.preventDefault();placeTrash();}}
              onTouchEnd={trashTouch}
            >
              <div className="plabel">TRASH</div>
              <div className={`trash-inner${over==="trash"?" over":""}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                  stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14H6L5 6"/>
                  <path d="M10 11v6M14 11v6M9 6V4h6v2"/>
                </svg>
                <div className="trash-count">x{S.trashCount}</div>
              </div>
            </div>

          </div>
        </div>

        
        {S.gameOver && (
          <div className="overlay">
            <div className="ocard">
              <div style={{fontSize:52}}>😿</div>
              <div className="otitle">GAME OVER!</div>
              <div className="oscore">Score: {S.score}</div>
              <div className="oscore" style={{color:"#a855f7"}}>Best: {S.bestScore}</div>
              <button className="pbtn" onClick={()=>setS(fresh())}>🎮 Play Again</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}