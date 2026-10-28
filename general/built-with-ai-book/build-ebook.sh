#!/usr/bin/env bash
# Builds a clean Kindle-ready EPUB from the drafts.
# Usage: bash build-ebook.sh [output.epub]   (default: build/built-with-ai-no-coding.epub)
# Removes the owner checklists (<!-- -->), the typed title block and the typed Contents list
# (the EPUB gets a real, linked Contents instead), then checks every internal link.
set -euo pipefail
cd "$(dirname "$0")"
OUT="${1:-build/built-with-ai-no-coding.epub}"
mkdir -p "$(dirname "$OUT")"
TMP="$(mktemp -d)"
python3 - "$TMP/book.md" <<'PY'
import re,sys
files=['front-matter-draft.md','introduction-draft.md','part-1-draft.md','part-2-draft.md','part-3-draft.md']
t='\n\n'.join(open(f).read() for f in files)
t=re.sub(r'<!--.*?-->\n?','',t,flags=re.S)
# typed title block (title, subtitle, author) -> the EPUB title page replaces it
t=re.sub(r'\A\s*# Built with AI, No Coding\n.*?\n---\n','',t,count=1,flags=re.S)
# typed Contents list -> replaced by the generated, linked Contents
t=re.sub(r'\n## Contents\n.*?(?=\n# )','\n',t,count=1,flags=re.S)
# front and back sections become top-level entries in the Contents
for h in ['Copyright','How This Book Was Written','Notes','Glossary','About the Author','A Request to the Reader']:
    t=re.sub(r'^## '+re.escape(h)+r'$', '# '+h, t, flags=re.M)
open(sys.argv[1],'w').write(t)
PY
cat > "$TMP/meta.yaml" <<'YAML'
title:
  - type: main
    text: "Built with AI, No Coding"
  - type: subtitle
    text: "Real Business Tools, Real Costs and Real Mistakes from a Small-Business Owner in Cambodia"
creator:
  - role: author
    text: "Mak Puthea"
lang: en-GB
rights: "Copyright © 2026 Mak Puthea. All rights reserved."
toc-title: "Contents"
YAML
pandoc "$TMP/book.md" --metadata-file="$TMP/meta.yaml" --resource-path=. \
  --epub-cover-image=cover/cover-final.jpg --toc --toc-depth=2 --split-level=2 -o "$OUT"
# check: every link in the book and in the Contents points to something that exists
python3 - "$OUT" <<'PY'
import re,sys,zipfile,posixpath
z=zipfile.ZipFile(sys.argv[1]); ids={}; links=[]
for n in z.namelist():
    if n.endswith(('.xhtml','.ncx')):
        s=z.read(n).decode()
        ids[n]=set(re.findall(r'\bid="([^"]+)"',s))
        for h in re.findall(r'(?:href|src)="([^"#:]*#[^"]+)"',s): links.append((n,h))
bad=[]
for n,h in links:
    f,a=h.split('#',1)
    target=posixpath.normpath(posixpath.join(posixpath.dirname(n),f)) if f else n
    if a not in ids.get(target,set()): bad.append((n,h))
print(f"{sys.argv[1]}: {len(links)} internal links checked, {len(bad)} broken")
for b in bad[:20]: print('  BROKEN',*b)
sys.exit(1 if bad else 0)
PY
rm -rf "$TMP"
