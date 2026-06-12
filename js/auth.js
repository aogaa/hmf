import { db } from './firebase-config.js';
import { collection, addDoc, doc, getDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const STORAGE_KEY = 'hmf_participant_id';

export function getParticipantId() {
  return localStorage.getItem(STORAGE_KEY);
}

export function setParticipantId(id) {
  localStorage.setItem(STORAGE_KEY, id);
}

export function fjernParticipantId() {
  localStorage.removeItem(STORAGE_KEY);
}

export async function registrerDeltaker(navn, epost, samtykke) {
  const docRef = await addDoc(collection(db, 'participants'), {
    name: navn.trim(),
    email: epost.trim().toLowerCase(),
    consent: samtykke,
    timestamp: serverTimestamp(),
    quizBesvart: [],
  });
  setParticipantId(docRef.id);
  return docRef.id;
}

export async function hentDeltaker(id) {
  const snap = await getDoc(doc(db, 'participants', id));
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
}

export function krevRegistrering() {
  const id = getParticipantId();
  if (!id) {
    window.location.href = 'index.html';
    return null;
  }
  return id;
}
