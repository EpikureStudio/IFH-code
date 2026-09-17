/* =========================================================
   IFH — Shared intl-tel-input init
   Supports:
   - .int-phone  → #full_phone + #country
   - #full-phoneN → #full-phoneN_hidden + #full-phoneN_country
   ========================================================= */

(function () {
  function initBySelector() {
    var input = document.querySelector(".int-phone");
    if (!input || !window.intlTelInput || input.hasAttribute("data-intl-initialized")) {
      return;
    }

    var iti = window.intlTelInput(input, {
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
      separateDialCode: true,
      initialCountry: "fr"
    });

    input.setAttribute("data-intl-initialized", "true");

    input.addEventListener("input", function () {
      var fullPhoneField = document.getElementById("full_phone");
      var countryField = document.getElementById("country");
      if (fullPhoneField) fullPhoneField.value = iti.getNumber();
      if (countryField) countryField.value = iti.getSelectedCountryData().name;
    });
  }

  function initById(id) {
    var input = document.getElementById(id);
    if (!input || !window.intlTelInput || input.hasAttribute("data-intl-initialized")) {
      return;
    }

    var iti = window.intlTelInput(input, {
      utilsScript:
        "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
      separateDialCode: true,
      initialCountry: "fr"
    });

    input.setAttribute("data-intl-initialized", "true");

    input.addEventListener("input", function () {
      var fullPhoneField = document.getElementById(id + "_hidden");
      var countryField = document.getElementById(id + "_country");
      if (fullPhoneField) fullPhoneField.value = iti.getNumber();
      if (countryField) countryField.value = iti.getSelectedCountryData().name;
    });
  }

  function initAll() {
    initBySelector();
    ["full-phone1", "full-phone2", "full-phone3"].forEach(initById);
  }

  document.addEventListener("DOMContentLoaded", function () {
    initAll();

    var observer = new MutationObserver(function () {
      initAll();
    });
    observer.observe(document.body, { childList: true, subtree: true });
  });
})();
