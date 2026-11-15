#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Musa Rooms — huoneiden kokoelmat luettelosta.

Kun uusi biisi on ajettu `AJA`-putken läpi, se on luettelossa ja varastossa,
mutta sivuston huonetiedostossa sitä ei vielä ole. Tämä skripti vie muutoksen
perille: lukee `luettelo.json`:n ja päivittää `<huone>/kokoelma.json`:t.

    python3 tools/paivita_kokoelmat.py /polku/luettelo.json            # tarkistus
    python3 tools/paivita_kokoelmat.py /polku/luettelo.json --kirjoita # kirjoittaa

Oletuksena se EI kirjoita mitään, vaan kertoo mikä muuttuisi. Kirjoitus on
erikseen pyydettävä.

## Mitä se säilyttää

**Lainat.** Jouluhuoneessa soi kolme dekin raitaa ja Highlandissa kuusi
joulun raitaa. Laina tunnistetaan osoitteesta: jos `aani` osoittaa toiseen
huoneeseen, rivi on laina eikä sitä kosketa. Luettelo ei tiedä lainoista
mitään, joten ilman tätä ne katoaisivat joka ajolla.

**Järjestyksen.** Olemassa olevat rivit pysyvät paikoillaan ja vain niiden
kesto, bpm ja alarivi päivittyvät. Uusi raita työnnetään aakkosjärjestykseen
omien raitojen joukkoon. Näin uudelleenmasterointi ei sekoita huoneen
järjestystä, joka on käyttäjälle näkyvä asia.

## Mitä se ei tee

Vain `kokoelma.json`-muotoiset huoneet. Jukeboksilla on 24 paikkaa 41
biisille, dekillä kolme kuljetinta, countrylla FM- ja AM-kaistat — niiden
rakenne on käsin harkittu eikä sitä saa rakentaa uudelleen luettelosta.

Poistunutta raitaa ei poisteta vaiti vaan siitä huomautetaan. Hiljainen
poisto on sama vika kuin hiljainen lisäys.
"""

import hashlib
import json
import pathlib
import re
import sys

JUURI = pathlib.Path(__file__).resolve().parent.parent
AANI_JUURI = "https://aani.musarooms.com"

# Vain nämä rakennetaan luettelosta. Ks. "Mitä se ei tee" yllä.
HUONEET = ["highland", "house", "joulu", "suomi", "techno"]


def rivi_luettelosta(huone, r):
    """Luettelon raita -> sivuston rivi. Varastossa kaikki on mp3:na."""
    rivi = {
        "nimi": r["nimi"],
        "alarivi": r.get("alarivi", ""),
        "kesto": r["kesto"],
        "aani": f"{AANI_JUURI}/{huone}/{r['tunnus']}.mp3",
    }
    if r.get("bpm"):
        rivi["bpm"] = r["bpm"]
    return rivi


def on_laina(rivi, huone):
    return f"/{huone}/" not in rivi.get("aani", "")


def paivita(huone, luettelo):
    polku = JUURI / huone / "kokoelma.json"
    if not polku.exists():
        return None
    data = json.loads(polku.read_text(encoding="utf-8"))
    vanhat = data.get("raidat", [])

    kanta = {r["tunnus"]: r for r in luettelo[huone].get("raidat", [])}
    kannassa = {t: rivi_luettelosta(huone, r) for t, r in kanta.items()}

    def tunnus(rivi):
        return rivi.get("aani", "").rsplit("/", 1)[-1].removesuffix(".mp3")

    uudet_rivit, muuttuneet, kadonneet = [], [], []
    nahdyt = set()

    for rivi in vanhat:
        if on_laina(rivi, huone):
            uudet_rivit.append(rivi)
            continue
        t = tunnus(rivi)
        nahdyt.add(t)
        if t not in kannassa:
            kadonneet.append(rivi.get("nimi", t))
            continue  # jätetään pois, mutta kerrotaan
        uusi = kannassa[t]
        if uusi != rivi:
            muuttuneet.append((rivi.get("nimi"), rivi.get("kesto"), uusi["kesto"]))
        uudet_rivit.append(uusi)

    # Uudet omiin raitoihin aakkosjärjestykseen, lainat pysyvät lopussa
    lisatyt = [kannassa[t] for t in kannassa if t not in nahdyt]
    for rivi in sorted(lisatyt, key=lambda x: x["nimi"].lower()):
        omat = [i for i, x in enumerate(uudet_rivit) if not on_laina(x, huone)]
        kohta = len(uudet_rivit)
        for i in omat:
            if uudet_rivit[i]["nimi"].lower() > rivi["nimi"].lower():
                kohta = i
                break
        else:
            kohta = omat[-1] + 1 if omat else 0
        uudet_rivit.insert(kohta, rivi)

    data["raidat"] = uudet_rivit
    return data, polku, lisatyt, muuttuneet, kadonneet


def leimaa(huone, json_polku):
    """
    Päivittää `kokoelma.json?v=<md5>` -tunnisteen huoneen index.html:ään.

    Ilman tätä selain tarjoilee vanhaa listaa välimuistista, ja uusi biisi
    puuttuu sivulta vaikka tiedosto on jo palvelimella. Tunniste on tiedoston
    md5:n kahdeksan ensimmäistä merkkiä — sama tapa jolla ne on aiemminkin
    leimattu, joten muoto ei muutu.
    """
    index = JUURI / huone / "index.html"
    if not index.exists():
        return None
    tiiviste = hashlib.md5(json_polku.read_bytes()).hexdigest()[:8]
    teksti = index.read_text(encoding="utf-8")
    kuvio = re.compile(r"(" + re.escape(json_polku.name) + r"\?v=)[0-9a-f]{8}")
    uusi, n = kuvio.subn(lambda m: m.group(1) + tiiviste, teksti)
    if n:
        index.write_text(uusi, encoding="utf-8")
        return tiiviste
    return None


def main():
    if len(sys.argv) < 2:
        raise SystemExit("Anna luettelo.json:n polku.")
    luettelo = json.loads(pathlib.Path(sys.argv[1]).read_text(encoding="utf-8"))["huoneet"]
    kirjoita = "--kirjoita" in sys.argv

    muutoksia = 0
    for huone in HUONEET:
        tulos = paivita(huone, luettelo)
        if tulos is None:
            print(f"{huone:10} ei kokoelma.json-tiedostoa, ohitetaan")
            continue
        data, polku, lisatyt, muuttuneet, kadonneet = tulos
        vanha_teksti = polku.read_text(encoding="utf-8")
        uusi_teksti = json.dumps(data, ensure_ascii=False, indent=2) + "\n"
        muuttui = json.loads(vanha_teksti) != data

        omat = sum(1 for r in data["raidat"] if not on_laina(r, huone))
        lainat = len(data["raidat"]) - omat
        tila = "MUUTTUU" if muuttui else "ennallaan"
        print(f"{huone:10} {omat:3} omaa + {lainat} lainaa = {len(data['raidat']):3}   {tila}")
        for r in lisatyt:
            print(f"             + {r['nimi']}")
        for nimi, vanha, uusi in muuttuneet:
            print(f"             ~ {nimi}: kesto {vanha} -> {uusi}")
        for nimi in kadonneet:
            print(f"             - {nimi}   EI OLE ENÄÄ LUETTELOSSA")

        if muuttui:
            muutoksia += 1
            if kirjoita:
                polku.write_text(uusi_teksti, encoding="utf-8")
                leima = leimaa(huone, polku)
                if leima:
                    print(f"             ?v={leima} index.html:ään")

    print(f"\n{muutoksia} huonetta {'kirjoitettu' if kirjoita else 'muuttuisi'}.")
    if muutoksia and not kirjoita:
        print("Aja uudelleen --kirjoita kun luvut näyttävät oikeilta.")


if __name__ == "__main__":
    main()
