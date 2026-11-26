# The Fuge Auto Spa — Concept Redesign Demo

Unsolicited concept redesign demo for The Fuge Auto Spa (Gilbert, AZ).
**This is not the official website.** The official site is
[thefugeautospa.com](https://www.thefugeautospa.com).

Built to show what a rebuilt site looks like when the basics are done right:

- **One price list everywhere.** Washes $11–$22, Signature Interior $150
  ($225 oversize), Exterior $200, Interior & Exterior $400, Platinum
  $800 / $995 oversize, Headlight Restoration $80, Engine Clean $100 —
  the business's own published prices, identical on every page and in the
  booking flow.
- **Working forms.** Quote forms open the visitor's own email app
  (mailto) with the details filled in. No placeholder API keys, no dead
  third-party form endpoints, no data stored by the site.
- **Memberships up front.** Unlimited tiers presented in the business's
  published $21–$95/mo range (tier names/prices are concept placeholders).
- **Honest reviews.** Real aggregate (~4.4 stars, ~40 Google reviews)
  with a link to the live listing instead of cherry-picked quotes.
- **One address, one phone number**, everywhere: 615 West Ray Road,
  Suite A, Gilbert, AZ 85233 · 480-299-5771.
- **Header that never covers content, visible hero, no cookie banner**
  over the buttons. No cookies are set at all.

## Security posture (GitHub Pages, no custom domain)

This demo is built to the tightest standard GitHub Pages allows:

- Strict Content Security Policy via meta tag on every page:
  `default-src 'self'; script-src 'self'; style-src 'self';
  img-src 'self' data:; font-src 'self'; connect-src 'none';
  form-action 'self' mailto:; object-src 'none'; base-uri 'self';
  upgrade-insecure-requests` — no `'unsafe-inline'` anywhere; all CSS
  and JS are external files; no inline scripts, styles, or handlers.
- **Zero third-party resources**: no analytics, no maps embed, no
  external fonts, no CDNs. Booking, directions, and reviews are plain
  outbound links with `rel="noopener noreferrer"`.
- No Subresource Integrity attributes (removed deliberately: on
  GitHub Pages they caused stale-cache stylesheet rejection during
  deploys; the strict CSP already restricts everything to same-origin).
- Referrer-Policy meta: `strict-origin-when-cross-origin`.
- Real `404.html` (GitHub Pages serves it with a 404 status) instead of
  a soft-404 catch-all.
- `.well-known/security.txt` with a real contact.
- Forms are mailto-only with minimal fields and a privacy note beside
  the form. No external form endpoints.

### What GitHub Pages cannot do

GitHub Pages does not let a site set custom HTTP response headers.
That means the following land only at the custom-domain stage, when
the site moves behind a real host or CDN:

- `Strict-Transport-Security` beyond the default GitHub Pages provides
  on `*.github.io` (no custom max-age, no preload control).
- `X-Frame-Options` and CSP `frame-ancestors` as HTTP headers
  (`frame-ancestors` is ignored when set via a meta tag).
- `X-Content-Type-Options`, `Permissions-Policy`, and
  `Cross-Origin-Opener-Policy` as HTTP headers.
- Email authentication (SPF/DKIM/DMARC) for a business domain — that
  belongs to the domain's DNS, not the demo host.

Everything that *can* be done without a domain is done above.

## Structure

Plain HTML/CSS/JS, no build step:

- `index.html` — home
- `services.html` — full services & pricing
- `memberships.html` — Unlimited plans
- `book.html` — booking + quote form
- `contact.html` — contact + quote form
- `reviews.html` — honest review aggregate
- `car-care-tips.html`, `privacy.html`, `terms.html`
- `404.html` — real not-found page
- `css/styles.css`, `js/main.js` — the only stylesheet and script
- `robots.txt`, `sitemap.xml`, `.well-known/security.txt`, `.nojekyll`

To preview locally: `python3 -m http.server 8000` in this directory,
then open http://localhost:8000.

## Design

The demo deliberately keeps the original site's design language and imagery
(navy/copper palette, Poppins/Inter/Space Mono, same section order and
photos — sources in `assets/SOURCES.md`) so the comparison is apples to
apples: same look, rebuilt underneath. Pages correspond to the original's
page set (home, services, express wash, detailing, book, reviews, about,
FAQ, fleet, contact, car care tips, privacy, terms) plus a memberships
page the original lacks. The header follows the original's model (slim,
transparent over the hero, hamburger menu, sticky bottom Call/Directions
bar on mobile) with one fix: it turns solid on scroll and the hero
carries its own top padding, so the header never covers hero content.

### Deliberate deviations from the original

- **No Google Maps embed.** The original embeds a third-party map iframe
  in the Visit section. The demo keeps the same visual slot but uses a
  static styled panel (address, hours, rating) with an outbound
  directions link — zero third-party resources is a hard rule here.
- **Honest review aggregate.** The original's reviews section implies a
  perfect score; the demo keeps the original's four review cards and
  layout but states the real aggregate (~4.4 stars, ~40 Google reviews)
  with a link to the live listing.
- **No entrance animation.** The original animates hero content in,
  which can leave the headline invisible if anything fails. The demo
  renders all content immediately; nothing depends on animation or JS
  to be visible.
- **No cookie banner.** The demo sets no cookies, so there is nothing
  to consent to.
