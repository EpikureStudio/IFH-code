/* =========================================================
   Candidature — block EN locale path
   ========================================================= */

window.addEventListener("DOMContentLoaded", function () {
  var lang =
    (window.Weglot && Weglot.getCurrentLang && Weglot.getCurrentLang()) || "fr";
  var path = window.location.pathname;

  if (lang === "en" && /^\/en\/candidature\/?$/.test(path)) {
    window.location.replace("https://www.ifh-paris.com/404");
  }
});
