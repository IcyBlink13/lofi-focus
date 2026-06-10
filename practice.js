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
      videoId: 'ZHfZJGugzT4',
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
  drums: {
    beginner: {
      title: 'Барабани — Основний ритм 4/4',
      videoId: 'SBVr6y1HzS8',
      chords: [
        { name: 'Kick', fingers: ['●','○','○','○'], note: 'Бас-барабан (нога)' },
        { name: 'Snare', fingers: ['○','●','○','●'], note: 'Малий барабан' },
        { name: 'Hi-hat', fingers: ['●','●','●','●'], note: 'Хай-хет (рука)' },
      ],
      steps: [
        'Постав ноги на педалі. Права — бас-барабан, ліва — хай-хет.',
        'Відпрацюй удар по бас-барабану: 1 і 3 долі.',
        'Додай малий барабан: 2 і 4 долі.',
        'Правою рукою грай хай-хет на кожну долю.',
        'Зєднай всі три разом — базовий рок-ритм.',
        'Зіграй 2 хвилини без зупинки рівно.',
      ],
    },
    middle: {
      title: 'Барабани — Синкопований ритм',
      videoId: 'SBVr6y1HzS8',
      chords: [
        { name: 'Kick', fingers: ['●','○','●','○','●'], note: 'Подвійний удар' },
        { name: 'Snare', fingers: ['○','●','○','●','○'], note: 'З акцентом' },
        { name: 'Ride', fingers: ['●','●','●','●','●'], note: 'Райд замість хай-хету' },
      ],
      steps: [
        'Розігрів — базовий ритм 4/4 на 60 BPM.',
        'Додай синкопу: удар між 2 і 3 долею.',
        'Відпрацюй подвійний удар ногою.',
        'Замін хай-хет на райд.',
        'Зіграй весь ритм на 80 BPM.',
        'Додай простий філ на 4-й долі.',
      ],
    },
    advanced: {
      title: 'Барабани — Джазові ритми',
      videoId: 'SBVr6y1HzS8',
      chords: [
        { name: 'Swing', fingers: ['●','○','●','●','○'], note: 'Свінг-патерн' },
        { name: 'Brush', fingers: ['~','~','~','~'], note: 'Щітки по малому' },
        { name: 'Ride', fingers: ['●','○','●','○'], note: 'Джаз на райді' },
      ],
      steps: [
        'Свінг на райді: тріолі з акцентом на 1 і 3.',
        'Ліва нога — хай-хет на 2 і 4.',
        'Права нога — спонтанні удари по бас-барабану.',
        'Мала рука — компінг по малому барабану.',
        'Зєднай всі чотири кінцівки разом.',
        'Зіграй 4-тактовий джазовий фрагмент.',
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

// ── YouTube API ──
const YT_API_KEY = 'AIzaSyB6JR1QuxO9OlvyF337a6GXPzJitTVcrOk';

async function findYouTubeVideo(lessonTitle, instrument) {
  // Build search query
  const langQuery = 'урок'; // Ukrainian
  const instMap = {
    guitar:  'beginner guitar lesson tutorial',
    piano:   'beginner piano lesson tutorial',
    drums:   'beginner drums lesson tutorial',
    flute:   'beginner flute lesson tutorial',
    vocal:   'beginner singing vocal lesson',
    violin:  'beginner violin lesson tutorial',
  };
  // Simple English query works best for YouTube search
  const query = instMap[instrument] || 'music lesson beginner';

  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&videoEmbeddable=true&videoSyndicated=true&maxResults=5&relevanceLanguage=uk&key=${YT_API_KEY}`
    );
    const data = await res.json();
    if (data.error) {
      console.log('YouTube API error:', data.error.message);
      return null;
    }
    if (data.items && data.items.length > 0) {
      // Повертаємо перший результат
      return data.items[0].id.videoId;
    }
  } catch(e) {
    console.log('YouTube API error:', e);
  }
  return null;
}

// ── Init ──
window.addEventListener('load', () => {
  const raw = localStorage.getItem('lofi_user');
  const user = raw ? JSON.parse(raw) : { instrument: 'guitar', level: 'beginner' };

  state.instrument = user.instrument || 'guitar';
  state.level      = user.level      || 'beginner';

  // Знайти урок
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
async function loadVideo() {
  const wrap = document.getElementById('video-wrap');
  const lesson = state.lesson;
  if (!lesson) return;

  // Показати лоадер
  wrap.innerHTML = `
    <div class="video-placeholder">
      <div style="font-size:32px;">🎬</div>
      <div style="color:var(--text-muted);font-size:13px;">Шукаємо відео...</div>
    </div>`;

  // Знайти відео через YouTube API
  let videoId = lesson.videoId || null;
  if (!videoId) {
    videoId = await findYouTubeVideo(lesson.title, state.instrument);
  }

  const searchUrl = 'https://www.youtube.com/results?search_query=' +
    encodeURIComponent((lesson.title || '') + ' lesson tutorial');

  if (videoId) {
    lesson.videoId = videoId;
    // Показуємо iframe + кнопку відкрити на YouTube
    wrap.innerHTML = `
      <div style="position:relative;width:100%;height:100%;">
        <iframe
          id="lesson-iframe"
          src="https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1"
          allow="encrypted-media; picture-in-picture"
          allowfullscreen
          style="width:100%;height:calc(100% - 40px);border:none;display:block;"></iframe>
        <div style="height:40px;background:var(--bg-card2);display:flex;align-items:center;justify-content:center;gap:12px;">
          <span style="font-size:12px;color:var(--text-dim);">Відео не грає?</span>
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank"
             style="font-size:12px;color:var(--mint);text-decoration:none;padding:4px 12px;border:1px solid rgba(94,231,191,0.3);border-radius:6px;">
            ▶ Відкрити на YouTube
          </a>
        </div>
      </div>`;
  } else {
    // Якщо API не знайшов — одразу показуємо кнопку пошуку
    wrap.innerHTML = `
      <div class="video-placeholder" style="gap:14px;flex-direction:column;">
        <div style="font-size:40px;">🎬</div>
        <div style="font-size:14px;color:var(--text-main);font-weight:500;text-align:center;padding:0 16px;">${lesson.title}</div>
        <a href="${searchUrl}" target="_blank"
           style="background:var(--mint);color:var(--bg-deep);font-size:13px;font-weight:600;padding:10px 24px;border-radius:10px;text-decoration:none;">
          🔍 Знайти відео на YouTube
        </a>
      </div>`;
  }
}

function showVideoFallback(lesson) {
  const wrap = document.getElementById('video-wrap');
  const query = encodeURIComponent((lesson.title || '') + ' урок');
  const ytSearch = `https://www.youtube.com/results?search_query=${query}`;

  wrap.innerHTML = `
    <div class="video-placeholder" style="gap:16px;flex-direction:column;">
      <div style="font-size:40px;">🎬</div>
      <div style="font-size:15px;color:var(--text-main);font-weight:500;text-align:center;padding:0 20px;">${lesson.title || 'Урок'}</div>
      <div style="font-size:12px;color:var(--text-muted);text-align:center;">Відео відкриється на YouTube в новій вкладці</div>
      <a href="${ytSearch}"
         target="_blank"
         style="background:var(--mint);color:var(--bg-deep);font-size:14px;font-weight:600;padding:11px 28px;border-radius:10px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;margin-top:4px;">
        ▶ Знайти відео на YouTube
      </a>
    </div>`;
}

function openYouTube() {
  if (!state.lesson) return;
  const wrap = document.getElementById('video-wrap');
  wrap.innerHTML = `
    <div class="video-placeholder" style="gap:16px;">
      <div style="font-size:36px;">🎬</div>
      <div style="font-size:14px;color:var(--text-main);font-weight:500;">\${state.lesson.title}</div>
      <div style="font-size:12px;color:var(--text-muted);">Відео відкриється на YouTube</div>
      <a href="https://www.youtube.com/embed/\${state.lesson.videoId}?autoplay=1" 
         target="_blank"
         style="background:var(--mint);color:var(--bg-deep);font-size:13px;font-weight:600;padding:10px 24px;border-radius:10px;text-decoration:none;display:inline-flex;align-items:center;gap:8px;">
        ▶ Відкрити відео
      </a>
    </div>`;
}

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
  if (!confirm('Зупинити сесію?')) return;
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
    const today = new Date().toDateString();
    if (user.lastPracticeDate !== today) {
      user.streak = (user.streak || 0) + 1;
      user.lastPracticeDate = today;
    }
    localStorage.setItem('lofi_user', JSON.stringify(user));
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