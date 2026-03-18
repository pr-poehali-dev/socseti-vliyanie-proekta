import { useState, useEffect } from "react";

const SLIDES = ["Титульный", "История", "Возможности", "Аудитория", "Влияние", "Выводы"];

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
    <div style={{ width:"100vw", height:"100vh", background:"#fff", fontFamily:"Calibri, Arial, sans-serif", display:"flex", flexDirection:"column", overflow:"hidden" }}>

      {/* Верхняя полоска с навигацией — как вкладки */}
      <div style={{ background:"#1e73be", padding:"0 1.5rem", display:"flex", alignItems:"center", gap:".25rem", flexShrink:0 }}>
        {SLIDES.map((s, i) => (
          <button key={s} onClick={() => setCur(i)} style={{
            padding:".55rem 1.1rem", border:"none", cursor:"pointer", fontSize:".8rem", fontFamily:"Calibri, Arial, sans-serif",
            background: cur === i ? "#fff" : "transparent",
            color: cur === i ? "#1e73be" : "rgba(255,255,255,.8)",
            fontWeight: cur === i ? 700 : 400,
            borderRadius:"4px 4px 0 0", marginTop:"4px",
          }}>{s}</button>
        ))}
        <div style={{ marginLeft:"auto", color:"rgba(255,255,255,.6)", fontSize:".75rem", paddingBottom:"4px" }}>
          {cur + 1} / {SLIDES.length}
        </div>
      </div>

      {/* Контент слайдов */}
      <div style={{ flex:1, overflow:"auto" }}>

        {/* СЛАЙД 0 — ТИТУЛЬНЫЙ */}
        {cur === 0 && (
          <div style={{ height:"100%", background:"#1e73be", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"3rem", textAlign:"center" }}>
            <div style={{ background:"white", borderRadius:"4px", padding:"3rem 4rem", maxWidth:"680px", width:"100%", boxShadow:"0 4px 24px rgba(0,0,0,.18)" }}>
              <div style={{ fontSize:"4rem", marginBottom:"1rem" }}>✈️</div>
              <h1 style={{ fontSize:"2.6rem", fontWeight:700, color:"#1e3a5f", marginBottom:".75rem", lineHeight:1.2 }}>
                Telegram
              </h1>
              <div style={{ height:"3px", background:"#1e73be", width:"80px", margin:"0 auto 1.25rem" }} />
              <p style={{ fontSize:"1.1rem", color:"#444", marginBottom:"2rem", lineHeight:1.6 }}>
                Роль мессенджера в современном обществе
              </p>
              <div style={{ display:"flex", gap:"2rem", justifyContent:"center", borderTop:"1px solid #e0e0e0", paddingTop:"1.5rem" }}>
                <div>
                  <div style={{ fontSize:"1.8rem", fontWeight:700, color:"#1e73be" }}>900 млн</div>
                  <div style={{ fontSize:".8rem", color:"#888" }}>пользователей</div>
                </div>
                <div>
                  <div style={{ fontSize:"1.8rem", fontWeight:700, color:"#1e73be" }}>2013</div>
                  <div style={{ fontSize:".8rem", color:"#888" }}>год создания</div>
                </div>
                <div>
                  <div style={{ fontSize:"1.8rem", fontWeight:700, color:"#1e73be" }}>12 лет</div>
                  <div style={{ fontSize:".8rem", color:"#888" }}>на рынке</div>
                </div>
              </div>
            </div>
            <p style={{ color:"rgba(255,255,255,.6)", fontSize:".75rem", marginTop:"1.5rem" }}>← → для навигации</p>
          </div>
        )}

        {/* СЛАЙД 1 — ИСТОРИЯ */}
        {cur === 1 && (
          <div style={{ padding:"2rem 3rem", maxWidth:"960px", margin:"0 auto" }}>
            <h2 style={{ fontSize:"1.7rem", fontWeight:700, color:"#1e3a5f", borderBottom:"2px solid #1e73be", paddingBottom:".5rem", marginBottom:"1.5rem" }}>
              История создания Telegram
            </h2>

            <p style={{ fontSize:".95rem", color:"#333", lineHeight:1.75, marginBottom:"1.5rem" }}>
              Telegram был основан братьями <strong>Павлом и Николаем Дуровыми</strong> в 2013 году. До этого Павел создал ВКонтакте — крупнейшую социальную сеть России. В 2014 году, после давления со стороны российских властей, он покинул страну и сосредоточился на развитии Telegram как независимой платформы.
            </p>

            {/* Таблица-хронология */}
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:".88rem", marginBottom:"1.5rem" }}>
              <thead>
                <tr style={{ background:"#1e73be", color:"white" }}>
                  <th style={{ padding:".6rem 1rem", textAlign:"left", width:"100px" }}>Год</th>
                  <th style={{ padding:".6rem 1rem", textAlign:"left", width:"200px" }}>Событие</th>
                  <th style={{ padding:".6rem 1rem", textAlign:"left" }}>Описание</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["2006", "Создание ВКонтакте",       "Дуров запускает крупнейшую соцсеть России, набирает опыт в разработке платформ"],
                  ["2013", "Запуск Telegram",           "14 августа выходит первая версия. За первые сутки — 100 000 скачиваний"],
                  ["2014", "Эмиграция из России",       "Дуров уходит из ВКонтакте после конфликта с ФСБ, Telegram становится независимым"],
                  ["2018", "Блокировка в России",       "Роскомнадзор пытается заблокировать Telegram — безуспешно, аудитория растёт"],
                  ["2020", "400 млн пользователей",     "Пандемия COVID-19 даёт взрывной рост — Telegram стал главным каналом новостей"],
                  ["2024", "900 млн + экосистема TON",  "Запуск мини-приложений и блокчейна, Telegram превращается в супер-платформу"],
                ].map(([year, event, desc], i) => (
                  <tr key={year} style={{ background: i % 2 === 0 ? "#f5f8ff" : "white" }}>
                    <td style={{ padding:".55rem 1rem", fontWeight:700, color:"#1e73be" }}>{year}</td>
                    <td style={{ padding:".55rem 1rem", fontWeight:600, color:"#1e3a5f" }}>{event}</td>
                    <td style={{ padding:".55rem 1rem", color:"#555" }}>{desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ background:"#f0f6ff", border:"1px solid #c5d9f1", borderLeft:"4px solid #1e73be", borderRadius:"4px", padding:"1rem 1.25rem" }}>
              <strong style={{ color:"#1e3a5f" }}>Цитата основателя:</strong>
              <p style={{ marginTop:".4rem", fontStyle:"italic", color:"#444", lineHeight:1.65 }}>
                «Конфиденциальность — это не роскошь, а базовое право каждого человека. Именно поэтому мы создали Telegram.»
              </p>
              <p style={{ marginTop:".4rem", fontSize:".8rem", color:"#888" }}>— Павел Дуров, основатель Telegram</p>
            </div>
          </div>
        )}

        {/* СЛАЙД 2 — ВОЗМОЖНОСТИ */}
        {cur === 2 && (
          <div style={{ padding:"2rem 3rem", maxWidth:"960px", margin:"0 auto" }}>
            <h2 style={{ fontSize:"1.7rem", fontWeight:700, color:"#1e3a5f", borderBottom:"2px solid #1e73be", paddingBottom:".5rem", marginBottom:"1.5rem" }}>
              Основные возможности Telegram
            </h2>

            <p style={{ fontSize:".95rem", color:"#333", lineHeight:1.75, marginBottom:"1.5rem" }}>
              В отличие от обычных мессенджеров, Telegram давно вышел за рамки простой переписки. Ниже перечислены ключевые функции, которые делают его уникальным.
            </p>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"1rem", marginBottom:"1.5rem" }}>
              {[
                { emoji:"🔒", title:"Шифрование и безопасность", text:"Секретные чаты с end-to-end шифрованием, самоуничтожение сообщений через заданное время, собственный протокол MTProto — более надёжный, чем стандартный SSL." },
                { emoji:"📢", title:"Каналы и группы", text:"Каналы с неограниченным числом подписчиков — новый формат СМИ. Супергруппы до 200 000 участников для обсуждений, сообществ и корпоративного общения." },
                { emoji:"🤖", title:"Боты и автоматизация", text:"Более 700 000 активных ботов: магазины, службы доставки, банки, госуслуги — всё работает внутри одного приложения без переходов на сторонние сайты." },
                { emoji:"💰", title:"Криптовалюта и TON", text:"Встроенный кошелёк, NFT и P2P-переводы на базе блокчейна TON (The Open Network). Telegram создаёт собственную финансовую экосистему без посредников." },
                { emoji:"🎮", title:"Мини-приложения (Web Apps)", text:"Полноценные приложения внутри Telegram без отдельной установки. Notcoin, Hamster Kombat — более 300 млн игроков. Новый рынок для разработчиков." },
                { emoji:"☁️", title:"Облачное хранилище", text:"Файлы размером до 4 ГБ, неограниченное облачное хранилище, синхронизация на всех устройствах одновременно. Личный архив и заметки." },
              ].map(f => (
                <div key={f.title} style={{ background:"#f9fbff", border:"1px solid #dde8f8", borderRadius:"6px", padding:"1rem" }}>
                  <div style={{ fontSize:"1.4rem", marginBottom:".4rem" }}>{f.emoji}</div>
                  <div style={{ fontWeight:700, color:"#1e3a5f", marginBottom:".4rem", fontSize:".92rem" }}>{f.title}</div>
                  <p style={{ fontSize:".8rem", color:"#555", lineHeight:1.6 }}>{f.text}</p>
                </div>
              ))}
            </div>

            <div style={{ background:"#1e73be", color:"white", borderRadius:"6px", padding:".9rem 1.4rem", display:"flex", gap:"2rem", justifyContent:"center" }}>
              {[["700 000+","активных ботов"],["4 ГБ","макс. размер файла"],["∞","подписчиков в канале"],["20","аккаунтов на 1 устройство"]].map(([n,l])=>(
                <div key={l} style={{ textAlign:"center" }}>
                  <div style={{ fontSize:"1.4rem", fontWeight:700 }}>{n}</div>
                  <div style={{ fontSize:".7rem", opacity:.85, marginTop:".1rem" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* СЛАЙД 3 — АУДИТОРИЯ */}
        {cur === 3 && (
          <div style={{ padding:"2rem 3rem", maxWidth:"960px", margin:"0 auto" }}>
            <h2 style={{ fontSize:"1.7rem", fontWeight:700, color:"#1e3a5f", borderBottom:"2px solid #1e73be", paddingBottom:".5rem", marginBottom:"1.5rem" }}>
              Аудитория и рост Telegram
            </h2>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"2rem" }}>
              <div>
                <p style={{ fontSize:".9rem", color:"#444", lineHeight:1.7, marginBottom:"1.25rem" }}>
                  Telegram — одна из самых быстрорастущих платформ в мире. С момента запуска в 2013 году аудитория выросла в тысячи раз. Особенно резкий скачок произошёл в 2020–2021 годах на фоне пандемии и блокировок WhatsApp в ряде стран.
                </p>

                {/* Упрощённый "самодельный" график */}
                <div style={{ marginBottom:"1.25rem" }}>
                  <div style={{ fontSize:".78rem", fontWeight:700, color:"#888", marginBottom:".6rem" }}>Рост числа пользователей (млн):</div>
                  {[
                    { year:"2013", val:0.1,  pct:1 },
                    { year:"2015", val:60,   pct:7 },
                    { year:"2018", val:200,  pct:22 },
                    { year:"2020", val:400,  pct:44 },
                    { year:"2022", val:700,  pct:78 },
                    { year:"2024", val:900,  pct:100 },
                  ].map(d => (
                    <div key={d.year} style={{ display:"flex", alignItems:"center", gap:".6rem", marginBottom:".4rem" }}>
                      <div style={{ width:"36px", fontSize:".75rem", color:"#666", flexShrink:0 }}>{d.year}</div>
                      <div style={{ flex:1, background:"#e8ecf0", borderRadius:"2px", height:"18px" }}>
                        <div style={{ width:`${d.pct}%`, background:"#1e73be", height:"100%", borderRadius:"2px", display:"flex", alignItems:"center", paddingLeft:"6px" }}>
                          {d.pct > 10 && <span style={{ fontSize:".65rem", color:"white", fontWeight:600 }}>{d.val >= 100 ? `${d.val/1000}B` : `${d.val}M`}</span>}
                        </div>
                      </div>
                      {d.pct <= 10 && <span style={{ fontSize:".65rem", color:"#666" }}>{d.val}M</span>}
                    </div>
                  ))}
                </div>

                <p style={{ fontSize:".8rem", color:"#888", fontStyle:"italic" }}>* Данные приблизительные, на основе открытых источников</p>
              </div>

              <div>
                <div style={{ fontSize:".78rem", fontWeight:700, color:"#888", marginBottom:".75rem" }}>Ключевые цифры:</div>
                <table style={{ width:"100%", borderCollapse:"collapse", fontSize:".88rem" }}>
                  <tbody>
                    {[
                      ["Активных пользователей (2024)", "900 млн+"],
                      ["Сообщений в день",              "80 млрд"],
                      ["Место в рейтинге скачиваний",   "Топ-5 в мире"],
                      ["Стран с Telegram в топ-3",       "85+"],
                      ["Зарегистрировано ботов",         "700 000+"],
                      ["Максимальный размер файла",      "4 ГБ"],
                      ["Лет на рынке",                   "12 лет"],
                    ].map(([label, val], i) => (
                      <tr key={label} style={{ background: i % 2 === 0 ? "#f5f8ff" : "white" }}>
                        <td style={{ padding:".5rem .75rem", color:"#444" }}>{label}</td>
                        <td style={{ padding:".5rem .75rem", fontWeight:700, color:"#1e73be", textAlign:"right" }}>{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* СЛАЙД 4 — ВЛИЯНИЕ */}
        {cur === 4 && (
          <div style={{ padding:"2rem 3rem", maxWidth:"960px", margin:"0 auto" }}>
            <h2 style={{ fontSize:"1.7rem", fontWeight:700, color:"#1e3a5f", borderBottom:"2px solid #1e73be", paddingBottom:".5rem", marginBottom:"1.5rem" }}>
              Влияние Telegram на общество
            </h2>

            <p style={{ fontSize:".95rem", color:"#333", lineHeight:1.75, marginBottom:"1.5rem" }}>
              За 12 лет Telegram вышел далеко за рамки мессенджера и начал влиять на медиа, политику, бизнес и гражданское общество по всему миру.
            </p>

            <div style={{ display:"flex", flexDirection:"column", gap:"1rem", marginBottom:"1.5rem" }}>
              {[
                { emoji:"📰", title:"Медиа и новости", color:"#e8f0fe", border:"#c5d5f8",
                  text:"Независимые Telegram-каналы стали полноценной альтернативой традиционным СМИ. Сегодня в Telegram более 200 000 новостных каналов на разных языках. Во время военных конфликтов и политических кризисов мессенджер нередко оказывался единственным доступным источником информации." },
                { emoji:"🗳️", title:"Политика и активизм", color:"#fff0e8", border:"#f8d5b5",
                  text:"В Беларуси (2020) и Иране (2022) протестные движения координировались через Telegram, когда власти отключали интернет. Анонимные каналы позволяют публиковать разоблачения без страха преследования. Правительства многих стран пытаются заблокировать мессенджер — с переменным успехом." },
                { emoji:"🛒", title:"Бизнес и торговля", color:"#e8fee8", border:"#b5f8c5",
                  text:"Малый и средний бизнес активно использует Telegram для продаж, поддержки и маркетинга. Рынок рекламы в Telegram-каналах оценивается более чем в 500 млн долларов в год. Онлайн-школы, инфобизнес и корпоративные коммуникации всё чаще переезжают именно сюда." },
                { emoji:"🔐", title:"Приватность и цифровые права", color:"#f5e8fe", border:"#d5b5f8",
                  text:"Telegram стал символом борьбы за цифровую приватность. Секретные чаты, псевдонимы, хранение данных в разных юрисдикциях — всё это привлекает пользователей, которых беспокоит слежка. Официально подтверждённых утечек данных с серверов Telegram до сих пор не было." },
              ].map(f => (
                <div key={f.title} style={{ background:f.color, border:`1px solid ${f.border}`, borderRadius:"6px", padding:"1rem 1.25rem", display:"flex", gap:"1rem" }}>
                  <div style={{ fontSize:"1.6rem", flexShrink:0 }}>{f.emoji}</div>
                  <div>
                    <div style={{ fontWeight:700, color:"#1e3a5f", marginBottom:".35rem" }}>{f.title}</div>
                    <p style={{ fontSize:".84rem", color:"#444", lineHeight:1.65 }}>{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* СЛАЙД 5 — ВЫВОДЫ */}
        {cur === 5 && (
          <div style={{ padding:"2rem 3rem", maxWidth:"960px", margin:"0 auto" }}>
            <h2 style={{ fontSize:"1.7rem", fontWeight:700, color:"#1e3a5f", borderBottom:"2px solid #1e73be", paddingBottom:".5rem", marginBottom:"1.5rem" }}>
              Выводы
            </h2>

            <p style={{ fontSize:".95rem", color:"#333", lineHeight:1.75, marginBottom:"1.5rem" }}>
              Telegram — это не просто мессенджер. За 12 лет он превратился в полноценную экосистему, которая меняет то, как люди общаются, получают новости, ведут бизнес и управляют деньгами.
            </p>

            <div style={{ marginBottom:"1.5rem" }}>
              <div style={{ fontWeight:700, color:"#1e3a5f", marginBottom:".75rem" }}>Основные выводы:</div>
              <ul style={{ paddingLeft:"1.5rem", display:"flex", flexDirection:"column", gap:".6rem" }}>
                {[
                  "Telegram начинался как мессенджер с акцентом на безопасность, но со временем стал многофункциональной платформой.",
                  "Рост аудитории с нуля до 900 млн за 12 лет — один из самых быстрых в истории технологий.",
                  "Telegram влияет на политику, медиа и бизнес в десятках стран мира.",
                  "Уникальная модель: нет рекламы в личных чатах, упор на приватность, открытый API для разработчиков.",
                  "Будущее платформы связано с финансами (TON), мини-приложениями и интеграцией с ИИ.",
                ].map(t => (
                  <li key={t} style={{ fontSize:".92rem", color:"#333", lineHeight:1.6 }}>{t}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginBottom:"1.5rem" }}>
              <div style={{ fontWeight:700, color:"#1e3a5f", marginBottom:".75rem" }}>Перспективы развития:</div>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:".88rem" }}>
                <thead>
                  <tr style={{ background:"#1e73be", color:"white" }}>
                    <th style={{ padding:".55rem 1rem", textAlign:"left" }}>Направление</th>
                    <th style={{ padding:".55rem 1rem", textAlign:"left" }}>Что ожидается</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["Аудитория",        "Достижение отметки 1 млрд пользователей к 2025–2026 году"],
                    ["Финансы",          "Развитие экосистемы TON, P2P-переводы, альтернатива банкам"],
                    ["Мини-приложения",  "Новый рынок для разработчиков, аналог App Store внутри Telegram"],
                    ["Искусственный ИИ", "Интеграция языковых моделей прямо в чаты и ботов"],
                    ["Видеоконтент",     "Конкуренция с YouTube и TikTok в сегменте коротких видео"],
                  ].map(([dir, exp], i) => (
                    <tr key={dir} style={{ background: i % 2 === 0 ? "#f5f8ff" : "white" }}>
                      <td style={{ padding:".5rem 1rem", fontWeight:600, color:"#1e3a5f" }}>{dir}</td>
                      <td style={{ padding:".5rem 1rem", color:"#555" }}>{exp}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ background:"#1e73be", color:"white", borderRadius:"6px", padding:"1.1rem 1.5rem" }}>
              <div style={{ fontWeight:700, fontSize:"1rem", marginBottom:".4rem" }}>✈️ &nbsp;Итог</div>
              <p style={{ fontSize:".88rem", lineHeight:1.7, opacity:.95 }}>
                Telegram доказал, что можно строить глобальную платформу без слежки за пользователями и навязчивой рекламы. Его развитие продолжается, и, судя по темпам роста, это далеко не предел.
              </p>
            </div>
          </div>
        )}

      </div>

      {/* Нижняя навигация */}
      <div style={{ background:"#f0f2f5", borderTop:"1px solid #dde3ea", padding:".6rem 1.5rem", display:"flex", justifyContent:"space-between", alignItems:"center", flexShrink:0 }}>
        <button onClick={() => setCur(c => Math.max(c - 1, 0))} disabled={cur === 0}
          style={{ padding:".4rem 1.2rem", background: cur === 0 ? "#e0e4ea" : "#1e73be", color: cur === 0 ? "#aaa" : "white", border:"none", borderRadius:"4px", cursor: cur === 0 ? "not-allowed" : "pointer", fontFamily:"Calibri, Arial, sans-serif", fontSize:".85rem", fontWeight:600 }}>
          ← Назад
        </button>
        <div style={{ display:"flex", gap:"6px" }}>
          {SLIDES.map((_, i) => (
            <div key={i} onClick={() => setCur(i)} style={{ width: cur === i ? "22px" : "8px", height:"8px", borderRadius:"4px", background: cur === i ? "#1e73be" : "#bfc8d4", cursor:"pointer", transition:"width .2s" }} />
          ))}
        </div>
        <button onClick={() => setCur(c => Math.min(c + 1, SLIDES.length - 1))} disabled={cur === SLIDES.length - 1}
          style={{ padding:".4rem 1.2rem", background: cur === SLIDES.length - 1 ? "#e0e4ea" : "#1e73be", color: cur === SLIDES.length - 1 ? "#aaa" : "white", border:"none", borderRadius:"4px", cursor: cur === SLIDES.length - 1 ? "not-allowed" : "pointer", fontFamily:"Calibri, Arial, sans-serif", fontSize:".85rem", fontWeight:600 }}>
          Вперёд →
        </button>
      </div>

    </div>
  );
}
