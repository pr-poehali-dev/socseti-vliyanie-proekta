import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const SLIDES = [
  { id: 0, label: "Титульный" },
  { id: 1, label: "История" },
  { id: 2, label: "Возможности" },
  { id: 3, label: "Статистика" },
  { id: 4, label: "Влияние" },
  { id: 5, label: "Будущее" },
];

const durovImg = "https://cdn.poehali.dev/projects/61940178-bf70-4e64-bb62-b34ff76884d1/files/dfc54262-9dd8-410f-94b3-966207e5c933.jpg";

export default function Presentation() {
  const [current, setCurrent] = useState(0);

  const goTo = (idx: number) => {
    if (idx < 0 || idx >= SLIDES.length) return;
    setCurrent(idx);
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goTo(current + 1);
      if (e.key === "ArrowLeft") goTo(current - 1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [current]);

  return (
    <div style={{ width:"100vw", height:"100vh", overflow:"hidden", background:"#f0f2f5", fontFamily:"'Montserrat', sans-serif", position:"relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin:0; padding:0; }
        .slide { position:absolute; inset:0; display:none; }
        .slide.active { display:flex; flex-direction:column; }
        .feat-card { background:white; border-radius:12px; padding:1rem 1.1rem; box-shadow:0 2px 10px rgba(0,0,0,.06); }
        .stat-box { background:white; border-radius:12px; padding:1rem 1.3rem; box-shadow:0 2px 10px rgba(0,0,0,.07); border-left:4px solid #2AABEE; }
        .tl-dot { width:36px; height:36px; border-radius:50%; background:#2AABEE; display:flex; align-items:center; justify-content:center; color:white; font-size:.68rem; font-weight:700; flex-shrink:0; }
        .tl-line { position:absolute; left:17px; top:36px; bottom:0; width:2px; background:#dde8f5; }
        .tag-blue { display:inline-block; background:#e8f4fd; color:#2AABEE; border-radius:6px; padding:.25rem .7rem; font-size:.7rem; font-weight:600; }
        .bar-bg { background:#e8ecf0; border-radius:100px; height:9px; overflow:hidden; }
        .bar-fill { height:100%; border-radius:100px; background:#2AABEE; }
        .nbtn { width:34px; height:34px; border-radius:50%; background:white; border:1px solid #dde3ea; cursor:pointer; display:flex; align-items:center; justify-content:center; color:#444; box-shadow:0 1px 4px rgba(0,0,0,.08); }
        .nbtn:hover { background:#2AABEE; color:white; border-color:#2AABEE; }
        .nbtn:disabled { opacity:.3; cursor:not-allowed; }
        .nbtn:disabled:hover { background:white; color:#444; border-color:#dde3ea; }
        .ndot { width:8px; height:8px; border-radius:50%; background:rgba(0,0,0,.18); cursor:pointer; border:none; }
        .ndot.on { background:#2AABEE; width:22px; border-radius:4px; }
        .nav-wrap { position:fixed; bottom:1.5rem; left:50%; transform:translateX(-50%); display:flex; align-items:center; gap:.65rem; z-index:200; background:rgba(255,255,255,.9); border-radius:100px; padding:.45rem .9rem; box-shadow:0 2px 12px rgba(0,0,0,.1); }
        .slide-num { position:fixed; top:1.1rem; right:1.4rem; font-size:.65rem; font-weight:700; color:#8a9baa; z-index:200; }
        .chart-col { display:flex; flex-direction:column; align-items:center; gap:4px; flex:1; }
        .chart-bar { width:100%; border-radius:6px 6px 0 0; background:#2AABEE; }
      `}</style>

      {/* ── СЛАЙД 0: ТИТУЛЬНЫЙ ── */}
      <div className={`slide ${current === 0 ? "active" : ""}`} style={{ flexDirection:"row", background:"white" }}>
        <div style={{ width:"42%", background:"#2AABEE", display:"flex", flexDirection:"column", justifyContent:"center", padding:"3.5rem", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"220px", height:"220px", borderRadius:"50%", background:"rgba(255,255,255,.08)" }} />
          <div style={{ position:"absolute", bottom:"-40px", left:"-40px", width:"160px", height:"160px", borderRadius:"50%", background:"rgba(255,255,255,.06)" }} />
          <div style={{ fontSize:"5rem", marginBottom:"1.5rem", lineHeight:1 }}>✈️</div>
          <div style={{ fontSize:"clamp(2.2rem,4vw,3.4rem)", fontWeight:800, color:"white", lineHeight:1.15, marginBottom:"1rem" }}>Telegram</div>
          <div style={{ width:"50px", height:"4px", background:"white", borderRadius:"2px", marginBottom:"1rem", opacity:.7 }} />
          <div style={{ fontSize:"1rem", color:"rgba(255,255,255,.85)", fontWeight:400, lineHeight:1.6 }}>Платформа нового поколения</div>
        </div>
        <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", padding:"3.5rem" }}>
          <div style={{ marginBottom:"1.5rem" }}><span className="tag-blue">ИССЛЕДОВАНИЕ · 2025</span></div>
          <h1 style={{ fontSize:"clamp(1.4rem,2.8vw,2.1rem)", fontWeight:800, color:"#1a2535", lineHeight:1.35, marginBottom:"1.5rem" }}>
            Как мессенджер изменил правила коммуникации для 900 миллионов людей
          </h1>
          <p style={{ fontSize:".95rem", color:"#667080", lineHeight:1.75, marginBottom:"2rem", maxWidth:"420px" }}>
            История, технологии, влияние на общество и будущее одной из самых быстрорастущих платформ в мире.
          </p>
          <div style={{ display:"flex", gap:"2rem" }}>
            {[{ n:"900M+", l:"пользователей" },{ n:"2013", l:"год запуска" },{ n:"#1", l:"по приватности" }].map(s=>(
              <div key={s.l}>
                <div style={{ fontSize:"1.6rem", fontWeight:800, color:"#2AABEE" }}>{s.n}</div>
                <div style={{ fontSize:".7rem", color:"#8a9baa", fontWeight:500, marginTop:".1rem" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── СЛАЙД 1: ИСТОРИЯ ── */}
      <div className={`slide ${current === 1 ? "active" : ""}`} style={{ background:"#f7f9fb", padding:"2.5rem 3.5rem", overflow:"auto" }}>
        <SlideHeader num="01" title="История создания" accent="Telegram" />
        <div style={{ display:"grid", gridTemplateColumns:"1.1fr 1fr", gap:"2.5rem", marginTop:"1.5rem", alignItems:"start" }}>
          <div style={{ position:"relative" }}>
            <div className="tl-line" />
            {[
              { year:"2006", title:"ВКонтакте", desc:"Павел Дуров основывает крупнейшую соцсеть России — первый опыт создания массовой платформы" },
              { year:"2013", title:"Запуск Telegram", desc:"14 августа — первый день: 100 000 загрузок. Цель: безопасный мессенджер без слежки" },
              { year:"2014", title:"Эмиграция Дурова", desc:"Покидает Россию после давления ФСБ. Telegram становится независимым от любого государства" },
              { year:"2018", title:"Блокировка в РФ", desc:"Роскомнадзор пытается заблокировать — безуспешно. Аудитория продолжает расти" },
              { year:"2020", title:"400 млн пользователей", desc:"Пандемия COVID-19 даёт взрывной рост: главный канал новостей и общения" },
              { year:"2024", title:"900 млн + TON", desc:"Мини-приложения и блокчейн-экосистема. Telegram становится супер-платформой" },
            ].map(item=>(
              <div key={item.year} style={{ display:"flex", gap:"1rem", marginBottom:"1rem", position:"relative" }}>
                <div className="tl-dot">{item.year.slice(2)}'</div>
                <div style={{ background:"white", borderRadius:"10px", padding:".75rem 1rem", flex:1, boxShadow:"0 2px 8px rgba(0,0,0,.06)" }}>
                  <div style={{ display:"flex", gap:".6rem", alignItems:"center", marginBottom:".2rem" }}>
                    <span style={{ fontSize:".62rem", color:"#2AABEE", fontWeight:700 }}>{item.year}</span>
                    <span style={{ fontWeight:700, color:"#1a2535", fontSize:".88rem" }}>{item.title}</span>
                  </div>
                  <p style={{ fontSize:".77rem", color:"#667080", lineHeight:1.55 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <img src={durovImg} alt="" style={{ width:"100%", aspectRatio:"1/1", objectFit:"cover", borderRadius:"14px", marginBottom:"1rem", boxShadow:"0 4px 20px rgba(0,0,0,.1)" }} />
            <div style={{ background:"white", borderRadius:"12px", padding:"1.1rem", boxShadow:"0 2px 10px rgba(0,0,0,.07)", borderLeft:"4px solid #2AABEE" }}>
              <div style={{ fontSize:".62rem", fontWeight:700, color:"#2AABEE", marginBottom:".4rem" }}>ПАВЕЛ ДУРОВ, ОСНОВАТЕЛЬ</div>
              <p style={{ fontStyle:"italic", color:"#445060", fontSize:".85rem", lineHeight:1.7 }}>
                «Конфиденциальность — не роскошь, а базовое право каждого человека.»
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── СЛАЙД 2: ВОЗМОЖНОСТИ ── */}
      <div className={`slide ${current === 2 ? "active" : ""}`} style={{ background:"white", padding:"2.5rem 3.5rem", overflow:"auto" }}>
        <SlideHeader num="02" title="Ключевые возможности" accent="платформы" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1rem", marginTop:"1.5rem" }}>
          {[
            { icon:"Lock",      color:"#8b5cf6", title:"Шифрование MTProto",   desc:"Собственный протокол безопасности. E2E в секретных чатах, самоуничтожение сообщений, никаких серверных копий" },
            { icon:"Radio",     color:"#2AABEE", title:"Каналы и группы",       desc:"Безлимитная аудитория в каналах. Супергруппы до 200 000 участников — новый формат медиа и сообществ" },
            { icon:"Bot",       color:"#10b981", title:"Боты и автоматизация", desc:"700 000+ активных ботов. Магазины, банки, госуслуги — всё работает внутри приложения без переходов" },
            { icon:"Wallet",    color:"#f59e0b", title:"TON и криптовалюта",   desc:"Встроенный кошелёк, NFT, P2P переводы. Telegram строит собственную финансовую экосистему" },
            { icon:"Gamepad2",  color:"#ef4444", title:"Мини-приложения",       desc:"Web Apps внутри Telegram. Notcoin, Hamster Kombat — 300M+ игроков без установки отдельных приложений" },
            { icon:"HardDrive", color:"#0ea5e9", title:"Облачное хранилище",   desc:"Файлы до 4 ГБ, неограниченное облако, синхронизация на всех устройствах, личный архив сообщений" },
          ].map(f=>(
            <div key={f.title} className="feat-card">
              <div style={{ display:"flex", alignItems:"center", gap:".6rem", marginBottom:".65rem" }}>
                <div style={{ width:"36px", height:"36px", borderRadius:"8px", background:`${f.color}15`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon name={f.icon} fallback="CircleAlert" size={18} style={{ color:f.color }} />
                </div>
                <span style={{ fontWeight:700, color:"#1a2535", fontSize:".85rem" }}>{f.title}</span>
              </div>
              <p style={{ fontSize:".76rem", color:"#667080", lineHeight:1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ display:"flex", gap:"1rem", marginTop:"1.2rem" }}>
          {[{ n:"700K+", l:"активных ботов" },{ n:"4 ГБ", l:"макс. размер файла" },{ n:"∞", l:"подписчиков в канале" },{ n:"20", l:"аккаунтов на устройство" }].map(s=>(
            <div key={s.l} className="stat-box" style={{ flex:1, textAlign:"center" }}>
              <div style={{ fontSize:"1.6rem", fontWeight:800, color:"#2AABEE" }}>{s.n}</div>
              <div style={{ fontSize:".65rem", color:"#8a9baa", marginTop:".15rem", fontWeight:500 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── СЛАЙД 3: СТАТИСТИКА ── */}
      <div className={`slide ${current === 3 ? "active" : ""}`} style={{ background:"#f7f9fb", padding:"2.5rem 3.5rem", overflow:"auto" }}>
        <SlideHeader num="03" title="Telegram в цифрах" accent="рост аудитории" />
        <div style={{ display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:"2.5rem", marginTop:"1.5rem", alignItems:"start" }}>
          <div>
            <div style={{ fontSize:".7rem", fontWeight:700, color:"#8a9baa", letterSpacing:".08em", marginBottom:"1rem" }}>КОЛИЧЕСТВО ПОЛЬЗОВАТЕЛЕЙ</div>
            {/* График */}
            <div style={{ display:"flex", gap:"10px", alignItems:"flex-end", height:"140px", marginBottom:"1.5rem" }}>
              {[
                { year:"2013", users:0.1, h:1 },
                { year:"2015", users:60,  h:7 },
                { year:"2018", users:200, h:22 },
                { year:"2020", users:400, h:44 },
                { year:"2022", users:700, h:78 },
                { year:"2024", users:900, h:100 },
              ].map(d=>(
                <div key={d.year} className="chart-col">
                  <span style={{ fontSize:".58rem", fontWeight:700, color:"#2AABEE" }}>{d.users>=100?`${(d.users/1000).toFixed(1)}B`:`${d.users}M`}</span>
                  <div style={{ width:"100%", background:"#e8ecf0", borderRadius:"6px 6px 0 0", flex:1, display:"flex", alignItems:"flex-end" }}>
                    <div className="chart-bar" style={{ height:`${d.h}%` }} />
                  </div>
                  <span style={{ fontSize:".58rem", color:"#8a9baa", fontWeight:600 }}>{d.year}</span>
                </div>
              ))}
            </div>
            {[
              { label:"Сообщений отправляется в день", val:80, unit:"млрд" },
              { label:"Стран, где Telegram в топ-3", val:85, unit:"%" },
              { label:"Пользователей читают каналы", val:72, unit:"%" },
            ].map(b=>(
              <div key={b.label} style={{ marginBottom:".7rem" }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:".73rem", color:"#556070", marginBottom:".3rem", fontWeight:500 }}>
                  <span>{b.label}</span>
                  <span style={{ fontWeight:700, color:"#2AABEE" }}>{b.val} {b.unit}</span>
                </div>
                <div className="bar-bg"><div className="bar-fill" style={{ width:`${b.val}%` }} /></div>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:".85rem" }}>
            {[
              { n:"900M+", lbl:"активных пользователей в 2024 году",    color:"#2AABEE" },
              { n:"80 млрд", lbl:"сообщений отправляется каждый день",  color:"#8b5cf6" },
              { n:"#4",      lbl:"самое скачиваемое приложение в мире", color:"#10b981" },
              { n:"12 лет",  lbl:"на рынке — с 2013 года по сей день",  color:"#f59e0b" },
            ].map(s=>(
              <div key={s.lbl} className="stat-box" style={{ borderLeftColor:s.color }}>
                <div style={{ fontSize:"1.65rem", fontWeight:800, color:s.color, lineHeight:1 }}>{s.n}</div>
                <div style={{ fontSize:".75rem", color:"#667080", marginTop:".3rem", lineHeight:1.45 }}>{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── СЛАЙД 4: ВЛИЯНИЕ ── */}
      <div className={`slide ${current === 4 ? "active" : ""}`} style={{ background:"white", padding:"2.5rem 3.5rem", overflow:"auto" }}>
        <SlideHeader num="04" title="Влияние Telegram" accent="на общество" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:"1.1rem", marginTop:"1.5rem" }}>
          {[
            { icon:"Newspaper", color:"#2AABEE", title:"Медиа и журналистика",
              points:["Независимые каналы как альтернатива ТВ и газетам","Новости без редакционной цензуры и фильтров","Во время войн и кризисов — главный источник информации","200+ тысяч новостных каналов по всему миру"] },
            { icon:"Users", color:"#8b5cf6", title:"Политика и гражданское общество",
              points:["Протесты в Беларуси и Иране координировались через Telegram","Анонимные каналы публикуют разоблачения властей","Правительства блокируют — граждане обходят через VPN","Инструмент гражданского активизма и самоорганизации"] },
            { icon:"ShoppingBag", color:"#10b981", title:"Бизнес и торговля",
              points:["Магазины, доставка и сервисы работают через ботов","Рынок Telegram-рекламы — более $500 млн в год","Инфобизнес и онлайн-образование переехали в каналы","B2B коммуникация всё чаще заменяет электронную почту"] },
            { icon:"Shield", color:"#f59e0b", title:"Приватность и безопасность",
              points:["Секретные чаты с E2E шифрованием и самоуничтожением","Регистрация без привязки к реальному имени — псевдонимы","Серверы в нескольких юрисдикциях — сложнее заблокировать","Ни одного официально подтверждённого случая утечки данных"] },
          ].map(card=>(
            <div key={card.title} className="feat-card" style={{ boxShadow:"0 2px 12px rgba(0,0,0,.07)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:".75rem", marginBottom:".85rem" }}>
                <div style={{ width:"38px", height:"38px", borderRadius:"9px", background:`${card.color}12`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon name={card.icon} fallback="CircleAlert" size={18} style={{ color:card.color }} />
                </div>
                <span style={{ fontWeight:700, color:"#1a2535", fontSize:".9rem" }}>{card.title}</span>
              </div>
              {card.points.map(p=>(
                <div key={p} style={{ display:"flex", gap:".5rem", alignItems:"flex-start", marginBottom:".4rem" }}>
                  <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:card.color, marginTop:"6px", flexShrink:0 }} />
                  <span style={{ fontSize:".77rem", color:"#556070", lineHeight:1.55 }}>{p}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ marginTop:"1.1rem", background:"#f0f7ff", borderRadius:"10px", padding:"1rem 1.4rem", borderLeft:"4px solid #2AABEE" }}>
          <p style={{ fontStyle:"italic", color:"#445060", fontSize:".85rem", lineHeight:1.75 }}>
            💬 &nbsp;Во время иранских протестов 2022 года Telegram был единственным каналом связи для миллионов людей, когда власти отключили интернет.
          </p>
        </div>
      </div>

      {/* ── СЛАЙД 5: БУДУЩЕЕ ── */}
      <div className={`slide ${current === 5 ? "active" : ""}`} style={{ background:"#f7f9fb", padding:"2.5rem 3.5rem", overflow:"auto" }}>
        <SlideHeader num="05" title="Будущее Telegram" accent="что дальше?" />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1rem", marginTop:"1.5rem" }}>
          {[
            { icon:"Sparkles", color:"#8b5cf6", title:"Супер-приложение",      desc:"По модели WeChat — внутри Telegram живут банки, магазины, игры, госуслуги. К 2026 — полноценная экосистема для жизни" },
            { icon:"Coins",    color:"#f59e0b", title:"Финансы и TON",         desc:"Блокчейн The Open Network, P2P переводы без банков. Telegram строит альтернативную финансовую систему" },
            { icon:"Brain",    color:"#2AABEE", title:"Интеграция с ИИ",      desc:"Языковые модели прямо в ботах и чатах. Персональный ИИ-ассистент для каждого пользователя уже в разработке" },
            { icon:"Globe",    color:"#10b981", title:"1 млрд пользователей", desc:"Прогнозируемый рубеж — 1 миллиард. Telegram войдёт в клуб самых массовых цифровых платформ планеты" },
            { icon:"Tv",       color:"#ef4444", title:"Видео и стриминг",     desc:"Stories, прямые эфиры, видеосообщения. Telegram наступает на YouTube и TikTok в сегменте короткого видео" },
            { icon:"Building", color:"#0ea5e9", title:"Корпоративный рынок", desc:"CRM, аналитика каналов, рекламный кабинет для бизнеса. Корпоративный сегмент растёт на 40% в год" },
          ].map(f=>(
            <div key={f.title} className="feat-card">
              <div style={{ display:"flex", alignItems:"center", gap:".6rem", marginBottom:".65rem" }}>
                <div style={{ width:"36px", height:"36px", borderRadius:"8px", background:`${f.color}14`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <Icon name={f.icon} fallback="CircleAlert" size={18} style={{ color:f.color }} />
                </div>
                <span style={{ fontWeight:700, color:"#1a2535", fontSize:".85rem" }}>{f.title}</span>
              </div>
              <p style={{ fontSize:".76rem", color:"#667080", lineHeight:1.65 }}>{f.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ marginTop:"1.2rem", background:"#2AABEE", borderRadius:"12px", padding:"1.2rem 1.8rem", display:"flex", alignItems:"center", gap:"1rem" }}>
          <span style={{ fontSize:"2rem" }}>✈️</span>
          <div>
            <div style={{ fontWeight:800, color:"white", fontSize:"1rem", marginBottom:".25rem" }}>Telegram — это уже не мессенджер</div>
            <div style={{ color:"rgba(255,255,255,.85)", fontSize:".82rem", lineHeight:1.6 }}>Это платформа, которая переопределяет то, как мы общаемся, ведём бизнес, потребляем новости и управляем деньгами.</div>
          </div>
        </div>
      </div>

      {/* Навигация */}
      <div className="nav-wrap">
        <button className="nbtn" onClick={()=>goTo(current-1)} disabled={current===0}>
          <Icon name="ChevronLeft" size={15} />
        </button>
        <div style={{ display:"flex", gap:"5px", alignItems:"center" }}>
          {SLIDES.map(s=><button key={s.id} className={`ndot${current===s.id?" on":""}`} onClick={()=>goTo(s.id)} />)}
        </div>
        <button className="nbtn" onClick={()=>goTo(current+1)} disabled={current===SLIDES.length-1}>
          <Icon name="ChevronRight" size={15} />
        </button>
      </div>

      <div className="slide-num">{current+1} / {SLIDES.length}</div>
    </div>
  );
}

function SlideHeader({ num, title, accent }: { num: string; title: string; accent: string }) {
  return (
    <div style={{ borderBottom:"2px solid #eaedf0", paddingBottom:"1rem" }}>
      <div style={{ fontSize:".62rem", fontWeight:700, color:"#2AABEE", letterSpacing:".12em", marginBottom:".35rem" }}>СЛАЙД {num}</div>
      <h2 style={{ fontSize:"clamp(1.4rem,2.8vw,2rem)", fontWeight:800, color:"#1a2535", lineHeight:1.2 }}>
        {title} <span style={{ color:"#2AABEE" }}>{accent}</span>
      </h2>
    </div>
  );
}
