(function () {
  'use strict';

  /* --- Language Switcher --- */
  const LANGUAGES = [
    { code: 'en', name: 'English' },
    { code: 'bg', name: 'Български' },
    { code: 'cs', name: 'Čeština' },
    { code: 'da', name: 'Dansk' },
    { code: 'de', name: 'Deutsch' },
    { code: 'el', name: 'Ελληνικά' },
    { code: 'es', name: 'Español' },
    { code: 'et', name: 'Eesti' },
    { code: 'fi', name: 'Suomi' },
    { code: 'fr', name: 'Français' },
    { code: 'ga', name: 'Gaeilge' },
    { code: 'hr', name: 'Hrvatski' },
    { code: 'hu', name: 'Magyar' },
    { code: 'it', name: 'Italiano' },
    { code: 'lt', name: 'Lietuvių' },
    { code: 'lv', name: 'Latviešu' },
    { code: 'mt', name: 'Malti' },
    { code: 'nl', name: 'Nederlands' },
    { code: 'pl', name: 'Polski' },
    { code: 'pt', name: 'Português' },
    { code: 'ro', name: 'Română' },
    { code: 'sk', name: 'Slovenčina' },
    { code: 'sl', name: 'Slovenščina' },
    { code: 'sv', name: 'Svenska' },
  ];

  const dropdown = document.getElementById('lang-dropdown');
  const langBtn = document.getElementById('lang-btn');
  const switcher = document.getElementById('lang-switcher');
  const currentLangEl = document.getElementById('current-lang');

  // Build dropdown
  LANGUAGES.forEach(function (l) {
    var opt = document.createElement('div');
    opt.className = 'lang-option';
    opt.dataset.lang = l.code;
    opt.textContent = l.name;
    opt.addEventListener('click', function () {
      setLanguage(l.code);
      switcher.classList.remove('open');
    });
    dropdown.appendChild(opt);
  });

  langBtn.addEventListener('click', function (e) {
    e.stopPropagation();
    switcher.classList.toggle('open');
  });

  document.addEventListener('click', function () {
    switcher.classList.remove('open');
  });

  dropdown.addEventListener('click', function (e) {
    e.stopPropagation();
  });

  function setLanguage(lang) {
    if (!window.i18n || !window.i18n[lang]) lang = 'en';
    var strings = window.i18n[lang];

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (strings[key]) {
        if (el.tagName === 'TITLE') {
          document.title = strings[key];
        } else {
          el.textContent = strings[key];
        }
      }
    });

    document.documentElement.lang = lang;
    currentLangEl.textContent = lang.toUpperCase();
    localStorage.setItem('snippets-lang', lang);

    // Update active state
    dropdown.querySelectorAll('.lang-option').forEach(function (opt) {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });
  }

  // Detect initial language
  function detectLanguage() {
    var stored = localStorage.getItem('snippets-lang');
    if (stored && window.i18n && window.i18n[stored]) return stored;
    var browser = (navigator.language || navigator.userLanguage || 'en').split('-')[0].toLowerCase();
    if (window.i18n && window.i18n[browser]) return browser;
    return 'en';
  }

  // Initialize language after i18n is loaded
  if (window.i18n) {
    setLanguage(detectLanguage());
  }

  /* --- Theme Toggle --- */
  var themeToggle = document.getElementById('theme-toggle');
  var storedTheme = localStorage.getItem('snippets-theme');
  if (storedTheme) {
    document.documentElement.setAttribute('data-theme', storedTheme);
  }

  themeToggle.addEventListener('click', function () {
    var current = document.documentElement.getAttribute('data-theme');
    var next;
    if (!current) {
      next = 'light';
    } else if (current === 'light') {
      next = 'dark';
    } else {
      next = null;
    }
    if (next) {
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('snippets-theme', next);
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('snippets-theme');
    }
  });

  /* --- Nav scroll effect --- */
  var nav = document.getElementById('nav');
  var lastScroll = 0;

  window.addEventListener('scroll', function () {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  /* --- Mobile menu --- */
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* --- Scroll reveal --- */
  var reveals = document.querySelectorAll('.reveal');
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  reveals.forEach(function (el) { observer.observe(el); });

  /* --- Smooth scroll for nav links --- */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = nav.offsetHeight + 16;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });
})();
