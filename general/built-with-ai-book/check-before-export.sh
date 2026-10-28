#!/usr/bin/env bash
# Run before exporting the book for KDP. Lists everything that must not reach readers.
# Usage: bash check-before-export.sh
cd "$(dirname "$0")"
FILES="front-matter-draft.md introduction-draft.md part-1-draft.md part-2-draft.md part-3-draft.md"
fail=0
echo "== Placeholders (⭐) still to fill:"
python3 - $FILES <<'PY' || fail=1
import re,sys
bad=0
for f in sys.argv[1:]:
    t=re.sub(r'<!--.*?-->',lambda m:'\n'*m.group(0).count('\n'),open(f).read(),flags=re.S)
    for i,l in enumerate(t.split('\n'),1):
        if '⭐' in l: print('  ',f,i,l[:110]); bad=1
print('   none' if not bad else '')
sys.exit(bad)
PY
echo "== Owner checklists (<!-- ... -->) still in the files:"
grep -n "<!--" $FILES && fail=1 || echo "   none"
echo "== Unlinked superscript note numbers (should be ^[n](#note-...)^):"
python3 - $FILES <<'PY' || fail=1
import re,sys
bad=0
for f in sys.argv[1:]:
    t=re.sub(r'<!--.*?-->','',open(f).read(),flags=re.S)
    for i,l in enumerate(t.split('\n'),1):
        if re.search('[⁰¹²³⁴⁵⁶⁷⁸⁹]',l): print('  ',f,i,l[:80]); bad=1
print('   none' if not bad else '')
sys.exit(bad)
PY
echo "== Square-bracket notes to the author ([Update ...], [confirm]):"
grep -n -i "\[update\|confirm\]" $FILES && fail=1 || echo "   none"
[ $fail = 0 ] && echo "READY: nothing left to fix." || echo "NOT READY: fix the items above before export."
