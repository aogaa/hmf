import { db, auth } from './firebase-config.js';
import {
  collection, getDocs, doc, getDoc, updateDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { quiz1, quiz2, quiz3 } from './content.js';

// ── Auth ──────────────────────────────────────────────────────
export function settOppAuth(onInnlogget, onUtlogget) {
  onAuthStateChanged(auth, user => {
    if (user) onInnlogget(user);
    else onUtlogget();
  });
}

export async function loggInn(epost, passord) {
  await signInWithEmailAndPassword(auth, epost, passord);
}

export async function loggUt() {
  await signOut(auth);
}

// ── Data-henting ──────────────────────────────────────────────
export async function hentAllData() {
  const deltakerSnap = await getDocs(collection(db, 'participants'));
  const deltakere = [];

  for (const d of deltakerSnap.docs) {
    const deltaker = { id: d.id, ...d.data(), svar: {} };

    for (const nr of [1, 2, 3]) {
      const svarSnap = await getDoc(doc(db, 'answers', d.id, `quiz${nr}`, 'response'));
      if (svarSnap.exists()) {
        deltaker.svar[`quiz${nr}`] = svarSnap.data().answers;
      }
    }
    deltakere.push(deltaker);
  }

  return deltakere;
}

// ── Fuzzy-matching (Fuse.js) ──────────────────────────────────
function normaliser(s) {
  return (s || '').toLowerCase().trim()
    .replace(/[æ]/g, 'ae').replace(/[ø]/g, 'o').replace(/[å]/g, 'a')
    .replace(/[^a-z0-9]/g, '');
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = a[i-1] === b[j-1]
        ? dp[i-1][j-1]
        : 1 + Math.min(dp[i-1][j], dp[i][j-1], dp[i-1][j-1]);
  return dp[m][n];
}

export function vurderSvar(svar, fasit) {
  const s = normaliser(svar);
  const f = normaliser(fasit);
  if (!s) return 'tom';
  if (s === f) return 'riktig';
  const maxLen = Math.max(s.length, f.length);
  const dist = levenshtein(s, f);
  const likhet = 1 - dist / maxLen;
  if (likhet >= 0.80) return 'riktig';
  if (likhet >= 0.55) return 'nær';
  return 'feil';
}

const fasitMap = {
  quiz1: Object.fromEntries(quiz1.map(q => [`q${q.id}`, q.fasit])),
  quiz2: Object.fromEntries(quiz2.map(q => [`q${q.id}`, q.fasit])),
  quiz3: Object.fromEntries(quiz3.map(q => [`q${q.id}`, q.fasit])),
};

export function vurderAlleSvar(deltaker) {
  const resultat = {};
  for (const [quizKey, svarObj] of Object.entries(deltaker.svar || {})) {
    resultat[quizKey] = {};
    const fasit = fasitMap[quizKey] || {};
    for (const [spørKey, svar] of Object.entries(svarObj)) {
      resultat[quizKey][spørKey] = {
        svar,
        fasit: fasit[spørKey] || '',
        status: vurderSvar(svar, fasit[spørKey] || ''),
      };
    }
  }
  return resultat;
}

// ── Statistikk ────────────────────────────────────────────────
export function beregnStats(deltakere) {
  const total = deltakere.length;
  const besvartQ1 = deltakere.filter(d => d.svar?.quiz1).length;
  const besvartQ2 = deltakere.filter(d => d.svar?.quiz2).length;
  const besvartQ3 = deltakere.filter(d => d.svar?.quiz3).length;
  return { total, besvartQ1, besvartQ2, besvartQ3 };
}

// ── Loddtrekning ──────────────────────────────────────────────
// Teller antall riktige svar for én deltaker basert på vurderingen.
export function tellRiktige(vurdering) {
  let antall = 0;
  for (const quiz of Object.values(vurdering || {})) {
    for (const felt of Object.values(quiz)) {
      if (felt.status === 'riktig') antall++;
    }
  }
  return antall;
}

// Trekker vinner vektet etter antall RIKTIGE svar (ett lodd per riktig svar).
// vurderinger: { [participantId]: vurderAlleSvar(deltaker) }
export function trekkVinner(deltakere, vurderinger) {
  const loddkurv = [];
  deltakere.forEach(d => {
    const riktige = tellRiktige(vurderinger?.[d.id]);
    for (let i = 0; i < riktige; i++) loddkurv.push(d);
  });
  if (loddkurv.length === 0) return null;
  return loddkurv[Math.floor(Math.random() * loddkurv.length)];
}

// ── CSV-eksport ───────────────────────────────────────────────
export function eksporterCSV(deltakere) {
  const rader = [['ID', 'Navn', 'E-post', 'Tidspunkt', 'Quiz1', 'Quiz2', 'Quiz3']];
  deltakere.forEach(d => {
    rader.push([
      d.id,
      d.name,
      d.email,
      d.timestamp?.toDate?.().toISOString() || '',
      d.svar?.quiz1 ? JSON.stringify(d.svar.quiz1) : '',
      d.svar?.quiz2 ? JSON.stringify(d.svar.quiz2) : '',
      d.svar?.quiz3 ? JSON.stringify(d.svar.quiz3) : '',
    ]);
  });

  const csv = rader.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(',')).join('\n');
  const blob = new Blob(['﻿' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hmf-quiz-svar-${new Date().toISOString().slice(0,10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
