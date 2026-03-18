import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const SLIDES = [
  { id: 0, label: "Заглавный" },
  { id: 1, label: "История" },
  { id: 2, label: "Возможности" },
  { id: 3, label: "Статистика" },
  { id: 4, label: "Влияние" },
  { id: 5, label: "Будущее" },
];

const networkImg = "https://cdn.poehali.dev/projects/61940178-bf70-4e64-bb62-b34ff76884d1/files/8ffda6de-d718-419f-9d0b-76e84fb7992d.jpg";
const telegramImg = "https://cdn.poehali.dev/projects/61940178-bf70-4e64-bb62-b34ff76884d1/files/8ea6bfd7-f293-4198-9e08-8c68ae6a8a1e.jpg";
const durovImg = "https://cdn.poehali.dev/projects/61940178-bf70-4e64-bb62-b34ff76884d1/files/dfc54262-9dd8-410f-94b3-966207e5c933.jpg";

const growthData = [
  { year: "2013", users: 0.1 },
  { year: "2015", users: 60 },
  { year: "2018", users: 200 },
  { year: "2020", users: 400 },
  { year: "2022", users: 700 },
  { year: "2024", users: 900 },
];

function AnimatedCounter({ target, suffix = "", decimals = 0 }: { target: number; suffix?: string; decimals?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    started.current = false;
    setCount(0);
  }, [target]);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const step = target / 70;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(parseFloat(start.toFixed(decimals)));
        }, 18);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, decimals]);

  return <span ref={ref}>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}</span>;
}

function GrowthBar({ year, users, max, delay }: { year: string; users: number; max: number; delay: number }) {
  const [h, setH] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setTimeout(() => setH((users / max) * 100), delay);
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [users, max, delay]);

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", flex: 1 }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--tg-accent)" }}>{users >= 100 ? `${(users / 1000).toFixed(1)}млрд` : `${users}млн`}</span>
      <div style={{ width: "100%", height: "120px", display: "flex", alignItems: "flex-end", background: "rgba(255,255,255,0.03)", borderRadius: "6px 6px 0 0", overflow: "hidden" }}>
        <div style={{ width: "100%", height: `${h}%`, background: "linear-gradient(to top, #2AABEE, #00d4ff44)", transition: `height 1.2s cubic-bezier(0.22,1,0.36,1) ${delay}ms`, borderRadius: "4px 4px 0 0" }} />
      </div>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "#4a6a7a" }}>{year}</span>
    </div>
  );
}

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);

  const goTo = (idx: number) => {
    if (animating || idx === current) return;
    setDirection(idx > current ? "next" : "prev");
    setAnimating(true);
    setTimeout(() => { setCurrent(idx); setAnimating(false); }, 520);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(Math.min(current + 1, SLIDES.length - 1));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(Math.max(current - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, animating]);

  const cls = (id: number) => {
    if (id === current) return "slide-active";
    if (animating) {
      if (direction === "next") return id < current ? "slide-exit-next" : "slide-enter-next";
      return id > current ? "slide-exit-prev" : "slide-enter-prev";
    }
    return id < current ? "slide-off-left" : "slide-off-right";
  };

  const TOTAL = SLIDES.length;

  return (
    <div className="pres-root">
      <style>{`
        :root {
          --tg: #2AABEE;
          --tg-dark: #050d1c;
          --tg-mid: #081428;
          --tg-acc: #40c8ff;
          --tg-glow: rgba(42,171,238,0.22);
          --font-d: 'Oswald', sans-serif;
          --font-b: 'IBM Plex Sans', sans-serif;
          --font-m: 'IBM Plex Mono', monospace;
        }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        .pres-root {
          width: 100vw; height: 100vh; overflow: hidden;
          background: var(--tg-dark);
          font-family: var(--font-b);
          position: relative;
          cursor: default;
        }
        .slide {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 1.25rem 2.5rem;
          transition: transform 0.52s cubic-bezier(0.77,0,0.18,1), opacity 0.52s ease;
          will-change: transform, opacity;
          overflow-y: auto;
        }
        .slide-active   { transform: translateX(0);     opacity: 1; z-index: 10; }
        .slide-off-left { transform: translateX(-100%); opacity: 0; z-index: 1; }
        .slide-off-right{ transform: translateX(100%);  opacity: 0; z-index: 1; }
        .slide-enter-next { transform: translateX(100%); opacity: 0; z-index: 5; }
        .slide-enter-prev { transform: translateX(-100%);opacity: 0; z-index: 5; }
        .slide-exit-next  { transform: translateX(-100%);opacity: 0; z-index: 5; }
        .slide-exit-prev  { transform: translateX(100%); opacity: 0; z-index: 5; }

        .bg-grid {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(42,171,238,0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,171,238,0.06) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .bg-orb {
          position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
          animation: gorb 5s ease-in-out infinite;
        }
        @keyframes gorb { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:.55;transform:scale(1.1)} }
        .scan {
          position: fixed; left:0; right:0; height:1px; z-index:0;
          background: linear-gradient(90deg, transparent 10%, rgba(42,171,238,0.4) 50%, transparent 90%);
          animation: gscan 6s linear infinite;
        }
        @keyframes gscan { 0%{top:-1%} 100%{top:101%} }
        .corner { position: fixed; width:20px; height:20px; border-color: rgba(42,171,238,0.3); border-style:solid; z-index:50; }
        .c-tl { top:.9rem; left:.9rem; border-width:1px 0 0 1px; }
        .c-tr { top:.9rem; right:.9rem; border-width:1px 1px 0 0; }
        .c-bl { bottom:.9rem; left:.9rem; border-width:0 0 1px 1px; }
        .c-br { bottom:.9rem; right:.9rem; border-width:0 1px 1px 0; }

        .title {
          font-family: var(--font-d);
          font-size: clamp(2.2rem, 5.5vw, 5rem);
          font-weight: 700; letter-spacing: 0.02em;
          line-height: 1.0; color: #fff; text-transform: uppercase;
        }
        .title span { color: var(--tg-acc); }
        .tag {
          display: inline-block; font-family: var(--font-m); font-size: 0.62rem;
          padding: .18rem .65rem; border-radius: 100px;
          background: rgba(42,171,238,0.1); border: 1px solid rgba(42,171,238,0.28);
          color: var(--tg); letter-spacing: .12em;
        }
        .card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(42,171,238,0.14);
          border-radius: 12px; padding: 1.1rem;
          backdrop-filter: blur(6px); transition: all .28s ease;
        }
        .card:hover {
          border-color: rgba(42,171,238,0.38); background: rgba(42,171,238,0.055);
          transform: translateY(-3px); box-shadow: 0 8px 28px rgba(42,171,238,0.1);
        }
        .snum {
          font-family: var(--font-d);
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 700; color: var(--tg-acc); line-height: 1;
        }
        .slbl { font-size: .68rem; color: #3d607a; font-family: var(--font-m); margin-top:.2rem; }
        .tl-line { position:absolute; left:10px; top:0; bottom:0; width:1px; background:linear-gradient(to bottom,transparent,rgba(42,171,238,.5),transparent); }
        .tl-dot {
          width:20px; height:20px; border-radius:50%;
          background:var(--tg-dark); border:1px solid var(--tg);
          display:flex; align-items:center; justify-content:center;
          font-size:.5rem; color:var(--tg-acc); font-family:var(--font-m);
          flex-shrink:0; box-shadow:0 0 10px rgba(42,171,238,.25);
        }
        .dot { width:7px; height:7px; border-radius:50%; cursor:pointer; transition:all .28s ease; background:rgba(255,255,255,.16); border:1px solid rgba(255,255,255,.07); }
        .dot.on { background:var(--tg-acc); box-shadow:0 0 10px var(--tg-acc); width:22px; border-radius:4px; }
        .nav-btn {
          width:32px; height:32px; border-radius:50%;
          display:flex; align-items:center; justify-content:center;
          cursor:pointer; transition:all .2s ease; border:1px solid; background:transparent;
        }
        .nav-btn:disabled { opacity:.22; cursor:not-allowed; }
        .float { animation: flt 6s ease-in-out infinite; }
        @keyframes flt { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .fi { animation: fadeIn .5s ease both; opacity:0; }
        @keyframes fadeIn { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
        .d1{animation-delay:.08s} .d2{animation-delay:.18s} .d3{animation-delay:.3s}
        .d4{animation-delay:.42s} .d5{animation-delay:.55s} .d6{animation-delay:.68s}
        .feat-icon {
          width:44px; height:44px; border-radius:10px;
          background: rgba(42,171,238,0.1); border:1px solid rgba(42,171,238,0.25);
          display:flex; align-items:center; justify-content:center; flex-shrink:0;
        }
        .progress-bar { height:6px; border-radius:3px; background:rgba(255,255,255,0.07); margin-top:.35rem; overflow:hidden; }
        .progress-fill { height:100%; border-radius:3px; background:linear-gradient(90deg, rgba(42,171,238,.5), #40c8ff); transition: width 1s cubic-bezier(.22,1,.36,1); }
        .plane-bg {
          position:absolute; font-size:180px; opacity:0.04; right:-20px; bottom:-30px;
          transform: rotate(-20deg); line-height:1; pointer-events:none; user-select:none;
        }
      `}</style>

      <div className="bg-grid" />
      <div className="bg-orb" style={{ width:"550px", height:"550px", top:"-200px", right:"-200px", background:"radial-gradient(circle,rgba(42,171,238,.15) 0%,transparent 70%)" }} />
      <div className="bg-orb" style={{ width:"380px", height:"380px", bottom:"-130px", left:"-130px", background:"radial-gradient(circle,rgba(64,200,255,.1) 0%,transparent 70%)", animationDelay:"2.5s" }} />
      <div className="scan" />
      <div className="corner c-tl"/><div className="corner c-tr"/>
      <div className="corner c-bl"/><div className="corner c-br"/>

      {/* ─── СЛАЙД 0: ЗАГЛАВНЫЙ ─── */}
      <div key={`s0-${current}`} className={`slide ${cls(0)}`}>
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:"980px", margin:"0 auto" }}>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2.5rem", alignItems:"center" }}>
            <div>
              <div className="fi d1" style={{ marginBottom:".8rem" }}><span className="tag">ИССЛЕДОВАНИЕ · 2025</span></div>
              <h1 className="title fi d2" style={{ marginBottom:"1rem" }}>
                Telegram<br /><span>платформа</span><br />нового мира
              </h1>
              <p className="fi d3" style={{ fontWeight:300, fontSize:"clamp(.85rem,1.5vw,1.05rem)", color:"#5a8099", lineHeight:1.75, marginBottom:"1.5rem" }}>
                Как мессенджер от Павла Дурова изменил правила коммуникации, медиа и цифровой свободы для 900 миллионов человек
              </p>
              <div className="fi d4" style={{ display:"flex", gap:".45rem", flexWrap:"wrap" }}>
                {["Безопасность","Каналы","Боты","Криптовалюта","Свобода слова"].map(t=><span key={t} className="tag">{t}</span>)}
              </div>
            </div>
            <div className="fi d5 float" style={{ position:"relative" }}>
              <img src={telegramImg} alt="" style={{ width:"100%", aspectRatio:"1/1", objectFit:"cover", borderRadius:"20px", border:"1px solid rgba(42,171,238,.28)", boxShadow:"0 0 60px rgba(42,171,238,.18), 0 20px 60px rgba(0,0,0,.5)", opacity:.85 }} />
              <div style={{ position:"absolute", bottom:"-1rem", left:"-1rem", background:"rgba(5,13,28,.95)", border:"1px solid rgba(42,171,238,.3)", borderRadius:"12px", padding:".75rem 1.1rem", backdropFilter:"blur(8px)" }}>
                <div style={{ fontFamily:"var(--font-d)", fontSize:"1.6rem", fontWeight:700, color:"var(--tg-acc)", lineHeight:1 }}>900M+</div>
                <div style={{ fontFamily:"var(--font-m)", fontSize:".62rem", color:"#3d607a", marginTop:".15rem" }}>активных пользователей</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── СЛАЙД 1: ИСТОРИЯ ─── */}
      <div key={`s1-${current}`} className={`slide ${cls(1)}`}>
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:"900px" }}>
          <div className="fi d1" style={{ marginBottom:".5rem" }}><span className="tag">01 · ИСТОРИЯ СОЗДАНИЯ</span></div>
          <h2 className="title fi d2" style={{ marginBottom:"1.5rem" }}>Как <span>рождался</span> Telegram</h2>
          <div style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:"1.5rem", alignItems:"start" }}>
            <div style={{ position:"relative", paddingLeft:"2.2rem" }}>
              <div className="tl-line"/>
              {[
                { year:"2006", ev:"ВКонтакте", desc:"Павел Дуров основывает крупнейшую соцсеть России. Уже тогда — акцент на свободу и минимализм" },
                { year:"2013", ev:"Запуск Telegram", desc:"14 августа Павел и Николай Дуровы выпускают Telegram. Первый день — 100 000 скачиваний" },
                { year:"2014", ev:"Эмиграция", desc:"Дуров покидает Россию после давления властей. Telegram становится независимым проектом" },
                { year:"2018", ev:"Блокировка в РФ", desc:"Роскомнадзор блокирует Telegram — но безуспешно. Аудитория продолжает расти" },
                { year:"2020", ev:"400 млн пользователей", desc:"Пандемия. Telegram обгоняет конкурентов и становится главным инструментом новостей" },
                { year:"2024", ev:"900 млн и TON", desc:"Запуск экосистемы TON и мини-приложений. Telegram превращается в супер-приложение" },
              ].map((item, i)=>(
                <div key={item.year} className={`fi d${Math.min(i+2,6)}`} style={{ display:"flex", gap:".8rem", marginBottom:".8rem", alignItems:"flex-start" }}>
                  <div className="tl-dot" style={{ marginTop:"2px" }}>{item.year.slice(2)}</div>
                  <div className="card" style={{ flex:1 }}>
                    <div style={{ display:"flex", gap:".75rem", alignItems:"center", marginBottom:".2rem" }}>
                      <span style={{ fontFamily:"var(--font-m)", color:"var(--tg-acc)", fontSize:".65rem", opacity:.65 }}>{item.year}</span>
                      <span style={{ fontFamily:"var(--font-d)", fontSize:".95rem", fontWeight:600, color:"#fff", textTransform:"uppercase", letterSpacing:".05em" }}>{item.ev}</span>
                    </div>
                    <p style={{ color:"#5a8099", fontSize:".77rem", lineHeight:1.55 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="fi d4">
              <img src={durovImg} alt="" style={{ width:"100%", aspectRatio:"1/1", objectFit:"cover", borderRadius:"14px", border:"1px solid rgba(42,171,238,.2)", opacity:.75, marginBottom:"1rem" }} />
              <div className="card" style={{ borderColor:"rgba(42,171,238,.25)", background:"rgba(42,171,238,.06)" }}>
                <div style={{ fontFamily:"var(--font-m)", fontSize:".6rem", color:"#3d607a", marginBottom:".5rem", letterSpacing:".1em" }}>ПАВЕЛ ДУРОВ</div>
                <p style={{ fontStyle:"italic", color:"#5a8099", fontSize:".8rem", lineHeight:1.65 }}>
                  «Конфиденциальность — не роскошь, а базовое право каждого человека.»
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── СЛАЙД 2: ВОЗМОЖНОСТИ ─── */}
      <div key={`s2-${current}`} className={`slide ${cls(2)}`}>
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:"980px" }}>
          <div className="fi d1" style={{ marginBottom:".5rem" }}><span className="tag">02 · ВОЗМОЖНОСТИ</span></div>
          <h2 className="title fi d2" style={{ marginBottom:"1.25rem" }}>Что умеет <span>Telegram</span></h2>
          <div className="fi d3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:".9rem" }}>
            {[
              { icon:"Lock", title:"Шифрование", color:"#8b5cf6", desc:"End-to-end шифрование в секретных чатах. MTProto — собственный протокол безопасности, более надёжный чем SSL" },
              { icon:"Radio", title:"Каналы", color:"#2AABEE", desc:"Безлимитная аудитория. Каналы с миллионами подписчиков — новая форма СМИ без цензуры и редакций" },
              { icon:"Bot", title:"Боты", color:"#10b981", desc:"700 000+ активных ботов. Магазины, банки, госуслуги, игры — всё внутри одного приложения" },
              { icon:"Wallet", title:"TON & Крипто", color:"#f59e0b", desc:"Встроенный кошелёк, NFT, криптовалюта. Telegram превращается в финансовую платформу" },
              { icon:"Gamepad2", title:"Мини-приложения", color:"#ef4444", desc:"Web Apps внутри Telegram — полноценные приложения без установки. Notcoin, Hamster Kombat — 300M+ игроков" },
              { icon:"Folder", title:"Облако и файлы", color:"#06b6d4", desc:"Хранилище файлов до 4 ГБ, облачная синхронизация, папки, сохранённые сообщения — личный облачный диск" },
            ].map((f)=>(
              <div key={f.title} className="card">
                <div style={{ display:"flex", gap:".75rem", alignItems:"center", marginBottom:".75rem" }}>
                  <div className="feat-icon" style={{ background:`${f.color}18`, borderColor:`${f.color}35` }}>
                    <Icon name={f.icon} fallback="CircleAlert" size={20} style={{ color:f.color }} />
                  </div>
                  <span style={{ fontFamily:"var(--font-d)", textTransform:"uppercase", letterSpacing:".07em", color:"#fff", fontWeight:600, fontSize:".88rem" }}>{f.title}</span>
                </div>
                <p style={{ fontSize:".75rem", color:"#5a8099", lineHeight:1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="fi d5" style={{ marginTop:"1rem", display:"flex", gap:"1rem" }}>
            {[
              { n:"700K+", l:"активных ботов" },
              { n:"4 ГБ", l:"макс. размер файла" },
              { n:"∞", l:"подписчиков в канале" },
              { n:"20", l:"аккаунтов на устройство" },
            ].map(s=>(
              <div key={s.l} className="card" style={{ flex:1, textAlign:"center", padding:".8rem" }}>
                <div style={{ fontFamily:"var(--font-d)", fontSize:"1.6rem", fontWeight:700, color:"var(--tg-acc)", lineHeight:1 }}>{s.n}</div>
                <div style={{ fontFamily:"var(--font-m)", fontSize:".6rem", color:"#3d607a", marginTop:".2rem" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── СЛАЙД 3: СТАТИСТИКА ─── */}
      <div key={`s3-${current}`} className={`slide ${cls(3)}`}>
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:"900px" }}>
          <div className="plane-bg">✈️</div>
          <div className="fi d1" style={{ marginBottom:".5rem" }}><span className="tag">03 · РОСТ И СТАТИСТИКА</span></div>
          <h2 className="title fi d2" style={{ marginBottom:"1.5rem" }}>Telegram <span>в цифрах</span></h2>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1.2fr", gap:"2rem", alignItems:"center" }}>
            <div>
              <div className="fi d2" style={{ marginBottom:"1.25rem" }}>
                <div style={{ fontFamily:"var(--font-m)", fontSize:".6rem", color:"#3d607a", letterSpacing:".1em", marginBottom:".75rem" }}>РОСТ АУДИТОРИИ (МЛН ПОЛЬЗОВАТЕЛЕЙ)</div>
                <div style={{ display:"flex", gap:"6px", alignItems:"flex-end", height:"160px" }}>
                  {growthData.map((d,i)=>(
                    <GrowthBar key={d.year} year={d.year} users={d.users} max={900} delay={i*120} />
                  ))}
                </div>
              </div>
              <div className="fi d3" style={{ display:"flex", flexDirection:"column", gap:".5rem" }}>
                {[
                  { label:"Сообщений в день", val:80, unit:"млрд" },
                  { label:"Новых пользователей в день", val:65, unit:"% от WA" },
                  { label:"Стран в топ-3 магазина", val:100, unit:"%" },
                ].map((item, i)=>(
                  <ProgressItem key={item.label} label={item.label} val={item.val} unit={item.unit} delay={i*200} active={current===3} />
                ))}
              </div>
            </div>
            <div className="fi d4" style={{ display:"flex", flexDirection:"column", gap:".85rem" }}>
              {[
                { num:900, suf:"M+", lbl:"активных пользователей в 2024", decimals:0 },
                { num:80, suf:"B", lbl:"сообщений отправляется каждый день", decimals:0 },
                { num:4.2, suf:"B$", lbl:"оценочная стоимость экосистемы TON", decimals:1 },
                { num:2013, suf:"", lbl:"год основания — 12 лет на рынке", decimals:0 },
              ].map(s=>(
                <div key={s.lbl} className="card" style={{ display:"flex", alignItems:"center", gap:"1rem" }}>
                  <div>
                    <div className="snum"><AnimatedCounter target={s.num} suffix={s.suf} decimals={s.decimals} /></div>
                    <div className="slbl" style={{ marginTop:".15rem", maxWidth:"200px", lineHeight:1.4 }}>{s.lbl}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── СЛАЙД 4: ВЛИЯНИЕ ─── */}
      <div key={`s4-${current}`} className={`slide ${cls(4)}`}>
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:"980px" }}>
          <div className="fi d1" style={{ marginBottom:".5rem" }}><span className="tag">04 · ВЛИЯНИЕ НА ОБЩЕСТВО</span></div>
          <h2 className="title fi d2" style={{ marginBottom:"1.25rem" }}>Telegram <span>меняет</span> мир</h2>
          <div className="fi d3" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1rem", marginBottom:"1rem" }}>
            {[
              { icon:"Newspaper", color:"#2AABEE", title:"Медиа и журналистика",
                points:["Независимые каналы как альтернатива ТВ и газетам","Новости без фильтров и редакторской цензуры","Во время войн и кризисов — главный источник информации","200+ тысяч новостных каналов по всему миру"] },
              { icon:"Users", color:"#8b5cf6", title:"Политика и активизм",
                points:["Протесты в Беларуси, Иране координировались через Telegram","Анонимные каналы публикуют разоблачения власти","Правительства блокируют — люди обходят через VPN","Telegram как инструмент гражданского общества"] },
              { icon:"ShoppingBag", color:"#10b981", title:"Бизнес и торговля",
                points:["Магазины, сервисы и доставка через боты и каналы","B2B и B2C коммуникация заменяет email","Рынок Telegram-рекламы — $500M+ в год","Инфобизнес и онлайн-образование переехали в каналы"] },
              { icon:"Shield", color:"#f59e0b", title:"Безопасность и приватность",
                points:["Секретные чаты с самоуничтожением сообщений","Нет привязки к реальному имени — псевдонимы","Серверы в нескольких юрисдикциях — труднее заблокировать","0 случаев официально подтверждённых утечек данных"] },
            ].map(card=>(
              <div key={card.title} className="card">
                <div style={{ display:"flex", alignItems:"center", gap:".7rem", marginBottom:".8rem" }}>
                  <div className="feat-icon" style={{ width:"36px", height:"36px", borderRadius:"8px", background:`${card.color}18`, borderColor:`${card.color}35` }}>
                    <Icon name={card.icon} fallback="CircleAlert" size={16} style={{ color:card.color }} />
                  </div>
                  <span style={{ fontFamily:"var(--font-d)", textTransform:"uppercase", letterSpacing:".07em", color:"#fff", fontWeight:600, fontSize:".88rem" }}>{card.title}</span>
                </div>
                {card.points.map(p=>(
                  <div key={p} style={{ display:"flex", gap:".45rem", alignItems:"flex-start", marginBottom:".3rem" }}>
                    <div style={{ width:"3px", height:"3px", borderRadius:"50%", background:card.color, marginTop:"6px", flexShrink:0 }} />
                    <span style={{ fontSize:".74rem", color:"#5a8099", lineHeight:1.55 }}>{p}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="fi d5 card" style={{ textAlign:"center", padding:".9rem", borderColor:"rgba(42,171,238,.25)", background:"rgba(42,171,238,.04)" }}>
            <p style={{ fontStyle:"italic", color:"#6a8fa8", fontSize:".88rem", lineHeight:1.75 }}>
              «Во время иранских протестов 2022 года Telegram был единственным каналом связи для миллионов людей, когда власти отключили интернет.»
            </p>
          </div>
        </div>
      </div>

      {/* ─── СЛАЙД 5: БУДУЩЕЕ ─── */}
      <div key={`s5-${current}`} className={`slide ${cls(5)}`}>
        <div style={{ position:"relative", zIndex:10, width:"100%", maxWidth:"900px", textAlign:"center" }}>
          <div className="fi d1" style={{ marginBottom:".5rem" }}><span className="tag">05 · БУДУЩЕЕ</span></div>
          <h2 className="title fi d2" style={{ marginBottom:"1.25rem" }}>Telegram <span>завтра</span></h2>
          <div className="fi d3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:".9rem", marginBottom:"1.5rem" }}>
            {[
              { icon:"Sparkles", color:"#8b5cf6", title:"Супер-приложение", desc:"По модели WeChat — внутри Telegram уже живут банки, магазины, игры и госуслуги. К 2026 — полноценная ОС для жизни" },
              { icon:"Coins", color:"#f59e0b", title:"Финансы и TON", desc:"Блокчейн The Open Network, стейблкоин, P2P переводы без банков. Telegram строит альтернативную финансовую систему" },
              { icon:"Brain", color:"#2AABEE", title:"ИИ в Telegram", desc:"Интеграция языковых моделей прямо в боты и чаты. Персональный ИИ-ассистент для каждого пользователя" },
              { icon:"Globe", color:"#10b981", title:"1 млрд к 2025", desc:"Прогнозируемый рубеж — миллиард пользователей. Telegram входит в клуб самых массовых платформ планеты" },
              { icon:"Tv", color:"#ef4444", title:"Видео и стриминг", desc:"Видеосообщения, Stories, прямые эфиры. Telegram наступает на YouTube и TikTok в сегменте видеоконтента" },
              { icon:"Building", color:"#06b6d4", title:"B2B платформа", desc:"Инструменты для бизнеса: CRM, аналитика каналов, рекламный кабинет. Корпоративный Telegram растёт на 40%/год" },
            ].map(f=>(
              <div key={f.title} className="card" style={{ textAlign:"left" }}>
                <div style={{ display:"flex", alignItems:"center", gap:".65rem", marginBottom:".65rem" }}>
                  <div className="feat-icon" style={{ width:"34px", height:"34px", borderRadius:"8px", background:`${f.color}18`, borderColor:`${f.color}35` }}>
                    <Icon name={f.icon} fallback="CircleAlert" size={15} style={{ color:f.color }} />
                  </div>
                  <span style={{ fontFamily:"var(--font-d)", textTransform:"uppercase", fontSize:".82rem", fontWeight:600, color:"#fff", letterSpacing:".06em" }}>{f.title}</span>
                </div>
                <p style={{ fontSize:".73rem", color:"#5a8099", lineHeight:1.65 }}>{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="fi d5 float" style={{ display:"inline-block" }}>
            <img src={networkImg} alt="" style={{ width:"min(420px,80vw)", height:"90px", objectFit:"cover", borderRadius:"10px", opacity:.35, border:"1px solid rgba(42,171,238,.18)" }} />
          </div>
          <div className="fi d6" style={{ marginTop:"1rem" }}>
            <div style={{ fontFamily:"var(--font-d)", fontSize:"clamp(1.4rem,3vw,2.2rem)", fontWeight:700, color:"var(--tg-acc)", letterSpacing:".04em", textTransform:"uppercase" }}>
              ✈️ &nbsp;Telegram — это не мессенджер. Это платформа будущего.
            </div>
          </div>
        </div>
      </div>

      {/* Навигация */}
      <div style={{ position:"fixed", bottom:"1.5rem", left:"50%", transform:"translateX(-50%)", display:"flex", alignItems:"center", gap:".8rem", zIndex:200 }}>
        <button className="nav-btn" onClick={()=>goTo(Math.max(current-1,0))} disabled={current===0}
          style={{ borderColor:"rgba(255,255,255,.12)", color:"#fff" }}>
          <Icon name="ChevronLeft" size={14} />
        </button>
        <div style={{ display:"flex", gap:"5px", alignItems:"center" }}>
          {SLIDES.map(s=><button key={s.id} className={`dot ${current===s.id?"on":""}`} onClick={()=>goTo(s.id)} />)}
        </div>
        <button className="nav-btn" onClick={()=>goTo(Math.min(current+1,TOTAL-1))} disabled={current===TOTAL-1}
          style={{ borderColor:"rgba(42,171,238,.4)", color:"var(--tg-acc)", background:"rgba(42,171,238,.1)" }}>
          <Icon name="ChevronRight" size={14} />
        </button>
      </div>

      <div style={{ position:"fixed", top:"1.2rem", right:"1.5rem", fontFamily:"var(--font-m)", fontSize:".62rem", color:"rgba(42,171,238,.38)", zIndex:200 }}>
        {String(current+1).padStart(2,"0")} / {String(TOTAL).padStart(2,"0")}
      </div>
      <div style={{ position:"fixed", bottom:".7rem", right:"1.5rem", fontFamily:"var(--font-m)", fontSize:".55rem", color:"rgba(255,255,255,.13)", zIndex:200 }}>
        ← → навигация
      </div>
    </div>
  );
}

function ProgressItem({ label, val, unit, delay, active }: { label: string; val: number; unit: string; delay: number; active: boolean }) {
  const [w, setW] = useState(0);
  useEffect(() => {
    if (active) { setW(0); const t = setTimeout(()=>setW(val), delay+300); return ()=>clearTimeout(t); }
  }, [active, val, delay]);
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"var(--font-m)", fontSize:".62rem", color:"#5a8099", marginBottom:".3rem" }}>
        <span>{label}</span><span style={{ color:"var(--tg-acc)" }}>{val}{unit}</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width:`${w}%` }} />
      </div>
    </div>
  );
}
