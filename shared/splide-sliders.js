/* =========================================================
   IFH — Shared Splide sliders (.splide--team / .splide--founders)
   Requires Splide + jQuery
   ========================================================= */

(function () {
  function mountTeam() {
    var splides = $(".splide--team");
    for (var i = 0; i < splides.length; i++) {
      new Splide(splides[i], {
        perPage: 4,
        perMove: 1,
        focus: "center",
        type: "loop",
        gap: "4.6875em",
        arrows: "slider",
        pagination: "false",
        speed: 1500,
        dragAngleThreshold: 30,
        autoWidth: false,
        rewind: false,
        rewindSpeed: 400,
        waitForTransition: false,
        updateOnMove: true,
        trimSpace: false,
        breakpoints: {
          991: { perPage: 4 },
          767: { perPage: 3 },
          479: { perPage: 2 }
        }
      }).mount();
    }
  }

  function mountFounders() {
    var splides = $(".splide--founders");
    for (var i = 0; i < splides.length; i++) {
      new Splide(splides[i], {
        perPage: 1,
        perMove: 1,
        focus: "center",
        type: "loop",
        gap: "4.6875em",
        arrows: "slider",
        pagination: "false",
        speed: 1500,
        dragAngleThreshold: 30,
        autoWidth: false,
        rewind: false,
        rewindSpeed: 400,
        waitForTransition: false,
        updateOnMove: true,
        trimSpace: false,
        breakpoints: {
          991: {},
          767: {},
          479: {}
        }
      }).mount();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      mountTeam();
      mountFounders();
    });
  } else {
    mountTeam();
    mountFounders();
  }
})();
