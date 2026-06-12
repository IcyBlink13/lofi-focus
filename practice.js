// ═══════════════════════════════════════════════
//  lo.fi·focus — practice.js
//  Кімната практики: фазовий таймер + матеріали
// ═══════════════════════════════════════════════

// ── Дані уроків ──
const LESSONS = {
  guitar: {
    beginner: {
      title: 'Гітара — Перший акорд Am',
      videoId: 'BBz-Jyr23M4',
      chords: [
        { name: 'Am', fingers: ['X','0','2','2','1','0'], note: 'Ля мінор' },
        { name: 'E',  fingers: ['0','2','2','1','0','0'], note: 'Мі мажор' },
        { name: 'G',  fingers: ['3','2','0','0','0','3'], note: 'Соль мажор' },
      ],
      steps: [
        'Поклади пальці на акорд Am. Перевір кожну струну окремо.',
        'Зіграй Am 4 рази рівно — відчуй ритм.',
        'Переставляй руку на E і назад. Не поспішай.',
        'Спробуй перехід Am → E плавно 8 разів.',
        'Додай G: Am → E → G → Am. Повтори 4 рази.',
        'Зіграй послідовність під метроном (60 BPM).',
      ],
    },
    middle: {
      title: 'Гітара — Перехід Am → E',
      videoId: 'BBz-Jyr23M4',
      chords: [
        { name: 'Am', fingers: ['X','0','2','2','1','0'], note: 'Ля мінор' },
        { name: 'E',  fingers: ['0','2','2','1','0','0'], note: 'Мі мажор' },
        { name: 'Dm', fingers: ['X','X','0','2','3','1'], note: 'Ре мінор' },
        { name: 'F',  fingers: ['1','1','2','3','3','1'], note: 'Фа мажор (баре)' },
      ],
      steps: [
        'Розігрій пальці — хроматична гама вгору-вниз.',
        'Відпрацюй перехід Am → E, 20 разів.',
        'Додай Dm. Послідовність: Am → E → Dm.',
        'Спробуй баре F — тисни вказівним пальцем на 1 ладу.',
        'Повна прогресія: Am → F → C → E.',
        'Зіграй під ритм 80 BPM, 3 хвилини без зупинки.',
      ],
    },
  },
  flute: {
    beginner: {
      title: 'Флейта — Перші ноти',
      videoId: 'n_OovhxLPOg',
      chords: [
        { name: 'Сі', fingers: ['○','●','○','○','○','○'], note: '2-й октава' },
        { name: 'Ля', fingers: ['○','●','●','○','○','○'], note: '2-й октава' },
        { name: 'Соль', fingers: ['○','●','●','●','○','○'], note: '2-й октава' },
      ],
      steps: [
        'Постав амбушюр — губи легко торкаються отвору.',
        'Видихни рівний струмінь — нота Сі.',
        'Пограй Сі 8 разів по 2 секунди.',
        'Перейди на Ля — один палець вниз.',
        'Чергуй Сі → Ля → Сі рівно.',
        'Спробуй просту мелодію: Соль → Ля → Сі → Ля → Соль.',
      ],
    },
  },

  vocal: {
    beginner: {
      title: 'Вокал — Дихальні вправи',
      videoId: 'FmNDWiMQMFs',
      chords: [
        { name: 'До', fingers: ['C4','C5','C6'], note: 'Грудний регістр' },
        { name: 'Соль', fingers: ['G4','G5'], note: 'Змішаний' },
        { name: 'Мі', fingers: ['E4','E5'], note: 'Головний регістр' },
      ],
      steps: [
        'Вдихни животом — грудна клітка нерухома.',
        'Видихай рівно на звук "С-с-с" 10 секунд.',
        'Гамма вгору: До-Ре-Мі-Фа-Соль на "А".',
        'Повтори гаму вниз.',
        'Стаккато на "ХА" — 8 разів, відчуй діафрагму.',
        'Заспівай просту мелодію на "М" з закритим ротом.',
      ],
    },
  },
};

// ── Фрази маскота по фазах ──
const MASCOT_PHRASES = {
  idle: [
    'Вибери тривалість і натисни «Почати» — я буду поруч! 🎸',
    'Готовий? Я вже налаштовую таймер 😄',
    'Перед початком — переконайся що інструмент під рукою!',
  ],
  adapt: [
    'Не поспішай — адаптація це час ознайомитись, а не бігти 🎯',
    'Погляди на акорди, прочитай кроки. Ти готуєшся!',
    'Ця фаза — як розминка перед бігом 🏃',
  ],
  practice: [
    'Ось зараз — найважливіша частина! Зосередься 🔥',
    'Помиляєшся? Це нормально — повтори повільніше.',
    'Практика = прогрес. Кожне повторення рахується! 💪',
    'Спробуй зіграти ще раз — цього разу ще краще!',
  ],
  repeat: [
    'Чудово! Тепер закріпи — зіграй без зупинок 🌟',
    'Це повторення — відчуй наскільки легше стало!',
    'Майже фінал! Ще трішки — і сесія завершена 🎉',
  ],
  done: [
    'Ти справився! Я пишаюся тобою 🎉',
    'Відмінна сесія! Повертайся завтра — я чекаю! 🌱',
    'Ось так і зростають музиканти — крок за кроком! 🎸',
  ],
};

// ── Фази таймера ──
const PHASES = [
  { key: 'adapt',    label: 'АДАПТАЦІЯ',   desc: 'Ознайомся з матеріалом, не поспішай',       ratio: 0.2, color: 'var(--phase-adapt)'    },
  { key: 'practice', label: 'ПРАКТИКА',    desc: 'Зосередься і відпрацьовуй матеріал уроку',  ratio: 0.6, color: 'var(--phase-practice)' },
  { key: 'repeat',   label: 'ПОВТОРЕННЯ',  desc: 'Закріпи — зіграй весь матеріал без зупинок', ratio: 0.2, color: 'var(--phase-repeat)'   },
];

// ── Стан додатку ──
const state = {
  // timer
  totalDuration: 30 * 60,  // секунд
  currentPhase: 0,          // 0-2
  phaseRemaining: 0,        // секунд у поточній фазі
  phaseDuration: 0,         // загальна тривалість фази
  running: false,
  paused: false,
  intervalId: null,
  elapsedTotal: 0,          // секунд від старту
  // session
  sessionStartTime: null,
  // lesson
  lesson: null,
  instrument: 'guitar',
  level: 'beginner',
};

// ── Init ──
window.addEventListener('load', () => {
  const raw = localStorage.getItem('lofi_user');
  const user = raw ? JSON.parse(raw) : { instrument: 'guitar', level: 'beginner' };

  state.instrument = user.instrument || 'guitar';
  state.level      = user.level      || 'beginner';

  // Читаємо параметр ?lesson= з URL
  const urlParams  = new URLSearchParams(window.location.search);
  const lessonId   = urlParams.get('lesson');

  // Знайти урок по ID або за замовчуванням
  if (lessonId) {
    // Парсимо ID типу "g-b-1" або "vo-b-2"
    const parts = lessonId.split('-');
    // Маппінг префіксів інструментів
    const instPrefixMap = {
      'g': 'guitar', 'p': 'piano', 'f': 'flute',
      'v': 'violin', 'vo': 'vocal',
    };
    // Визначаємо інструмент
    let detectedInst = null;
    if (lessonId.startsWith('vo')) detectedInst = 'vocal';
    else if (lessonId.startsWith('g-')) detectedInst = 'guitar';
    else if (lessonId.startsWith('p-')) detectedInst = 'piano';
    else if (lessonId.startsWith('f-')) detectedInst = 'flute';
    else if (lessonId.startsWith('v-')) detectedInst = 'violin';

    if (detectedInst) state.instrument = detectedInst;

    // Визначаємо рівень
    if (lessonId.includes('-b-')) state.level = 'beginner';
    else if (lessonId.includes('-m-')) state.level = 'middle';
    else if (lessonId.includes('-a-')) state.level = 'advanced';
  }

  const instLessons = LESSONS[state.instrument] || LESSONS.guitar;
  state.lesson = instLessons[state.level] || instLessons.beginner || Object.values(instLessons)[0];

  // Маскот
  const isKori = state.instrument === 'flute' || state.instrument === 'vocal';
  const mascotSrc = {
    guitar:  'kael_guide.png',
    piano:   'kori_piano.png',
    drums: 'kael_guide.png',
    violin:  'kael_guide.png',
    flute:   'kori_flute.jpg',
    vocal:   'kori_mic.jpg',
  }[state.instrument] || 'kael_guide.png';
  document.getElementById('mascot-img').src         = mascotSrc;
  document.getElementById('finish-mascot').src      = mascotSrc;
  document.getElementById('mascot-img').onerror     = function(){ this.src = 'kael_guide.png'; };
  document.getElementById('finish-mascot').onerror  = function(){ this.src = 'kael_guide.png'; };

  // Назва уроку в навбарі
  document.getElementById('nav-lesson-name').textContent = state.lesson.title;

  // Оновити підказку акордів залежно від інструменту
  const chordHint = document.getElementById('chord-hint');
  if (chordHint) {
    const hints = {
      guitar:  'X = не грати · 0 = відкрита струна · цифра = лад',
      piano:   'Назва ноти · октава · техніка виконання',
      flute:   'Назва ноти · ● = закритий отвір · ○ = відкритий',
      vocal:   'Назва ноти · октава · тип регістру',
      violin:  'Назва ноти · відкрита струна · позиція',
    };
    chordHint.textContent = hints[state.instrument] || hints.guitar;
  }
  // Оновити підпис на відео
  const vname = document.getElementById('video-lesson-name');
  const vsub  = document.getElementById('video-lesson-sub');
  if (vname) vname.textContent = 'Натисни щоб завантажити відео уроку';
  if (vsub)  vsub.textContent  = 'YouTube · ' + state.lesson.title;

  // Рендер акордів
  renderChords();

  // Рендер кроків
  renderSteps();

  // Нотатки з localStorage
  const savedNotes = localStorage.getItem('lofi_notes_' + state.instrument);
  if (savedNotes) document.getElementById('my-notes').value = savedNotes;

  // Оновити підказку часу
  updatePhaseHint();

  // Ротація фраз маскота
  rotateMascotPhrase('idle');
});

// ── Рендер акордів ──
function renderChords() {
  const container = document.getElementById('chord-row');
  if (!state.lesson || !state.lesson.chords) return;
  container.innerHTML = state.lesson.chords.map(ch => `
    <div class="chord-card">
      <div class="chord-name">${ch.name}</div>
      <div class="chord-diagram">${ch.fingers.join('\n')}</div>
      <div style="font-size:10px;color:var(--text-dim);margin-top:4px;">${ch.note}</div>
    </div>`).join('');
}

// ── Рендер кроків ──
function renderSteps() {
  const container = document.getElementById('tab-steps');
  if (!state.lesson || !state.lesson.steps) return;
  container.innerHTML = state.lesson.steps.map((s, i) => `
    <div class="step-item" id="step-${i}" onclick="toggleStep(${i})">
      <div class="step-check" id="step-check-${i}"></div>
      <div class="step-text">${i + 1}. ${s}</div>
    </div>`).join('');
}

function toggleStep(i) {
  const item  = document.getElementById(`step-${i}`);
  const check = document.getElementById(`step-check-${i}`);
  item.classList.toggle('done');
  check.textContent = item.classList.contains('done') ? '✓' : '';
}

// ── Вкладки ──
function switchTab(tab, btn) {
  ['chords', 'steps', 'mynotes'].forEach(t => {
    const el = document.getElementById('tab-' + t);
    if (t === 'steps') el.classList.toggle('active', t === tab);
    else el.classList.toggle('active', t === tab);
  });
  document.querySelectorAll('.notes-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
}

// ── Відео ──
function loadVideo() {
  const wrap   = document.getElementById('video-wrap');
  const lesson = state.lesson;
  if (!lesson) return;

  const instMap = {
    guitar:  'guitar lesson beginner tutorial',
    piano:   'piano lesson beginner tutorial',
    flute:   'flute lesson beginner tutorial',
    vocal:   'singing vocal lesson beginner',
    violin:  'violin lesson beginner tutorial',
  };
  const q = encodeURIComponent((instMap[state.instrument] || 'music lesson') + ' ' + (lesson.title || ''));
  const searchUrl = `https://www.youtube.com/results?search_query=${q}`;

  wrap.innerHTML = `
    <div class="video-placeholder" style="gap:16px;flex-direction:column;">
      <div style="font-size:48px;">🎬</div>
      <div style="font-size:15px;color:var(--text-main);font-weight:600;text-align:center;padding:0 24px;">
        ${lesson.title}
      </div>
      <div style="font-size:12px;color:var(--text-muted);text-align:center;">
        Відео відкриється на YouTube в новій вкладці
      </div>
      <a href="${searchUrl}" target="_blank"
         style="background:var(--mint);color:var(--bg-deep);font-size:14px;font-weight:700;
                padding:12px 28px;border-radius:12px;text-decoration:none;
                display:inline-flex;align-items:center;gap:8px;margin-top:4px;">
        ▶ Знайти відео на YouTube
      </a>
      <div style="font-size:11px;color:var(--text-dim);">
        Після перегляду поверніться сюди — таймер чекає!
      </div>
    </div>`;
}

function showVideoFallback(lesson) { loadVideo(); }


// ── Вибір тривалості ──
function selectDur(minutes, btn) {
  document.querySelectorAll('.dur-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  state.totalDuration = minutes * 60;
  updatePhaseHint();
}

function updatePhaseHint() {
  const total = state.totalDuration;
  const adapt   = Math.round(total * 0.2 / 60);
  const practice = Math.round(total * 0.6 / 60);
  const repeat  = Math.round(total * 0.2 / 60);
  document.getElementById('phase-time-hint').textContent =
    `${adapt} хв · ${practice} хв · ${repeat} хв`;
  document.getElementById('lbl-adapt').textContent    = `🔵 Адаптація · ${adapt} хв`;
  document.getElementById('lbl-practice').textContent = `🟢 Практика · ${practice} хв`;
  document.getElementById('lbl-repeat').textContent   = `🟣 Повторення · ${repeat} хв`;
}

// ── Таймер: старт ──
function startTimer() {
  state.currentPhase   = 0;
  state.elapsedTotal   = 0;
  state.running        = true;
  state.paused         = false;
  state.sessionStartTime = Date.now();

  // Сховати setup, показати active
  document.getElementById('timer-setup').style.display  = 'none';
  document.getElementById('timer-active').style.display = 'block';

  beginPhase(0);
  state.intervalId = setInterval(tick, 1000);

  // Маскот
  setBubble(randomFrom(MASCOT_PHRASES.adapt));
}

function beginPhase(phaseIdx) {
  state.currentPhase  = phaseIdx;
  const phase = PHASES[phaseIdx];
  state.phaseDuration  = Math.round(state.totalDuration * phase.ratio);
  state.phaseRemaining = state.phaseDuration;

  // UI фаза
  document.getElementById('timer-phase-label').textContent = phase.label;
  document.getElementById('timer-phase-desc').textContent  = phase.desc;
  document.getElementById('timer-display').style.color     = phase.color;
  document.getElementById('timer-progress-bar').style.background = phase.color;
  document.getElementById('nav-phase-dot').style.background = phase.color;
  document.getElementById('nav-phase-name').textContent    = phase.label[0] + phase.label.slice(1).toLowerCase();
  document.getElementById('sess-phase').textContent        = phase.label[0] + phase.label.slice(1).toLowerCase();

  // Dots
  for (let i = 0; i < 3; i++) {
    const el = document.getElementById(`pstep-${i}`);
    el.classList.remove('active', 'done');
    if (i < phaseIdx)  el.classList.add('done');
    if (i === phaseIdx) el.classList.add('active');
  }

  updateTimerDisplay();
  rotateMascotPhrase(phase.key);
}

// ── Tick ──
function tick() {
  if (state.paused) return;

  state.phaseRemaining--;
  state.elapsedTotal++;

  updateTimerDisplay();
  updateProgress();
  updateSessionStats();

  if (state.phaseRemaining <= 0) {
    if (state.currentPhase < PHASES.length - 1) {
      beginPhase(state.currentPhase + 1);
    } else {
      finishSession();
    }
  }
}

function updateTimerDisplay() {
  const m = Math.floor(state.phaseRemaining / 60);
  const s = state.phaseRemaining % 60;
  document.getElementById('timer-display').textContent =
    String(m).padStart(2, '0') + ':' + String(s).padStart(2, '0');
}

function updateProgress() {
  const pct = (state.phaseRemaining / state.phaseDuration) * 100;
  document.getElementById('timer-progress-bar').style.width = pct + '%';
}

function updateSessionStats() {
  const mins = Math.floor(state.elapsedTotal / 60);
  document.getElementById('sess-elapsed').innerHTML =
    mins + '<span class="unit">хв</span>';
}

// ── Пауза ──
function togglePause() {
  state.paused = !state.paused;
  const btn = document.getElementById('ctrl-playpause');
  btn.textContent = state.paused ? '▶ Продовжити' : '⏸ Пауза';
  btn.classList.toggle('primary', !state.paused);
  if (state.paused) {
    setBubble('Пауза. Відпочинь трохи — я почекаю 😊');
  } else {
    setBubble(randomFrom(MASCOT_PHRASES[PHASES[state.currentPhase].key]));
  }
}

// ── Пропустити фазу ──
function skipPhase() {
  if (state.currentPhase < PHASES.length - 1) {
    beginPhase(state.currentPhase + 1);
  } else {
    finishSession();
  }
}

// ── Стоп ──
function stopTimer() {
  const overlay = document.getElementById('exit-warning-overlay');
  if (overlay && state.running) {
    overlay.style.display = 'flex';
    return;
  }
  reallyStop();
}
function reallyStop() {
  clearInterval(state.intervalId);
  state.running = false;
  document.getElementById('timer-active').style.display = 'none';
  document.getElementById('timer-setup').style.display  = 'block';
  document.getElementById('nav-phase-dot').style.background = 'var(--text-dim)';
  document.getElementById('nav-phase-name').textContent = 'Готовий до початку';
  document.getElementById('sess-phase').textContent = '—';
  document.getElementById('sess-elapsed').innerHTML = '0<span class="unit">хв</span>';
  setBubble('Нічого страшного! Повертайся коли будеш готовий 😊');
}

// ── Фініш ──
function finishSession() {
  clearInterval(state.intervalId);
  state.running = false;

  // Дати фіналу
  const mins = Math.round(state.totalDuration / 60);
  document.getElementById('finish-time').textContent   = mins;
  document.getElementById('finish-phases').textContent = PHASES.length;
  document.getElementById('finish-sub').textContent    =
    `Ти практикував ${mins} хвилин! Чудова робота — я пишаюся тобою 🎉`;

  // Зберегти в localStorage
  const raw = localStorage.getItem('lofi_user');
  if (raw) {
    const user = JSON.parse(raw);
    user.totalMinutes     = (user.totalMinutes     || 0) + mins;
    user.lessonsCompleted = (user.lessonsCompleted || 0) + 1;
    user.todayMinutes     = (user.todayMinutes     || 0) + mins;
    const today = new Date().toDateString();
    if (user.lastPracticeDate !== today) {
      user.streak = (user.streak || 0) + 1;
      user.lastPracticeDate = today;
      user.todayMinutes = mins;
    }
    localStorage.setItem('lofi_user', JSON.stringify(user));

    // Оновити heatmap активності
    const activity = JSON.parse(localStorage.getItem('lofi_activity') || '[]');
    while (activity.length < 70) activity.unshift(0);
    // Сьогодні = остання клітинка (індекс 69)
    activity[69] = Math.min((activity[69] || 0) + 1, 4);
    localStorage.setItem('lofi_activity', JSON.stringify(activity));
  }

  // Показати overlay
  document.getElementById('finish-overlay').classList.add('show');
  setBubble(randomFrom(MASCOT_PHRASES.done));

  // Фінальні dots
  for (let i = 0; i < 3; i++) {
    document.getElementById(`pstep-${i}`).classList.remove('active');
    document.getElementById(`pstep-${i}`).classList.add('done');
  }
}

function restartSession() {
  document.getElementById('finish-overlay').classList.remove('show');
  document.getElementById('timer-active').style.display = 'none';
  document.getElementById('timer-setup').style.display  = 'block';
  document.getElementById('nav-phase-dot').style.background = 'var(--text-dim)';
  document.getElementById('nav-phase-name').textContent = 'Готовий до початку';
  document.getElementById('sess-elapsed').innerHTML = '0<span class="unit">хв</span>';
  document.getElementById('sess-phase').textContent = '—';
  for (let i = 0; i < 3; i++) {
    const el = document.getElementById(`pstep-${i}`);
    el.classList.remove('active', 'done');
  }
  setBubble(randomFrom(MASCOT_PHRASES.idle));
}

// ── Маскот ──
let mascotRotateInterval = null;

function rotateMascotPhrase(phaseKey) {
  clearInterval(mascotRotateInterval);
  const phrases = MASCOT_PHRASES[phaseKey] || MASCOT_PHRASES.idle;
  setBubble(randomFrom(phrases));
  mascotRotateInterval = setInterval(() => {
    setBubble(randomFrom(phrases));
  }, 18000); // кожні 18 секунд
}

function setBubble(text) {
  const b = document.getElementById('mascot-bubble');
  b.style.opacity = '0';
  b.style.transition = 'opacity .35s';
  setTimeout(() => { b.innerHTML = text; b.style.opacity = '1'; }, 300);
}

function toggleMascotBubble() {
  const phaseKey = state.running ? PHASES[state.currentPhase].key : 'idle';
  setBubble(randomFrom(MASCOT_PHRASES[phaseKey]));
}

// ── Нотатки ──
function saveNotes() {
  const text = document.getElementById('my-notes').value;
  localStorage.setItem('lofi_notes_' + state.instrument, text);
  // Також зберегти в загальний список нотаток
  if (text.trim()) {
    const allNotes = JSON.parse(localStorage.getItem('lofi_all_notes') || '[]');
    const key = 'practice_' + state.instrument + '_' + Date.now();
    const exists = allNotes.find(n => n.sourceKey === 'lofi_notes_' + state.instrument);
    if (exists) {
      exists.text = text.trim();
      exists.editedAt = new Date().toISOString();
    } else {
      allNotes.unshift({
        id: Date.now() + '',
        lesson: (state.lesson && state.lesson.title) || 'Практика',
        inst: state.instrument,
        text: text.trim(),
        tags: ['практика'],
        date: new Date().toISOString(),
        sourceKey: 'lofi_notes_' + state.instrument,
      });
    }
    localStorage.setItem('lofi_all_notes', JSON.stringify(allNotes));
  }
  // Мінімальна підказка
  const btn = event.target;
  btn.textContent = '✓ Збережено';
  setTimeout(() => { btn.textContent = 'Зберегти'; }, 1500);
}

// ── Утиліта ──
function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}