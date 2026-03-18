import { useState, useEffect } from "react";

const SLIDES = ["Главная", "Немного истории", "Что умеет", "Цифры", "Зачем нам это", "Итог"];

export default function Presentation() {
  const [cur, setCur] = useState(0);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setCur(c => Math.min(c + 1, SLIDES.length - 1));
      if (e.key === "ArrowLeft")  setCur(c => Math.max(c - 1, 0));
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  return (
    <div style={{ width:"100vw", height:"100vh", overflow:"hidden", display:"flex", flexDirection:"column", fontFamily:"Comic Sans MS, Chalkboard SE, cursive", background:"#fff" }}>

      <style>{`
        body { margin: 0; }
        * { box-sizing: border-box; }
        .slide { display: none; flex: 1; overflow: auto; }
        .slide.on { display: block; }
        ul { padding-left: 1.5rem; }
        ul li { margin-bottom: 6px; }
        .wordart {
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 900;
          background: linear-gradient(180deg, #ff0080, #7b00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(2px 2px 0px rgba(0,0,0,0.2));
          font-family: Impact, Arial Black, sans-serif;
          letter-spacing: 2px;
        }
        .star { display: inline-block; color: gold; font-size: 1.2rem; }
        .clipart-border {
          border: 6px double #2AABEE;
          border-radius: 8px;
          padding: 1rem;
        }
        .table-old { border-collapse: collapse; width: 100%; font-size: .9rem; }
        .table-old th { background: #2AABEE; color: white; padding: .5rem .75rem; text-align: left; }
        .table-old td { border: 1px solid #aac; padding: .5rem .75rem; }
        .table-old tr:nth-child(even) td { background: #ddeeff; }
        .nav-btn {
          padding: .45rem 1.4rem;
          border: 2px solid #2AABEE;
          background: #2AABEE;
          color: white;
          font-family: Comic Sans MS, cursive;
          font-size: .85rem;
          border-radius: 4px;
          cursor: pointer;
          font-weight: bold;
        }
        .nav-btn:disabled { background: #ccc; border-color: #ccc; cursor: not-allowed; }
        .important-box {
          background: #fffde7;
          border: 2px dashed #ffc107;
          border-radius: 6px;
          padding: .75rem 1rem;
        }
        .blue-box {
          background: #e3f2fd;
          border: 2px solid #2AABEE;
          border-radius: 6px;
          padding: .75rem 1rem;
        }
      `}</style>

      {/* Шапка — как в школьных презентациях */}
      <div style={{ background:"#2AABEE", padding:".5rem 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
        <div style={{ color:"white", fontWeight:"bold", fontSize:".9rem" }}>
          Презентация на тему: Telegram ✈️
        </div>
        <div style={{ color:"rgba(255,255,255,.8)", fontSize:".8rem" }}>
          Слайд {cur + 1} из {SLIDES.length}
        </div>
      </div>

      {/* Вкладки */}
      <div style={{ display:"flex", borderBottom:"2px solid #ddd", background:"#f5f5f5", overflowX:"auto", flexShrink:0 }}>
        {SLIDES.map((s, i) => (
          <button key={s} onClick={() => setCur(i)} style={{
            padding:".5rem 1rem", border:"none", borderBottom: cur === i ? "3px solid #2AABEE" : "3px solid transparent",
            background: cur === i ? "white" : "transparent", cursor:"pointer",
            fontFamily:"Comic Sans MS, cursive", fontSize:".8rem", color: cur === i ? "#2AABEE" : "#666", fontWeight: cur === i ? "bold" : "normal", whiteSpace:"nowrap"
          }}>{s}</button>
        ))}
      </div>

      {/* СЛАЙДЫ */}

      {/* 0 — Главная */}
      <div className={`slide ${cur === 0 ? "on" : ""}`}>
        <div style={{ background:"linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%)", minHeight:"100%", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"2rem", textAlign:"center" }}>

          {/* WordArt */}
          <div className="wordart" style={{ marginBottom:"1rem" }}>TELEGRAM</div>

          {/* Самолётик */}
          <div style={{ fontSize:"5rem", marginBottom:"1rem", filter:"drop-shadow(3px 3px 4px rgba(0,0,0,0.15))" }}>✈️</div>

          <div style={{ background:"white", border:"4px solid #2AABEE", borderRadius:"12px", padding:"1.5rem 2.5rem", maxWidth:"500px", boxShadow:"4px 4px 0 #2AABEE" }}>
            <p style={{ fontSize:"1.05rem", color:"#333", lineHeight:1.8, marginBottom:"1rem" }}>
              Это презентация про мессенджер <strong>Telegram</strong> 😊<br />
              Я расскажу про его историю, возможности и зачем он вообще нужен
            </p>
            <div style={{ display:"flex", gap:"1.5rem", justifyContent:"center", borderTop:"1px solid #eee", paddingTop:"1rem" }}>
              <div>
                <div style={{ fontSize:"1.5rem", fontWeight:"bold", color:"#2AABEE" }}>900 млн</div>
                <div style={{ fontSize:".75rem", color:"#888" }}>пользователей</div>
              </div>
              <div>
                <div style={{ fontSize:"1.5rem", fontWeight:"bold", color:"#2AABEE" }}>2013</div>
                <div style={{ fontSize:".75rem", color:"#888" }}>год создания</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop:"1.5rem", fontSize:".8rem", color:"#888" }}>
            ← → чтобы листать
          </div>
        </div>
      </div>

      {/* 1 — История */}
      <div className={`slide ${cur === 1 ? "on" : ""}`} style={{ padding:"1.75rem 2.5rem" }}>
        <h2 style={{ color:"#1565c0", fontSize:"1.5rem", marginBottom:".25rem", borderBottom:"3px solid #2AABEE", paddingBottom:".5rem" }}>
          📖 Немного истории
        </h2>
        <p style={{ color:"#555", fontSize:".85rem", marginBottom:"1.25rem" }}>
          (Это я нашёл в интернете и немного переписал своими словами)
        </p>

        <p style={{ fontSize:".95rem", lineHeight:1.8, color:"#333", marginBottom:"1.25rem" }}>
          Telegram придумал <strong>Павел Дуров</strong> — тот самый человек который до этого создал ВКонтакте. В 2014 году он уехал из России потому-что ему давили на него власти и хотели чтобы он отдал данные пользователей. Он отказался и уехал. Молодец!! 👍
        </p>

        <table className="table-old" style={{ marginBottom:"1.25rem" }}>
          <thead>
            <tr><th>Год</th><th>Что случилось</th></tr>
          </thead>
          <tbody>
            {[
              ["2006", "Дуров создаёт ВКонтакте"],
              ["2013", "Запуск Telegram, первый день — 100 тыс. скачиваний!!"],
              ["2014", "Уезжает из России, Telegram становится независимым"],
              ["2018", "Россия пытается заблокировать Telegram (не получилось 😁)"],
              ["2020", "Пандемия — все сидят дома и пользуются Telegram"],
              ["2024", "Уже 900 миллионов человек!"],
            ].map(([year, event]) => (
              <tr key={year}>
                <td style={{ fontWeight:"bold", color:"#1565c0", whiteSpace:"nowrap" }}>{year}</td>
                <td>{event}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="important-box">
          <strong>💬 Цитата самого Дурова:</strong><br />
          <em style={{ fontSize:".9rem", color:"#555" }}>«Конфиденциальность — это не роскошь, это право каждого человека»</em>
        </div>
      </div>

      {/* 2 — Возможности */}
      <div className={`slide ${cur === 2 ? "on" : ""}`} style={{ padding:"1.75rem 2.5rem" }}>
        <h2 style={{ color:"#1565c0", fontSize:"1.5rem", marginBottom:".25rem", borderBottom:"3px solid #2AABEE", paddingBottom:".5rem" }}>
          ⚙️ Что умеет Telegram
        </h2>
        <p style={{ color:"#555", fontSize:".85rem", marginBottom:"1.25rem" }}>
          (тут много всего крутого)
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1.25rem" }}>
          {[
            { e:"🔒", t:"Шифрование", d:"Сообщения зашифрованы и никто не может их прочитать кроме вас. Есть секретные чаты где сообщения вообще сами удаляются!" },
            { e:"📢", t:"Каналы", d:"Можно создать канал и подписчиков может быть сколько угодно хоть миллион. Многие блогеры и новостные сайты уже переехали туда." },
            { e:"🤖", t:"Боты", d:"Боты это такие программы которые отвечают автоматически. Через них можно заказать еду, купить билеты и т.д. Их уже больше 700 тысяч!!" },
            { e:"💰", t:"Криптовалюта (TON)", d:"Теперь в Telegram можно хранить и переводить крипту. Это блокчейн называется TON. Я честно не очень понял как это работает но говорят круто." },
            { e:"🎮", t:"Мини-игры", d:"Hamster Kombat, Notcoin — это всё игры прямо в Telegram. В них играло больше 300 миллионов человек. Многие получили реальные деньги!" },
            { e:"☁️", t:"Облако", d:"Можно хранить файлы до 4 гигабайт! Это очень много. И они синхронизируются на всех устройствах автоматически." },
          ].map(f => (
            <div key={f.t} style={{ background:"#f8f9ff", border:"1px solid #c5d5f8", borderRadius:"8px", padding:".9rem" }}>
              <div style={{ fontSize:"1.5rem", marginBottom:".35rem" }}>{f.e}</div>
              <div style={{ fontWeight:"bold", color:"#1565c0", marginBottom:".35rem", fontSize:".9rem" }}>{f.t}</div>
              <p style={{ fontSize:".8rem", color:"#444", lineHeight:1.6, margin:0 }}>{f.d}</p>
            </div>
          ))}
        </div>

        <div className="blue-box" style={{ fontSize:".85rem", color:"#333" }}>
          <strong>Вывод:</strong> Telegram это уже не просто мессенджер, это целая платформа! Как в телефоне есть App Store, так в Telegram теперь есть свои приложения.
        </div>
      </div>

      {/* 3 — Цифры */}
      <div className={`slide ${cur === 3 ? "on" : ""}`} style={{ padding:"1.75rem 2.5rem" }}>
        <h2 style={{ color:"#1565c0", fontSize:"1.5rem", marginBottom:".25rem", borderBottom:"3px solid #2AABEE", paddingBottom:".5rem" }}>
          📊 Цифры (они меня удивили)
        </h2>
        <p style={{ color:"#555", fontSize:".85rem", marginBottom:"1.25rem" }}>
          (все данные взяты из открытых источников)
        </p>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1.5rem" }}>
          <div>
            {/* "График" нарисованный руками */}
            <div style={{ fontWeight:"bold", color:"#444", fontSize:".85rem", marginBottom:".75rem" }}>Сколько людей пользуется Telegram:</div>
            {[
              { year:"2013", val:1,   label:"почти никого 😅" },
              { year:"2015", val:7,   label:"60 млн" },
              { year:"2018", val:22,  label:"200 млн" },
              { year:"2020", val:45,  label:"400 млн" },
              { year:"2022", val:78,  label:"700 млн" },
              { year:"2024", val:100, label:"900 млн+ 🎉" },
            ].map(d => (
              <div key={d.year} style={{ display:"flex", alignItems:"center", gap:".5rem", marginBottom:".4rem" }}>
                <span style={{ width:"34px", fontSize:".75rem", color:"#666", flexShrink:0 }}>{d.year}</span>
                <div style={{ flex:1, background:"#e3f2fd", borderRadius:"3px", height:"20px", position:"relative" }}>
                  <div style={{ width:`${d.val}%`, background:"#2AABEE", height:"100%", borderRadius:"3px", display:"flex", alignItems:"center", paddingLeft:"6px" }}>
                    {d.val > 15 && <span style={{ fontSize:".68rem", color:"white", fontWeight:"bold" }}>{d.label}</span>}
                  </div>
                </div>
                {d.val <= 15 && <span style={{ fontSize:".68rem", color:"#555", whiteSpace:"nowrap" }}>{d.label}</span>}
              </div>
            ))}
          </div>

          <div>
            <div style={{ fontWeight:"bold", color:"#444", fontSize:".85rem", marginBottom:".75rem" }}>Интересные факты:</div>
            <table className="table-old">
              <tbody>
                {[
                  ["Сообщений в день",        "80 миллиардов 😱"],
                  ["Ботов всего",              "больше 700 000"],
                  ["Макс. файл",              "4 гигабайта"],
                  ["Место в топе",            "Топ-5 в мире"],
                  ["Лет существует",          "12 лет"],
                  ["Игроков в Hamster",        "300 млн+"],
                ].map(([label, val]) => (
                  <tr key={label}>
                    <td>{label}</td>
                    <td style={{ fontWeight:"bold", color:"#1565c0" }}>{val}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ marginTop:"1rem" }} className="important-box">
              <span className="star">★★★★★</span> — мой личный рейтинг Telegram 😄
            </div>
          </div>
        </div>
      </div>

      {/* 4 — Влияние */}
      <div className={`slide ${cur === 4 ? "on" : ""}`} style={{ padding:"1.75rem 2.5rem" }}>
        <h2 style={{ color:"#1565c0", fontSize:"1.5rem", marginBottom:".25rem", borderBottom:"3px solid #2AABEE", paddingBottom:".5rem" }}>
          🌍 Зачем нам это?
        </h2>
        <p style={{ color:"#555", fontSize:".85rem", marginBottom:"1.25rem" }}>
          (про влияние Telegram на жизнь людей)
        </p>

        <p style={{ fontSize:".95rem", lineHeight:1.8, color:"#333", marginBottom:"1.25rem" }}>
          Я раньше думал что Telegram это просто мессенджер, но оказалось что это намного больше. Вот что я узнал:
        </p>

        <div style={{ display:"flex", flexDirection:"column", gap:".85rem" }}>
          {[
            { e:"📰", color:"#e3f2fd", bc:"#bbdefb", t:"Новости и СМИ",
              d:"Многие люди теперь узнают новости не из телевизора а из Telegram-каналов. Их там более 200 тысяч на разных языках. Это удобно потому что можно выбрать только те темы которые интересны." },
            { e:"✊", color:"#fce4ec", bc:"#f48fb1", t:"Политика",
              d:"В Беларуси в 2020 году и в Иране в 2022 году люди использовали Telegram чтобы договариваться о протестах когда власти отключали интернет. Это очень важно для свободы." },
            { e:"🛍️", color:"#e8f5e9", bc:"#a5d6a7", t:"Бизнес",
              d:"Много магазинов и предпринимателей переехали в Telegram. Мой папа например покупает через Telegram-бот пиццу. Это реально удобно и быстро работает." },
            { e:"🔐", color:"#fff8e1", bc:"#ffe082", t:"Безопасность личных данных",
              d:"Telegram не продаёт ваши данные рекламодателям как например это делает другие соцсети (не буду называть кто 😅). Поэтому многие люди переходят именно туда." },
          ].map(f => (
            <div key={f.t} style={{ background:f.color, border:`2px solid ${f.bc}`, borderRadius:"8px", padding:".9rem 1.1rem", display:"flex", gap:"1rem" }}>
              <div style={{ fontSize:"1.8rem", flexShrink:0 }}>{f.e}</div>
              <div>
                <div style={{ fontWeight:"bold", color:"#1565c0", marginBottom:".3rem" }}>{f.t}</div>
                <p style={{ fontSize:".84rem", color:"#333", lineHeight:1.65, margin:0 }}>{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5 — Итог */}
      <div className={`slide ${cur === 5 ? "on" : ""}`} style={{ padding:"1.75rem 2.5rem" }}>
        <h2 style={{ color:"#1565c0", fontSize:"1.5rem", marginBottom:".25rem", borderBottom:"3px solid #2AABEE", paddingBottom:".5rem" }}>
          ✅ Итог
        </h2>
        <p style={{ color:"#555", fontSize:".85rem", marginBottom:"1.25rem" }}>
          (что я узнал пока делал эту презентацию)
        </p>

        <div className="blue-box" style={{ marginBottom:"1.25rem" }}>
          <p style={{ fontSize:".95rem", lineHeight:1.8, color:"#333", margin:0 }}>
            Telegram начинался как обычный мессенджер, но за 12 лет превратился в огромную платформу которой пользуются почти миллиард людей. Это очень много!!
          </p>
        </div>

        <div style={{ marginBottom:"1.25rem" }}>
          <div style={{ fontWeight:"bold", color:"#1565c0", marginBottom:".6rem" }}>Главные выводы:</div>
          <ul style={{ fontSize:".92rem", color:"#333", lineHeight:2 }}>
            <li>Telegram — это не просто мессенджер, это целая экосистема</li>
            <li>Он намного безопаснее чем другие похожие приложения</li>
            <li>Каналы и боты — это вообще отдельная история, очень полезно</li>
            <li>900 миллионов людей — это почти каждый 9-й человек на планете!</li>
            <li>Будущее у платформы очень крутое (криптовалюта, ИИ, игры)</li>
          </ul>
        </div>

        <div style={{ marginBottom:"1.25rem" }}>
          <div style={{ fontWeight:"bold", color:"#1565c0", marginBottom:".6rem" }}>Что ещё будет у Telegram:</div>
          <table className="table-old">
            <thead>
              <tr><th>Что</th><th>Когда (примерно)</th></tr>
            </thead>
            <tbody>
              {[
                ["1 миллиард пользователей",      "2025–2026"],
                ["Больше ИИ и умных ботов",        "уже скоро"],
                ["Своя финансовая система (TON)",   "в процессе"],
                ["Конкуренция с YouTube",          "уже началась"],
              ].map(([what, when]) => (
                <tr key={what}>
                  <td>{what}</td>
                  <td style={{ fontWeight:"bold", color:"#1565c0" }}>{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ background:"#2AABEE", color:"white", borderRadius:"8px", padding:"1rem 1.5rem", textAlign:"center" }}>
          <div style={{ fontSize:"1.1rem", fontWeight:"bold", marginBottom:".4rem" }}>✈️ Спасибо за внимание!!</div>
          <p style={{ fontSize:".85rem", opacity:.9, margin:0 }}>
            Если есть вопросы — спрашивайте 😊<br />
            <span style={{ fontSize:".75rem", opacity:.75 }}>Источники: Wikipedia, официальный сайт Telegram, статьи в интернете</span>
          </p>
        </div>
      </div>

      {/* Навигация */}
      <div style={{ background:"#f5f5f5", borderTop:"1px solid #ddd", padding:".6rem 1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
        <button className="nav-btn" onClick={() => setCur(c => Math.max(c - 1, 0))} disabled={cur === 0}>← Назад</button>
        <div style={{ display:"flex", gap:"5px" }}>
          {SLIDES.map((_, i) => (
            <div key={i} onClick={() => setCur(i)} style={{ width: cur === i ? "20px" : "8px", height:"8px", borderRadius:"4px", background: cur === i ? "#2AABEE" : "#ccc", cursor:"pointer" }} />
          ))}
        </div>
        <button className="nav-btn" onClick={() => setCur(c => Math.min(c + 1, SLIDES.length - 1))} disabled={cur === SLIDES.length - 1}>Вперёд →</button>
      </div>
    </div>
  );
}
