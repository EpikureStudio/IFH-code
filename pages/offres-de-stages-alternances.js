/* =========================================================
   Offres de stages/alternances — filters + language helpers
   ========================================================= */

window.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".checkbox_filter").forEach(function (label) {
    var span = label.querySelector(".w-form-label");
    if (span && span.textContent.trim().toLowerCase() === "work-study program") {
      label.classList.add("no-en");
    }
  });

  document.querySelectorAll(".job.w-dyn-item").forEach(function (job) {
    if (job.textContent.toLowerCase().includes("work-study program")) {
      job.classList.add("no-en");
    }
  });
});

(function () {
  function getLang() {
    if (window.Weglot && typeof Weglot.getCurrentLang === "function") {
      return Weglot.getCurrentLang();
    }
    var htmlLang = (document.documentElement.getAttribute("lang") || "").toLowerCase();
    if (htmlLang) return htmlLang.split("-")[0];
    return location.pathname === "/en" || location.pathname.startsWith("/en/")
      ? "en"
      : "fr";
  }

  function applyHide(scope) {
    var lang = getLang() || "fr";
    var root = scope || document;

    root.querySelectorAll(".no-en").forEach(function (el) {
      el.style.display = lang === "en" ? "none" : "";
    });
    root.querySelectorAll(".no-fr").forEach(function (el) {
      el.style.display = lang === "fr" ? "none" : "";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyHide();
    document.addEventListener("weglot:init", function () {
      applyHide();
    });
    document.addEventListener("weglot:languageChanged", function () {
      applyHide();
    });

    var mo = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].addedNodes && muts[i].addedNodes.length) {
          applyHide();
          break;
        }
      }
    });
    mo.observe(document.documentElement, { childList: true, subtree: true });

    setTimeout(applyHide, 200);
    setTimeout(applyHide, 800);
  });
})();
