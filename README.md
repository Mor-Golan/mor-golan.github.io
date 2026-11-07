# mor-golan.github.io

Personal site of Mor Golan: red team, penetration testing and bug bounty research.
Built with Jekyll; GitHub Pages builds it on every push to `main`.

## Editing

- **Name, role, bio, photo:** `_config.yml`. Every page reads them from there.
- **Profile links:** `_data/profiles.yml`. They also feed the `sameAs` list in the Person schema.
- **CVEs:** `_data/cves.yml`, newest first. Add `writeup: /research/<slug>/` to link a writeup.
- **Writeups:** add `_posts/YYYY-MM-DD-<slug>.md` with this front matter:

  ```yaml
  ---
  layout: post
  title: "SQL Injection in Transliterator WordPress Plugin (CVE-2026-39732)"
  description: One-sentence summary used for search results and link previews.
  ---
  ```

  It is published at `/research/<slug>/`.

`sitemap.xml` is generated automatically by the `jekyll-sitemap` plugin.
