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

/* Point agents to llms.txt (Pages host; prefer apex redirect when configured) */
(function () {
  if (document.querySelector('link[title="llms.txt"]')) return;
  var link = document.createElement("link");
  link.rel = "alternate";
  link.type = "text/plain";
  link.title = "llms.txt";
  link.href = "https://ifh-code.pages.dev/llms.txt";
  document.head.appendChild(link);
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
   Partner marquee logos always lazy (CSS animation unchanged)
   ========================================================= */
(function () {
  var HERO_ROOT =
    ".home-slider, .hero_slider, .hero_div, .hero, .hero-slide, .hero_slide, .title_bar, .w-nav-brand, .navbar_desktop, .header_div, .header, .nav-city-img";

  function className(el) {
    return typeof el.className === "string" ? el.className : "";
  }

  function isPartnerLogo(img) {
    return /\bpartner_logo\b/.test(className(img));
  }

  function inHero(img) {
    if (isPartnerLogo(img)) return false;

    try {
      if (img.closest(HERO_ROOT)) return true;
    } catch (e) {}

    var cls = className(img);
    if (/\blogo_carousel\b|\blogo_gem\b|\blogo_qualiopi\b/.test(cls)) {
      return false;
    }
    if (/\blogo\b/.test(cls) || /\bimage-absolue-100\b/.test(cls)) {
      return true;
    }
    return false;
  }

  function setLoading(img, eager) {
    if (!(img instanceof HTMLImageElement)) return;
    if (isPartnerLogo(img)) {
      eager = false;
    }
    if (eager) {
      img.setAttribute("loading", "eager");
    } else {
      img.setAttribute("loading", "lazy");
      img.setAttribute("decoding", "async");
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

      if (isPartnerLogo(img)) {
        setLoading(img, false);
        continue;
      }

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

    // Stop watching — avoids ongoing main-thread cost after first paint
    try {
      observer.disconnect();
    } catch (e) {}
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

/* =========================================================
   Pause partner marquee CSS animation while off-screen
   (identical look while visible; frees main thread / GPU)
   ========================================================= */
(function () {
  function setup() {
    var carousels = document.querySelectorAll(".logo_carousel");
    if (!carousels.length || !("IntersectionObserver" in window)) return;

    var io = new IntersectionObserver(
      function (entries) {
        for (var i = 0; i < entries.length; i++) {
          var el = entries[i].target;
          el.style.animationPlayState = entries[i].isIntersecting
            ? "running"
            : "paused";
        }
      },
      { rootMargin: "100px 0px", threshold: 0 }
    );

    for (var i = 0; i < carousels.length; i++) {
      io.observe(carousels[i]);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
