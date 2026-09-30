// Pathshala School of Education — shared site behaviour

document.addEventListener('DOMContentLoaded', function () {

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      toggle.textContent = isOpen ? 'Close' : 'Menu';
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        toggle.textContent = 'Menu';
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* Gallery category filter (gallery.html) */
  var tabs = document.querySelectorAll('.gallery-tabs button');
  var tiles = document.querySelectorAll('.gallery-tile');
  if (tabs.length && tiles.length) {
    tabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        tabs.forEach(function (t) { t.classList.remove('active'); });
        tab.classList.add('active');
        var category = tab.getAttribute('data-category');
        tiles.forEach(function (tile) {
          var match = category === 'all' || tile.getAttribute('data-category') === category;
          tile.style.display = match ? '' : 'none';
        });
      });
    });
  }

  /* Contact / admission enquiry form (front-end validation only — no backend connected yet) */
  var form = document.querySelector('#enquiry-form');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var required = form.querySelectorAll('[required]');
      var valid = true;
      required.forEach(function (field) {
        if (!field.value.trim()) { valid = false; }
      });
      var emailField = form.querySelector('#email');
      if (emailField && emailField.value && !/^\S+@\S+\.\S+$/.test(emailField.value)) {
        valid = false;
      }
      status.classList.remove('ok', 'err');
      if (valid) {
        status.textContent = 'Thank you. Your enquiry has been noted — the school office will contact you shortly.';
        status.classList.add('show', 'ok');
        form.reset();
      } else {
        status.textContent = 'Please fill in all required fields with a valid email address.';
        status.classList.add('show', 'err');
      }
    });
  }

});
