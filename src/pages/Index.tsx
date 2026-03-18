import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const SLIDES = [
  { id: 0, label: "Введение" },
  { id: 1, label: "История" },
  { id: 2, label: "Влияние" },
  { id: 3, label: "Telegram" },
  { id: 4, label: "Выводы" },
];

const networkImg = "https://cdn.poehali.dev/projects/61940178-bf70-4e64-bb62-b34ff76884d1/files/8ffda6de-d718-419f-9d0b-76e84fb7992d.jpg";
const telegramImg = "https://cdn.poehali.dev/projects/61940178-bf70-4e64-bb62-b34ff76884d1/files/8ea6bfd7-f293-4198-9e08-8c68ae6a8a1e.jpg";

const platforms = [
  { name: "Telegram", users: 900, color: "#2AABEE", icon: "✈️", privacy: 95, speed: 98, features: 92 },
  { name: "WhatsApp", users: 2700, color: "#25D366", icon: "💬", privacy: 40, speed: 75, features: 55 },
  { name: "VKontakte", users: 100, color: "#4C75A3", icon: "🔵", privacy: 35, speed: 70, features: 78 },
  { name: "Instagram", users: 2000, color: "#E1306C", icon: "📸", privacy: 30, speed: 80, features: 65 },
];

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
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
        const step = target / 60;
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 20);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function RadarBar({ label, value, color, triggerKey }: { label: string; value: number; color: string; triggerKey: string }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(0);
    const t = setTimeout(() => setWidth(value), 300);
    return () => clearTimeout(t);
  }, [value, triggerKey]);

  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#a0b4c8" }}>
        <span>{label}</span><span>{value}%</span>
      </div>
      <div className="h-2 rounded-full" style={{ background: "rgba(255,255,255,0.08)" }}>
        <div className="h-full rounded-full" style={{ width: `${width}%`, background: `linear-gradient(90deg, ${color}88, ${color})`, transition: "width 1s cubic-bezier(0.22,1,0.36,1)" }} />
      </div>
    </div>
  );
}

export default function Presentation() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [animating, setAnimating] = useState(false);
  const [activePlatform, setActivePlatform] = useState(0);

  const goTo = (idx: number) => {
    if (animating || idx === current) return;
    setDirection(idx > current ? "next" : "prev");
    setAnimating(true);
    setTimeout(() => { setCurrent(idx); setAnimating(false); }, 500);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(Math.min(current + 1, 4));
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(Math.max(current - 1, 0));
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [current, animating]);

  const getSlideClass = (id: number) => {
    if (id === current) return "slide-active";
    if (animating) {
      if (direction === "next") return id < current ? "slide-exit-next" : "slide-enter-next";
      else return id > current ? "slide-exit-prev" : "slide-enter-prev";
    }
    return id < current ? "slide-offscreen-left" : "slide-offscreen-right";
  };

  return (
    <div className="pres-root">
      <style>{`
        :root {
          --tg-blue: #2AABEE;
          --tg-dark: #060c1a;
          --tg-accent: #00d4ff;
          --tg-glow: rgba(42,171,238,0.25);
          --font-display: 'Oswald', sans-serif;
          --font-body: 'IBM Plex Sans', sans-serif;
          --font-mono: 'IBM Plex Mono', monospace;
        }
        *, *::before, *::after { box-sizing: border-box; }
        .pres-root {
          width: 100vw; height: 100vh; overflow: hidden;
          background: var(--tg-dark);
          font-family: var(--font-body);
          position: relative;
        }
        .slide {
          position: absolute; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 1.5rem 2rem;
          transition: transform 0.55s cubic-bezier(0.77,0,0.18,1), opacity 0.55s ease;
          will-change: transform, opacity;
          overflow-y: auto;
        }
        .slide-active { transform: translateX(0); opacity: 1; z-index: 10; }
        .slide-offscreen-left { transform: translateX(-100%); opacity: 0; z-index: 1; }
        .slide-offscreen-right { transform: translateX(100%); opacity: 0; z-index: 1; }
        .slide-enter-next { transform: translateX(100%); opacity: 0; z-index: 5; }
        .slide-enter-prev { transform: translateX(-100%); opacity: 0; z-index: 5; }
        .slide-exit-next { transform: translateX(-100%); opacity: 0; z-index: 5; }
        .slide-exit-prev { transform: translateX(100%); opacity: 0; z-index: 5; }

        .grid-bg {
          position: fixed; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            linear-gradient(rgba(42,171,238,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,171,238,0.07) 1px, transparent 1px);
          background-size: 64px 64px;
        }
        .glow-orb {
          position: fixed; border-radius: 50%; pointer-events: none; z-index: 0;
          animation: pulse-glow 5s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.35; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.08); }
        }
        .scan-line {
          position: fixed; left: 0; right: 0; height: 1px; z-index: 0;
          background: linear-gradient(90deg, transparent 10%, var(--tg-blue) 50%, transparent 90%);
          opacity: 0.15;
          animation: scanline 5s linear infinite;
        }
        @keyframes scanline {
          0% { top: -2%; }
          100% { top: 102%; }
        }
        .corner { position: fixed; width: 22px; height: 22px; border-color: rgba(42,171,238,0.35); border-style: solid; z-index: 50; }
        .c-tl { top: 1rem; left: 1rem; border-width: 1px 0 0 1px; }
        .c-tr { top: 1rem; right: 1rem; border-width: 1px 1px 0 0; }
        .c-bl { bottom: 1rem; left: 1rem; border-width: 0 0 1px 1px; }
        .c-br { bottom: 1rem; right: 1rem; border-width: 0 1px 1px 0; }

        .slide-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 5vw, 4.2rem);
          font-weight: 700;
          letter-spacing: 0.02em;
          line-height: 1.05;
          color: #ffffff;
          text-transform: uppercase;
        }
        .slide-title span { color: var(--tg-accent); }
        .tag {
          display: inline-block;
          font-family: var(--font-mono); font-size: 0.65rem;
          padding: 0.2rem 0.7rem; border-radius: 100px;
          background: rgba(42,171,238,0.1);
          border: 1px solid rgba(42,171,238,0.3);
          color: var(--tg-blue); letter-spacing: 0.12em;
        }
        .card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(42,171,238,0.15);
          border-radius: 12px; padding: 1.25rem;
          backdrop-filter: blur(6px);
          transition: all 0.3s ease;
        }
        .card:hover {
          border-color: rgba(42,171,238,0.4);
          background: rgba(42,171,238,0.06);
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(42,171,238,0.12);
        }
        .stat-num {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 3.5vw, 3rem);
          font-weight: 700; color: var(--tg-accent); line-height: 1;
        }
        .stat-lbl { font-size: 0.72rem; color: #4a6a7a; font-family: var(--font-mono); margin-top: 0.2rem; }
        .timeline-line { position: absolute; left: 11px; top: 0; bottom: 0; width: 1px; background: linear-gradient(to bottom, transparent, rgba(42,171,238,0.6), transparent); }
        .t-dot {
          width: 22px; height: 22px; border-radius: 50%;
          background: var(--tg-dark); border: 1px solid var(--tg-blue);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.55rem; color: var(--tg-accent); font-family: var(--font-mono);
          flex-shrink: 0; box-shadow: 0 0 10px rgba(42,171,238,0.3);
        }
        .plt-card {
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 10px; padding: 1rem;
          cursor: pointer; transition: all 0.25s ease;
          background: rgba(255,255,255,0.02);
        }
        .plt-card.active {
          border-color: var(--c);
          background: color-mix(in srgb, var(--c) 8%, transparent);
          box-shadow: 0 0 18px color-mix(in srgb, var(--c) 20%, transparent);
        }
        .nav-btn {
          width: 34px; height: 34px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.2s ease; border: 1px solid;
          background: transparent;
        }
        .nav-btn:disabled { opacity: 0.25; cursor: not-allowed; }
        .dot { width: 7px; height: 7px; border-radius: 50%; cursor: pointer; transition: all 0.3s ease; background: rgba(255,255,255,0.18); border: 1px solid rgba(255,255,255,0.08); }
        .dot.on { background: var(--tg-accent); box-shadow: 0 0 10px var(--tg-accent); width: 22px; border-radius: 4px; }
        .float { animation: flt 6s ease-in-out infinite; }
        @keyframes flt { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        .fade-in { animation: fi 0.5s ease both; }
        @keyframes fi { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .d1{animation-delay:0.1s} .d2{animation-delay:0.22s} .d3{animation-delay:0.34s} .d4{animation-delay:0.46s} .d5{animation-delay:0.58s} .d6{animation-delay:0.7s}
      `}</style>

      <div className="grid-bg" />
      <div className="glow-orb" style={{ width: "500px", height: "500px", top: "-180px", right: "-180px", background: "radial-gradient(circle, rgba(42,171,238,0.18) 0%, transparent 70%)" }} />
      <div className="glow-orb" style={{ width: "350px", height: "350px", bottom: "-120px", left: "-120px", background: "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)", animationDelay: "2.5s" }} />
      <div className="scan-line" />
      <div className="corner c-tl" /><div className="corner c-tr" />
      <div className="corner c-bl" /><div className="corner c-br" />

      {/* Слайд 0 — Введение */}
      <div key={`s0-${current}`} className={`slide ${getSlideClass(0)}`}>
        <div className="relative w-full max-w-5xl mx-auto text-center" style={{ position: "relative", zIndex: 10 }}>
          <div className="fade-in d1 mb-4"><span className="tag">ИССЛЕДОВАНИЕ · 2025</span></div>
          <h1 className="slide-title fade-in d2" style={{ marginBottom: "1.25rem" }}>
            Роль <span>социальных</span><br />сетей в обществе
          </h1>
          <p className="fade-in d3" style={{ fontFamily: "var(--font-body)", fontWeight: 300, fontSize: "clamp(0.9rem, 1.6vw, 1.15rem)", color: "#6a8fa8", letterSpacing: "0.06em", maxWidth: "540px", margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Как цифровые платформы изменили коммуникацию, психологию и социальные связи человечества
          </p>
          <div className="fade-in d4" style={{ display: "flex", gap: "0.5rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "2rem" }}>
            {["Коммуникация", "Психология", "Telegram", "Аналитика", "Будущее"].map(t => <span key={t} className="tag">{t}</span>)}
          </div>
          <div className="fade-in d5 float" style={{ display: "inline-block" }}>
            <img src={networkImg} alt="" style={{ width: "min(380px, 85vw)", height: "200px", objectFit: "cover", borderRadius: "14px", border: "1px solid rgba(42,171,238,0.25)", opacity: 0.75, boxShadow: "0 0 50px rgba(42,171,238,0.18), 0 20px 60px rgba(0,0,0,0.5)" }} />
          </div>
        </div>
      </div>

      {/* Слайд 1 — История */}
      <div key={`s1-${current}`} className={`slide ${getSlideClass(1)}`}>
        <div className="w-full max-w-4xl mx-auto" style={{ position: "relative", zIndex: 10 }}>
          <div className="fade-in d1 mb-1"><span className="tag">02 · ИСТОРИЯ</span></div>
          <h2 className="slide-title fade-in d2" style={{ marginBottom: "1.5rem" }}>История <span>развития</span></h2>
          <div className="relative" style={{ paddingLeft: "2.5rem" }}>
            <div className="timeline-line" />
            {[
              { year: "1997", title: "SixDegrees", desc: "Первая соцсеть — концепция «шести рукопожатий» обрела цифровую форму" },
              { year: "2004", title: "Facebook", desc: "Марк Цукерберг запустил платформу из Гарварда — началась новая эпоха" },
              { year: "2006", title: "Twitter + ВКонтакте", desc: "Эра микроблогинга и первая крупная русскоязычная социальная сеть" },
              { year: "2013", title: "Telegram", desc: "Павел Дуров создал мессенджер нового поколения с акцентом на безопасность" },
              { year: "2020+", title: "Эпоха пандемии", desc: "Взрывной рост: соцсети стали главным каналом общения, работы и новостей" },
            ].map((item, i) => (
              <div key={item.year} className={`fade-in d${i + 2}`} style={{ display: "flex", gap: "1rem", marginBottom: "1rem", alignItems: "flex-start" }}>
                <div className="t-dot" style={{ marginTop: "3px" }}>{item.year.slice(2)}</div>
                <div className="card" style={{ flex: 1 }}>
                  <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "0.2rem" }}>
                    <span style={{ fontFamily: "var(--font-mono)", color: "var(--tg-accent)", fontSize: "0.7rem", opacity: 0.7 }}>{item.year}</span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: "1rem", fontWeight: 600, color: "#fff", textTransform: "uppercase", letterSpacing: "0.06em" }}>{item.title}</span>
                  </div>
                  <p style={{ color: "#6a8fa8", fontSize: "0.82rem", lineHeight: 1.55, margin: 0 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Слайд 2 — Влияние */}
      <div key={`s2-${current}`} className={`slide ${getSlideClass(2)}`}>
        <div className="w-full max-w-5xl mx-auto" style={{ position: "relative", zIndex: 10 }}>
          <div className="fade-in d1 mb-1"><span className="tag">03 · ВЛИЯНИЕ</span></div>
          <h2 className="slide-title fade-in d2" style={{ marginBottom: "1.25rem" }}>Влияние на <span>общество</span></h2>
          <div className="fade-in d3" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem", marginBottom: "1.25rem" }}>
            {[
              { icon: "Brain", title: "Психология", color: "#8b5cf6", stats: ["60% подростков испытывают FOMO", "Среднее время в сети — 6.5 ч/день", "Рост тревожности +37% за 10 лет"] },
              { icon: "Globe", title: "Коммуникация", color: "#2AABEE", stats: ["4.9 млрд пользователей соцсетей", "Новости распространяются в 6× быстрее", "70% узнают о событиях из соцсетей"] },
              { icon: "TrendingUp", title: "Экономика", color: "#10b981", stats: ["Рынок рекламы — $227 млрд/год", "Инфлюенс-маркетинг растёт 29%/год", "SMM, блогер, куратор — новые профессии"] },
              { icon: "AlertTriangle", title: "Риски", color: "#f59e0b", stats: ["Фейки быстрее правды в 6 раз", "Пузырь фильтров угрожает демократии", "Цифровая зависимость признана проблемой"] },
            ].map((card) => (
              <div key={card.title} className="card">
                <div style={{ display: "flex", alignItems: "center", gap: "0.7rem", marginBottom: "0.75rem" }}>
                  <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: `${card.color}18`, border: `1px solid ${card.color}35`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <Icon name={card.icon} fallback="CircleAlert" size={15} style={{ color: card.color }} />
                  </div>
                  <span style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", letterSpacing: "0.07em", color: "#fff", fontWeight: 600, fontSize: "0.9rem" }}>{card.title}</span>
                </div>
                {card.stats.map(s => (
                  <div key={s} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", marginBottom: "0.35rem" }}>
                    <div style={{ width: "3px", height: "3px", borderRadius: "50%", background: card.color, marginTop: "6px", flexShrink: 0 }} />
                    <span style={{ fontSize: "0.77rem", color: "#6a8fa8", lineHeight: 1.5 }}>{s}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="fade-in d4" style={{ display: "flex", gap: "2.5rem", justifyContent: "center" }}>
            {[{ n: 4.9, s: " млрд", l: "пользователей" }, { n: 6.5, s: " ч", l: "в сети ежедневно" }, { n: 37, s: "%", l: "рост тревожности" }].map(item => (
              <div key={item.l} style={{ textAlign: "center" }}>
                <div className="stat-num"><AnimatedCounter target={item.n} suffix={item.s} /></div>
                <div className="stat-lbl">{item.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Слайд 3 — Telegram */}
      <div key={`s3-${current}`} className={`slide ${getSlideClass(3)}`}>
        <div className="w-full max-w-5xl mx-auto" style={{ position: "relative", zIndex: 10 }}>
          <div className="fade-in d1 mb-1"><span className="tag">04 · TELEGRAM</span></div>
          <h2 className="slide-title fade-in d2" style={{ marginBottom: "1.25rem" }}>Telegram: <span>аналитика</span></h2>
          <div className="fade-in d3" style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "1.25rem" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {platforms.map((p, i) => (
                <div key={p.name} className={`plt-card ${activePlatform === i ? "active" : ""}`}
                  style={{ "--c": p.color } as React.CSSProperties}
                  onClick={() => setActivePlatform(i)}>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <span style={{ fontSize: "1.2rem" }}>{p.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontFamily: "var(--font-display)", color: "#fff", fontWeight: 600, fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>{p.name}</div>
                      <div style={{ fontFamily: "var(--font-mono)", color: "#4a6a7a", fontSize: "0.65rem" }}>
                        {p.users >= 1000 ? `${(p.users / 1000).toFixed(1)} млрд` : `${p.users} млн`} пользователей
                      </div>
                    </div>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: p.color, boxShadow: `0 0 8px ${p.color}`, flexShrink: 0 }} />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="card" style={{ border: `1px solid ${platforms[activePlatform].color}40`, height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.9rem", marginBottom: "1.25rem" }}>
                  <span style={{ fontSize: "1.8rem" }}>{platforms[activePlatform].icon}</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 700, color: "#fff", textTransform: "uppercase" }}>{platforms[activePlatform].name}</div>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", color: platforms[activePlatform].color }}>
                      {platforms[activePlatform].users >= 1000 ? `${(platforms[activePlatform].users / 1000).toFixed(1)} млрд` : `${platforms[activePlatform].users} млн`} активных пользователей
                    </div>
                  </div>
                </div>
                <RadarBar label="Приватность" value={platforms[activePlatform].privacy} color={platforms[activePlatform].color} triggerKey={String(activePlatform)} />
                <RadarBar label="Скорость доставки" value={platforms[activePlatform].speed} color={platforms[activePlatform].color} triggerKey={String(activePlatform)} />
                <RadarBar label="Функциональность" value={platforms[activePlatform].features} color={platforms[activePlatform].color} triggerKey={String(activePlatform)} />
                {activePlatform === 0 && (
                  <div style={{ marginTop: "1rem", borderTop: "1px solid rgba(42,171,238,0.18)", paddingTop: "1rem" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "#4a6a7a", marginBottom: "0.5rem", letterSpacing: "0.1em" }}>КЛЮЧЕВЫЕ ПРЕИМУЩЕСТВА</div>
                    {["E2E шифрование в секретных чатах", "Каналы до 200 000+ подписчиков", "Боты и мини-приложения (TWA)", "Открытый API для разработчиков", "Хранилище файлов до 4 ГБ"].map(f => (
                      <div key={f} style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "0.3rem" }}>
                        <Icon name="Check" size={11} style={{ color: "var(--tg-accent)", flexShrink: 0 }} />
                        <span style={{ fontSize: "0.76rem", color: "#6a8fa8" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="fade-in d4" style={{ marginTop: "1rem" }}>
            <img src={telegramImg} alt="" style={{ width: "100%", height: "70px", objectFit: "cover", borderRadius: "8px", opacity: 0.4, border: "1px solid rgba(42,171,238,0.18)" }} />
          </div>
        </div>
      </div>

      {/* Слайд 4 — Выводы */}
      <div key={`s4-${current}`} className={`slide ${getSlideClass(4)}`}>
        <div className="w-full max-w-5xl mx-auto text-center" style={{ position: "relative", zIndex: 10 }}>
          <div className="fade-in d1 mb-1"><span className="tag">05 · ВЫВОДЫ</span></div>
          <h2 className="slide-title fade-in d2" style={{ marginBottom: "1.25rem" }}>Выводы и <span>рекомендации</span></h2>
          <div className="fade-in d3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "0.9rem", marginBottom: "1.5rem" }}>
            {[
              { n: "01", title: "Критическое мышление", desc: "Проверяйте источники — не распространяйте непроверенную информацию", icon: "Brain" },
              { n: "02", title: "Цифровой баланс", desc: "Лимиты экранного времени и чередование онлайн/оффлайн активности", icon: "Clock" },
              { n: "03", title: "Выбор платформы", desc: "Сервисы с прозрачной политикой приватности — Telegram как пример", icon: "Shield" },
              { n: "04", title: "Созидательность", desc: "Используйте соцсети для ценности: обучения, нетворкинга, бизнеса", icon: "Lightbulb" },
              { n: "05", title: "Качество связей", desc: "Глубина отношений важнее количества подписчиков и лайков", icon: "Users" },
              { n: "06", title: "Будущее уже здесь", desc: "ИИ + соцсети = новая реальность. Адаптируйтесь, сохраняя человечность", icon: "Sparkles" },
            ].map((item) => (
              <div key={item.n} className="card" style={{ textAlign: "left" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "0.6rem" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", color: "var(--tg-accent)", opacity: 0.5 }}>{item.n}</span>
                  <Icon name={item.icon} fallback="CircleAlert" size={14} style={{ color: "var(--tg-blue)" }} />
                  <span style={{ fontFamily: "var(--font-display)", textTransform: "uppercase", fontSize: "0.8rem", fontWeight: 600, color: "#fff", letterSpacing: "0.06em" }}>{item.title}</span>
                </div>
                <p style={{ fontSize: "0.76rem", color: "#6a8fa8", lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="fade-in d5 card" style={{ display: "inline-block", padding: "1rem 2rem", background: "rgba(42,171,238,0.06)", border: "1px solid rgba(42,171,238,0.3)", maxWidth: "620px" }}>
            <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: "#7aa8c4", fontSize: "0.9rem", lineHeight: 1.75, margin: 0 }}>
              «Социальные сети — это инструмент. Как молоток: им можно построить дом или сломать стену. Выбор всегда за человеком.»
            </p>
          </div>
        </div>
      </div>

      {/* Навигация */}
      <div style={{ position: "fixed", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "0.85rem", zIndex: 200 }}>
        <button className="nav-btn" onClick={() => goTo(Math.max(current - 1, 0))} disabled={current === 0}
          style={{ borderColor: "rgba(255,255,255,0.12)", color: "#fff" }}>
          <Icon name="ChevronLeft" size={15} />
        </button>
        <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
          {SLIDES.map(s => (
            <button key={s.id} className={`dot ${current === s.id ? "on" : ""}`} onClick={() => goTo(s.id)} />
          ))}
        </div>
        <button className="nav-btn" onClick={() => goTo(Math.min(current + 1, 4))} disabled={current === 4}
          style={{ borderColor: "rgba(42,171,238,0.4)", color: "var(--tg-accent)", background: "rgba(42,171,238,0.1)" }}>
          <Icon name="ChevronRight" size={15} />
        </button>
      </div>

      {/* Счётчик */}
      <div style={{ position: "fixed", top: "1.25rem", right: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "rgba(42,171,238,0.4)", zIndex: 200 }}>
        {String(current + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>
      <div style={{ position: "fixed", bottom: "0.75rem", right: "1.5rem", fontFamily: "var(--font-mono)", fontSize: "0.58rem", color: "rgba(255,255,255,0.15)", zIndex: 200 }}>
        ← → клавиши навигации
      </div>
    </div>
  );
}