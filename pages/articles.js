/* =========================================================
   Articles template — social share links
   ========================================================= */

(function () {
  function shareToFacebook(btn, link) {
    btn.setAttribute("target", "_blank");
    btn.setAttribute(
      "href",
      "https://www.facebook.com/sharer/sharer.php?u=" + link
    );
  }

  function shareToTwitter(btn, link) {
    btn.setAttribute("target", "_blank");
    btn.setAttribute("href", "https://twitter.com/share?url=" + link);
  }

  function shareToLinkedIn(btn, link) {
    btn.setAttribute("target", "_blank");
    btn.setAttribute(
      "href",
      "https://www.linkedin.com/sharing/share-offsite/?url=" + link
    );
  }

  function socialShare(platform, btn, link) {
    if (!btn) return;
    if (platform === "facebook") shareToFacebook(btn, link);
    else if (platform === "twitter") shareToTwitter(btn, link);
    else if (platform === "linkedin") shareToLinkedIn(btn, link);
  }

  var btns = {
    linkedin: document.querySelector('[data-social="linkedin"]'),
    twitter: document.querySelector('[data-social="twitter"]')
  };

  var link = window.location.href;

  for (var key in btns) {
    if (btns.hasOwnProperty(key)) {
      socialShare(key, btns[key], link);
    }
  }
})();
