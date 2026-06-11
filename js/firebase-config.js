// =============================================================
// FIREBASE-KONFIGURASJON
// Gå til: Firebase Console → Ditt prosjekt → Project Settings → Your apps
// Kopier firebaseConfig-objektet og lim inn her.
// =============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "DIN_API_KEY",
  authDomain: "DITT_PROSJEKT.firebaseapp.com",
  projectId: "DITT_PROSJEKT_ID",
  storageBucket: "DITT_PROSJEKT.appspot.com",
  messagingSenderId: "DIN_SENDER_ID",
  appId: "DIN_APP_ID",
};

let app, db, auth;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  auth = getAuth(app);
} catch (e) {
  console.error('Firebase ikke konfigurert ennå. Fyll inn firebase-config.js.', e);
}
export { db, auth };
