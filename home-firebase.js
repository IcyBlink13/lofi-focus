// ── Firebase auth guard для home.html ──
// Цей файл підключається ПЕРЕД home.js

import { onAuthReady, logoutUser, saveSessionResult } from './firebase.js';

// Перевірка авторизації — якщо не залогінений, редирект
onAuthReady((user) => {
  if (!user) {
    window.location.href = 'index.html';
    return;
  }
  // Оновити localStorage з актуальними даними з Firebase
  localStorage.setItem('lofi_user', JSON.stringify(user));
});

// Перевизначити logout щоб використовував Firebase
window.logout = function() {
  logoutUser();
};