/* Custom Songs — sivun tekstit kolmella kielellä.
 *
 * ENGLANTI on Juntsan omaa tekstiä, sanasta sanaan sivulta 18.11.2026.
 * SUOMI on Clauden luonnos — lue se läpi ja korjaa suoraan tähän tiedostoon.
 * ESPANJA on tyhjä: tyhjä arvo putoaa englantiin, joten sivu toimii
 * keskeneräisenäkin. Espanja avataan kun Sunolla tehdyt näytteet ovat.
 *
 * Yksi avain, kolme kieltä allekkain — niin käännös ja alkuperäinen näkyvät
 * samalla silmäyksellä eikä eroa tarvitse etsiä kahdesta tiedostosta.
 *
 * HUOM hinnasta ja lupauksesta: `lupaus.hinta` ja `lupaus.ehto` ovat
 * lupauksia asiakkaalle. Käännöksen pitää sanoa sama asia, ei vähempää
 * eikä enempää — kysyminen ja tarjous ovat ilmaisia, ja hinta näkyy ennen
 * maksua. Jos muutat toista kieltä, muuta kaikkia.
 */
(function (juuri) {
  "use strict";

  var T = {

    /* ── kehys ───────────────────────────────────────────────── */
    takaisin:        { en: "← Back to the lobby",
                       fi: "← Takaisin aulaan",
                       es: "" },
    takaisinAria:    { en: "Back to the lobby",
                       fi: "Takaisin aulaan",
                       es: "" },
    otsikko:         { en: "Custom Songs",
                       fi: "Tilauslaulut",
                       es: "" },
    iskulause:       { en: "Your story. Your song.",
                       fi: "Sinun tarinasi. Sinun laulusi.",
                       es: "" },
    kieliValinta:    { en: "Language",
                       fi: "Kieli",
                       es: "" },

    /* ── lupaus ja hinta ─────────────────────────────────────── */
    lupausJohto:     { en: "Tell me which moment matters. You get a quote for a song of your own — with no commitment.",
                       fi: "Kerro mikä hetki on tärkeä. Saat tarjouksen omasta laulusta — ilman sitoutumista.",
                       es: "" },
    lupausHinta:     { en: "Personal songs",
                       fi: "Henkilökohtaiset laulut",
                       es: "" },
    lupausEhto:      { en: "Asking and quoting are free. You see the final price and what the work includes before you pay anything.",
                       fi: "Kysyminen ja tarjous ovat ilmaisia. Näet lopullisen hinnan ja mitä työ sisältää ennen kuin maksat mitään.",
                       es: "" },

    /* ── näytteet ────────────────────────────────────────────── */
    naytteetOtsikko: { en: "Listen to examples",
                       fi: "Kuuntele näytteitä",
                       es: "" },
    naytteetJohto:   { en: "A short excerpt of each. These are finished songs, and they show the kind of work a commission produces.",
                       fi: "Kustakin lyhyt katkelma. Nämä ovat valmiita lauluja, ja ne kertovat millaista jälkeä tilaus tuottaa.",
                       es: "" },
    kuunteleKatkelma:{ en: "Listen to an excerpt: ",
                       fi: "Kuuntele katkelma: ",
                       es: "" },
    sulje:           { en: "Close video",
                       fi: "Sulje video",
                       es: "" },
    videovirhe:      { en: "The video could not be loaded. The other samples still work.",
                       fi: "Videota ei saatu ladattua. Muut näytteet toimivat silti.",
                       es: "" },

    /* ── miten se menee ──────────────────────────────────────── */
    mitenOtsikko:    { en: "How it works",
                       fi: "Näin se menee",
                       es: "" },
    miten1Otsikko:   { en: "You tell me what you want.",
                       fi: "Kerrot mitä haluat.",
                       es: "" },
    miten1:          { en: "A short form: the occasion, the story, the style and the schedule. A few minutes is enough.",
                       fi: "Lyhyt lomake: tilaisuus, tarina, tyyli ja aikataulu. Muutama minuutti riittää.",
                       es: "" },
    miten2Otsikko:   { en: "You get a fixed quote.",
                       fi: "Saat kiinteän tarjouksen.",
                       es: "" },
    miten2:          { en: "It states the price, the delivery date, which files you get and how many rounds of revisions are included.",
                       fi: "Siinä lukee hinta, toimituspäivä, mitkä tiedostot saat ja montako korjauskierrosta sisältyy.",
                       es: "" },
    miten3Otsikko:   { en: "You accept and pay.",
                       fi: "Hyväksyt ja maksat.",
                       es: "" },
    miten3:          { en: "Not before this point. If the quote does not suit you, that is where it ends.",
                       fi: "Et aiemmin. Jos tarjous ei sovi, siihen se jää.",
                       es: "" },
    miten4Otsikko:   { en: "You get the song.",
                       fi: "Saat laulun.",
                       es: "" },
    miten4:          { en: "A download link and a QR code that opens its own listening page. The QR code is part of the basic delivery and is not charged separately.",
                       fi: "Latauslinkin ja QR-koodin, joka avaa laululle oman kuuntelusivun. QR-koodi kuuluu perustoimitukseen eikä maksa erikseen.",
                       es: "" },

    /* ── lomake ──────────────────────────────────────────────── */
    lomakeOtsikko:   { en: "Tell me what you want",
                       fi: "Kerro mitä haluat",
                       es: "" },
    lomakeJohto:     { en: "A few questions first. We work out the details together afterwards.",
                       fi: "Ensin muutama kysymys. Yksityiskohdat sovitaan yhdessä sen jälkeen.",
                       es: "" },

    kysymys1:        { en: "What is the occasion?",
                       fi: "Mikä on tilaisuus?",
                       es: "" },
    kysymys2:        { en: "What should the song say?",
                       fi: "Mitä laulun pitäisi sanoa?",
                       es: "" },
    kysymys2Ohje:    { en: "Who the song is for, which memories or words should go into it, the funny details. This is the most important part of the song — the more you tell me, the more personal it becomes.",
                       fi: "Kenelle laulu tulee, mitkä muistot tai sanat siihen kuuluvat, hassut yksityiskohdat. Tämä on laulun tärkein kohta — mitä enemmän kerrot, sitä henkilökohtaisemmaksi siitä tulee.",
                       es: "" },
    tarinaAria:      { en: "The story of the song",
                       fi: "Laulun tarina",
                       es: "" },
    tarinaVihje:     { en: "For example: Aino is turning 50 and has tended her garden her whole life. She is known for talking to her plants...",
                       fi: "Esimerkiksi: Aino täyttää 50 ja on hoitanut puutarhaansa koko ikänsä. Hänet tunnetaan siitä, että hän puhuu kasveilleen...",
                       es: "" },
    kysymys3:        { en: "What kind of musical style?",
                       fi: "Millainen musiikkityyli?",
                       es: "" },
    kysymys3Ohje:    { en: "Pick one or several. If you are not sure, pick ”you choose”.",
                       fi: "Valitse yksi tai useampi. Jos et ole varma, valitse ”valitse puolestani”.",
                       es: "" },
    kysymys4:        { en: "Which language, and who sings?",
                       fi: "Mikä kieli, ja kuka laulaa?",
                       es: "" },
    kysymys4Ohje:    { en: "A bilingual song works too — we then agree which parts are in which language.",
                       fi: "Kaksikielinen laulu onnistuu myös — sovitaan silloin mitkä osat ovat millä kielellä.",
                       es: "" },
    aani:            { en: "Singing voice",
                       fi: "Lauluääni",
                       es: "" },
    kysymys5:        { en: "When do you need it?",
                       fi: "Milloin tarvitset sen?",
                       es: "" },
    paiva:           { en: "Preferred delivery date",
                       fi: "Toivottu toimituspäivä",
                       es: "" },
    kiire:           { en: "Urgent — say in the quote whether it is possible and what it costs",
                       fi: "Kiire — kerro tarjouksessa onnistuuko se ja mitä se maksaa",
                       es: "" },
    yhteys:          { en: "Your contact details",
                       fi: "Yhteystietosi",
                       es: "" },
    nimi:            { en: "Name",
                       fi: "Nimi",
                       es: "" },
    sposti:          { en: "Email",
                       fi: "Sähköposti",
                       es: "" },
    lupa:            { en: "My request may be processed in order to prepare a quote. The information is not used for anything else and is not passed on to anyone.",
                       fi: "Pyyntöni saa käsitellä tarjouksen tekemistä varten. Tietoja ei käytetä mihinkään muuhun eikä luovuteta kenellekään.",
                       es: "" },
    laheta:          { en: "Request a free quote",
                       fi: "Pyydä ilmainen tarjous",
                       es: "" },
    kopioi:          { en: "Copy the text",
                       fi: "Kopioi teksti",
                       es: "" },
    /* <b>-korostus on osa tekstiä: "ei vielä tilaus" on se kohta, jonka
       asiakkaan pitää huomata. Pidä se jokaisessa kielessä. */
    eiSitoumusta:    { en: "Sending your request <b>is not an order yet</b> and does not commit you to anything. The button opens your own email program with the message ready — you see it before sending and can still edit it. Nothing is stored on this site.",
                       fi: "Pyynnön lähettäminen <b>ei ole vielä tilaus</b> eikä sido sinua mihinkään. Nappi avaa oman sähköpostiohjelmasi viesti valmiina — näet sen ennen lähettämistä ja voit vielä muokata sitä. Tälle sivustolle ei tallennu mitään.",
                       es: "" },
    /* Tämä on lupaus siitä, mitä työ on ja mitä se ei ole. Älä tiivistä:
       tekoälyn mainitseminen ja se, ettei kenenkään ääntä tai kappaletta
       kopioida, ovat kohtia joiden pitää sanoa sama joka kielellä. */
    alaviite:        { en: "The songs are made as original works: original lyrics, original arrangement and modern music tools, AI among them. We do not copy a known artist’s voice or a known track; we make the requested style as our own work. Commercial use, advertising and wider distribution are always agreed separately.",
                       fi: "Laulut tehdään omina teoksina: omat sanat, oma sovitus ja nykyaikaiset musiikkityökalut, tekoäly niiden joukossa. Emme kopioi tunnetun artistin ääntä emmekä tunnettua kappaletta, vaan teemme pyydetyn tyylin omana työnämme. Kaupallisesta käytöstä, mainonnasta ja laajemmasta levityksestä sovitaan aina erikseen.",
                       es: "" },

    /* ── virheet ja ilmoitukset ──────────────────────────────── */
    virheTarina:     { en: "Tell me in a few more sentences what the song should be about — without that I cannot make a quote.",
                       fi: "Kerro vielä parilla lauseella mistä laulun pitäisi kertoa — ilman sitä en voi tehdä tarjousta.",
                       es: "" },
    virheYhteys:     { en: "I need your name and a working email address so that I can reply.",
                       fi: "Tarvitsen nimesi ja toimivan sähköpostiosoitteen, jotta voin vastata.",
                       es: "" },
    virheLupa:       { en: "Tick the permission box so I can process your request.",
                       fi: "Rastita lupakohta, jotta saan käsitellä pyyntösi.",
                       es: "" },
    avataanPosti:    { en: "Opening your email program. The message is ready — read it and press send. I usually reply within a couple of days.",
                       fi: "Avataan sähköpostiohjelmasi. Viesti on valmis — lue se ja paina lähetä. Vastaan yleensä parin päivän sisällä.",
                       es: "" },
    liianPitka:      { en: "Your story is too long to fit straight into an email link. I copied it to the clipboard — paste it into a message to {posti}.",
                       fi: "Tarinasi on liian pitkä mahtuakseen suoraan sähköpostilinkkiin. Kopioin sen leikepöydälle — liitä se viestiin osoitteeseen {posti}.",
                       es: "" },
    leikepoydalla:   { en: "The text is on the clipboard. Paste it into an email, a message or wherever you like — the address is {posti}.",
                       fi: "Teksti on leikepöydällä. Liitä se sähköpostiin, viestiin tai minne haluat — osoite on {posti}.",
                       es: "" },
    kopiointiEiOnnistu:{ en: "Copying did not work in this browser. Select the text by hand or send a message to {posti}.",
                       fi: "Kopiointi ei onnistunut tässä selaimessa. Valitse teksti käsin tai lähetä viesti osoitteeseen {posti}.",
                       es: "" },
    naytevirhe:      { en: "”{nimi}” would not play. The audio file could not be loaded — the other samples still work.",
                       fi: "”{nimi}” ei lähtenyt soimaan. Äänitiedostoa ei saatu ladattua — muut näytteet toimivat silti.",
                       es: "" },

    /* ── sähköpostin kentät ──────────────────────────────────── */
    postiOtsikko:    { en: "Quote request — KJWhispers Custom Songs",
                       fi: "Tarjouspyyntö — KJWhispers Tilauslaulut",
                       es: "" },
    postiTilaisuus:  { en: "Occasion: ",
                       fi: "Tilaisuus: ",
                       es: "" },
    postiTyyli:      { en: "Style: ",
                       fi: "Tyyli: ",
                       es: "" },
    postiKieli:      { en: "Language: ",
                       fi: "Kieli: ",
                       es: "" },
    postiAani:       { en: "Singing voice: ",
                       fi: "Lauluääni: ",
                       es: "" },
    postiPaiva:      { en: "Preferred delivery date: ",
                       fi: "Toivottu toimituspäivä: ",
                       es: "" },
    postiPyynto:     { en: "Quote request: ",
                       fi: "Tarjouspyyntö: ",
                       es: "" },
    postiTarina:     { en: "Story:",
                       fi: "Tarina:",
                       es: "" },
    postiOmaLaulu:   { en: "a song of my own",
                       fi: "oma laulu",
                       es: "" },
    eiValittu:       { en: "(not selected)",
                       fi: "(ei valittu)",
                       es: "" },
    sinaValitset:    { en: "(you choose)",
                       fi: "(valitse puolestani)",
                       es: "" },
    eiKiire:         { en: "(no hurry)",
                       fi: "(ei kiirettä)",
                       es: "" },
    kiireMerkinta:   { en: "— URGENT",
                       fi: "— KIIRE",
                       es: "" },

    /* ── sirut: tilaisuus ────────────────────────────────────── */
    sTilaisuus: [
      { en: "Birthday",           fi: "Syntymäpäivä",        es: "" },
      { en: "Wedding",            fi: "Häät",                es: "" },
      { en: "Anniversary",        fi: "Vuosipäivä",          es: "" },
      { en: "For a friend",       fi: "Ystävälle",           es: "" },
      { en: "Thank you",          fi: "Kiitokseksi",         es: "" },
      { en: "In memory",          fi: "Muistoksi",           es: "" },
      { en: "A pet",              fi: "Lemmikille",          es: "" },
      { en: "For a child",        fi: "Lapselle",            es: "" },
      { en: "Business or event",  fi: "Yritys tai tapahtuma",es: "" },
      { en: "Something else",     fi: "Jokin muu",           es: "" }
    ],

    /* ── sirut: tyyli ────────────────────────────────────────── */
    sTyyli: [
      { en: "Pop",                fi: "Pop",                 es: "" },
      { en: "Ballad",             fi: "Balladi",             es: "" },
      { en: "Country",            fi: "Country",             es: "" },
      { en: "Rock",               fi: "Rock",                es: "" },
      { en: "Jazz / soul",        fi: "Jazz / soul",         es: "" },
      { en: "House",              fi: "House",               es: "" },
      { en: "Techno",             fi: "Techno",              es: "" },
      { en: "Latin",              fi: "Latin",               es: "" },
      { en: "Highland / northern",fi: "Highland / pohjoinen",es: "" },
      { en: "K-pop",              fi: "K-pop",               es: "" },
      { en: "C-pop",              fi: "C-pop",               es: "" },
      { en: "J-pop",              fi: "J-pop",               es: "" },
      { en: "Children’s song",    fi: "Lastenlaulu",         es: "" },
      { en: "You choose",         fi: "Valitse puolestani",  es: "" }
    ],

    /* ── sirut: laulun kieli ─────────────────────────────────── */
    sKieli: [
      { en: "Finnish",            fi: "Suomi",               es: "" },
      { en: "English",            fi: "Englanti",            es: "" },
      { en: "Swedish",            fi: "Ruotsi",              es: "" },
      { en: "Spanish",            fi: "Espanja",             es: "" },
      { en: "Mandarin Chinese",   fi: "Mandariinikiina",     es: "" },
      { en: "Cantonese",          fi: "Kantoninkiina",       es: "" },
      { en: "Japanese",           fi: "Japani",              es: "" },
      { en: "Korean",             fi: "Korea",               es: "" },
      { en: "Another language",   fi: "Jokin muu kieli",     es: "" }
    ],

    /* ── lauluäänen valikko ──────────────────────────────────── */
    sAani: [
      { en: "You choose",         fi: "Valitse puolestani",  es: "" },
      { en: "Female solo",        fi: "Naissolisti",         es: "" },
      { en: "Male solo",          fi: "Miessolisti",         es: "" },
      { en: "Duet",               fi: "Duetto",              es: "" },
      { en: "Girls’ group",       fi: "Tyttöryhmä",          es: "" },
      { en: "Boys’ group",        fi: "Poikaryhmä",          es: "" },
      { en: "Mixed group",        fi: "Sekaryhmä",           es: "" }
    ],

    /* ── näytekorttien kielimerkinnät ────────────────────────── */
    nKieli: {
      fi: { en: "Finnish",  fi: "Suomi",    es: "" },
      en: { en: "English",  fi: "Englanti", es: "" },
      sv: { en: "Swedish",  fi: "Ruotsi",   es: "" },
      es: { en: "Spanish",  fi: "Espanja",  es: "" }
    }
  };

  /* Tyhjä käännös putoaa englantiin. Niin espanja voi olla kesken eikä sivu
     näytä aukkoja — eikä puuttuva käännös myöskään jää huomaamatta, koska
     se näkyy väärällä kielellä eikä tyhjänä. */
  function valitse(kohta, kieli) {
    if (!kohta) return "";
    return kohta[kieli] || kohta.en || "";
  }

  juuri.MRTekstit = { T: T, valitse: valitse, KIELET: ["fi", "en", "es"] };
})(window);
