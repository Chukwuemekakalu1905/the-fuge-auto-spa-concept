// The Fuge Auto Spa — concept demo
// No third-party code. No tracking. Jobs of this file:
// 1) hamburger menu toggle, 2) solid header background once scrolled,
// 3) turn the quote form into a pre-filled email (mailto) in the
// visitor's own mail app. Nothing is sent anywhere by this script itself.

(function () {
  "use strict";

  // 1) Menu toggle
  var menuBtn = document.getElementById("menu-btn");
  var menuPanel = document.getElementById("menu-panel");
  if (menuBtn && menuPanel) {
    menuBtn.addEventListener("click", function () {
      var open = menuPanel.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
      menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
  }

  // 2) Header: transparent over the hero, solid navy after scrolling.
  var header = document.querySelector(".site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // 3) Hero bubbles parallax (mirrors the original's data-parallax
  // behaviour; decorative only, disabled for reduced-motion).
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (!reduceMotion.matches) {
    var layers = Array.prototype.map.call(
      document.querySelectorAll("[data-parallax]"),
      function (el) {
        var s = parseFloat(el.getAttribute("data-parallax") || "0.08");
        return { el: el, strength: Math.min(Math.max(s, 0.04), 0.15) };
      }
    );
    if (layers.length) {
      var ticking = false;
      var update = function () {
        ticking = false;
        var vh = window.innerHeight;
        layers.forEach(function (layer) {
          var r = layer.el.getBoundingClientRect();
          if (r.bottom < -80 || r.top > vh + 80) return;
          var offset = r.top + r.height / 2 - vh / 2;
          layer.el.style.transform =
            "translate3d(0, " + (-offset * layer.strength).toFixed(1) + "px, 0)";
        });
      };
      var request = function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      };
      window.addEventListener("scroll", request, { passive: true });
      window.addEventListener("resize", request, { passive: true });
      update();
    }
  }

  // 4) Quote form -> mailto
  var form = document.getElementById("quote-form");
  if (!form) return;

  var status = document.getElementById("form-status");

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : "";
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = val("f-name");
    var phone = val("f-phone");
    if (!name || !phone) {
      if (status) status.textContent = "Please add your name and phone number so the shop can reach you.";
      return;
    }

    var topic = val("f-topic") || "Detail quote";
    var vehicle = [val("f-year"), val("f-make"), val("f-model")].filter(Boolean).join(" ");
    var type = val("f-type");
    if (type) vehicle = vehicle ? vehicle + " (" + type + ")" : type;

    var lines = [
      "Name: " + name,
      "Phone: " + phone
    ];
    var email = val("f-email");
    if (email) lines.push("Email: " + email);
    if (vehicle) lines.push("Vehicle: " + vehicle);
    lines.push("Topic: " + topic);
    lines.push("");
    lines.push(val("f-message") || "(no extra details)");

    var href =
      "mailto:thefugeautospa@gmail.com" +
      "?subject=" + encodeURIComponent(topic + " — " + name) +
      "&body=" + encodeURIComponent(lines.join("\n"));

    if (status) {
      status.textContent = "Opening your email app with the request filled in — just press send. Prefer to talk? Call 480-299-5771.";
    }
    window.location.href = href;
  });
})();

/* Scroll reveal — same treatment the original applies via data-reveal.
   Opt-in only: if JS or IntersectionObserver is unavailable, or the
   visitor prefers reduced motion, content simply stays visible. */
(function () {
  if (!("IntersectionObserver" in window)) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;
  document.documentElement.classList.add("js-reveal");
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add("revealed");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });
  els.forEach(function (el) { io.observe(el); });
})();
