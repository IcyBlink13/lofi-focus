// ═══════════════════════════════════════════════
//  lo.fi·focus — firebase.js
//  Конфігурація Firebase + всі функції роботи з БД
// ═══════════════════════════════════════════════

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  updateEmail,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";

// ── Конфіг ──
const firebaseConfig = {
  apiKey:            "AIzaSyC-jDfdJ_lrdWM3zvUJcEluTBtGVEa038c",
  authDomain:        "lofi-focus-ef01c.firebaseapp.com",
  projectId:         "lofi-focus-ef01c",
  storageBucket:     "lofi-focus-ef01c.firebasestorage.app",
  messagingSenderId: "143044854908",
  appId:             "1:143044854908:web:d81555c48688a6179875f9",
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

// ═══════════════════════════════════════════════
//  AUTH FUNCTIONS
// ═══════════════════════════════════════════════

// ── Реєстрація ──
export async function registerUser({ name, email, password, instrument, level }) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  const uid  = cred.user.uid;

  // Зберегти профіль у Firestore
  await setDoc(doc(db, "users", uid), {
    name,
    email,
    instrument,
    level,
    streak:           0,
    totalMinutes:     0,
    lessonsCompleted: 0,
    lastPracticeDate: null,
    todayMinutes:     0,
    weekActivity:     [0, 0, 0, 0, 0, 0, 0],
    dailyGoal:        20,
    joinedAt:         serverTimestamp(),
    completedLessons: [],
  });

  // Зберегти у localStorage як кеш
  _cacheUser({ uid, name, email, instrument, level,
    streak:0, totalMinutes:0, lessonsCompleted:0,
    todayMinutes:0, weekActivity:[0,0,0,0,0,0,0],
    dailyGoal:20, completedLessons:[] });

  return uid;
}

// ── Вхід ──
export async function loginUser(email, password) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const user = await loadUserProfile(cred.user.uid);
  _cacheUser(user);
  return user;
}

// ── Вихід ──
export async function logoutUser() {
  await signOut(auth);
  localStorage.removeItem("lofi_user");
  localStorage.removeItem("lofi_tour_done");
  window.location.href = "index.html";
}

// ── Слухач авторизації ──
// Викликає callback(user) коли стан змінюється
export function onAuthReady(callback) {
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      // Спробувати взяти з кешу
      const cached = _getCachedUser();
      if (cached && cached.uid === firebaseUser.uid) {
        callback(cached);
      } else {
        const user = await loadUserProfile(firebaseUser.uid);
        _cacheUser(user);
        callback(user);
      }
    } else {
      callback(null);
    }
  });
}

// ── Зміна пароля ──
export async function changeUserPassword(oldPassword, newPassword) {
  const user       = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, oldPassword);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPassword);
}

// ── Зміна email ──
export async function changeUserEmail(oldPassword, newEmail) {
  const user       = auth.currentUser;
  const credential = EmailAuthProvider.credential(user.email, oldPassword);
  await reauthenticateWithCredential(user, credential);
  await updateEmail(user, newEmail);
  await updateDoc(doc(db, "users", user.uid), { email: newEmail });
  const cached = _getCachedUser();
  if (cached) { cached.email = newEmail; _cacheUser(cached); }
}

// ═══════════════════════════════════════════════
//  USER PROFILE FUNCTIONS
// ═══════════════════════════════════════════════

// ── Завантажити профіль ──
export async function loadUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) throw new Error("User profile not found");
  return { uid, ...snap.data() };
}

// ── Оновити профіль ──
export async function updateUserProfile(fields) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");
  await updateDoc(doc(db, "users", uid), fields);
  // Оновити кеш
  const cached = _getCachedUser() || {};
  _cacheUser({ ...cached, ...fields });
}

// ── Зберегти результат сесії ──
export async function saveSessionResult(minutes) {
  const uid  = auth.currentUser?.uid;
  if (!uid) return;

  const snap = await getDoc(doc(db, "users", uid));
  const data = snap.data();

  const today    = new Date().toDateString();
  const isNewDay = data.lastPracticeDate !== today;

  // Оновити тижневу активність
  const weekDay      = new Date().getDay();
  const dayIdx       = weekDay === 0 ? 6 : weekDay - 1;
  const weekActivity = data.weekActivity || [0,0,0,0,0,0,0];
  weekActivity[dayIdx] = (weekActivity[dayIdx] || 0) + minutes;

  const updates = {
    totalMinutes:     (data.totalMinutes     || 0) + minutes,
    lessonsCompleted: (data.lessonsCompleted || 0) + 1,
    todayMinutes:     isNewDay ? minutes : (data.todayMinutes || 0) + minutes,
    weekActivity,
    lastPracticeDate: today,
    streak: isNewDay ? (data.streak || 0) + 1 : (data.streak || 0),
  };

  await updateDoc(doc(db, "users", uid), updates);

  // Зберегти сесію в підколекцію
  await addDoc(collection(db, "users", uid, "sessions"), {
    minutes,
    date: serverTimestamp(),
  });

  // Оновити кеш
  const cached = _getCachedUser() || {};
  _cacheUser({ ...cached, ...updates });
}

// ═══════════════════════════════════════════════
//  NOTES FUNCTIONS
// ═══════════════════════════════════════════════

// ── Завантажити нотатки ──
export async function loadNotes() {
  const uid = auth.currentUser?.uid;
  if (!uid) return [];
  const q    = query(collection(db, "users", uid, "notes"), orderBy("createdAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

// ── Зберегти нотатку ──
export async function saveNote({ lesson, inst, text, tags }) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");
  const ref = await addDoc(collection(db, "users", uid, "notes"), {
    lesson, inst, text, tags,
    createdAt: serverTimestamp(),
  });
  return ref.id;
}

// ── Оновити нотатку ──
export async function updateNote(noteId, text) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");
  await updateDoc(doc(db, "users", uid, "notes", noteId), {
    text,
    editedAt: serverTimestamp(),
  });
}

// ── Видалити нотатку ──
export async function deleteNote(noteId) {
  const uid = auth.currentUser?.uid;
  if (!uid) throw new Error("Not authenticated");
  await deleteDoc(doc(db, "users", uid, "notes", noteId));
}

// ═══════════════════════════════════════════════
//  SETTINGS FUNCTIONS
// ═══════════════════════════════════════════════

export async function saveSettings(fields) {
  return updateUserProfile(fields);
}

// ═══════════════════════════════════════════════
//  CACHE HELPERS (localStorage як кеш)
// ═══════════════════════════════════════════════

function _cacheUser(user) {
  localStorage.setItem("lofi_user", JSON.stringify(user));
}
function _getCachedUser() {
  const raw = localStorage.getItem("lofi_user");
  return raw ? JSON.parse(raw) : null;
}

// ── Експорт для зручності ──
export { auth, db };