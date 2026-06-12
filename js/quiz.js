import { db } from './firebase-config.js';
import { doc, setDoc, getDoc, updateDoc, arrayUnion, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getParticipantId, krevRegistrering, hentDeltaker } from './auth.js';
import { quizMeta } from './content.js';

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
    await visNesteQuizValg(quizNr);
  }
}

// Fyller ut #neste-valg med lenker til quizene som ennå ikke er besvart.
export async function visNesteQuizValg(gjeldendeNr) {
  const container = document.getElementById('neste-valg');
  if (!container) return;

  const id = getParticipantId();
  const deltaker = id ? await hentDeltaker(id) : null;
  const ferdige = new Set(deltaker?.quizBesvart || []);
  ferdige.add(`quiz${gjeldendeNr}`); // den vi nettopp svarte på

  const gjenstaaende = quizMeta.filter(q => !ferdige.has(`quiz${q.nr}`));

  if (gjenstaaende.length === 0) {
    container.innerHTML = `
      <p style="font-family:'Playfair Display',serif;font-size:1.2rem;color:var(--brun);">
        Du har fullført alle tre quizene! 🎉
      </p>
      <p>Lykke til i trekningen av premier.</p>
      <a href="index.html#premier" class="btn btn-sekundær" style="margin-top:.5rem;">Se premiene →</a>`;
  } else {
    const lenker = gjenstaaende.map(q =>
      `<a href="${q.fil}" class="btn btn-sekundær" style="margin:.35rem;display:inline-block;">
         Quiz ${q.nr}: ${q.tittel} →
       </a>`).join('');
    container.innerHTML = `
      <p style="font-weight:700;color:var(--mørk);margin-bottom:.5rem;">Velg neste quiz:</p>
      ${lenker}`;
  }
}
