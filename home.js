// ═══════════════════════════════════════════════
//  lo.fi·focus — home.js
//  Вся логіка головної сторінки (home.html)
// ═══════════════════════════════════════════════

// ── Дані по інструментах ──
const INST_MAP = {
  guitar:  { label: 'Каель · гітара',  mascot: 'kael_guitar.jpg', badge: '🎸 Гітара',      lastLesson: 'Гітара — Перехід Am → E' },
  piano:   { label: 'Каель · ваш гід', mascot: 'kael_guide.png',  badge: '🎹 Фортепіано',  lastLesson: 'Фортепіано — До мажор' },
  ukulele: { label: 'Каель · ваш гід', mascot: 'kael_guide.png',  badge: '🪗 Укулеле',     lastLesson: 'Укулеле — Перший акорд C' },
  violin:  { label: 'Каель · ваш гід', mascot: 'kael_guide.png',  badge: '🎻 Скрипка',     lastLesson: 'Скрипка — Постановка смичка' },
  flute:   { label: 'Корі · флейта',   mascot: 'kori_flute.jpg',  badge: '🎵 Флейта',      lastLesson: 'Флейта — Перші ноти' },
  vocal:   { label: 'Корі · вокал',    mascot: 'kori_mic.jpg',    badge: '🎤 Вокал',       lastLesson: 'Вокал — Дихальні вправи' },
};

// ── Фрази маскота (для повторного відвідувача) ──
const BUBBLES_KAEL = [
  'Не забудь розім\'яти пальці перед практикою 🤙',
  'Короткі сесії щодня — краще ніж годину раз на тиждень 🎵',
  'Пам\'ятаєш той важкий перехід? Сьогодні він дасться легше! 💪',
  'Зроби хоча б 15 хвилин сьогодні — стрік не зламається! 🔥',
];
const BUBBLES_KORI = [
  'Привіт! Сьогодні пограємо разом? 🎵',
  'Дихання — основа всього. Не поспішай 🌬️',
  'Флейта любить терпіння. Ти справляєшся! ✨',
  'Голос — теж інструмент. Розспівайся перед заняттям 🎤',
];

// ── Рекомендовані уроки для старту ──
const FIRST_LESSONS = {
  guitar: {
    beginner: ['Як тримати інструмент', 'Перший акорд Am', 'Перший акорд E'],
    middle:   ['Перехід Am → E', 'Ритмічний бій 4/4', 'Баре на 5 ладу'],
    advanced: ['Техніка легато', 'Fingerpicking паттерни', 'Імпровізація в пентатоніці'],
  },
  piano: {
    beginner: ['До мажор — позиція рук', 'Перша мелодія правою рукою', 'Ноти на клавіатурі'],
    middle:   ['Акорди лівою рукою', 'Гами — До та Соль мажор', 'Прості твори для двох рук'],
    advanced: ['Арпеджіо та розкладені акорди', 'Педаль — коли і як', 'Етюди Черні'],
  },
  ukulele: {
    beginner: ['Налаштування укулеле', 'Перший акорд C', 'Простий бій'],
    middle:   ['Акорди Am та F', 'Перша пісня', 'Фінгерпікінг'],
    advanced: ['Баре на укулеле', 'Складні ритми', 'Транспозиція акордів'],
  },
  violin: {
    beginner: ['Постановка смичка', 'Перші ноти — Ре та Ля', 'Як тримати скрипку'],
    middle:   ['Зміна позицій', 'Деташе та легато', 'Гама Ре мажор'],
    advanced: ['Вібрато', 'Подвійні ноти', 'Позиція III'],
  },
  flute: {
    beginner: ['Постановка амбушюра', 'Перші звуки — нота Сі', 'Дихання флейтиста'],
    middle:   ['Гама До мажор', 'Легато та стакато', 'Перша п\'єса'],
    advanced: ['Вібрато', 'Складні ритми', 'Технічні вправи'],
  },
  vocal: {
    beginner: ['Дихальні вправи', 'Розспівка — терції', 'Резонатори голосу'],
    middle:   ['Робота з діапазоном', 'Мікрофонна техніка', 'Вокальна імпровізація'],
    advanced: ['Мелізми та прикраси', 'Змішаний регістр', 'Запис голосу — основи'],
  },
};

// ── Всі досягнення ──
const ALL_ACH = [
  { icon: '🌱', name: 'Перший крок',     desc: 'Завершено перший урок',     ok: u => (u.lessonsCompleted || 0) >= 1 },
  { icon: '🔥', name: 'Тиждень поспіль', desc: '7 днів без перерви',         ok: u => (u.streak || 0) >= 7 },
  { icon: '🎯', name: 'Фокус-режим',     desc: 'Концентрація >80% за сесію', ok: u => (u.lessonsCompleted || 0) >= 3 },
  { icon: '🏆', name: '30 днів',         desc: '30 днів поспіль',            ok: u => (u.streak || 0) >= 30 },
];

// ── Утиліти ──
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Доброго ранку';
  if (h < 18) return 'Добрий день';
  return 'Добрий вечір';
}

function initials(name) {
  return (name || '??')
    .trim()
    .split(' ')
    .map(w => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function levelLabel(lvl) {
  return lvl === 'beginner' ? 'Початківець' : lvl === 'middle' ? 'Середній' : 'Впевнений';
}
function levelIcon(lvl) {
  return lvl === 'beginner' ? '🌱' : lvl === 'middle' ? '🎯' : '🔥';
}

// ── Рендер нового користувача ──
function renderNewUser(user, inst, level) {
  // Hero subtitle + streak
  document.getElementById('hero-subtitle').textContent = 'Раді бачити тебе! Обери перший урок і починай 🎵';
  document.getElementById('streak-row').innerHTML = `
    <div class="streak-badge">
      <span>🌱</span>
      <span style="font-family:'Space Mono',monospace;font-size:18px;font-weight:700;color:var(--mint)">День 1</span>
      <span style="font-size:13px;color:var(--text-muted)">перший день — найважливіший</span>
    </div>
    <a href="practice.html" class="quick-btn">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="5,3 19,12 5,21"/></svg>
      Почати перший урок
    </a>`;

  // Маскот bubble
  const mascotName = (user.instrument === 'flute' || user.instrument === 'vocal') ? 'Корі' : 'Каель';
  document.getElementById('mascot-bubble').innerHTML =
    `Вітаю, <strong style="color:var(--mint)">${user.name}</strong>! 🎉<br>Я ${mascotName} — буду поруч на кожному кроці. Починаємо?`;

  // Статистика — порожній стан
  document.getElementById('stats-section').innerHTML = `
    <div class="stats-row">
      <div class="stat-card" style="border-style:dashed;">
        <div class="stat-label">Хвилин практики</div>
        <div class="stat-value" style="color:var(--text-dim)">0<span class="unit">хв</span></div>
        <div class="stat-delta" style="color:var(--text-dim)">Ще попереду!</div>
      </div>
      <div class="stat-card" style="border-style:dashed;">
        <div class="stat-label">Уроків пройдено</div>
        <div class="stat-value" style="color:var(--text-dim)">0<span class="unit">з 48</span></div>
        <div class="stat-delta" style="color:var(--text-dim)">Починай прямо зараз</div>
      </div>
      <div class="stat-card" style="border-style:dashed;">
        <div class="stat-label">Рівень</div>
        <div class="stat-value" style="font-size:20px;color:var(--text-dim)">${levelIcon(level)} ${levelLabel(level)}</div>
        <div class="stat-delta" style="color:var(--text-dim)">Статистика з'явиться після занять</div>
      </div>
    </div>`;

  // Рекомендовані уроки
  const lessons = (FIRST_LESSONS[user.instrument] || FIRST_LESSONS.guitar)[level] || FIRST_LESSONS.guitar.beginner;
  document.getElementById('lessons-section').innerHTML = `
    <div class="section-header">
      <div class="section-title">Рекомендовані уроки для старту</div>
      <a href="#" class="section-link">Весь каталог →</a>
    </div>
    <div class="lessons-grid">
      ${lessons.map((title, i) => `
        <a href="#" class="lesson-card" style="${i === 0 ? 'border-color:rgba(94,231,191,0.35);' : ''}">
          ${i === 0 ? '<div style="font-size:10px;color:var(--mint);letter-spacing:1px;text-transform:uppercase;margin-bottom:6px;">⭐ З цього починай</div>' : ''}
          <div class="lesson-instrument">${inst.badge}</div>
          <div class="lesson-title">${title}</div>
          <div class="lesson-meta">
            <span class="lesson-pill beginner">${levelLabel(level)}</span>
            <span class="lesson-time">${10 + i * 4} хв</span>
          </div>
        </a>`).join('')}
    </div>`;

  // Досягнення — заблоковано
  document.getElementById('achievements-section').innerHTML = `
    <div class="section-header"><div class="section-title">Досягнення</div></div>
    <div style="background:var(--bg-card);border:1px solid var(--border);border-radius:14px;padding:20px 22px;margin-bottom:36px;display:flex;align-items:center;gap:14px;">
      <span style="font-size:28px;">🔒</span>
      <div>
        <div style="font-size:14px;font-weight:500;color:var(--text-main);margin-bottom:4px;">Досягнення поки заблоковані</div>
        <div style="font-size:12px;color:var(--text-dim);">Пройди перший урок — і перше досягнення вже твоє 🌱</div>
      </div>
    </div>`;
}

// ── Рендер повторного відвідувача ──
function renderReturningUser(user, inst, level) {
  // Hero
  document.getElementById('last-lesson').textContent = inst.lastLesson;
  const streakEl = document.getElementById('streak-num');
  if (streakEl) streakEl.textContent = user.streak || 0;

  // Статистика
  document.getElementById('stats-section').innerHTML = `
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-label">Хвилин практики</div>
        <div class="stat-value">${user.totalMinutes || 0}<span class="unit">хв</span></div>
        <div class="stat-delta">↑ цього тижня</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Уроків пройдено</div>
        <div class="stat-value">${user.lessonsCompleted || 0}<span class="unit">з 48</span></div>
        <div class="stat-delta">Продовжуй!</div>
      </div>
      <div class="stat-card">
        <div class="stat-label">Рівень</div>
        <div class="stat-value" style="font-size:20px;">${levelIcon(level)} <span class="unit">${levelLabel(level)}</span></div>
        <div class="stat-delta">↑ росте!</div>
      </div>
    </div>`;

  // Уроки
  document.getElementById('lessons-section').innerHTML = `
    <div class="section-header">
      <div class="section-title">Нещодавні уроки</div>
      <a href="#" class="section-link">Весь каталог →</a>
    </div>
    <div class="lessons-grid">
      <a href="practice.html" class="lesson-card done">
        <div class="lesson-instrument">${inst.badge}</div>
        <div class="lesson-title">${inst.lastLesson}</div>
        <div class="lesson-meta"><span class="lesson-pill beginner">Завершено</span><span class="lesson-time">12 хв</span></div>
      </a>
      <a href="#" class="lesson-card">
        <div class="lesson-instrument">${inst.badge}</div>
        <div class="lesson-title">Наступний урок чекає тебе</div>
        <div class="lesson-meta"><span class="lesson-pill medium">Продовження</span><span class="lesson-time">15 хв</span></div>
      </a>
      <a href="#" class="lesson-card" style="opacity:.5;pointer-events:none;">
        <div class="lesson-instrument">${inst.badge}</div>
        <div class="lesson-title">Буде розблоковано після попереднього</div>
        <div class="lesson-meta"><span class="lesson-pill">Заблоковано</span><span class="lesson-time">18 хв</span></div>
      </a>
    </div>`;

  // Досягнення
  const unlocked = ALL_ACH.filter(a => a.ok(user));
  const locked   = ALL_ACH.filter(a => !a.ok(user));
  const cards = [...unlocked, ...locked].map(a => `
    <div class="ach-card${a.ok(user) ? '' : ' locked'}">
      <div class="ach-icon">${a.icon}</div>
      <div class="ach-info">
        <div class="ach-name">${a.name}</div>
        <div class="ach-desc">${a.desc}</div>
      </div>
    </div>`).join('');
  document.getElementById('achievements-section').innerHTML = `
    <div class="section-header"><div class="section-title">Досягнення</div></div>
    <div class="achievements-row" style="margin-bottom:36px;">${cards}</div>`;

  // Bubble rotation
  const isKori = user.instrument === 'flute' || user.instrument === 'vocal';
  const bubbles = isKori ? BUBBLES_KORI : BUBBLES_KAEL;
  let pi = 0;
  const bel = document.getElementById('mascot-bubble');
  bel.innerHTML = `${isKori ? 'Привіт' : 'Привіт'}, <strong style="color:var(--mint)">${user.name}</strong>! ${bubbles[0]}`;
  setInterval(() => {
    pi = (pi + 1) % bubbles.length;
    bel.style.opacity = '0';
    setTimeout(() => { bel.innerHTML = bubbles[pi]; bel.style.opacity = '1'; }, 400);
  }, 5000);
}

// ── Головна ініціалізація ──
window.addEventListener('load', () => {
  // Перевірка авторизації
  const raw = localStorage.getItem('lofi_user');
  if (!raw) { window.location.href = 'index.html'; return; }

  const user   = JSON.parse(raw);
  const inst   = INST_MAP[user.instrument] || INST_MAP.guitar;
  const level  = user.level || 'beginner';
  const isNew  = !user.lessonsCompleted || user.lessonsCompleted === 0;
  const name   = (user.name && user.name.trim()) || 'Учень';

  // Привітання
  document.getElementById('hero-greeting').textContent = getGreeting();
  document.getElementById('hero-name').textContent = name;

  // Навбар
  document.getElementById('nav-inst-badge').textContent = inst.badge;
  document.getElementById('nav-initials').textContent   = initials(name);

  // Маскот (панель + кут)
  document.getElementById('mascot-img').src          = inst.mascot;
  document.getElementById('mascot-name-tag').textContent = inst.label;
  document.getElementById('kael-idle-img').src       = inst.mascot;
  // Fallback якщо файл не знайдено
  document.getElementById('mascot-img').onerror      = function(){ this.src = 'kael_guide.png'; };
  document.getElementById('kael-idle-img').onerror   = function(){ this.src = 'kael_guide.png'; };

  // Рендер залежно від стану
  if (isNew) {
    renderNewUser(user, inst, level);
  } else {
    renderReturningUser(user, inst, level);
  }

  // Heatmap
  const grid = document.getElementById('heatmap');
  const lvls = ['', 'l1', 'l2', 'l3', 'l4'];
  const pat  = isNew
    ? Array(70).fill(0)
    : [0,0,1,1,2,3,2,1,0,0,0,1,2,2,3,4,3,2,1,0,1,1,2,3,4,4,3,3,2,1,0,1,1,2,3,3,2,2,1,0,0,0,1,1,2,4,3,1,0,0,0,1,2,3,4,4,4,2,1,0,1,2,3,3,4,3,3,2,1,0];
  for (let i = 0; i < 70; i++) {
    const c = document.createElement('div');
    c.className = 'hm-cell' + (pat[i] ? ' ' + lvls[pat[i]] : '');
    grid.appendChild(c);
  }
});

// ── Меню аватара (клік, не hover) ──
function toggleMenu(e) {
  e.stopPropagation();
  document.getElementById('nav-menu').classList.toggle('open');
}
document.addEventListener('click', () => {
  const m = document.getElementById('nav-menu');
  if (m) m.classList.remove('open');
});

// ── Idle маскот у кутку ──
const idlePhrases = [
  'Натисни «Продовжити урок» — я чекаю! 🎸',
  '15 хвилин щодня — і за місяць не впізнаєш себе 🎵',
  'Зіграй хоча б одну гаму — це вже практика! 🌱',
];
let bubbleTimeout;
function toggleIdleBubble() {
  const idleBubble = document.getElementById('kael-idle-bubble');
  if (idleBubble.classList.contains('show')) {
    idleBubble.classList.remove('show');
  } else {
    idleBubble.innerHTML = idlePhrases[Math.floor(Math.random() * idlePhrases.length)];
    idleBubble.classList.add('show');
    clearTimeout(bubbleTimeout);
    bubbleTimeout = setTimeout(() => idleBubble.classList.remove('show'), 4500);
  }
}

// ── Вихід ──
function logout() {
  localStorage.removeItem('lofi_user');
  localStorage.removeItem('lofi_tour_done');
  window.location.href = 'index.html';
}