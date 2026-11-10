
try {
  var cL = json.lang || "tr";
  var cD = json.desing || {};
  var cEsc = function (s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;"); };
  var cTx = function (o) { if (o == null) return ""; if (typeof o !== "object") return String(o); return o[cL] || o.tr || o.en || ""; };
  var cIkon = {
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>',
    facebook: '<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>',
    x: '<path d="M4 4l16 16M20 4L4 20"/>',
    youtube: '<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>'
  };
  var cAdr = Array.isArray(cD.addresses) ? cD.addresses : [];
  var cKartlar = "";
  cAdr.forEach(function (a) {
    var metin = cTx(a.text).trim(); if (!metin) return;
    var q = encodeURIComponent(cTx(a.query).trim() || metin);
    cKartlar += '<article class="bkc-kart"><span class="bkc-ikon material-symbols-outlined" aria-hidden="true">' + cEsc(a.icon || "location_on") + '</span>' +
      '<div><h3 class="bkc-bas">' + cEsc(cTx(a.label)) + '</h3><p class="bkc-metin">' + cEsc(metin) + '</p>' +
      '<a class="bkc-link" href="https://www.google.com/maps/search/?api=1&amp;query=' + q + '" target="_blank" rel="noopener noreferrer">' + cEsc(cTx(cD.mapLink) || "Haritada Gör") + '<span class="material-symbols-outlined" aria-hidden="true">arrow_outward</span></a></div></article>';
  });
  var cSos = "";
  (Array.isArray(cD.social) ? cD.social : []).forEach(function (s) {
    var ad = cTx(s.ad).trim(), url = String(s.url || "").trim();
    if (!ad || !/^https?:\/\//.test(url)) return;
    var k = /insta/i.test(ad) ? "instagram" : /face/i.test(ad) ? "facebook" : /(^x$|twitter)/i.test(ad) ? "x" : /you/i.test(ad) ? "youtube" : "";
    cSos += '<a class="bkc-soc" href="' + cEsc(url) + '" target="_blank" rel="noopener noreferrer" aria-label="' + cEsc(ad) + '" title="' + cEsc(ad) + '">' +
      (k ? '<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + cIkon[k] + '</svg>' : cEsc(ad.charAt(0))) + '<span>' + cEsc(ad) + '</span></a>';
  });
  var cMapQ = encodeURIComponent(cTx(cD.mapQuery).trim() || (cAdr[0] ? cTx(cAdr[0].text) : ""));
  var cHarita = cMapQ
    ? '<div class="bkc-harita"><iframe title="' + cEsc(cTx(cD.mapTitle) || "Konum haritası") + '" src="https://www.google.com/maps?q=' + cMapQ + '&amp;output=embed&amp;hl=tr" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>'
    : "";
  var cHtml = '<section class="bkc" aria-labelledby="bkc-bas-ana"><div class="bkc-ic">' +
    '<div class="bkc-ust"><span class="bkc-rozet">' + cEsc(cTx(cD.badge)) + '</span><h2 id="bkc-bas-ana" class="bkc-baslik">' + cEsc(cTx(cD.title)) + '</h2><p class="bkc-alt">' + cEsc(cTx(cD.description)) + '</p></div>' +
    '<div class="bkc-izgara"><div class="bkc-sol">' + cKartlar +
    (cSos ? '<div class="bkc-sosyal" role="group" aria-label="' + cEsc(cTx(cD.socialTitle) || "Sosyal medya") + '"><h3 class="bkc-bas">' + cEsc(cTx(cD.socialTitle)) + '</h3><div class="bkc-soc-satir">' + cSos + '</div></div>' : "") +
    '</div>' + cHarita + '</div></div></section>';
  html = html.replace(/{{bkc}}/g, cHtml);
} catch (e) { html = html.replace(/{{bkc}}/g, ""); }
