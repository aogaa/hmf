// =============================================================
// FIREBASE-KONFIGURASJON
// Gå til: Firebase Console → Ditt prosjekt → Project Settings → Your apps
// Kopier firebaseConfig-objektet og lim inn her.
// =============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAWMCTWr4q6Ubbc-BrcUNDoDkA_71a7dLY",
  authDomain: "hmf13-8ffd7.firebaseapp.com",
  projectId: "hmf13-8ffd7",
  storageBucket: "hmf13-8ffd7.firebasestorage.app",
  messagingSenderId: "483744142256",
  appId: "1:483744142256:web:07fa3b2b985d1e79b87c75",
  measurementId: "G-C4C4MXFXF5",
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
