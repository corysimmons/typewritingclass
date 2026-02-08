---
title: Token Reference
description: Complete reference of all default theme token values.
sidebar:
  order: 3
---

This page lists every default token value shipped with typewritingclass. All tokens are available as named exports from their respective subpath imports.

## Colors

All color palettes are Tailwind CSS-compatible. Each palette is an object with shades from `50` (lightest) to `950` (darkest).

**Import:** `import { blue, red, ... } from 'typewritingclass/theme/colors'`

**Access:** `blue[500]` returns the hex string `'#3b82f6'`.

### Slate

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#f8fafc` | ![](https://via.placeholder.com/16/f8fafc/f8fafc.png) |
| 100 | `#f1f5f9` | ![](https://via.placeholder.com/16/f1f5f9/f1f5f9.png) |
| 200 | `#e2e8f0` | ![](https://via.placeholder.com/16/e2e8f0/e2e8f0.png) |
| 300 | `#cbd5e1` | ![](https://via.placeholder.com/16/cbd5e1/cbd5e1.png) |
| 400 | `#94a3b8` | ![](https://via.placeholder.com/16/94a3b8/94a3b8.png) |
| 500 | `#64748b` | ![](https://via.placeholder.com/16/64748b/64748b.png) |
| 600 | `#475569` | ![](https://via.placeholder.com/16/475569/475569.png) |
| 700 | `#334155` | ![](https://via.placeholder.com/16/334155/334155.png) |
| 800 | `#1e293b` | ![](https://via.placeholder.com/16/1e293b/1e293b.png) |
| 900 | `#0f172a` | ![](https://via.placeholder.com/16/0f172a/0f172a.png) |
| 950 | `#020617` | ![](https://via.placeholder.com/16/020617/020617.png) |

### Gray

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#f9fafb` | ![](https://via.placeholder.com/16/f9fafb/f9fafb.png) |
| 100 | `#f3f4f6` | ![](https://via.placeholder.com/16/f3f4f6/f3f4f6.png) |
| 200 | `#e5e7eb` | ![](https://via.placeholder.com/16/e5e7eb/e5e7eb.png) |
| 300 | `#d1d5db` | ![](https://via.placeholder.com/16/d1d5db/d1d5db.png) |
| 400 | `#9ca3af` | ![](https://via.placeholder.com/16/9ca3af/9ca3af.png) |
| 500 | `#6b7280` | ![](https://via.placeholder.com/16/6b7280/6b7280.png) |
| 600 | `#4b5563` | ![](https://via.placeholder.com/16/4b5563/4b5563.png) |
| 700 | `#374151` | ![](https://via.placeholder.com/16/374151/374151.png) |
| 800 | `#1f2937` | ![](https://via.placeholder.com/16/1f2937/1f2937.png) |
| 900 | `#111827` | ![](https://via.placeholder.com/16/111827/111827.png) |
| 950 | `#030712` | ![](https://via.placeholder.com/16/030712/030712.png) |

### Zinc

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#fafafa` | ![](https://via.placeholder.com/16/fafafa/fafafa.png) |
| 100 | `#f4f4f5` | ![](https://via.placeholder.com/16/f4f4f5/f4f4f5.png) |
| 200 | `#e4e4e7` | ![](https://via.placeholder.com/16/e4e4e7/e4e4e7.png) |
| 300 | `#d4d4d8` | ![](https://via.placeholder.com/16/d4d4d8/d4d4d8.png) |
| 400 | `#a1a1aa` | ![](https://via.placeholder.com/16/a1a1aa/a1a1aa.png) |
| 500 | `#71717a` | ![](https://via.placeholder.com/16/71717a/71717a.png) |
| 600 | `#52525b` | ![](https://via.placeholder.com/16/52525b/52525b.png) |
| 700 | `#3f3f46` | ![](https://via.placeholder.com/16/3f3f46/3f3f46.png) |
| 800 | `#27272a` | ![](https://via.placeholder.com/16/27272a/27272a.png) |
| 900 | `#18181b` | ![](https://via.placeholder.com/16/18181b/18181b.png) |
| 950 | `#09090b` | ![](https://via.placeholder.com/16/09090b/09090b.png) |

### Neutral

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#fafafa` | ![](https://via.placeholder.com/16/fafafa/fafafa.png) |
| 100 | `#f5f5f5` | ![](https://via.placeholder.com/16/f5f5f5/f5f5f5.png) |
| 200 | `#e5e5e5` | ![](https://via.placeholder.com/16/e5e5e5/e5e5e5.png) |
| 300 | `#d4d4d4` | ![](https://via.placeholder.com/16/d4d4d4/d4d4d4.png) |
| 400 | `#a3a3a3` | ![](https://via.placeholder.com/16/a3a3a3/a3a3a3.png) |
| 500 | `#737373` | ![](https://via.placeholder.com/16/737373/737373.png) |
| 600 | `#525252` | ![](https://via.placeholder.com/16/525252/525252.png) |
| 700 | `#404040` | ![](https://via.placeholder.com/16/404040/404040.png) |
| 800 | `#262626` | ![](https://via.placeholder.com/16/262626/262626.png) |
| 900 | `#171717` | ![](https://via.placeholder.com/16/171717/171717.png) |
| 950 | `#0a0a0a` | ![](https://via.placeholder.com/16/0a0a0a/0a0a0a.png) |

### Stone

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#fafaf9` | ![](https://via.placeholder.com/16/fafaf9/fafaf9.png) |
| 100 | `#f5f5f4` | ![](https://via.placeholder.com/16/f5f5f4/f5f5f4.png) |
| 200 | `#e7e5e4` | ![](https://via.placeholder.com/16/e7e5e4/e7e5e4.png) |
| 300 | `#d6d3d1` | ![](https://via.placeholder.com/16/d6d3d1/d6d3d1.png) |
| 400 | `#a8a29e` | ![](https://via.placeholder.com/16/a8a29e/a8a29e.png) |
| 500 | `#78716c` | ![](https://via.placeholder.com/16/78716c/78716c.png) |
| 600 | `#57534e` | ![](https://via.placeholder.com/16/57534e/57534e.png) |
| 700 | `#44403c` | ![](https://via.placeholder.com/16/44403c/44403c.png) |
| 800 | `#292524` | ![](https://via.placeholder.com/16/292524/292524.png) |
| 900 | `#1c1917` | ![](https://via.placeholder.com/16/1c1917/1c1917.png) |
| 950 | `#0c0a09` | ![](https://via.placeholder.com/16/0c0a09/0c0a09.png) |

### Red

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#fef2f2` | ![](https://via.placeholder.com/16/fef2f2/fef2f2.png) |
| 100 | `#fee2e2` | ![](https://via.placeholder.com/16/fee2e2/fee2e2.png) |
| 200 | `#fecaca` | ![](https://via.placeholder.com/16/fecaca/fecaca.png) |
| 300 | `#fca5a5` | ![](https://via.placeholder.com/16/fca5a5/fca5a5.png) |
| 400 | `#f87171` | ![](https://via.placeholder.com/16/f87171/f87171.png) |
| 500 | `#ef4444` | ![](https://via.placeholder.com/16/ef4444/ef4444.png) |
| 600 | `#dc2626` | ![](https://via.placeholder.com/16/dc2626/dc2626.png) |
| 700 | `#b91c1c` | ![](https://via.placeholder.com/16/b91c1c/b91c1c.png) |
| 800 | `#991b1b` | ![](https://via.placeholder.com/16/991b1b/991b1b.png) |
| 900 | `#7f1d1d` | ![](https://via.placeholder.com/16/7f1d1d/7f1d1d.png) |
| 950 | `#450a0a` | ![](https://via.placeholder.com/16/450a0a/450a0a.png) |

### Orange

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#fff7ed` | ![](https://via.placeholder.com/16/fff7ed/fff7ed.png) |
| 100 | `#ffedd5` | ![](https://via.placeholder.com/16/ffedd5/ffedd5.png) |
| 200 | `#fed7aa` | ![](https://via.placeholder.com/16/fed7aa/fed7aa.png) |
| 300 | `#fdba74` | ![](https://via.placeholder.com/16/fdba74/fdba74.png) |
| 400 | `#fb923c` | ![](https://via.placeholder.com/16/fb923c/fb923c.png) |
| 500 | `#f97316` | ![](https://via.placeholder.com/16/f97316/f97316.png) |
| 600 | `#ea580c` | ![](https://via.placeholder.com/16/ea580c/ea580c.png) |
| 700 | `#c2410c` | ![](https://via.placeholder.com/16/c2410c/c2410c.png) |
| 800 | `#9a3412` | ![](https://via.placeholder.com/16/9a3412/9a3412.png) |
| 900 | `#7c2d12` | ![](https://via.placeholder.com/16/7c2d12/7c2d12.png) |
| 950 | `#431407` | ![](https://via.placeholder.com/16/431407/431407.png) |

### Amber

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#fffbeb` | ![](https://via.placeholder.com/16/fffbeb/fffbeb.png) |
| 100 | `#fef3c7` | ![](https://via.placeholder.com/16/fef3c7/fef3c7.png) |
| 200 | `#fde68a` | ![](https://via.placeholder.com/16/fde68a/fde68a.png) |
| 300 | `#fcd34d` | ![](https://via.placeholder.com/16/fcd34d/fcd34d.png) |
| 400 | `#fbbf24` | ![](https://via.placeholder.com/16/fbbf24/fbbf24.png) |
| 500 | `#f59e0b` | ![](https://via.placeholder.com/16/f59e0b/f59e0b.png) |
| 600 | `#d97706` | ![](https://via.placeholder.com/16/d97706/d97706.png) |
| 700 | `#b45309` | ![](https://via.placeholder.com/16/b45309/b45309.png) |
| 800 | `#92400e` | ![](https://via.placeholder.com/16/92400e/92400e.png) |
| 900 | `#78350f` | ![](https://via.placeholder.com/16/78350f/78350f.png) |
| 950 | `#451a03` | ![](https://via.placeholder.com/16/451a03/451a03.png) |

### Yellow

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#fefce8` | ![](https://via.placeholder.com/16/fefce8/fefce8.png) |
| 100 | `#fef9c3` | ![](https://via.placeholder.com/16/fef9c3/fef9c3.png) |
| 200 | `#fef08a` | ![](https://via.placeholder.com/16/fef08a/fef08a.png) |
| 300 | `#fde047` | ![](https://via.placeholder.com/16/fde047/fde047.png) |
| 400 | `#facc15` | ![](https://via.placeholder.com/16/facc15/facc15.png) |
| 500 | `#eab308` | ![](https://via.placeholder.com/16/eab308/eab308.png) |
| 600 | `#ca8a04` | ![](https://via.placeholder.com/16/ca8a04/ca8a04.png) |
| 700 | `#a16207` | ![](https://via.placeholder.com/16/a16207/a16207.png) |
| 800 | `#854d0e` | ![](https://via.placeholder.com/16/854d0e/854d0e.png) |
| 900 | `#713f12` | ![](https://via.placeholder.com/16/713f12/713f12.png) |
| 950 | `#422006` | ![](https://via.placeholder.com/16/422006/422006.png) |

### Lime

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#f7fee7` | ![](https://via.placeholder.com/16/f7fee7/f7fee7.png) |
| 100 | `#ecfccb` | ![](https://via.placeholder.com/16/ecfccb/ecfccb.png) |
| 200 | `#d9f99d` | ![](https://via.placeholder.com/16/d9f99d/d9f99d.png) |
| 300 | `#bef264` | ![](https://via.placeholder.com/16/bef264/bef264.png) |
| 400 | `#a3e635` | ![](https://via.placeholder.com/16/a3e635/a3e635.png) |
| 500 | `#84cc16` | ![](https://via.placeholder.com/16/84cc16/84cc16.png) |
| 600 | `#65a30d` | ![](https://via.placeholder.com/16/65a30d/65a30d.png) |
| 700 | `#4d7c0f` | ![](https://via.placeholder.com/16/4d7c0f/4d7c0f.png) |
| 800 | `#3f6212` | ![](https://via.placeholder.com/16/3f6212/3f6212.png) |
| 900 | `#365314` | ![](https://via.placeholder.com/16/365314/365314.png) |
| 950 | `#1a2e05` | ![](https://via.placeholder.com/16/1a2e05/1a2e05.png) |

### Green

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#f0fdf4` | ![](https://via.placeholder.com/16/f0fdf4/f0fdf4.png) |
| 100 | `#dcfce7` | ![](https://via.placeholder.com/16/dcfce7/dcfce7.png) |
| 200 | `#bbf7d0` | ![](https://via.placeholder.com/16/bbf7d0/bbf7d0.png) |
| 300 | `#86efac` | ![](https://via.placeholder.com/16/86efac/86efac.png) |
| 400 | `#4ade80` | ![](https://via.placeholder.com/16/4ade80/4ade80.png) |
| 500 | `#22c55e` | ![](https://via.placeholder.com/16/22c55e/22c55e.png) |
| 600 | `#16a34a` | ![](https://via.placeholder.com/16/16a34a/16a34a.png) |
| 700 | `#15803d` | ![](https://via.placeholder.com/16/15803d/15803d.png) |
| 800 | `#166534` | ![](https://via.placeholder.com/16/166534/166534.png) |
| 900 | `#14532d` | ![](https://via.placeholder.com/16/14532d/14532d.png) |
| 950 | `#052e16` | ![](https://via.placeholder.com/16/052e16/052e16.png) |

### Emerald

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#ecfdf5` | ![](https://via.placeholder.com/16/ecfdf5/ecfdf5.png) |
| 100 | `#d1fae5` | ![](https://via.placeholder.com/16/d1fae5/d1fae5.png) |
| 200 | `#a7f3d0` | ![](https://via.placeholder.com/16/a7f3d0/a7f3d0.png) |
| 300 | `#6ee7b7` | ![](https://via.placeholder.com/16/6ee7b7/6ee7b7.png) |
| 400 | `#34d399` | ![](https://via.placeholder.com/16/34d399/34d399.png) |
| 500 | `#10b981` | ![](https://via.placeholder.com/16/10b981/10b981.png) |
| 600 | `#059669` | ![](https://via.placeholder.com/16/059669/059669.png) |
| 700 | `#047857` | ![](https://via.placeholder.com/16/047857/047857.png) |
| 800 | `#065f46` | ![](https://via.placeholder.com/16/065f46/065f46.png) |
| 900 | `#064e3b` | ![](https://via.placeholder.com/16/064e3b/064e3b.png) |
| 950 | `#022c22` | ![](https://via.placeholder.com/16/022c22/022c22.png) |

### Teal

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#f0fdfa` | ![](https://via.placeholder.com/16/f0fdfa/f0fdfa.png) |
| 100 | `#ccfbf1` | ![](https://via.placeholder.com/16/ccfbf1/ccfbf1.png) |
| 200 | `#99f6e4` | ![](https://via.placeholder.com/16/99f6e4/99f6e4.png) |
| 300 | `#5eead4` | ![](https://via.placeholder.com/16/5eead4/5eead4.png) |
| 400 | `#2dd4bf` | ![](https://via.placeholder.com/16/2dd4bf/2dd4bf.png) |
| 500 | `#14b8a6` | ![](https://via.placeholder.com/16/14b8a6/14b8a6.png) |
| 600 | `#0d9488` | ![](https://via.placeholder.com/16/0d9488/0d9488.png) |
| 700 | `#0f766e` | ![](https://via.placeholder.com/16/0f766e/0f766e.png) |
| 800 | `#115e59` | ![](https://via.placeholder.com/16/115e59/115e59.png) |
| 900 | `#134e4a` | ![](https://via.placeholder.com/16/134e4a/134e4a.png) |
| 950 | `#042f2e` | ![](https://via.placeholder.com/16/042f2e/042f2e.png) |

### Cyan

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#ecfeff` | ![](https://via.placeholder.com/16/ecfeff/ecfeff.png) |
| 100 | `#cffafe` | ![](https://via.placeholder.com/16/cffafe/cffafe.png) |
| 200 | `#a5f3fc` | ![](https://via.placeholder.com/16/a5f3fc/a5f3fc.png) |
| 300 | `#67e8f9` | ![](https://via.placeholder.com/16/67e8f9/67e8f9.png) |
| 400 | `#22d3ee` | ![](https://via.placeholder.com/16/22d3ee/22d3ee.png) |
| 500 | `#06b6d4` | ![](https://via.placeholder.com/16/06b6d4/06b6d4.png) |
| 600 | `#0891b2` | ![](https://via.placeholder.com/16/0891b2/0891b2.png) |
| 700 | `#0e7490` | ![](https://via.placeholder.com/16/0e7490/0e7490.png) |
| 800 | `#155e75` | ![](https://via.placeholder.com/16/155e75/155e75.png) |
| 900 | `#164e63` | ![](https://via.placeholder.com/16/164e63/164e63.png) |
| 950 | `#083344` | ![](https://via.placeholder.com/16/083344/083344.png) |

### Sky

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#f0f9ff` | ![](https://via.placeholder.com/16/f0f9ff/f0f9ff.png) |
| 100 | `#e0f2fe` | ![](https://via.placeholder.com/16/e0f2fe/e0f2fe.png) |
| 200 | `#bae6fd` | ![](https://via.placeholder.com/16/bae6fd/bae6fd.png) |
| 300 | `#7dd3fc` | ![](https://via.placeholder.com/16/7dd3fc/7dd3fc.png) |
| 400 | `#38bdf8` | ![](https://via.placeholder.com/16/38bdf8/38bdf8.png) |
| 500 | `#0ea5e9` | ![](https://via.placeholder.com/16/0ea5e9/0ea5e9.png) |
| 600 | `#0284c7` | ![](https://via.placeholder.com/16/0284c7/0284c7.png) |
| 700 | `#0369a1` | ![](https://via.placeholder.com/16/0369a1/0369a1.png) |
| 800 | `#075985` | ![](https://via.placeholder.com/16/075985/075985.png) |
| 900 | `#0c4a6e` | ![](https://via.placeholder.com/16/0c4a6e/0c4a6e.png) |
| 950 | `#082f49` | ![](https://via.placeholder.com/16/082f49/082f49.png) |

### Blue

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#eff6ff` | ![](https://via.placeholder.com/16/eff6ff/eff6ff.png) |
| 100 | `#dbeafe` | ![](https://via.placeholder.com/16/dbeafe/dbeafe.png) |
| 200 | `#bfdbfe` | ![](https://via.placeholder.com/16/bfdbfe/bfdbfe.png) |
| 300 | `#93c5fd` | ![](https://via.placeholder.com/16/93c5fd/93c5fd.png) |
| 400 | `#60a5fa` | ![](https://via.placeholder.com/16/60a5fa/60a5fa.png) |
| 500 | `#3b82f6` | ![](https://via.placeholder.com/16/3b82f6/3b82f6.png) |
| 600 | `#2563eb` | ![](https://via.placeholder.com/16/2563eb/2563eb.png) |
| 700 | `#1d4ed8` | ![](https://via.placeholder.com/16/1d4ed8/1d4ed8.png) |
| 800 | `#1e40af` | ![](https://via.placeholder.com/16/1e40af/1e40af.png) |
| 900 | `#1e3a8a` | ![](https://via.placeholder.com/16/1e3a8a/1e3a8a.png) |
| 950 | `#172554` | ![](https://via.placeholder.com/16/172554/172554.png) |

### Indigo

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#eef2ff` | ![](https://via.placeholder.com/16/eef2ff/eef2ff.png) |
| 100 | `#e0e7ff` | ![](https://via.placeholder.com/16/e0e7ff/e0e7ff.png) |
| 200 | `#c7d2fe` | ![](https://via.placeholder.com/16/c7d2fe/c7d2fe.png) |
| 300 | `#a5b4fc` | ![](https://via.placeholder.com/16/a5b4fc/a5b4fc.png) |
| 400 | `#818cf8` | ![](https://via.placeholder.com/16/818cf8/818cf8.png) |
| 500 | `#6366f1` | ![](https://via.placeholder.com/16/6366f1/6366f1.png) |
| 600 | `#4f46e5` | ![](https://via.placeholder.com/16/4f46e5/4f46e5.png) |
| 700 | `#4338ca` | ![](https://via.placeholder.com/16/4338ca/4338ca.png) |
| 800 | `#3730a3` | ![](https://via.placeholder.com/16/3730a3/3730a3.png) |
| 900 | `#312e81` | ![](https://via.placeholder.com/16/312e81/312e81.png) |
| 950 | `#1e1b4b` | ![](https://via.placeholder.com/16/1e1b4b/1e1b4b.png) |

### Violet

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#f5f3ff` | ![](https://via.placeholder.com/16/f5f3ff/f5f3ff.png) |
| 100 | `#ede9fe` | ![](https://via.placeholder.com/16/ede9fe/ede9fe.png) |
| 200 | `#ddd6fe` | ![](https://via.placeholder.com/16/ddd6fe/ddd6fe.png) |
| 300 | `#c4b5fd` | ![](https://via.placeholder.com/16/c4b5fd/c4b5fd.png) |
| 400 | `#a78bfa` | ![](https://via.placeholder.com/16/a78bfa/a78bfa.png) |
| 500 | `#8b5cf6` | ![](https://via.placeholder.com/16/8b5cf6/8b5cf6.png) |
| 600 | `#7c3aed` | ![](https://via.placeholder.com/16/7c3aed/7c3aed.png) |
| 700 | `#6d28d9` | ![](https://via.placeholder.com/16/6d28d9/6d28d9.png) |
| 800 | `#5b21b6` | ![](https://via.placeholder.com/16/5b21b6/5b21b6.png) |
| 900 | `#4c1d95` | ![](https://via.placeholder.com/16/4c1d95/4c1d95.png) |
| 950 | `#2e1065` | ![](https://via.placeholder.com/16/2e1065/2e1065.png) |

### Purple

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#faf5ff` | ![](https://via.placeholder.com/16/faf5ff/faf5ff.png) |
| 100 | `#f3e8ff` | ![](https://via.placeholder.com/16/f3e8ff/f3e8ff.png) |
| 200 | `#e9d5ff` | ![](https://via.placeholder.com/16/e9d5ff/e9d5ff.png) |
| 300 | `#d8b4fe` | ![](https://via.placeholder.com/16/d8b4fe/d8b4fe.png) |
| 400 | `#c084fc` | ![](https://via.placeholder.com/16/c084fc/c084fc.png) |
| 500 | `#a855f7` | ![](https://via.placeholder.com/16/a855f7/a855f7.png) |
| 600 | `#9333ea` | ![](https://via.placeholder.com/16/9333ea/9333ea.png) |
| 700 | `#7e22ce` | ![](https://via.placeholder.com/16/7e22ce/7e22ce.png) |
| 800 | `#6b21a8` | ![](https://via.placeholder.com/16/6b21a8/6b21a8.png) |
| 900 | `#581c87` | ![](https://via.placeholder.com/16/581c87/581c87.png) |
| 950 | `#3b0764` | ![](https://via.placeholder.com/16/3b0764/3b0764.png) |

### Fuchsia

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#fdf4ff` | ![](https://via.placeholder.com/16/fdf4ff/fdf4ff.png) |
| 100 | `#fae8ff` | ![](https://via.placeholder.com/16/fae8ff/fae8ff.png) |
| 200 | `#f5d0fe` | ![](https://via.placeholder.com/16/f5d0fe/f5d0fe.png) |
| 300 | `#f0abfc` | ![](https://via.placeholder.com/16/f0abfc/f0abfc.png) |
| 400 | `#e879f9` | ![](https://via.placeholder.com/16/e879f9/e879f9.png) |
| 500 | `#d946ef` | ![](https://via.placeholder.com/16/d946ef/d946ef.png) |
| 600 | `#c026d3` | ![](https://via.placeholder.com/16/c026d3/c026d3.png) |
| 700 | `#a21caf` | ![](https://via.placeholder.com/16/a21caf/a21caf.png) |
| 800 | `#86198f` | ![](https://via.placeholder.com/16/86198f/86198f.png) |
| 900 | `#701a75` | ![](https://via.placeholder.com/16/701a75/701a75.png) |
| 950 | `#4a044e` | ![](https://via.placeholder.com/16/4a044e/4a044e.png) |

### Pink

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#fdf2f8` | ![](https://via.placeholder.com/16/fdf2f8/fdf2f8.png) |
| 100 | `#fce7f3` | ![](https://via.placeholder.com/16/fce7f3/fce7f3.png) |
| 200 | `#fbcfe8` | ![](https://via.placeholder.com/16/fbcfe8/fbcfe8.png) |
| 300 | `#f9a8d4` | ![](https://via.placeholder.com/16/f9a8d4/f9a8d4.png) |
| 400 | `#f472b6` | ![](https://via.placeholder.com/16/f472b6/f472b6.png) |
| 500 | `#ec4899` | ![](https://via.placeholder.com/16/ec4899/ec4899.png) |
| 600 | `#db2777` | ![](https://via.placeholder.com/16/db2777/db2777.png) |
| 700 | `#be185d` | ![](https://via.placeholder.com/16/be185d/be185d.png) |
| 800 | `#9d174d` | ![](https://via.placeholder.com/16/9d174d/9d174d.png) |
| 900 | `#831843` | ![](https://via.placeholder.com/16/831843/831843.png) |
| 950 | `#500724` | ![](https://via.placeholder.com/16/500724/500724.png) |

### Rose

| Shade | Hex | Preview |
|---|---|---|
| 50 | `#fff1f2` | ![](https://via.placeholder.com/16/fff1f2/fff1f2.png) |
| 100 | `#ffe4e6` | ![](https://via.placeholder.com/16/ffe4e6/ffe4e6.png) |
| 200 | `#fecdd3` | ![](https://via.placeholder.com/16/fecdd3/fecdd3.png) |
| 300 | `#fda4af` | ![](https://via.placeholder.com/16/fda4af/fda4af.png) |
| 400 | `#fb7185` | ![](https://via.placeholder.com/16/fb7185/fb7185.png) |
| 500 | `#f43f5e` | ![](https://via.placeholder.com/16/f43f5e/f43f5e.png) |
| 600 | `#e11d48` | ![](https://via.placeholder.com/16/e11d48/e11d48.png) |
| 700 | `#be123c` | ![](https://via.placeholder.com/16/be123c/be123c.png) |
| 800 | `#9f1239` | ![](https://via.placeholder.com/16/9f1239/9f1239.png) |
| 900 | `#881337` | ![](https://via.placeholder.com/16/881337/881337.png) |
| 950 | `#4c0519` | ![](https://via.placeholder.com/16/4c0519/4c0519.png) |

### Standalone colors

| Export | Value | Description |
|---|---|---|
| `white` | `#ffffff` | Pure white |
| `black` | `#000000` | Pure black |
| `transparent` | `transparent` | Fully transparent |
| `currentColor` | `currentColor` | Inherits the current text color |

---

## Spacing

A numeric scale mapping unitless keys to `rem`-based values. Each unit equals `0.25rem` (4px at default browser font size).

**Import:** `import { spacingScale, resolveSpacing } from 'typewritingclass/theme/spacing'`

**Access:** `spacingScale[4]` returns `'1rem'`.

| Key | Value | Pixels (at 16px base) |
|---|---|---|
| `0` | `0px` | 0px |
| `0.5` | `0.125rem` | 2px |
| `1` | `0.25rem` | 4px |
| `1.5` | `0.375rem` | 6px |
| `2` | `0.5rem` | 8px |
| `2.5` | `0.625rem` | 10px |
| `3` | `0.75rem` | 12px |
| `3.5` | `0.875rem` | 14px |
| `4` | `1rem` | 16px |
| `5` | `1.25rem` | 20px |
| `6` | `1.5rem` | 24px |
| `7` | `1.75rem` | 28px |
| `8` | `2rem` | 32px |
| `9` | `2.25rem` | 36px |
| `10` | `2.5rem` | 40px |
| `11` | `2.75rem` | 44px |
| `12` | `3rem` | 48px |
| `14` | `3.5rem` | 56px |
| `16` | `4rem` | 64px |
| `20` | `5rem` | 80px |
| `24` | `6rem` | 96px |
| `28` | `7rem` | 112px |
| `32` | `8rem` | 128px |
| `36` | `9rem` | 144px |
| `40` | `10rem` | 160px |
| `44` | `11rem` | 176px |
| `48` | `12rem` | 192px |
| `52` | `13rem` | 208px |
| `56` | `14rem` | 224px |
| `60` | `15rem` | 240px |
| `64` | `16rem` | 256px |
| `72` | `18rem` | 288px |
| `80` | `20rem` | 320px |
| `96` | `24rem` | 384px |

:::note
Values not in the predefined scale fall back to `value * 0.25rem`. For example, `resolveSpacing(100)` returns `'25rem'`.
:::

---

## Typography

### Text sizes

Each text size export is an object with `fontSize` and `lineHeight` properties.

**Import:** `import { xs, sm, base, lg, xl, _2xl, _3xl, _4xl, _5xl, _6xl, _7xl, _8xl, _9xl } from 'typewritingclass/theme/typography'`

| Export | Font Size | Line Height | Pixels (at 16px base) |
|---|---|---|---|
| `xs` | `0.75rem` | `1rem` | 12px / 16px |
| `sm` | `0.875rem` | `1.25rem` | 14px / 20px |
| `base` | `1rem` | `1.5rem` | 16px / 24px |
| `lg` | `1.125rem` | `1.75rem` | 18px / 28px |
| `xl` | `1.25rem` | `1.75rem` | 20px / 28px |
| `_2xl` | `1.5rem` | `2rem` | 24px / 32px |
| `_3xl` | `1.875rem` | `2.25rem` | 30px / 36px |
| `_4xl` | `2.25rem` | `2.5rem` | 36px / 40px |
| `_5xl` | `3rem` | `1` | 48px / tight |
| `_6xl` | `3.75rem` | `1` | 60px / tight |
| `_7xl` | `4.5rem` | `1` | 72px / tight |
| `_8xl` | `6rem` | `1` | 96px / tight |
| `_9xl` | `8rem` | `1` | 128px / tight |

:::note
Sizes `_5xl` and above use a `lineHeight` of `1` (unitless), which means the line height equals the font size itself. This tight leading is standard for large display text.
:::

### Font weights

Font weight exports are string constants representing CSS `font-weight` numeric values.

**Import:** `import { thin, extralight, light, normal, medium, semibold, bold, extrabold, black_ } from 'typewritingclass/theme/typography'`

| Export | CSS Value | Description |
|---|---|---|
| `thin` | `100` | Thinnest available weight |
| `extralight` | `200` | Extra light |
| `light` | `300` | Light |
| `normal` | `400` | Normal / regular (browser default) |
| `medium` | `500` | Medium |
| `semibold` | `600` | Semi-bold |
| `bold` | `700` | Bold |
| `extrabold` | `800` | Extra bold |
| `black_` | `900` | Heaviest available weight |

:::note
The heaviest weight is exported as `black_` (with a trailing underscore) to avoid a naming conflict with the `black` color export.
:::

---

## Shadows

Box-shadow values at increasing intensity levels.

**Import:** `import { sm, DEFAULT, md, lg, xl, _2xl, inner, none } from 'typewritingclass/theme/shadows'`

| Export | Value |
|---|---|
| `sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` |
| `DEFAULT` | `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)` |
| `md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` |
| `lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` |
| `xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| `_2xl` | `0 25px 50px -12px rgb(0 0 0 / 0.25)` |
| `inner` | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)` |
| `none` | `0 0 #0000` |

### Shadow progression

The shadow scale progresses from subtle (`sm`) to dramatic (`_2xl`):

- **sm** -- A barely-visible shadow, useful for subtle depth cues on cards or inputs.
- **DEFAULT** -- A light shadow, suitable as a baseline card shadow.
- **md** -- A moderate shadow, commonly used for dropdowns and popovers.
- **lg** -- A pronounced shadow, suitable for modals and elevated surfaces.
- **xl** -- A heavy shadow, useful for floating elements and tooltips.
- **_2xl** -- The most dramatic shadow, for high-elevation overlays.
- **inner** -- An inset shadow, useful for pressed button states or inset input fields.
- **none** -- Removes any existing shadow.

---

## Border radius

Border-radius values from subtle rounding to fully circular.

**Import:** `import { none, sm, DEFAULT, md, lg, xl, _2xl, _3xl, full } from 'typewritingclass/theme/borders'`

| Export | Value | Pixels (at 16px base) | Description |
|---|---|---|---|
| `none` | `0px` | 0px | No rounding |
| `sm` | `0.125rem` | 2px | Subtle rounding |
| `DEFAULT` | `0.25rem` | 4px | Standard rounding |
| `md` | `0.375rem` | 6px | Medium rounding |
| `lg` | `0.5rem` | 8px | Large rounding |
| `xl` | `0.75rem` | 12px | Extra-large rounding |
| `_2xl` | `1rem` | 16px | Very large rounding |
| `_3xl` | `1.5rem` | 24px | Pronounced rounding |
| `full` | `9999px` | N/A | Pill shape / circle |

---

## Sizes

Named dimension values for width, height, and constraint utilities.

**Import:** `import { full, screen, screenH, min, max, fit, auto } from 'typewritingclass/theme/sizes'`

| Export | Value | Description |
|---|---|---|
| `full` | `100%` | Fill the parent container |
| `screen` | `100vw` | Full viewport width |
| `screenH` | `100vh` | Full viewport height |
| `min` | `min-content` | Shrink to the minimum content size |
| `max` | `max-content` | Expand to the maximum content size |
| `fit` | `fit-content` | Fit to content, constrained by available space |
| `auto` | `auto` | Browser-determined automatic sizing |

---

## Quick import reference

A summary of all subpath imports and their key exports:

| Subpath | Key Exports |
|---|---|
| `typewritingclass/theme/colors` | `slate`, `gray`, `zinc`, `neutral`, `stone`, `red`, `orange`, `amber`, `yellow`, `lime`, `green`, `emerald`, `teal`, `cyan`, `sky`, `blue`, `indigo`, `violet`, `purple`, `fuchsia`, `pink`, `rose`, `white`, `black`, `transparent`, `currentColor` |
| `typewritingclass/theme/spacing` | `spacingScale`, `resolveSpacing` |
| `typewritingclass/theme/typography` | `xs`, `sm`, `base`, `lg`, `xl`, `_2xl`, `_3xl`, `_4xl`, `_5xl`, `_6xl`, `_7xl`, `_8xl`, `_9xl`, `thin`, `extralight`, `light`, `normal`, `medium`, `semibold`, `bold`, `extrabold`, `black_` |
| `typewritingclass/theme/shadows` | `sm`, `DEFAULT`, `md`, `lg`, `xl`, `_2xl`, `inner`, `none` |
| `typewritingclass/theme/borders` | `none`, `sm`, `DEFAULT`, `md`, `lg`, `xl`, `_2xl`, `_3xl`, `full` |
| `typewritingclass/theme/sizes` | `full`, `screen`, `screenH`, `min`, `max`, `fit`, `auto` |
| `typewritingclass/theme` | All of the above, plus `createTheme`, `injectTheme`, `setTheme` |
