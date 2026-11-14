#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Musa Rooms — rakenteinen data huoneiden omista JSON-tiedostoista.

Ongelma jota tämä ratkaisee: huoneiden soittolistat haetaan ajonaikana
(`fetch('kokoelma.json')`), joten hakukone ja tekoälyhaku näkevät sivulta
otsikon ja tekstin "Loading…" — ei yhtäkään biisin nimeä. Tämä skripti
kirjoittaa jokaiselle huonesivulle JSON-LD-lohkon, jossa raidat ovat
koneluettavassa muodossa, ja korjaa sivun kielimerkinnän.

Lähde on aina huoneen oma JSON. Nimiä ei kopioida käsin HTML:ään, joten
setin muuttuessa riittää ajaa tämä uudelleen.

    python3 tools/rakenna_data.py           # kirjoittaa
    python3 tools/rakenna_data.py --tarkista # ei kirjoita, kertoo mikä muuttuisi

Lohko kirjoitetaan merkkien väliin, joten ajon voi toistaa:
    <!-- MR:DATA alku -->  ...  <!-- MR:DATA loppu -->
"""

import json
import pathlib
import re
import sys

JUURI = pathlib.Path(__file__).resolve().parent.parent
SIVUSTO = "https://musarooms.com"
ARTISTI = "KJWhispers"

ALKU = "<!-- MR:DATA alku — tuotettu tools/rakenna_data.py, älä muokkaa käsin -->"
LOPPU = "<!-- MR:DATA loppu -->"

# Artistin muut osoitteet. Lisää tähän Spotify-, Apple Music- ja YouTube-
# osoitteet kun ne ovat tiedossa: sameAs on se mistä hakukone ja tekoäly
# päättelevät, että nämä ovat sama tekijä eivätkä kolme samannimistä.
SAME_AS = [
    "https://musarooms.com/",
    "https://mansikkakyla.fi/",
]


def kesto_iso(sekunnit):
    """Sekunnit -> ISO 8601, esim. 191.9 -> PT3M11S."""
    try:
        s = int(round(float(sekunnit)))
    except (TypeError, ValueError):
        return None
    if s <= 0:
        return None
    return "PT{}M{}S".format(s // 60, s % 60)


def lue(polku):
    return json.loads((JUURI / polku).read_text(encoding="utf-8"))


# --- raitojen poiminta huonekohtaisesti ---------------------------------

def raidat_kokoelmasta(polku):
    d = lue(polku)
    return [(r.get("nimi"), r.get("alarivi"), r.get("kesto")) for r in d.get("raidat", [])]


def raidat_jukeboksista(polku):
    d = lue(polku)
    ulos = []
    for p in d.get("paikat", []):
        nimi = (p.get("nimi") or "").strip()
        if nimi:
            ulos.append((nimi, (p.get("esittaja") or "").strip() or None, None))
    return ulos


def raidat_dekista(polku):
    d = lue(polku)
    ulos, nahdyt = [], set()
    for lahde in ("reel", "A", "B"):
        for r in d.get(lahde, []):
            nimi = (r.get("title") or "").strip()
            if nimi and nimi.lower() not in nahdyt:
                nahdyt.add(nimi.lower())
                ulos.append((nimi, None, r.get("dur")))
    return ulos


def raidat_asemista(polku):
    d = lue(polku)
    ulos = []
    for kaista in ("fm", "am"):
        for r in d.get(kaista, []):
            ulos.append((r.get("nimi"), r.get("alarivi"), r.get("kesto")))
    return ulos


def videot(polku):
    d = lue(polku)
    return [(v.get("nimi"), v.get("alarivi"), v.get("kesto")) for v in d.get("videot", [])]


def naytteet(polku):
    d = lue(polku)
    return [(n.get("nimi"), n.get("genre"), n.get("kesto")) for n in d.get("naytteet", [])]


# --- huoneet -------------------------------------------------------------
# tyyppi: 'soittolista' = MusicPlaylist, 'video' = ItemList/VideoObject,
#         'palvelu'     = Service + näytteet

HUONEET = [
    dict(polku="jukebox", kieli="en", nimi="Fifties", laite="KJWhispers JB-2400",
         genre="1950s", tyyppi="soittolista", lahde="jukebox/setti.json",
         poimi=raidat_jukeboksista),
    dict(polku="dekki", kieli="en", nimi="SilverDeck", laite="SilverDeck",
         genre="Ballads", tyyppi="soittolista", lahde="dekki/setti.json",
         poimi=raidat_dekista),
    dict(polku="highland", kieli="en", nimi="Highland Sessions", laite="Highland",
         genre="Celtic and Nordic folk", tyyppi="soittolista",
         lahde="highland/kokoelma.json", poimi=raidat_kokoelmasta),
    dict(polku="house", kieli="en", nimi="House Edition", laite="House",
         genre="Deep house", tyyppi="soittolista",
         lahde="house/kokoelma.json", poimi=raidat_kokoelmasta),
    dict(polku="joulu", kieli="en", nimi="Christmas — Rees-1000", laite="Rees-1000",
         genre="Christmas", tyyppi="soittolista",
         lahde="joulu/kokoelma.json", poimi=raidat_kokoelmasta),
    dict(polku="suomi", kieli="fi", nimi="Suomi", laite="Telestar Concertino",
         genre="Suomenkieliset laulut", tyyppi="soittolista",
         lahde="suomi/kokoelma.json", poimi=raidat_kokoelmasta),
    dict(polku="techno", kieli="en", nimi="Techno Booth", laite="Techno Booth",
         genre="Techno", tyyppi="soittolista",
         lahde="techno/kokoelma.json", poimi=raidat_kokoelmasta),
    dict(polku="country", kieli="en", nimi="Country Radio", laite="KJW Country",
         genre="Country", tyyppi="soittolista",
         lahde="country/asemat.json", poimi=raidat_asemista),
    dict(polku="video", kieli="en", nimi="Music Videos", laite=None,
         genre=None, tyyppi="video", lahde="video/videot.json", poimi=videot),
    dict(polku="tilaus", kieli="en", nimi="Custom Songs", laite=None,
         genre=None, tyyppi="palvelu", lahde="tilaus/naytteet.json", poimi=naytteet),
]


def artisti_solmu():
    return {
        "@type": "MusicGroup",
        "@id": SIVUSTO + "/#kjwhispers",
        "name": ARTISTI,
        "url": SIVUSTO + "/",
        "sameAs": SAME_AS,
    }


def soittolista(h, raidat):
    url = "{}/{}/".format(SIVUSTO, h["polku"])
    kappaleet = []
    for i, (nimi, alarivi, kesto) in enumerate(raidat, 1):
        if not nimi:
            continue
        r = {
            "@type": "MusicRecording",
            "position": i,
            "name": nimi,
            "byArtist": {"@type": "MusicGroup", "name": ARTISTI},
        }
        if alarivi:
            r["description"] = alarivi
        kesto_s = kesto_iso(kesto)
        if kesto_s:
            r["duration"] = kesto_s
        kappaleet.append(r)

    lista = {
        "@type": "MusicPlaylist",
        "@id": url + "#soittolista",
        "name": h["nimi"],
        "url": url,
        "numTracks": len(kappaleet),
        "byArtist": {"@id": SIVUSTO + "/#kjwhispers"},
        "track": kappaleet,
    }
    if h.get("genre"):
        lista["genre"] = h["genre"]
    return lista


def videolista(h, rivit):
    url = "{}/{}/".format(SIVUSTO, h["polku"])
    osat = []
    for i, (nimi, alarivi, kesto) in enumerate(rivit, 1):
        if not nimi:
            continue
        v = {"@type": "VideoObject", "position": i, "name": nimi,
             "contentUrl": url, "uploadDate": None}
        v.pop("uploadDate")  # ei keksitä päivämäärää jota ei ole
        if alarivi:
            v["description"] = alarivi
        k = kesto_iso(kesto)
        if k:
            v["duration"] = k
        osat.append(v)
    return {"@type": "ItemList", "@id": url + "#videot", "name": h["nimi"],
            "url": url, "numberOfItems": len(osat), "itemListElement": osat}


def palvelu(h, rivit):
    url = "{}/{}/".format(SIVUSTO, h["polku"])
    naytteet_lista = []
    for i, (nimi, genre, kesto) in enumerate(rivit, 1):
        if not nimi:
            continue
        n = {"@type": "MusicRecording", "position": i, "name": nimi,
             "byArtist": {"@type": "MusicGroup", "name": ARTISTI}}
        if genre:
            n["genre"] = genre
        k = kesto_iso(kesto)
        if k:
            n["duration"] = k
        naytteet_lista.append(n)
    return {
        "@type": "Service",
        "@id": url + "#tilauslaulut",
        "name": "KJWhispers Custom Songs",
        "url": url,
        "serviceType": "Personalised song written and produced to order",
        "provider": {"@id": SIVUSTO + "/#kjwhispers"},
        "areaServed": "Worldwide",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Samples",
            "itemListElement": naytteet_lista,
        },
    }


def huoneen_data(h):
    rivit = h["poimi"](h["lahde"])
    url = "{}/{}/".format(SIVUSTO, h["polku"])
    if h["tyyppi"] == "video":
        paa = videolista(h, rivit)
    elif h["tyyppi"] == "palvelu":
        paa = palvelu(h, rivit)
    else:
        paa = soittolista(h, rivit)

    sivu = {
        "@type": "WebPage",
        "@id": url + "#sivu",
        "url": url,
        "name": h["nimi"],
        "inLanguage": h["kieli"],
        "isPartOf": {"@id": SIVUSTO + "/#sivusto"},
        "about": {"@id": paa["@id"]},
    }
    return {"@context": "https://schema.org", "@graph": [sivu, paa, artisti_solmu()]}, len(rivit)


def lobbyn_data():
    huoneet = [
        {"@type": "ListItem", "position": i,
         "url": "{}/{}/".format(SIVUSTO, h["polku"]), "name": h["nimi"]}
        for i, h in enumerate(HUONEET, 1)
    ]
    return {
        "@context": "https://schema.org",
        "@graph": [
            {"@type": "WebSite", "@id": SIVUSTO + "/#sivusto", "url": SIVUSTO + "/",
             "name": "Musa Rooms",
             "description": "Huoneita, joissa kussakin on oma soitin ja omat biisit.",
             "inLanguage": "fi", "publisher": {"@id": SIVUSTO + "/#kjwhispers"}},
            artisti_solmu(),
            {"@type": "ItemList", "@id": SIVUSTO + "/#huoneet", "name": "Huoneet",
             "numberOfItems": len(huoneet), "itemListElement": huoneet},
        ],
    }


# --- HTML:n kirjoitus ----------------------------------------------------

def lohko(data):
    teksti = json.dumps(data, ensure_ascii=False, indent=2)
    # </script> sisällössä katkaisisi lohkon kesken
    teksti = teksti.replace("</", "<\\/")
    return '{}\n<script type="application/ld+json">\n{}\n</script>\n{}'.format(
        ALKU, teksti, LOPPU)


def kirjoita(polku, data, kieli, tarkista):
    tiedosto = JUURI / polku
    alku_teksti = tiedosto.read_text(encoding="utf-8")
    teksti = alku_teksti

    uusi = lohko(data)
    kuvio = re.compile(re.escape(ALKU) + r".*?" + re.escape(LOPPU), re.S)
    if kuvio.search(teksti):
        teksti = kuvio.sub(lambda _: uusi, teksti, count=1)
    else:
        if "</head>" not in teksti:
            raise SystemExit("ei </head>-tagia: " + polku)
        teksti = teksti.replace("</head>", uusi + "\n</head>", 1)

    # kielimerkintä sivun oman sisällön mukaan
    teksti, n = re.subn(r'<html lang="[a-zA-Z-]+"',
                        '<html lang="{}"'.format(kieli), teksti, count=1)
    if n == 0:
        teksti = teksti.replace("<html", '<html lang="{}"'.format(kieli), 1)

    muuttui = teksti != alku_teksti
    if muuttui and not tarkista:
        tiedosto.write_text(teksti, encoding="utf-8")
    return muuttui


def main():
    tarkista = "--tarkista" in sys.argv
    muutoksia = 0

    muuttui = kirjoita("index.html", lobbyn_data(), "fi", tarkista)
    print("{:<22} {:>4} huonetta   {}".format(
        "index.html", len(HUONEET), "muuttui" if muuttui else "ennallaan"))
    muutoksia += muuttui

    for h in HUONEET:
        data, n = huoneen_data(h)
        polku = "{}/index.html".format(h["polku"])
        muuttui = kirjoita(polku, data, h["kieli"], tarkista)
        print("{:<22} {:>4} raitaa     {}   lang={}".format(
            polku, n, "muuttui" if muuttui else "ennallaan", h["kieli"]))
        muutoksia += muuttui

    print("\n{} sivua {}.".format(
        muutoksia, "muuttuisi" if tarkista else "kirjoitettu"))


if __name__ == "__main__":
    main()
