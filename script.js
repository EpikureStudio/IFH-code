/* =========================================================
   IFH — Main scripts
   Hosted at https://ifh-code.pages.dev/script.js
   Load at end of Webflow <body>
   ========================================================= */

window.IFH = window.IFH || {};
window.IFH.supportedLangs = ["fr", "en", "es", "hi", "zh"];

window.IFH.getCurrentLang = function () {
  var parts = window.location.pathname.split("/").filter(Boolean);
  var first = parts[0] && parts[0].toLowerCase();

  if (window.IFH.supportedLangs.indexOf(first) !== -1) return first;

  var htmlLang = (document.documentElement.lang || "").toLowerCase();

  if (htmlLang.indexOf("fr") === 0) return "fr";
  if (htmlLang.indexOf("en") === 0) return "en";
  if (htmlLang.indexOf("es") === 0) return "es";
  if (htmlLang.indexOf("hi") === 0) return "hi";
  if (htmlLang.indexOf("zh") === 0) return "zh";

  return "fr";
};

window.IFH.getDisplayLang = function () {
  return window.IFH.getCurrentLang() === "fr" ? "fr" : "en";
};

window.IFH.getLangPrefix = function () {
  return "/" + window.IFH.getCurrentLang();
};

window.IFH.stripLangFromPath = function (pathname) {
  var parts = pathname.split("/").filter(Boolean);
  if (window.IFH.supportedLangs.indexOf(parts[0]) !== -1) parts.shift();
  return parts;
};

/* =========================================================
   BREADCRUMB
   ========================================================= */

window.addEventListener("DOMContentLoaded", function () {
  var breadcrumb = document.querySelector(".ariane-inside");
  if (!breadcrumb) return;

  var translations = {
    fr: {
      "": "IFH école hôtelière",
      "nos-evenements": "Nos évènements",
      "adn-de-lecole": "L'école",
      "le-mot-du-directeur": "Le mot du directeur",
      "offres-de-stages-alternances": "Offres de stages/alternances",
      "le-stage-du-chateau": "Le stage du château",
      "vie-de-campus": "Vie de campus",
      "espace-entreprise": "Espace entreprise",
      "politique-de-confidentialite": "Politique de confidentialité",
      "mentions-legales": "Mentions légales",
      "contactez-nous": "Contactez-nous",
      "nos-diplomes": "Nos programmes",
      "nos-programmes": "Nos programmes",
      "services-aux-etudiants": "Services aux étudiants",
      articles: "Blog",
      blog: "Blog",
      candidature: "Candidature",
      "formations-professionnelles": "Formations professionnelles"
    },
    en: {
      "": "IFH Hospitality School",
      "nos-evenements": "Our Events",
      "adn-de-lecole": "About the Institute",
      "le-mot-du-directeur": "A word from the Director",
      "offres-de-stages-alternances": "Job opportunities",
      "le-stage-du-chateau": "The Château Experience",
      "vie-de-campus": "Campus life",
      "espace-entreprise": "For companies",
      "politique-de-confidentialite": "Privacy Policy",
      "mentions-legales": "Legal Notice",
      "contactez-nous": "Contact us",
      "nos-diplomes": "Our Programs",
      "nos-programmes": "Our Programs",
      "services-aux-etudiants": "Student Services",
      articles: "Blog",
      blog: "Blog",
      candidature: "Apply",
      "formations-professionnelles": "Professional training"
    },
    es: {
      "": "Escuela de hostelería IFH",
      "nos-evenements": "Nuestros eventos",
      "adn-de-lecole": "La escuela",
      "le-mot-du-directeur": "Palabras del director",
      "offres-de-stages-alternances": "Ofertas de prácticas y alternancia",
      "le-stage-du-chateau": "La experiencia del castillo",
      "vie-de-campus": "Vida en el campus",
      "espace-entreprise": "Espacio empresa",
      "politique-de-confidentialite": "Política de privacidad",
      "mentions-legales": "Aviso legal",
      "contactez-nous": "Contáctanos",
      "nos-diplomes": "Nuestros programas",
      "nos-programmes": "Nuestros programas",
      "services-aux-etudiants": "Servicios para estudiantes",
      articles: "Blog",
      blog: "Blog",
      candidature: "Solicitud",
      "formations-professionnelles": "Formación profesional"
    },
    hi: {
      "": "IFH हॉस्पिटैलिटी स्कूल",
      "nos-evenements": "हमारे कार्यक्रम",
      "adn-de-lecole": "स्कूल",
      "le-mot-du-directeur": "निदेशक का संदेश",
      "offres-de-stages-alternances": "इंटर्नशिप और अप्रेंटिसशिप अवसर",
      "le-stage-du-chateau": "शातो अनुभव",
      "vie-de-campus": "कैंपस जीवन",
      "espace-entreprise": "कंपनियों के लिए",
      "politique-de-confidentialite": "गोपनीयता नीति",
      "mentions-legales": "कानूनी सूचना",
      "contactez-nous": "संपर्क करें",
      "nos-diplomes": "हमारे कार्यक्रम",
      "nos-programmes": "हमारे कार्यक्रम",
      "services-aux-etudiants": "छात्र सेवाएँ",
      articles: "ब्लॉग",
      blog: "ब्लॉग",
      candidature: "आवेदन",
      "formations-professionnelles": "व्यावसायिक प्रशिक्षण"
    },
    zh: {
      "": "IFH 酒店管理学院",
      "nos-evenements": "我们的活动",
      "adn-de-lecole": "学院介绍",
      "le-mot-du-directeur": "院长致辞",
      "offres-de-stages-alternances": "实习与学徒机会",
      "le-stage-du-chateau": "城堡实习体验",
      "vie-de-campus": "校园生活",
      "espace-entreprise": "企业专区",
      "politique-de-confidentialite": "隐私政策",
      "mentions-legales": "法律声明",
      "contactez-nous": "联系我们",
      "nos-diplomes": "我们的课程",
      "nos-programmes": "我们的课程",
      "services-aux-etudiants": "学生服务",
      articles: "博客",
      blog: "博客",
      candidature: "申请",
      "formations-professionnelles": "职业培训"
    }
  };

  var parentSlugFixes = {
    "nos-diplomes": "nos-programmes",
    articles: "blog"
  };

  var currentLang = window.IFH.getCurrentLang();
  var langPrefix = window.IFH.getLangPrefix();
  var exceptions = translations[currentLang] || translations.en;
  var path = window.IFH.stripLangFromPath(window.location.pathname);

  function getTranslatedPageTitle() {
    var selectors = [
      "[data-breadcrumb-title]",
      "h1",
      ".heading-style-h1",
      ".heading-64",
      ".heading-56",
      ".heading-48"
    ];

    for (var i = 0; i < selectors.length; i++) {
      var el = document.querySelector(selectors[i]);
      var text = el && el.textContent ? el.textContent.trim() : "";
      if (text) return text;
    }

    return "";
  }

  var html = '<a href="' + langPrefix + '">' + exceptions[""] + "</a>";

  path.forEach(function (segment, index) {
    var isLast = index === path.length - 1;
    var realSegments = path.slice(0, index + 1);

    if (parentSlugFixes[segment]) {
      realSegments = realSegments.map(function (seg) {
        return seg === segment ? parentSlugFixes[segment] : seg;
      });
    }

    var realPath = langPrefix + "/" + realSegments.join("/");
    var label =
      exceptions[segment] ||
      decodeURIComponent(segment.replace(/-/g, " ")).replace(/^./, function (c) {
        return c.toUpperCase();
      });

    if (isLast) {
      var pageTitle = getTranslatedPageTitle();
      if (pageTitle) label = pageTitle;
      html += '<span class="separator">›</span><span>' + label + "</span>";
    } else {
      html +=
        '<span class="separator">›</span><a href="' +
        realPath +
        '">' +
        label +
        "</a>";
    }
  });

  breadcrumb.innerHTML = html;
});

/* =========================================================
   CMS FILTER
   ========================================================= */

(function () {
  function filter() {
    var lang = window.IFH.getDisplayLang();

    document.querySelectorAll(".w-dyn-item").forEach(function (item) {
      var el = item.querySelector(".affichage");
      var txt = el ? el.textContent.trim().toUpperCase() : "FR EN";

      var showFR = txt.indexOf("FR") !== -1 || txt === "";
      var showEN = txt.indexOf("EN") !== -1 || txt === "";

      item.style.display = (lang === "fr" ? showFR : showEN) ? "" : "none";
    });
  }

  document.addEventListener("DOMContentLoaded", filter);
  window.addEventListener("load", filter);
})();

/* =========================================================
   SLIDER FILTER
   ========================================================= */

(function () {
  function rebuildSlides(slider, lang) {
    var mask = slider.querySelector(".w-slider-mask");
    if (!mask) return;

    if (!slider._originalSlides) {
      slider._originalSlides = Array.from(mask.children)
        .filter(function (n) {
          return n.classList.contains("w-slide");
        })
        .map(function (n) {
          return n.cloneNode(true);
        });
    }

    var filtered = slider._originalSlides.filter(function (slide) {
      return !slide.classList.contains("no-slide-" + lang);
    });

    mask.innerHTML = "";

    var slidesToUse = filtered.length ? filtered : slider._originalSlides;
    slidesToUse.forEach(function (slide) {
      mask.appendChild(slide.cloneNode(true));
    });

    try {
      Webflow.require("slider").redraw();
    } catch (e) {}
  }

  function apply() {
    var lang = window.IFH.getDisplayLang();

    document.querySelectorAll(".w-slider").forEach(function (slider) {
      rebuildSlides(slider, lang);
    });
  }

  document.addEventListener("DOMContentLoaded", apply);
  window.addEventListener("load", apply);
})();

/* =========================================================
   LANGUAGE SWITCHER
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {
  var localeList = document.querySelector(".w-locales-list");
  if (!localeList) return;

  var links = Array.from(localeList.querySelectorAll(".w-locales-item a"));
  if (!links.length) return;

  var flagMap = {
    fr: "https://cdn.weglot.com/flags/square/fr.svg",
    en: "https://cdn.weglot.com/flags/square/gb.svg",
    es: "https://cdn.weglot.com/flags/square/es.svg",
    hi: "https://cdn.weglot.com/flags/square/in.svg",
    zh: "https://cdn.weglot.com/flags/square/cn.svg"
  };

  function getLang(link) {
    var href = new URL(link.href, window.location.origin);
    var firstPath = href.pathname.split("/").filter(Boolean)[0];
    return window.IFH.supportedLangs.indexOf(firstPath) !== -1 ? firstPath : "fr";
  }

  var current =
    links.find(function (link) {
      return getLang(link) === window.IFH.getCurrentLang();
    }) || links[0];

  var currentLang = getLang(current);

  var wrapper = document.createElement("div");

  var button = document.createElement("div");
  button.className = "w-locales-button";
  button.innerHTML =
    '<img src="' +
    flagMap[currentLang] +
    '" class="wg-flag-look">' +
    '<span class="w-locales-code">' +
    currentLang.toUpperCase() +
    "</span>" +
    '<span class="w-locales-arrow">▾</span>';

  var dropdown = document.createElement("div");
  dropdown.className = "w-locales-dropdown";

  links.forEach(function (link) {
    var lang = getLang(link);
    if (lang === currentLang) return;

    var a = document.createElement("a");
    a.href = link.href;
    a.className = "w-locales-option";
    a.innerHTML =
      '<img src="' +
      flagMap[lang] +
      '" class="wg-flag-look">' +
      '<span class="w-locales-code">' +
      lang.toUpperCase() +
      "</span>";
    dropdown.appendChild(a);
  });

  wrapper.appendChild(button);
  wrapper.appendChild(dropdown);
  localeList.appendChild(wrapper);

  button.onclick = function () {
    localeList.classList.toggle("is-open");
  };

  document.addEventListener("click", function (e) {
    if (!localeList.contains(e.target)) {
      localeList.classList.remove("is-open");
    }
  });
});

/* =========================================================
   NAVBAR DROPDOWNS
   Desktop + tablet + mobile — smooth open/close, one at a time
   ========================================================= */

window.Webflow = window.Webflow || [];

window.Webflow.push(function () {
  function prepareMenu(menu) {
    if (!menu) return;

    menu.style.display = "block";
    menu.style.maxHeight = "0px";
    menu.style.opacity = "0";
    menu.style.overflow = "hidden";
    menu.style.transform = "translateY(-8px)";
    menu.style.pointerEvents = "none";
    menu.style.transition =
      "max-height 0.35s ease, opacity 0.25s ease, transform 0.35s ease";
  }

  function smoothClose(menu, chevron, wrapper) {
    if (!menu) return;

    menu.style.maxHeight = menu.scrollHeight + "px";

    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        menu.style.maxHeight = "0px";
        menu.style.opacity = "0";
        menu.style.transform = "translateY(-8px)";
        menu.style.pointerEvents = "none";
      });
    });

    if (chevron) {
      chevron.style.transition = "transform 0.3s ease";
      chevron.style.transform = "rotateX(0deg)";
    }

    if (wrapper) wrapper.classList.remove("is-open");
  }

  function smoothOpen(menu, chevron, wrapper) {
    if (!menu) return;

    menu.style.display = "block";
    menu.style.pointerEvents = "auto";

    var height = menu.scrollHeight;

    requestAnimationFrame(function () {
      menu.style.maxHeight = height + "px";
      menu.style.opacity = "1";
      menu.style.transform = "translateY(0px)";
    });

    if (chevron) {
      chevron.style.transition = "transform 0.3s ease";
      chevron.style.transform = "rotateX(180deg)";
    }

    if (wrapper) wrapper.classList.add("is-open");
  }

  /* Desktop */
  var desktopDropdowns = document.querySelectorAll(
    ".navbar_desktop .nav_menu_open"
  );

  desktopDropdowns.forEach(function (dropdown) {
    var trigger = dropdown.querySelector(":scope > .nav_link");
    var menu = dropdown.querySelector(":scope > .open_menu");
    var chevron = dropdown.querySelector(":scope > .nav_link .chevron_icon");

    if (!trigger || !menu) return;

    trigger.removeAttribute("data-w-id");
    prepareMenu(menu);
    dropdown.classList.remove("is-open");

    if (chevron) {
      chevron.style.transition = "transform 0.3s ease";
      chevron.style.transform = "rotateX(0deg)";
    }

    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      var wasOpen = dropdown.classList.contains("is-open");

      desktopDropdowns.forEach(function (other) {
        if (other === dropdown) return;
        smoothClose(
          other.querySelector(":scope > .open_menu"),
          other.querySelector(":scope > .nav_link .chevron_icon"),
          other
        );
      });

      if (wasOpen) {
        smoothClose(menu, chevron, dropdown);
      } else {
        smoothOpen(menu, chevron, dropdown);
      }
    });
  });

  /* Tablet / mobile */
  var mobileDropdowns = document.querySelectorAll(
    ".nav-menu .menu-link-container:has(> .nav--drop-top)"
  );

  mobileDropdowns.forEach(function (dropdown) {
    var trigger = dropdown.querySelector(":scope > .nav--drop-top");
    var menu = dropdown.querySelector(":scope > .nav--drop_inside");
    var chevron = dropdown.querySelector(
      ":scope > .nav--drop-top .chevron_icon"
    );

    if (!trigger || !menu) return;

    trigger.removeAttribute("data-w-id");
    if (chevron) chevron.removeAttribute("data-w-id");

    prepareMenu(menu);
    dropdown.classList.remove("is-open");

    if (chevron) {
      chevron.style.transition = "transform 0.3s ease";
      chevron.style.transform = "rotateX(0deg)";
    }

    trigger.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      var wasOpen = dropdown.classList.contains("is-open");

      mobileDropdowns.forEach(function (other) {
        if (other === dropdown) return;
        smoothClose(
          other.querySelector(":scope > .nav--drop_inside"),
          other.querySelector(":scope > .nav--drop-top .chevron_icon"),
          other
        );
      });

      if (wasOpen) {
        smoothClose(menu, chevron, dropdown);
      } else {
        smoothOpen(menu, chevron, dropdown);
      }
    });
  });
});
