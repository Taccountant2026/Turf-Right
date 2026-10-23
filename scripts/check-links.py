"""Check built pages and local assets against the store's configured origin."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote, urljoin
import sys, re
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parent.parent
BASE = re.search(r"baseUrl:\s*'([^']+)'", (ROOT/'catalogue.mjs').read_text()).group(1)
BASE_URL = urlsplit(BASE)
class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(convert_charrefs=True)
        self.refs, self.ids, self.labels, self.controls = [], set(), [], []
        self.h1, self.titles, self.canonical = 0, 0, None
        self.feed(text)
    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if 'id' in a:
            if a['id'] in self.ids: raise AssertionError('duplicate id: '+a['id'])
            self.ids.add(a['id'])
        if tag == 'h1': self.h1 += 1
        if tag == 'title': self.titles += 1
        if tag == 'label' and 'for' in a: self.labels.append(a['for'])
        if tag == 'link' and a.get('rel') == 'canonical': self.canonical = a.get('href')
        if tag in ('a', 'link') and 'href' in a: self.refs.append(a['href'])
        if tag in ('script', 'img') and 'src' in a: self.refs.append(a['src'])
        if tag == 'img': assert 'alt' in a, 'image missing alt'

files = sorted(p for p in ROOT.rglob('*.html') if not any(part.startswith('.') for part in p.relative_to(ROOT).parts))
pages = {p: Page(p.read_text()) for p in files}
links = 0
for path, page in pages.items():
    rel = path.relative_to(ROOT).as_posix()
    assert page.h1 == 1 and page.titles == 1, rel+' needs one title and h1'
    expected = BASE + ('' if rel == 'index.html' else rel)
    assert page.canonical == expected, rel+' incorrect canonical'
    for label in page.labels: assert label in page.ids, rel+' label target missing: '+label
    for ref in page.refs:
        url = urlsplit(urljoin(BASE+rel, ref))
        assert url.scheme in ('https', 'http', 'mailto'), rel+' unsafe or empty link: '+ref
        if url.netloc != BASE_URL.netloc: continue
        assert url.path.startswith(BASE_URL.path), rel+' escaped the site path: '+ref
        suffix = unquote(url.path.removeprefix(BASE_URL.path)) or 'index.html'
        target = (ROOT / suffix).resolve()
        assert target.is_relative_to(ROOT) and target.is_file(), rel+' broken link: '+ref
        if url.fragment and target in pages: assert unquote(url.fragment) in pages[target].ids, rel+' missing anchor: '+ref
        links += 1
namespace = {'s': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
sitemap_urls = {node.text for node in ET.parse(ROOT/'sitemap.xml').findall('s:url/s:loc', namespace)}
expected_urls = {BASE + ('' if p.name == 'index.html' else p.relative_to(ROOT).as_posix()) for p in files if p.name not in ('404.html', 'checkout.html')}
assert sitemap_urls == expected_urls, 'sitemap must cover every public page and no missing pages'
assert len(list((ROOT/'products').glob('*.html'))) == 18
assert not any('type="password"' in p.read_text() or 'stripe.com' in p.read_text() for p in files), 'closed shop must not collect a payment'
print(f'Checked {len(files)} pages, {links} internal links/assets, labels, image text and configured domain paths.')
