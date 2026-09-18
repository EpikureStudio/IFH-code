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

/* =========================================================
   Keep only critical preconnects (CDN images + font files)
   ========================================================= */
(function () {
  var keep = {
    "https://cdn.prod.website-files.com": true,
    "https://fonts.gstatic.com": true
  };

  function trimPreconnects() {
    var links = document.querySelectorAll(
      'link[rel="preconnect"], link[rel="dns-prefetch"]'
    );
    for (var i = 0; i < links.length; i++) {
      var href = (links[i].getAttribute("href") || "").replace(/\/$/, "");
      if (!keep[href] && links[i].parentNode) {
        links[i].parentNode.removeChild(links[i]);
      }
    }
  }

  trimPreconnects();

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", trimPreconnects);
  }
})();

/* =========================================================
   Image loading: hero / above-the-fold → eager, rest → lazy
   ========================================================= */
(function () {
  var HERO_ROOT =
    ".home-slider, .hero_slider, .hero_div, .hero, .hero-slide, .hero_slide, .title_bar, .w-nav-brand, .navbar_desktop, .header_div, .header, .nav-city-img";

  function inHero(img) {
    try {
      if (img.closest(HERO_ROOT)) return true;
    } catch (e) {}

    var cls = typeof img.className === "string" ? img.className : "";
    if (/\bpartner_logo\b|\blogo_carousel\b|\blogo_gem\b|\blogo_qualiopi\b/.test(cls)) {
      return false;
    }
    if (/\blogo\b/.test(cls) || /\bimage-absolue-100\b/.test(cls)) {
      return true;
    }
    return false;
  }

  function setLoading(img, eager) {
    if (!(img instanceof HTMLImageElement)) return;
    if (eager) {
      img.setAttribute("loading", "eager");
    } else {
      img.setAttribute("loading", "lazy");
      if (img.getAttribute("fetchpriority") === "high") {
        img.removeAttribute("fetchpriority");
      }
    }
  }

  function applyEarly(img) {
    setLoading(img, inHero(img));
  }

  var observer = new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      var nodes = mutations[i].addedNodes;
      for (var j = 0; j < nodes.length; j++) {
        var node = nodes[j];
        if (node.nodeType !== 1) continue;
        if (node.tagName === "IMG") {
          applyEarly(node);
          continue;
        }
        if (!node.querySelectorAll) continue;
        var imgs = node.querySelectorAll("img");
        for (var k = 0; k < imgs.length; k++) applyEarly(imgs[k]);
      }
    }
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });

  function finalize() {
    var vh = window.innerHeight || 800;
    var imgs = document.images;
    var lcpSet = false;

    for (var i = 0; i < imgs.length; i++) {
      var img = imgs[i];
      var rect = img.getBoundingClientRect();
      var visible =
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.top < vh + 80;
      var eager = visible || inHero(img);
      setLoading(img, eager);

      if (
        eager &&
        !lcpSet &&
        rect.width * rect.height >= 20000 &&
        (inHero(img) || visible)
      ) {
        img.setAttribute("fetchpriority", "high");
        lcpSet = true;
      }
    }
  }

  function runFinalize() {
    requestAnimationFrame(function () {
      requestAnimationFrame(finalize);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", runFinalize);
  } else {
    runFinalize();
  }
})();
