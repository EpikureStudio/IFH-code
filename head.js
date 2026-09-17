/* =========================================================
   IFH — Early head scripts
   Hosted at https://ifh-code.pages.dev/head.js
   Load synchronously in <head> (before paint) to avoid FOUC
   ========================================================= */

(function () {
  var parts = window.location.pathname.split("/").filter(Boolean);
  var lang = (parts[0] || "fr").toLowerCase();

  if (["fr", "en", "es", "hi", "zh"].indexOf(lang) === -1) {
    lang = "fr";
  }

  document.documentElement.classList.add("ifh-lang-" + lang);
})();

(function () {
  var canonical = document.createElement("link");
  canonical.rel = "canonical";
  canonical.href = window.location.href.split("?")[0].split("#")[0];
  document.head.appendChild(canonical);
})();
