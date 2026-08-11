// ============================================
// KHADER — Rasiid Deyn (nooca dhammaystiran)
// - No. rasiid otomaatig ah (localStorage counter)
// - Telefoon dhab ah (hal meel ka beddel)
// String concatenation only (Safari-safe)
// ============================================

// >>> HALKAN KELIYA KA BEDDEL TELEFOONKA <<<
var KH_PHONE = "063 4466219";

// No. rasiid otomaatig ah — wuu isa soo taraa (0001, 0002, ...)
function khNextReceiptNo() {
  var n = 1;
  try {
    n = parseInt(localStorage.getItem("kh_receipt_seq") || "0", 10) + 1;
    localStorage.setItem("kh_receipt_seq", String(n));
  } catch (e) { n = Math.floor(Date.now() / 1000) % 100000; }
  // u beddel 4 god: 1 -> "0001"
  var s = String(n);
  while (s.length < 4) { s = "0" + s; }
  return s;
}

function buildKhReceipt(d, wa) {
  // d = { qof, nooc, faahfaahin, guud, bixiyay, hadhay, taariikh, no }
  var B = wa ? "*" : "";
  var LINE = "━━━━━━━━━━━━━━━━━━━━━━";
  var pct = d.guud > 0 ? Math.round((d.bixiyay / d.guud) * 100) : 0;
  var dot = d.hadhay > 0 ? "🔴" : "🟢";
  var noVal = d.no ? d.no : khNextReceiptNo();

  var r = "";
  r += LINE + "\n";
  r += "   💱 " + B + "KHADER EXCHANGE" + B + "\n";
  r += "        📍 HARGEISA\n";
  r += LINE + "\n\n";

  r += "🧾 " + B + "RASIID DEYN" + B + "\n";
  r += "🗓 " + d.taariikh + "\n";
  r += "🔢 No: #KH-" + noVal + "\n\n";

  r += "👤 " + B + "Qof:" + B + " " + d.qof + "\n";
  r += "📌 " + B + "Nooc:" + B + " " + d.nooc + "\n";
  if (d.faahfaahin) { r += "📝 " + B + "Faahfaahin:" + B + " " + d.faahfaahin + "\n"; }
  r += "\n" + LINE + "\n";

  r += "💰 " + B + "Guud:" + B + "        $" + d.guud + "\n";
  r += "✅ " + B + "La bixiyay:" + B + "  $" + d.bixiyay + "\n";
  r += dot + " " + B + "Hadhay:" + B + "      $" + d.hadhay + "\n";
  r += "📊 " + pct + "% la bixiyay\n";
  r += LINE + "\n\n";

  r += "🙏 Mahadsanid! · KHADER Exchange\n";
  r += "📞 " + KH_PHONE;

  return r;
}

// ---- TEST (2 rasiid si aan u aragno No. oo kordha) ----
var demo1 = { qof:"Naasir", nooc:"Deyn aad igu leedahay", faahfaahin:"Caano ku iibsaday",
  guud:50, bixiyay:0, hadhay:50, taariikh:"11 Ogo 2026 · 11:59" };
var demo2 = { qof:"Cabdi", nooc:"Deyn aad bixinayso", faahfaahin:"Sarif dollar",
  guud:200, bixiyay:120, hadhay:80, taariikh:"11 Ogo 2026 · 12:10" };

// localStorage shim for node test
global.localStorage = { _d:{}, getItem(k){return this._d[k]||null;}, setItem(k,v){this._d[k]=v;} };

console.log("===== WHATSAPP (rasiid 1) =====");
console.log(buildKhReceipt(demo1, true));
console.log("\n===== WHATSAPP (rasiid 2 — bixin dhaman) =====");
console.log(buildKhReceipt(demo2, true));
