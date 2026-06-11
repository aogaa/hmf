# Holmestrand Museum Quiz-nettside

## Prosjektbeskrivelse
Quiz-nettside for Holmestrand Museum og Botne Historielag. Arrangementet er 13. juni 2026 — deltakerne scanner QR-kode og svarer på tre quizer på sin mobiltelefon. Svar lagres i Firebase Firestore.

Publiseres på GitHub Pages under `quiz.holmestrandmuseum.no`.

## Stack
- **Vanilla HTML/CSS/JS** — ingen build-steg, ingen rammeverk
- **Firebase JS SDK v9+ (CDN)** — Firestore + Authentication
- **Fuse.js (CDN)** — fuzzy matching for svar-vurdering i admin
- **Google Fonts** — Playfair Display (serif) + Lato (sans)

## Filstruktur
```
/
├── index.html          Forside: header, premier, registrering, quiz-kort
├── quiz1.html          Quiz 1: Hva er gjenstanden? (8 svarfelt)
├── quiz2.html          Quiz 2: Ordenes betydning (9 ord + svarfelt)
├── quiz3.html          Quiz 3: Historiske spørsmål (5 spørsmål + svarfelt)
├── admin.html          Admin-panel: Firebase Auth, svaroversikt, trekning
├── css/
│   └── style.css       All CSS — historisk/nostalgisk design
├── js/
│   ├── firebase-config.js   Firebase-konfig (fylles inn av bruker)
│   ├── content.js           Quiz-innhold og fasit (fylles inn av bruker)
│   ├── auth.js              Registrering og session-håndtering
│   ├── quiz.js              Generisk quiz-logikk (brukes av alle quiz-sider)
│   └── admin.js             Admin-panel logikk
├── images/                  Historiske bilder og logoer
└── CNAME                    quiz.holmestrandmuseum.no
```

## Design-konvensjoner
- Palett: `#f5efe0` (beige), `#8b5e3c` (brun), `#2c1a0e` (mørk), `#d4a853` (gull-aksent)
- Fonter: `'Playfair Display', serif` for overskrifter, `'Lato', sans-serif` for brødtekst
- Quiz-kort: historisk bilde som bakgrunn + mørk overlay (rgba 0,0,0,0.55) + hvit tekst
- Mobil-first, `max-width: 680px` for skjemaer og quiz-sider
- Ingen eksterne CSS-rammeverk

## Firebase Firestore-struktur
```
/participants/{participantId}
  name, email, consent, timestamp

/answers/{participantId}/quiz1/response
  answers: { q1..q8 }, timestamp

/answers/{participantId}/quiz2/response
  answers: { q1..q9 }, timestamp

/answers/{participantId}/quiz3/response
  answers: { q1..q5 }, timestamp
```

## Viktige filer å redigere
- `js/firebase-config.js` — lim inn Firebase-konfig herfra: Firebase Console → Project Settings → Your apps
- `js/content.js` — fyll inn quizinnhold og fasit før arrangementet

## Bilder tilgjengelig i /images/
- `HMFLogo.png`, `BotneLogo.png` — logoer i header
- `6.jpg` — quiz 1-kort (kobberstikk, Holmestrand)
- `8.jpg` — quiz 2-kort (viktoriansk scene ved fjorden)
- `17.jpg` — quiz 3-kort (fugleperspektiv havn)
- `2.png`, `3.png` — hero/banner (luftfoto + flaggfest)
- Øvrige bilder: `12.jpg`, `14.jpg`, `19.jpg` — dekor

## Session-logikk
- Deltaker registrerer seg på forsiden → Firestore lager dokument → ID lagres i `localStorage` som `hmf_participant_id`
- Quiz-sidene sjekker `localStorage` — redirect til index.html hvis ikke registrert
- Kan bare sende inn én gang per quiz (sjekkes mot Firestore-dokument)
- Antall besvarte quizer telles for loddtrekning (1–3 lodd per deltaker)
