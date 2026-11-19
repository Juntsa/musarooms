/* Kortti- ja vihkosuunnittelija — sivun tekstit kolmella kielellä.
 *
 * SUOMI on alkuperäinen: Juntsan toimeksiannon mukaan rakennettu sivu,
 * sanasta sanaan 19.11.2026. Se on tämän tiedoston totuus.
 * ENGLANTI on Clauden käännös — lue se läpi ja korjaa suoraan tähän.
 * ESPANJA on tyhjä: tyhjä arvo putoaa englantiin, joten sivu toimii
 * keskeneräisenäkin. Espanja avataan samalla kun Tilaushuoneen espanja.
 *
 * Huomaa suunta: Tilaushuoneen tekstit.js:ssä alkuperäinen on englanti ja
 * suomi on käännös. Täällä on toisin päin. Älä kopioi kääntämissuuntaa
 * tiedostosta toiseen.
 *
 * Yksi avain, kolme kieltä allekkain — niin käännös ja alkuperäinen näkyvät
 * samalla silmäyksellä eikä eroa tarvitse etsiä kahdesta tiedostosta.
 *
 * ──────────────────────────────────────────────────────────────────────
 * AVAIN EI OLE NÄKYVÄ TEKSTI.
 *
 * Valintalistoissa (lTilaisuus, lTekniikka, …) jokaisella rivillä on
 * `avain`, ja juuri se menee `<option value>`-attribuuttiin ja sieltä
 * kehotteen sanakirjaan index.html:ssä. Näkyvä teksti saa vaihtua kielen
 * mukana, avain ei saa vaihtua koskaan.
 *
 * Jos muutat avainta täällä, muuta sama avain index.html:n vastaavaan
 * sanakirjaan. Muuten haku ei osu, kehotteeseen tulee sana "undefined",
 * eikä mikään kerro siitä — paitsi sivun oma tarkistus, joka nostaa
 * punaisen varoituksen kehotteen alle. Se tarkistus on olemassa juuri
 * tämän virheen takia.
 * ──────────────────────────────────────────────────────────────────────
 */
(function (juuri) {
  "use strict";

  var T = {

    /* ── kehys ───────────────────────────────────────────────── */
    takaisin:        { fi: "← Takaisin Tilaushuoneeseen",
                       en: "← Back to Custom Songs",
                       es: "" },
    otsikko:         { fi: "Kortti- ja vihkosuunnittelija",
                       en: "Card and booklet designer",
                       es: "" },
    johdanto:        { fi: "Valitse kuvan ilme ja kopioi valmis kuvakehote ChatGPT:hen maksutonta kokeilua varten.",
                       en: "Choose how the picture should look, then copy the finished image prompt into ChatGPT for a free trial run.",
                       es: "" },
    kieliValinta:    { fi: "Kieli",
                       en: "Language",
                       es: "" },

    /* ── osio 1: valinnat ────────────────────────────────────── */
    osio1:           { fi: "1. Valitse kuvan ilme",
                       en: "1. Choose how the picture should look",
                       es: "" },
    mTilaisuus:      { fi: "Tilaisuus",
                       en: "Occasion",
                       es: "" },
    mKoko:           { fi: "Koko ja kuvasuhde",
                       en: "Size and aspect ratio",
                       es: "" },
    kokoHuom:        { fi: "Valinta määrittää kuvakehotteen muodon; ChatGPT:n tuottaman kuvan tarkka pikselikoko tarkistetaan vasta viimeistelyssä.",
                       en: "Your choice sets the shape asked for in the prompt; the exact pixel size of what ChatGPT produces is checked only at the finishing stage.",
                       es: "" },
    mTuote:          { fi: "Tuote",
                       en: "Product",
                       es: "" },
    mTekniikka:      { fi: "Kuvitustekniikka",
                       en: "Illustration technique",
                       es: "" },
    mAihe:           { fi: "Mitä kuvassa tapahtuu?",
                       en: "What happens in the picture?",
                       es: "" },
    phAihe:          { fi: "Esim. kesäinen järvenrantaterassi, kaksi kristallilasia ja luonnonkukkakimppu",
                       en: "E.g. a summer lakeside terrace, two crystal glasses and a bunch of wild flowers",
                       es: "" },
    vihjeAihe:       { fi: "Kerro konkreettisesti myös harrastuksesta, lemmikistä tai juhlan erityisestä yksityiskohdasta.",
                       en: "Be concrete about a hobby, a pet or some particular detail of the occasion.",
                       es: "" },
    lisaasetukset:   { fi: "Lisäasetukset",
                       en: "More settings",
                       es: "" },
    mYmparisto:      { fi: "Ympäristö",
                       en: "Setting",
                       es: "" },
    mSommittelu:     { fi: "Sommittelu ja tekstin paikka",
                       en: "Composition and where the text goes",
                       es: "" },
    mValo:           { fi: "Valaistus ja tunnelma",
                       en: "Lighting and mood",
                       es: "" },
    mPaletti:        { fi: "Väripaletti",
                       en: "Colour palette",
                       es: "" },
    mTekstuuri:      { fi: "Materiaali ja tekstuuri",
                       en: "Material and texture",
                       es: "" },
    mTarkkuus:       { fi: "Terävyys ja optiikka",
                       en: "Sharpness and optics",
                       es: "" },

    /* ── teksti kokeilukuvaan ────────────────────────────────── */
    tekstiKytkin:    { fi: "Lisää teksti kokeilukuvaan",
                       en: "Add text to the trial picture",
                       es: "" },
    tekstiHuom:      { fi: "Oletuksena kuvaluonnokseen varataan tilaa tekstille. Lopullinen teksti taitetaan erikseen PDF:ään.",
                       en: "By default the draft leaves room for the text. The final wording is typeset separately into the PDF.",
                       es: "" },
    mRivi1:          { fi: "Teksti · rivi 1",
                       en: "Text · line 1",
                       es: "" },
    mRivi2:          { fi: "Teksti · rivi 2 (valinnainen)",
                       en: "Text · line 2 (optional)",
                       es: "" },
    /* Esimerkin pitää mahtua omaan 15 merkin rajaansa: "Congratulations!"
       on 16 merkkiä, joten se olisi esimerkki jota ei voi kirjoittaa. */
    phRivi1:         { fi: "Esim. Onnea!",
                       en: "E.g. Congrats!",
                       es: "" },
    phRivi2:         { fi: "Esim. 50 vuotta",
                       en: "E.g. 50 years",
                       es: "" },
    mKirjasin:       { fi: "Kirjasintyyli",
                       en: "Lettering style",
                       es: "" },
    mSijainti:       { fi: "Tekstin sijainti",
                       en: "Text position",
                       es: "" },
    merkkiHuom:      { fi: "Enintään 15 merkkiä rivillä, välilyönnit mukaan lukien. Täsmällinen fontti ja virheetön teksti varmistetaan vasta maksullisen PDF:n taitossa.",
                       en: "At most 15 characters per line, spaces included. The exact typeface and flawless wording are settled only when the paid PDF is typeset.",
                       es: "" },

    /* ── osio 2: kehote ──────────────────────────────────────── */
    osio2:           { fi: "2. Valmis kuvakehote",
                       en: "2. The finished image prompt",
                       es: "" },
    kehoteHuom:      { fi: "Kehote päivittyy valintojesi mukaan. Kuvan tarkka pikselikoko voi poiketa kehotteessa pyydetystä.",
                       en: "The prompt updates as you choose. The picture's exact pixel size may differ from what the prompt asks for.",
                       es: "" },
    kehoteAria:      { fi: "Kuvakehote",
                       en: "Image prompt",
                       es: "" },
    kehoteRikki:     { fi: "Kehotteessa on puuttuva kohta. Älä lähetä sitä vielä — ilmoita tästä.",
                       en: "Something is missing from the prompt. Don't send it yet — please report this.",
                       es: "" },
    napKopioiAvaa:   { fi: "Kopioi kehote ja avaa ChatGPT",
                       en: "Copy the prompt and open ChatGPT",
                       es: "" },
    napKopioi:       { fi: "Kopioi kehote",
                       en: "Copy the prompt",
                       es: "" },
    liitaOhje:       { fi: "Liitä kopioitu kehote itse ChatGPT:n viestikenttään ja lähetä se siellä.",
                       en: "Paste the copied prompt into ChatGPT's message box yourself and send it there.",
                       es: "" },
    avaaChat:        { fi: "Avaa ChatGPT uuteen välilehteen",
                       en: "Open ChatGPT in a new tab",
                       es: "" },
    chatRajat:       { fi: "ChatGPT:n käyttörajat voivat vaikuttaa kokeiluun.",
                       en: "ChatGPT's own usage limits may affect the trial.",
                       es: "" },

    /* ── osio 3: korjaus ─────────────────────────────────────── */
    osio3:           { fi: "3. Yksi korjauskehotteen luonnos",
                       en: "3. One draft revision prompt",
                       es: "" },
    korjausJohto:    { fi: "Kun olet nähnyt luonnoksen ChatGPT:ssä, voit kirjoittaa tähän yhden muutostoiveen. Liitä korjaus samaan ChatGPT-keskusteluun.",
                       en: "Once you have seen the draft in ChatGPT, you can write one change here. Paste the revision into the same ChatGPT conversation.",
                       es: "" },
    mKorjaus:        { fi: "Mitä muuttaisit?",
                       en: "What would you change?",
                       es: "" },
    phKorjaus:       { fi: "Esim. Vaihda tausta salviansävyiseksi ja siirrä kukkakimppu alemmaksi.",
                       en: "E.g. Change the background to a sage tone and move the bouquet lower.",
                       es: "" },
    napLuoKorjaus:   { fi: "Luo korjauskehote",
                       en: "Create the revision prompt",
                       es: "" },
    napKopioiKorjaus:{ fi: "Kopioi korjauskehote",
                       en: "Copy the revision prompt",
                       es: "" },
    korjausAria:     { fi: "Korjauskehote",
                       en: "Revision prompt",
                       es: "" },
    korjausRaja:     { fi: "Voit luoda tässä lomakkeessa yhden korjauskehotteen sivun avaamista kohti. ChatGPT:n käyttörajat ovat erilliset.",
                       en: "This form creates one revision prompt per page visit. ChatGPT's own usage limits are separate.",
                       es: "" },

    /* ── osio 4 ja alatunniste ───────────────────────────────── */
    osio4:           { fi: "4. Maksullinen lopputuote",
                       en: "4. The paid final product",
                       es: "" },
    lopputuote:      { fi: "Tämä on ilmainen suunnitteluluonnos. Viimeistelty kortti tai vihkonen toimitetaan maksullisena PDF-tuotteena. Vahvistat ja sovit mahdollisen painotilauksen suoraan painotalon kanssa.",
                       en: "This is a free design draft. The finished card or booklet is delivered as a paid PDF. Any print order you confirm and arrange directly with the printing house.",
                       es: "" },
    alatunniste:     { fi: "Valinnat pysyvät tällä sivulla. Kokeilu ei luo kuvaa tässä palvelussa, käytä maksullista API:a tai kysy ChatGPT-tunnuksia. Kirjoita kehotteeseen vain tietoja, jotka haluat itse jakaa ChatGPT:ssä.",
                       en: "Your choices stay on this page. The trial creates no picture in this service, uses no paid API and asks for no ChatGPT credentials. Write into the prompt only what you are willing to share in ChatGPT yourself.",
                       es: "" },

    /* ── tilaviestit ─────────────────────────────────────────── */
    sKopioitu:       { fi: "Kehote kopioitu.",
                       en: "Prompt copied.",
                       es: "" },
    sKopioEstyi:     { fi: "Kopiointi estyi. Valitse kehote ja kopioi se käsin.",
                       en: "Copying was blocked. Select the prompt and copy it by hand.",
                       es: "" },
    sAvattiin:       { fi: "ChatGPT avattiin uuteen välilehteen.",
                       en: "ChatGPT opened in a new tab.",
                       es: "" },
    sAvausEstyi:     { fi: "Selain esti uuden välilehden. Käytä alla olevaa ChatGPT-linkkiä.",
                       en: "The browser blocked the new tab. Use the ChatGPT link below.",
                       es: "" },
    sKirjoitaEnsin:  { fi: "Kirjoita ensin korjaustoive.",
                       en: "Write the change you want first.",
                       es: "" },
    sKorjausLuotu:   { fi: "Korjauskehote luotu. Kopioi se samaan ChatGPT-keskusteluun.",
                       en: "Revision prompt created. Copy it into the same ChatGPT conversation.",
                       es: "" },
    sKorjausKopioitu:{ fi: "Korjauskehote kopioitu.",
                       en: "Revision prompt copied.",
                       es: "" },

    /* ── painoaineiston rivi ─────────────────────────────────────
       {w} ja {h} EIVÄT ole käännettävää tekstiä: ne korvataan luvuilla
       ajon aikana. Pidä ne sellaisenaan joka kielessä. Nimet olivat ensin
       {leveys} ja {korkeus}, mutta englanninkielisessä lauseessa ne
       näyttivät kääntämättä jääneiltä sanoilta — lyhyt ja kieletön merkki
       on selvästi paikkamerkki eikä unohdus. */
    painoRivi:       { fi: "Painoaineiston tavoite 300 ppi:n tarkkuudella, 3 mm:n leikkuuvaralla: {w} × {h} px.",
                       en: "Target print file at 300 ppi with 3 mm bleed: {w} × {h} px.",
                       es: "" },

    /* ══ valintalistat ═══════════════════════════════════════════
       `avain` menee option-arvoksi ja kehotteen sanakirjaan.
       Näkyvä teksti vaihtuu kielen mukana, avain ei koskaan. */

    lTilaisuus: [
      { avain: "birthday",    fi: "Syntymäpäivä",      en: "Birthday",            es: "" },
      { avain: "wedding",     fi: "Häät",              en: "Wedding",             es: "" },
      { avain: "thanks",      fi: "Kiitos",            en: "Thank you",           es: "" },
      { avain: "graduation",  fi: "Valmistujaiset",    en: "Graduation",          es: "" },
      { avain: "newborn",     fi: "Vauvan syntymä",    en: "A new baby",          es: "" },
      { avain: "friendship",  fi: "Ystävänpäivä",      en: "Friendship day",      es: "" },
      { avain: "remembrance", fi: "Muistaminen",       en: "Remembrance",         es: "" },
      { avain: "christmas",   fi: "Joulu",             en: "Christmas",           es: "" },
      { avain: "own",         fi: "Oma juhla",         en: "An occasion of your own", es: "" }
    ],

    lTuote: [
      { avain: "card",        fi: "Kortti",            en: "Card",                es: "" },
      { avain: "booklet",     fi: "Vihkonen",          en: "Booklet",             es: "" }
    ],

    lMuoto: [
      { avain: "a6",          fi: "A6 pysty",          en: "A6 portrait",         es: "" },
      { avain: "a5",          fi: "A5 pysty",          en: "A5 portrait",         es: "" },
      { avain: "square",      fi: "Neliö",             en: "Square",              es: "" },
      { avain: "a6wide",      fi: "A6 vaaka",          en: "A6 landscape",        es: "" },
      { avain: "spread",      fi: "A5-aukeama",        en: "A5 spread",           es: "" }
    ],

    lTekniikka: [
      { avain: "watercolor",  fi: "Käsinmaalattu vesiväri",          en: "Hand-painted watercolour",      es: "" },
      { avain: "gouache",     fi: "Guassikuvitus",                   en: "Gouache illustration",          es: "" },
      { avain: "paper",       fi: "Kerrostettu paperileikkaus",      en: "Layered paper cut",             es: "" },
      { avain: "storybook",   fi: "Lämmin satukirjakuvitus",         en: "Warm storybook illustration",   es: "" },
      { avain: "editorial",   fi: "Tyylikäs tunnelmavalokuva",       en: "Elegant lifestyle photograph",  es: "" },
      { avain: "letterpress", fi: "Kohopainoa jäljittelevä grafiikka", en: "Letterpress-style graphic",   es: "" }
    ],

    lYmparisto: [
      { avain: "lakeside",    fi: "Suomalainen järvimaisema",  en: "A Finnish lakeside",        es: "" },
      { avain: "garden",      fi: "Puutarha",                  en: "A garden",                  es: "" },
      { avain: "forest",      fi: "Pohjoismainen metsä",       en: "A Nordic forest",           es: "" },
      { avain: "studio",      fi: "Rauhallinen paperitausta",  en: "A calm paper background",   es: "" },
      { avain: "city",        fi: "Kaupungin kahvila",         en: "A city café",               es: "" },
      { avain: "tuscany",     fi: "Toscanan maisema",          en: "A Tuscan landscape",        es: "" }
    ],

    lSommittelu: [
      { avain: "top",         fi: "Tyhjää tilaa ylhäällä",     en: "Open space at the top",     es: "" },
      { avain: "center",      fi: "Tyhjää tilaa keskellä",     en: "Open space in the middle",  es: "" },
      { avain: "bottom",      fi: "Tyhjää tilaa alhaalla",     en: "Open space at the bottom",  es: "" },
      { avain: "left",        fi: "Tyhjää tilaa vasemmalla",   en: "Open space on the left",    es: "" },
      { avain: "full",        fi: "Koko sivun kuvitus, ei tekstialuetta", en: "Full-page artwork, no text area", es: "" }
    ],

    lValo: [
      { avain: "golden",      fi: "Lämmin ilta-aurinko",       en: "Warm evening sun",          es: "" },
      { avain: "soft",        fi: "Pehmeä luonnonvalo",        en: "Soft daylight",             es: "" },
      { avain: "morning",     fi: "Raikas pohjoinen aamu",     en: "Fresh Nordic morning",      es: "" },
      { avain: "candle",      fi: "Kynttilänvalo",             en: "Candlelight",               es: "" },
      { avain: "moody",       fi: "Hillitty elokuvallinen valo", en: "Restrained cinematic light", es: "" }
    ],

    lPaletti: [
      { avain: "ivory_sage",  fi: "Kermanvalkoinen · salvia · puuteriroosa · kulta", en: "Ivory · sage · blush · gold",        es: "" },
      { avain: "amber_green", fi: "Meripihka · metsänvihreä · kermanvalkoinen",      en: "Amber · forest green · ivory",       es: "" },
      { avain: "blue_silver", fi: "Yönsininen · hopea · hento vaaleansininen",       en: "Midnight blue · silver · pale blue", es: "" },
      { avain: "rose_gold",   fi: "Puuteriroosa · samppanja · kulta",                en: "Blush · champagne · gold",           es: "" },
      { avain: "berry",       fi: "Mansikanpunainen · valkoinen · lehtivihreä",      en: "Strawberry red · white · leaf green", es: "" },
      { avain: "earth",       fi: "Terrakotta · beige · oliivinvihreä",              en: "Terracotta · beige · olive",         es: "" }
    ],

    lTekstuuri: [
      { avain: "paper",       fi: "Puuvillainen akvarellipaperi",            en: "Cotton watercolour paper",      es: "" },
      { avain: "linen",       fi: "Pellavatekstuuri",                        en: "Linen texture",                 es: "" },
      { avain: "smooth",      fi: "Sileä mattapinta",                        en: "Smooth matte surface",          es: "" },
      { avain: "foil",        fi: "Hillitty kultafolion näköinen yksityiskohta", en: "A restrained gold-foil look", es: "" },
      { avain: "grain",       fi: "Hieno 35 mm filmirae",                    en: "Fine 35 mm film grain",         es: "" }
    ],

    lTarkkuus: [
      { avain: "auto",        fi: "Automaattinen tekniikan mukaan",   en: "Automatic, by technique",        es: "" },
      { avain: "crisp",       fi: "Terävä koko kuvassa",              en: "Sharp throughout",               es: "" },
      { avain: "depth",       fi: "50 mm, pehmeä taustan epäterävyys", en: "50 mm, soft background blur",   es: "" }
    ],

    lKirjasin: [
      { avain: "elegant",     fi: "Elegantti antiikva",  en: "Elegant serif",       es: "" },
      { avain: "hand",        fi: "Käsinkirjoitettu",    en: "Handwritten",         es: "" },
      { avain: "modern",      fi: "Moderni selkeä",      en: "Modern and plain",    es: "" },
      { avain: "playful",     fi: "Leikkisä",            en: "Playful",             es: "" }
    ],

    lSijainti: [
      { avain: "top",         fi: "Ylhäällä",            en: "At the top",          es: "" },
      { avain: "center",      fi: "Keskellä",            en: "In the middle",       es: "" },
      { avain: "bottom",      fi: "Alhaalla",            en: "At the bottom",       es: "" }
    ]
  };

  /* Tyhjä arvo putoaa englantiin, englannin puuttuessa suomeen: sivu ei
     jää tyhjäksi vaikka käännös olisi kesken. */
  function valitse(kohta, kieli) {
    if (!kohta) return "";
    return kohta[kieli] || kohta.en || kohta.fi || "";
  }

  juuri.MRKorttiTekstit = { T: T, valitse: valitse, KIELET: ["fi", "en", "es"] };
})(window);
