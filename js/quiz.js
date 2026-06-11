import { db } from './firebase-config.js';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getParticipantId, krevRegistrering } from './auth.js';

export async function harBesvartQuiz(participantId, quizNr) {
  const snap = await getDoc(doc(db, 'answers', participantId, `quiz${quizNr}`, 'response'));
  return snap.exists();
}

export async function sendInnSvar(quizNr, svar) {
  const participantId = krevRegistrering();
  if (!participantId) return;

  const alleredeSendt = await harBesvartQuiz(participantId, quizNr);
  if (alleredeSendt) return { duplikat: true };

  await setDoc(doc(db, 'answers', participantId, `quiz${quizNr}`, 'response'), {
    answers: svar,
    timestamp: serverTimestamp(),
  });

  await updateDoc(doc(db, 'participants', participantId), {
    quizBesvart: arrayUnion(`quiz${quizNr}`),
  });

  return { ok: true };
}

export async function sjekkOgVisStatus(quizNr, skjemaEl, bekreftelsesEl) {
  const participantId = getParticipantId();
  if (!participantId) return;

  const besvart = await harBesvartQuiz(participantId, quizNr);
  if (besvart) {
    skjemaEl.style.display = 'none';
    bekreftelsesEl.classList.add('vis');
  }
}
