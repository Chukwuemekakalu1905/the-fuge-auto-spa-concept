// The Fuge Auto Spa — concept demo
// No third-party code. No tracking. The only job of this file is to turn the
// quote form into a pre-filled email (mailto) in the visitor's own mail app.
// Nothing is sent anywhere by this script itself.

(function () {
  "use strict";

  var form = document.getElementById("quote-form");
  if (!form) return;

  var status = document.getElementById("form-status");

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("f-name").value.trim();
    var phone = document.getElementById("f-phone").value.trim();
    var service = document.getElementById("f-service").value;
    var message = document.getElementById("f-message").value.trim();

    if (!name || !phone) {
      if (status) status.textContent = "Please add your name and phone number so the shop can reach you.";
      return;
    }

    var subject = "Quote request — " + service;
    var body =
      "Name: " + name + "\n" +
      "Phone: " + phone + "\n" +
      "Service: " + service + "\n\n" +
      (message || "(no extra details)");

    var href =
      "mailto:thefugeautospa@gmail.com" +
      "?subject=" + encodeURIComponent(subject) +
      "&body=" + encodeURIComponent(body);

    if (status) {
      status.textContent = "Opening your email app with the request filled in — just press send. Prefer to talk? Call 480-299-5771.";
    }
    window.location.href = href;
  });
})();
