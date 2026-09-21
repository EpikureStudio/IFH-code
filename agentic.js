/* =========================================================
   IFH — Agentic browsing helpers (WebMCP declarative annotations)
   Hosted at https://ifh-code.pages.dev/agentic.js
   ========================================================= */

(function () {
  function setTool(form, name, description) {
    if (!form) return;
    form.setAttribute("toolname", name);
    form.setAttribute("tooldescription", description);
  }

  function setParam(el, description) {
    if (!el) return;
    el.setAttribute("toolparamdescription", description);
  }

  function annotateCandidature() {
    var form = document.getElementById("wf-form-Candidature");
    if (!form) return;

    setTool(
      form,
      "submit_admission_application",
      "Submit an admission application to Institut Français de l’Hôtellerie (IFH Paris). Collects identity, contact, programme choice, transcripts, CV and GDPR consent."
    );

    setParam(form.querySelector("#Civilite"), "Applicant civility (Monsieur, Madame, Autre)");
    setParam(form.querySelector("#Nom"), "Applicant last name");
    setParam(form.querySelector("#Prenom"), "Applicant first name");
    setParam(form.querySelector("#Mail"), "Applicant email address");
    setParam(form.querySelector("#full-phone2, #phone-6, input[name='Phone']"), "Applicant phone number");
    setParam(form.querySelector("#Code-postal"), "Applicant postal code");
    setParam(
      form.querySelector("#Programme-considere"),
      "Programme the applicant wants to apply for"
    );
    setParam(form.querySelector("#Niveau-etudes"), "Current education level");
    setParam(form.querySelector("#Connaissance-IFH"), "How the applicant discovered IFH");
    setParam(
      form.querySelector("#Consentement-RGPD-2"),
      "Required consent to IFH privacy policy"
    );
  }

  function annotateContactForms() {
    var forms = document.querySelectorAll("form.hs-form, form[data-form-id], .hs-form");
    for (var i = 0; i < forms.length; i++) {
      setTool(
        forms[i],
        "contact_admissions",
        "Contact IFH admissions or student services with a question about programmes, campus or applications."
      );
    }

    var wfContact = document.querySelector(
      'form[data-name="Contact"], form[id*="Contact"], form[id*="contact"]'
    );
    if (wfContact && wfContact.id !== "wf-form-Candidature") {
      setTool(
        wfContact,
        "contact_admissions",
        "Contact IFH admissions with a question about programmes or applications."
      );
    }
  }

  function run() {
    annotateCandidature();
    annotateContactForms();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run);
  } else {
    run();
  }

  // HubSpot embeds late
  window.setTimeout(annotateContactForms, 1500);
  window.setTimeout(annotateContactForms, 4000);
})();
