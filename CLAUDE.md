# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Static marketing/landing page for the Snippets product suite (CLI, Backend, and upcoming Web/iOS apps). Pure HTML/CSS/JS with no build step — designed to be hosted directly from an S3 bucket.

## Development

Preview locally:
```
python3 -m http.server 8080
```
Then open http://localhost:8080. No build, no dependencies, no package manager.

## Architecture

Four files, all in the root:

- **index.html** — Single-page layout with sections: hero (centered, platform tags), philosophy, features, architecture, community, footer. Translatable elements use `data-i18n="key"` attributes.
- **style.css** — Dark theme with CSS custom properties in `:root`. Playfair Display for headings, Inter for body, JetBrains Mono for code. Responsive breakpoints at 1024px, 768px, 480px.
- **i18n.js** — Translation strings for all 24 EU official languages as `window.i18n` object, keyed by two-letter language code (en, de, fr, es, it, pt, nl, sv, da, fi, pl, cs, sk, hu, ro, bg, hr, sl, el, et, lt, lv, ga, mt).
- **main.js** — Language switcher (auto-detects browser language, persists to localStorage), scroll-triggered `.reveal` animations via IntersectionObserver, fixed nav with scroll class, mobile hamburger menu.

## i18n Pattern

To add a new translatable string:
1. Add `data-i18n="section.key"` to the HTML element
2. Add the key with English text to `i18n.js` under `en:`
3. Add translations for all 23 other language blocks

Language switcher reads `data-i18n` attributes and replaces `textContent`. The terminal mockup in the hero section is intentionally not translated (it shows real CLI output).

## Design Tokens

All colors and fonts are CSS custom properties in `:root` — change the theme by editing those values. Key ones: `--bg-primary`, `--accent` (amber/gold), `--text-primary`, `--font-heading`, `--font-body`, `--font-mono`.
