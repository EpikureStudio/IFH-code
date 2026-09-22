/* =========================================================
   Event template (CMS) — related events filter
   Hosted at https://ifh-code.pages.dev/pages/evenement.js

   Structure:
     <div filtre="JPO Hôtellerie & Restauration - FR">
       <div attribute="..." class="event_card">...</div>
       <div attribute="..." class="event_card">...</div>
     </div>

   Shows only items whose [attribute] matches the parent [filtre].
   ========================================================= */

(function () {
  function normalize(value) {
    if (!value) return "";
    return String(value)
      .replace(/\u00a0/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .toLowerCase();
  }

  function filterGroup(wrapper) {
    var filtre = normalize(wrapper.getAttribute("filtre"));
    if (!filtre) return;

    var items = wrapper.querySelectorAll("[attribute]");
    var visible = 0;

    items.forEach(function (item) {
      var match = normalize(item.getAttribute("attribute")) === filtre;
      item.classList.toggle("is-filtre-hidden", !match);
      item.hidden = !match;
      if (match) visible += 1;
    });

    wrapper.classList.toggle("is-filtre-empty", visible === 0);
  }

  function init() {
    var wrappers = document.querySelectorAll("[filtre]");
    if (!wrappers.length) return;
    wrappers.forEach(filterGroup);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
