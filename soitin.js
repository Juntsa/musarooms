/* Musa Rooms — soittimien jaetut osat.
 *
 *   Saadin   iso pystysäädin, joka nousee keskelle napautuksesta
 *   Huone    oven takaa ponnahtava soitin, puhelimen levyinen
 *
 * Molemmat ovat jaettuja tarkoituksella. Jokainen soitin saa saman eleen,
 * eikä uutta nuppia varten tarvitse kirjoittaa kuin yksi rivi rekisteriin —
 * sama ratkaisu kuin SilverDeckin KNOBS-rekisterissä.
 *
 * Moduuli ei kaadu, vaikka sitä ei olisi ladattu: kutsujan kuuluu tarkistaa
 * window.Saadin ennen käyttöä. Jukeboksin jakotiedosto on yksi irrallinen
 * HTML, jolle tätä tiedostoa ei ole olemassa.
 */
(function (W) {
  'use strict';

  /* ==================================================================
   * Saadin — pieni nuppi, iso säädin
   *
   * Napautus avaa ison säätimen. Napautukseksi lasketaan alle 10 px liike
   * ja alle 0,6 s kosketus; pidempi veto on tavallinen säätö paikallaan.
   * Hiirellä napsautus ei avaa mitään, koska osoittimella pienen nupin
   * vetäminen onnistuu muutenkin.
   * ================================================================== */

  var NAPAUTUS_PX = 10;        // tätä pidempi liike ei ole enää napautus
  var NAPAUTUS_MS = 600;       // tätä pidempi kosketus ei ole enää napautus
  var VETO_MATKA = 220;        // paikallaan säädettäessä koko alue tässä px

  var rekisteri = [];
  var paalla = null;           // avoinna oleva iso säädin
  var juuri = null;            // overlayn DOM

  function rajaa(v, a, b) { return v < a ? a : (v > b ? b : v); }

  /* Osoittimen kaappaus heittää, jos se on jo vapautunut — esimerkiksi
     kun sormi nousee kesken käsittelyn. Säätö toimii ilmankin. */
  function kaappaa(el, id) {
    try { el.setPointerCapture && el.setPointerCapture(id); } catch (e) {}
  }

  function pykala(s, v) {
    if (!s.askel) return rajaa(v, s.min, s.max);
    var n = Math.round((v - s.min) / s.askel);
    return rajaa(s.min + n * s.askel, s.min, s.max);
  }

  function teksti(s, v) {
    if (s.muotoile) return s.muotoile(v);
    var d = (s.askel && s.askel < 1) ? 2 : 0;
    return v.toFixed(d) + (s.yksikko ? ' ' + s.yksikko : '');
  }

  /* ---- iso säädin ------------------------------------------------- */

  function rakennaJuuri() {
    if (juuri) return juuri;
    juuri = document.createElement('div');
    juuri.id = 'isoSaadin';
    juuri.setAttribute('role', 'dialog');
    juuri.setAttribute('aria-modal', 'true');
    juuri.innerHTML =
      '<div class="is-tausta"></div>' +
      '<div class="is-paneeli">' +
        '<div class="is-nimi"></div>' +
        '<div class="is-ura"><div class="is-taytto"></div><div class="is-nappula"></div></div>' +
        '<div class="is-arvo"></div>' +
        '<button type="button" class="is-valmis">Valmis</button>' +
      '</div>';

    var css = document.createElement('style');
    css.textContent = [
      '#isoSaadin{position:fixed;inset:0;z-index:9000;display:none;',
        'align-items:center;justify-content:center;touch-action:none;',
        '-webkit-user-select:none;user-select:none}',
      '#isoSaadin.auki{display:flex}',
      '#isoSaadin .is-tausta{position:absolute;inset:0;background:rgba(6,5,4,.82);',
        'backdrop-filter:blur(3px)}',
      '#isoSaadin .is-paneeli{position:relative;display:flex;flex-direction:column;',
        'align-items:center;gap:14px;padding:22px 26px 18px;border-radius:18px;',
        'background:linear-gradient(180deg,#2a211a,#15100c);',
        'border:1px solid #4a3a28;box-shadow:0 26px 60px rgba(0,0,0,.7)}',
      '#isoSaadin .is-nimi{color:#e8ded0;font:600 15px/1 "Segoe UI",system-ui,sans-serif;',
        'letter-spacing:.16em;text-transform:uppercase}',
      '#isoSaadin .is-ura{position:relative;width:96px;height:min(58vh,420px);',
        'border-radius:48px;background:#0d0a07;',
        'box-shadow:inset 0 2px 10px rgba(0,0,0,.9),0 0 0 1px #4a3a28;overflow:hidden}',
      '#isoSaadin .is-taytto{position:absolute;left:0;right:0;bottom:0;',
        'background:linear-gradient(180deg,#ffb63f,#c0501a);opacity:.85}',
      '#isoSaadin .is-nappula{position:absolute;left:6px;right:6px;height:54px;',
        'border-radius:12px;',
        'background:linear-gradient(180deg,#f3ead9,#9b8d78 52%,#cdc2ad);',
        'box-shadow:0 3px 10px rgba(0,0,0,.65)}',
      '#isoSaadin .is-nappula::after{content:"";position:absolute;left:12px;right:12px;',
        'top:50%;height:3px;margin-top:-1.5px;border-radius:2px;background:#4a4036}',
      '#isoSaadin .is-arvo{color:#ffb63f;font:700 30px/1 "Segoe UI",system-ui,sans-serif;',
        'font-variant-numeric:tabular-nums}',
      '#isoSaadin .is-valmis{appearance:none;border:1px solid #6a543a;border-radius:9px;',
        'background:#241b14;color:#e8ded0;font:600 14px/1 "Segoe UI",sans-serif;',
        'padding:11px 26px;min-height:44px;cursor:pointer}',
      '@media (prefers-reduced-motion:no-preference){',
        '#isoSaadin.auki .is-paneeli{animation:isNousu .22s cubic-bezier(.2,.9,.3,1)}}',
      '@keyframes isNousu{from{transform:translateY(18px) scale(.96);opacity:0}}'
    ].join('');

    document.head.appendChild(css);
    document.body.appendChild(juuri);

    juuri.querySelector('.is-valmis').addEventListener('click', sulje);
    juuri.addEventListener('pointerdown', alaVeto);
    juuri.addEventListener('pointermove', veto);
    juuri.addEventListener('pointerup', ylosVeto);
    juuri.addEventListener('pointercancel', ylosVeto);
    return juuri;
  }

  function naytaArvo() {
    if (!paalla) return;
    var s = paalla, v = s.lue();
    var osuus = (v - s.min) / (s.max - s.min);
    /* Nappula liikkuu välillä 0 .. uran korkeus - nappulan korkeus, muuten
       se karkaisi uran yli ääriarvoissa. Täyttö yltää nappulan keskelle. */
    var N = 54;
    juuri.querySelector('.is-arvo').textContent = teksti(s, v);
    juuri.querySelector('.is-nappula').style.bottom =
      'calc(' + (osuus * 100) + '% - ' + (osuus * N).toFixed(1) + 'px)';
    juuri.querySelector('.is-taytto').style.height =
      'calc(' + (osuus * 100) + '% - ' + (osuus * N - N / 2).toFixed(1) + 'px)';
  }

  function avaa(s) {
    rakennaJuuri();
    paalla = s;
    juuri.querySelector('.is-nimi').textContent = s.nimi || '';
    juuri.classList.add('auki');
    naytaArvo();
    if (s.avattu) s.avattu();
  }

  function sulje() {
    if (!paalla) return;
    var s = paalla;
    paalla = null;
    juuri.classList.remove('auki');
    if (s.suljettu) s.suljettu();
  }

  /* Veto isossa säätimessä.
     Koko ruutu on säädin, myös tumma tausta. Peukalolla ei osu kapeaan
     uraan, ja juuri siksi säädin nostettiin isoksi. Taustan napautus
     sulkee, mutta vain jos sormi ei liikkunut — muuten sulkeminen
     keskeyttäisi joka vedon. */
  var isoAlku = null;
  function alaVeto(e) {
    if (!paalla || e.target.classList.contains('is-valmis')) return;
    var ura = juuri.querySelector('.is-ura').getBoundingClientRect();
    isoAlku = {
      id: e.pointerId, y: e.clientY, arvo: paalla.lue(), h: ura.height,
      liikkunut: false, tausta: e.target.classList.contains('is-tausta')
    };
    kaappaa(juuri, e.pointerId);
    e.preventDefault();
  }
  function veto(e) {
    if (!isoAlku || !paalla || e.pointerId !== isoAlku.id) return;
    var s = paalla;
    if (Math.abs(e.clientY - isoAlku.y) > 6) isoAlku.liikkunut = true;
    var d = (isoAlku.y - e.clientY) / isoAlku.h * (s.max - s.min);
    s.aseta(pykala(s, isoAlku.arvo + d));
    if (s.piirra) s.piirra();
    naytaArvo();
    e.preventDefault();
  }
  function ylosVeto(e) {
    if (!isoAlku || (e && e.pointerId !== isoAlku.id)) return;
    var tausta = isoAlku.tausta, liikkui = isoAlku.liikkunut;
    isoAlku = null;
    if (tausta && !liikkui) sulje();
  }

  document.addEventListener('keydown', function (e) {
    if (!paalla) return;
    if (e.key === 'Escape') { sulje(); return; }
    var s = paalla, k = s.askel || (s.max - s.min) / 20;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') s.aseta(pykala(s, s.lue() + k));
    else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') s.aseta(pykala(s, s.lue() - k));
    else return;
    naytaArvo();
    e.preventDefault();
  });

  /* ---- pieni nuppi paikallaan ------------------------------------- */

  function kiinnita(s) {
    var isanta = s.el || s.canvas;
    if (!isanta) return;
    var tila = null;

    isanta.addEventListener('pointerdown', function (e) {
      if (s.osuma && !s.osuma(e)) return;
      tila = {
        id: e.pointerId, tyyppi: e.pointerType,
        x: e.clientX, y: e.clientY, t: Date.now(),
        arvo: s.lue(), liikkunut: false
      };
      kaappaa(isanta, e.pointerId);
      e.preventDefault();
    });

    isanta.addEventListener('pointermove', function (e) {
      if (!tila || e.pointerId !== tila.id) return;
      var dx = e.clientX - tila.x, dy = e.clientY - tila.y;
      if (!tila.liikkunut && Math.sqrt(dx * dx + dy * dy) > NAPAUTUS_PX) tila.liikkunut = true;
      if (!tila.liikkunut) return;
      var d = (-dy) / VETO_MATKA * (s.max - s.min);
      s.aseta(pykala(s, tila.arvo + d));
      if (s.piirra) s.piirra();
      e.preventDefault();
    });

    function lopeta(e) {
      if (!tila || e.pointerId !== tila.id) return;
      var kesto = Date.now() - tila.t;
      /* Vain kosketus avaa ison säätimen. Hiirellä pienenkin nupin
         vetäminen onnistuu, joten napsautukselle ei ole tarvetta. */
      if (tila.tyyppi === 'touch' && !tila.liikkunut && kesto < NAPAUTUS_MS) avaa(s);
      tila = null;
    }
    isanta.addEventListener('pointerup', lopeta);
    isanta.addEventListener('pointercancel', lopeta);
  }

  var Saadin = {
    lisaa: function (def) {
      var s = Object.assign({ min: 0, max: 1, askel: 0 }, def);
      if (!s.lue || !s.aseta) throw new Error('säädin tarvitsee lue ja aseta');
      rekisteri.push(s);
      kiinnita(s);
      return s;
    },
    avaa: avaa,
    sulje: sulje,
    get auki() { return !!paalla; },
    rekisteri: rekisteri
  };

  /* ==================================================================
   * Huone — soitin ponnahtaa oven takaa
   *
   * Ovet aukeavat, ja soitin kasvaa oven kohdalta koko ruudun kokoiseksi.
   * Puhelimessa se tarkoittaa koko leveyttä. Soitin on oma sivunsa, joten
   * se tulee kehykseen: sama soitin toimii myös suorana osoitteena, eikä
   * aulan tarvitse tietää sen sisuksista mitään.
   * ================================================================== */

  var hJuuri = null, hKehys = null, hAuki = false, hOvi = null;

  function huoneJuuri() {
    if (hJuuri) return hJuuri;
    hJuuri = document.createElement('div');
    hJuuri.id = 'huonenakyma';
    hJuuri.innerHTML =
      '<button type="button" class="hn-takaisin" aria-label="Takaisin aulaan">' +
        '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" ' +
        'stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M15 5 8 12l7 7"/></svg></button>' +
      '<iframe class="hn-kehys" title="Soitin" allow="autoplay"></iframe>';

    var css = document.createElement('style');
    css.textContent = [
      '#huonenakyma{position:fixed;inset:0;z-index:8000;display:none;background:#0a0908;',
        'transform-origin:0 0;opacity:0}',
      '#huonenakyma.nakyy{display:block}',
      '#huonenakyma .hn-kehys{position:absolute;inset:0;width:100%;height:100%;border:0;',
        'display:block;background:#0a0908}',
      '#huonenakyma .hn-takaisin{position:absolute;left:10px;top:10px;z-index:2;',
        'width:44px;height:44px;border-radius:50%;border:1px solid rgba(255,235,200,.3);',
        'background:rgba(10,9,8,.62);color:#f0e4d2;cursor:pointer;',
        'display:flex;align-items:center;justify-content:center;',
        'backdrop-filter:blur(4px)}',
      '#huonenakyma .hn-takaisin:active{background:rgba(10,9,8,.85)}'
    ].join('');
    document.head.appendChild(css);
    document.body.appendChild(hJuuri);
    hKehys = hJuuri.querySelector('.hn-kehys');
    hJuuri.querySelector('.hn-takaisin').addEventListener('click', function () {
      if (history.state && history.state.musaHuone) history.back();
      else huoneSulje();
    });
    return hJuuri;
  }

  function huoneAvaa(ovi, url) {
    if (hAuki) return;
    huoneJuuri();
    hAuki = true;
    hOvi = ovi;
    if (ovi) ovi.classList.add('auki');       // luukut auki kosketuksellakin

    hKehys.src = url;

    var r = ovi ? ovi.getBoundingClientRect()
                : { left: 0, top: 0, width: innerWidth, height: innerHeight };
    var sx = Math.max(r.width / innerWidth, 0.02);
    var sy = Math.max(r.height / innerHeight, 0.02);

    hJuuri.classList.add('nakyy');
    hJuuri.style.transition = 'none';
    hJuuri.style.transform =
      'translate(' + r.left + 'px,' + r.top + 'px) scale(' + sx + ',' + sy + ')';
    hJuuri.style.opacity = '0';

    /* Luukut ehtivät auki ennen kuin soitin kasvaa niiden takaa esiin. */
    setTimeout(function () {
      requestAnimationFrame(function () {
        hJuuri.style.transition =
          'transform .46s cubic-bezier(.28,.88,.3,1),opacity .24s linear';
        hJuuri.style.transform = 'translate(0px,0px) scale(1,1)';
        hJuuri.style.opacity = '1';
      });
    }, 260);

    try {
      history.pushState({ musaHuone: true }, '', url);
    } catch (e) { /* file:// ei salli — ei haittaa */ }
    document.documentElement.style.overflow = 'hidden';
  }

  function huoneSulje() {
    if (!hAuki) return;
    hAuki = false;
    var ovi = hOvi; hOvi = null;
    var r = ovi ? ovi.getBoundingClientRect()
                : { left: 0, top: 0, width: innerWidth, height: innerHeight };
    hJuuri.style.transition =
      'transform .34s cubic-bezier(.4,0,.6,1),opacity .28s linear';
    hJuuri.style.transform =
      'translate(' + r.left + 'px,' + r.top + 'px) scale(' +
      Math.max(r.width / innerWidth, 0.02) + ',' +
      Math.max(r.height / innerHeight, 0.02) + ')';
    hJuuri.style.opacity = '0';
    document.documentElement.style.overflow = '';
    setTimeout(function () {
      if (hAuki) return;                     // ehdittiin avata uudelleen
      hJuuri.classList.remove('nakyy');
      hKehys.src = 'about:blank';            // soitto loppuu kun ovi sulkeutuu
      if (ovi) ovi.classList.remove('auki');
    }, 360);
  }

  W.addEventListener('popstate', function () { if (hAuki) huoneSulje(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && hAuki && !Saadin.auki) {
      if (history.state && history.state.musaHuone) history.back();
      else huoneSulje();
    }
  });

  var Huone = {
    avaa: huoneAvaa,
    sulje: huoneSulje,
    get auki() { return hAuki; },
    /* Kytkee kaikki ovet, joilla on data-soitin. Linkki jää ennalleen,
       joten ilman JS:ää ovi vie soittimeen tavallisena sivuna. */
    kytke: function (valitsin) {
      var ovet = document.querySelectorAll(valitsin || 'a.huone[data-soitin]');
      Array.prototype.forEach.call(ovet, function (a) {
        a.addEventListener('click', function (e) {
          if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return;
          e.preventDefault();
          huoneAvaa(a, a.getAttribute('href'));
        });
      });
      return ovet.length;
    }
  };

  W.Saadin = Saadin;
  W.Huone = Huone;
})(window);
