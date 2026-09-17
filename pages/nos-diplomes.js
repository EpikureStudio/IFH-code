/* =========================================================
   Nos diplômes template — EN/VF CMS about blocks
   ========================================================= */

(function () {
  function getLang() {
    try {
      if (window.Weglot && typeof Weglot.getCurrentLang === "function") {
        return Weglot.getCurrentLang() || "fr";
      }
    } catch (e) {}
    return location.pathname.startsWith("/en/") || location.pathname === "/en"
      ? "en"
      : "fr";
  }

  function isSet(el) {
    if (!el) return false;
    if (el.classList.contains("w-condition-invisible")) return false;

    var hasMedia = el.querySelector(
      "img[src], iframe[src], video[src], source[src], .w-video iframe"
    );
    if (hasMedia) return true;

    var text = (el.textContent || "").replace(/\s+/g, " ").trim();
    return text.length > 20;
  }

  function show(el) {
    if (el) el.style.display = "";
  }

  function hide(el) {
    if (el) el.style.display = "none";
  }

  function toggleBlocks() {
    var lang = getLang();
    var enBlocks = Array.from(document.querySelectorAll(".cms_about.is-en"));
    var vfBlocks = Array.from(document.querySelectorAll(".cms_about.is-vf"));
    var hasEN = enBlocks.some(isSet);
    var hasVF = vfBlocks.some(isSet);

    if (lang === "en") {
      if (hasEN) {
        enBlocks.forEach(show);
        vfBlocks.forEach(hide);
      } else {
        vfBlocks.forEach(show);
        enBlocks.forEach(hide);
      }
    } else if (hasVF) {
      vfBlocks.forEach(show);
      enBlocks.forEach(hide);
    } else {
      enBlocks.forEach(show);
      vfBlocks.forEach(hide);
    }
  }

  function init() {
    toggleBlocks();
    if (window.Weglot && typeof Weglot.on === "function") {
      try {
        Weglot.on("initialized", toggleBlocks);
        Weglot.on("languageChanged", toggleBlocks);
      } catch (e) {}
    }
    setTimeout(toggleBlocks, 600);
    window.addEventListener("load", toggleBlocks);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
