// =============================================================
// FYLL INN INNHOLD HER FØR ARRANGEMENTET
// =============================================================

// Felles metadata for alle quizene (brukes til "velg neste quiz")
export const quizMeta = [
  { nr: 1, fil: "quiz1.html", tittel: "Hva er gjenstanden?" },
  { nr: 2, fil: "quiz2.html", tittel: "Ordenes betydning" },
  { nr: 3, fil: "quiz3.html", tittel: "Historiske spørsmål" },
];

// Quiz 1 — Gamle gjenstander (flervalg a/b/c)
// Deltakerne ser på den nummererte gjenstanden på bordet og velger riktig alternativ.
export const quiz1 = [
  { id: 1, spørsmål: "Er dette:", alternativer: { a: "heklenål", b: "hakkepinne", c: "hjelper til å træ knappestøvler" }, fasit: "c" },
  { id: 2, spørsmål: "Er dette:", alternativer: { a: "bordpynt", b: "eske til å romme en sardinboks", c: "smørskål" }, fasit: "b" },
  { id: 3, spørsmål: "Hva er dette?", alternativer: { a: "etui", b: "til å væte frimerker", c: "stempelpute" }, fasit: "c" },
  { id: 4, spørsmål: "Er dette?", alternativer: { a: "lodd til et ur", b: "granat", c: "pynt" }, fasit: "a" },
  { id: 5, spørsmål: "Hva er dette?", alternativer: { a: "redskap for et trykkeri", b: "redskap for baking", c: "redskap for å lage struktur i maling" }, fasit: "c" },
  { id: 6, spørsmål: "Er dette?", alternativer: { a: "sett for karding av ull", b: "sett for strigling av hest", c: "sett for å ta imot garnnøster" }, fasit: "a" },
  { id: 7, spørsmål: "Er dette?", alternativer: { a: "horn for oppbevaring av gotteri til å ha med i krigen", b: "krutthorn", c: "et utgått bukkehorn" }, fasit: "b" },
  { id: 8, spørsmål: "Hva er dette?", alternativer: { a: "en sekstant for navigering til sjøs", b: "en passer", c: "et instrument til å måle solhøyden" }, fasit: "a" },
];

// Quiz 2 — Ordenes betydning (9 ord)
export const quiz2 = [
  { id: 1, ord: "Børstebinder", fasit: "En som laget og reparerte børster, koster og pensler" },
  { id: 2, ord: "Amtmann", fasit: "Øverste myndighet i et fylke – i dag heter det statsforvalter" },
  { id: 3, ord: "Førselsbonde", fasit: "Bonde som var pliktig til å kjøre på oppdrag for andre" },
  { id: 4, ord: "Grindvokter", fasit: "Person som hadde som jobb å åpne og lukke en grind, for eksempel ved jernbanekryssninger" },
  { id: 5, ord: "Lokomotivpusser", fasit: "Person som hadde som yrke å rense og etterse lokomotiver" },
  { id: 6, ord: "Vognkusk", fasit: "Person som førte hestevogner" },
  { id: 7, ord: "Lasskjører", fasit: "Person som fraktet et lass med slede og vogn" },
  { id: 8, ord: "Brolegger", fasit: "Person som la brostein på gater og torg" },
  { id: 9, ord: "Bøkker", fasit: "Tønnemaker" },
];

// Quiz 3 — Historiske spørsmål (6 spørsmål)
export const quiz3 = [
  { id: 1, spørsmål: "Når fikk Holmestrand bystatus?", fasit: "1752" },
  { id: 2, spørsmål: "Hvilken stor bedrift gikk opp i flammer under bybrannen i 1884?", fasit: "Saga" },
  { id: 3, spørsmål: "Hvilken forfatter var bosatt i Holmestrand og har 150 års jubileum i år?", fasit: "Olav Duun" },
  { id: 4, spørsmål: "Hva var Nordisk sitt første administrasjonsbygg?", fasit: "Tårngården, kjøpt i 1921" },
  { id: 5, spørsmål: "Hva heter den verdensberømte komponisten som har en statue foran biblioteket?", fasit: "Agathe Ursula Backer Grøndahl" },
  { id: 6, spørsmål: "Hva er navnet på den planlagte nye videregående skolen i Holmestrand?", fasit: "Harriet Backer VGS" },
];

// Premier som vises på forsiden (trekkes tilfeldig — ingen rangering)
export const premier = [
  { tittel: "Kaffekrus med Holmestrand byvåpen", beskrivelse: "", bilde: "images/p2.png" },
  { tittel: "Handlenett med byvåpen", beskrivelse: "", bilde: "images/p1.png" },
  { tittel: "Gratis inngang på Holmestrand Museum", beskrivelse: "", bilde: "images/4.jpg" },
  { tittel: "Et års medlemskap i Botne Historielag", beskrivelse: "", bilde: "images/6.jpg" },
  { tittel: "Et års medlemskap i Holmestrand Museumsforening", beskrivelse: "", bilde: "images/11.jpg" },
  { tittel: "Boken «Holmestrand 250 år»", beskrivelse: "", bilde: "images/p4.png" },
  { tittel: "Årets Botnar", beskrivelse: "", bilde: "images/p3.png" },
  { tittel: "Jubileumstallerken «Holmestrand 250 år»", beskrivelse: "", bilde: "images/16.jpg" },
];
