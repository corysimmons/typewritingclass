# Tailwind CSS Parity Checklist

Audit of every Tailwind CSS v3 utility category against Typewriting Class coverage.

- [x] = Covered
- [ ] = Not covered

**Current coverage: ~160 of 163 categories (98%)** — Container Queries are not covered (Tailwind plugin, not core).

---

## Layout

- [x] Aspect Ratio — `aspectRatio()`
- [x] Container — `container()`
- [x] Columns — `columns()`
- [x] Break After — `breakAfter()`
- [x] Break Before — `breakBefore()`
- [x] Break Inside — `breakInside()`
- [x] Box Decoration Break — `boxDecorationBreak()`
- [x] Box Sizing — `boxSizing()`
- [x] Display — `display()`, `flex()`, `flexCol()`, `flexRow()`, `grid()`, `inlineFlex()`
- [x] Floats — `float_()`
- [x] Clear — `clear_()`
- [x] Isolation — `isolate()`, `isolationAuto()`
- [x] Object Fit — `objectFit()`
- [x] Object Position — `objectPosition()`
- [x] Overflow — `overflow()`, `overflowX()`, `overflowY()`
- [x] Overscroll Behavior — `overscrollBehavior()`, `overscrollX()`, `overscrollY()`
- [x] Position — `relative()`, `absolute()`, `fixed()`, `sticky()`, `static_()`
- [x] Top / Right / Bottom / Left — `top()`, `right()`, `bottom()`, `left()`, `inset()`, `insetX()`, `insetY()`, `start()`, `end()`
- [x] Visibility — `visible()`, `invisible()`, `collapse_()`
- [x] Z-Index — `z()`

## Flexbox & Grid

- [x] Flex Basis — `flexBasis()`
- [x] Flex Direction — `flexCol()`, `flexRow()`, `flexColReverse()`, `flexRowReverse()`
- [x] Flex Wrap — `flexWrap()`, `flexWrapReverse()`, `flexNowrap()`
- [x] Flex — `flex1()`, `flexAuto()`, `flexInitial()`, `flexNone()`
- [x] Flex Grow — `grow()`
- [x] Flex Shrink — `shrink()`
- [x] Order — `order()`
- [x] Grid Template Columns — `gridCols()`
- [x] Grid Column Start / End — `colSpan()`, `colStart()`, `colEnd()`
- [x] Grid Template Rows — `gridRows()`
- [x] Grid Row Start / End — `rowSpan()`, `rowStart()`, `rowEnd()`
- [x] Grid Auto Flow — `gridFlow()`
- [x] Grid Auto Columns — `autoCols()`
- [x] Grid Auto Rows — `autoRows()`
- [x] Gap — `gap()`, `gapX()`, `gapY()`
- [x] Justify Content — `justify()`
- [x] Justify Items — `justifyItems()`
- [x] Justify Self — `justifySelf()`
- [x] Align Content — `alignContent()`
- [x] Align Items — `items()`
- [x] Align Self — `self()`
- [x] Place Content — `placeContent()`
- [x] Place Items — `placeItems()`
- [x] Place Self — `placeSelf()`

## Spacing

- [x] Padding — `p()`, `px()`, `py()`, `pt()`, `pr()`, `pb()`, `pl()`, `ps()`, `pe()`
- [x] Margin — `m()`, `mx()`, `my()`, `mt()`, `mr()`, `mb()`, `ml()`, `ms()`, `me()`
- [x] Space Between — `spaceX()`, `spaceY()`

## Sizing

- [x] Width — `w()`
- [x] Min-Width — `minW()`
- [x] Max-Width — `maxW()`
- [x] Height — `h()`
- [x] Min-Height — `minH()`
- [x] Max-Height — `maxH()`
- [x] Size — `size()`

## Typography

- [x] Font Family — `fontFamily()`
- [x] Font Size — `text()`
- [x] Font Smoothing — `antialiased()`, `subpixelAntialiased()`
- [x] Font Style — `italic()`, `notItalic()`
- [x] Font Weight — `font()`
- [x] Font Variant Numeric — `normalNums()`, `ordinal()`, `slashedZero()`, `liningNums()`, `oldstyleNums()`, `proportionalNums()`, `tabularNums()`, `diagonalFractions()`, `stackedFractions()`
- [x] Letter Spacing — `tracking()`
- [x] Line Clamp — `lineClamp()`
- [x] Line Height — `leading()`
- [x] List Style Image — `listStyleImage()`
- [x] List Style Position — `listStylePosition()`
- [x] List Style Type — `listStyleType()`
- [x] Text Align — `textAlign()`
- [x] Text Color — `textColor()`
- [x] Text Decoration — `textDecoration()`
- [x] Text Decoration Color — `textDecorationColor()`
- [x] Text Decoration Style — `textDecorationStyle()`
- [x] Text Decoration Thickness — `textDecorationThickness()`
- [x] Text Underline Offset — `textUnderlineOffset()`
- [x] Text Transform — `textTransform()`
- [x] Text Overflow — `textOverflow()`
- [x] Text Wrap — `textWrap()`
- [x] Text Indent — `textIndent()`
- [x] Vertical Align — `verticalAlign()`
- [x] Whitespace — `whitespace()`
- [x] Word Break — `wordBreak()`
- [x] Hyphens — `hyphens()`
- [x] Content — `content_()`

## Backgrounds

- [x] Background Attachment — `bgAttachment()`
- [x] Background Clip — `bgClip()`
- [x] Background Color — `bg()`
- [x] Background Origin — `bgOrigin()`
- [x] Background Position — `bgPosition()`
- [x] Background Repeat — `bgRepeat()`
- [x] Background Size — `bgSize()`
- [x] Background Image — `bgImage()`, `bgGradient()`
- [x] Gradient Color Stops — `gradientFrom()`, `gradientVia()`, `gradientTo()`

## Borders

- [x] Border Radius — `rounded()`, `roundedT()`, `roundedB()`, `roundedL()`, `roundedR()`, `roundedTL()`, `roundedTR()`, `roundedBR()`, `roundedBL()`, `roundedSS()`, `roundedSE()`, `roundedEE()`, `roundedES()`
- [x] Border Width — `border()`, `borderT()`, `borderR()`, `borderB()`, `borderL()`, `borderX()`, `borderY()`, `borderS()`, `borderE()`
- [x] Border Color — `borderColor()`
- [x] Border Style — `borderStyle()`
- [x] Divide Width — `divideX()`, `divideY()`
- [x] Divide Color — `divideColor()`
- [x] Divide Style — `divideStyle()`
- [x] Outline Width — `outlineWidth()`
- [x] Outline Color — `outlineColor()`
- [x] Outline Style — `outlineStyle()`
- [x] Outline Offset — `outlineOffset()`
- [x] Ring Width — `ring()`
- [x] Ring Color — `ringColor()`
- [x] Ring Offset Width — `ringOffsetWidth()`
- [x] Ring Offset Color — `ringOffsetColor()`

## Effects

- [x] Box Shadow — `shadow()`
- [x] Box Shadow Color — `shadowColor()`
- [x] Opacity — `opacity()`
- [x] Mix Blend Mode — `mixBlendMode()`
- [x] Background Blend Mode — `bgBlendMode()`

## Filters

- [x] Blur — `blur()`
- [x] Brightness — `brightness()`
- [x] Contrast — `contrast()`
- [x] Drop Shadow — `dropShadow()`
- [x] Grayscale — `grayscale()`
- [x] Hue Rotate — `hueRotate()`
- [x] Invert — `invert()`
- [x] Saturate — `saturate()`
- [x] Sepia — `sepia()`
- [x] Backdrop Blur — `backdropBlur()`
- [x] Backdrop Brightness — `backdropBrightness()`
- [x] Backdrop Contrast — `backdropContrast()`
- [x] Backdrop Grayscale — `backdropGrayscale()`
- [x] Backdrop Hue Rotate — `backdropHueRotate()`
- [x] Backdrop Invert — `backdropInvert()`
- [x] Backdrop Opacity — `backdropOpacity()`
- [x] Backdrop Saturate — `backdropSaturate()`
- [x] Backdrop Sepia — `backdropSepia()`

## Tables

- [x] Border Collapse — `borderCollapse()`
- [x] Border Spacing — `borderSpacing()`, `borderSpacingX()`, `borderSpacingY()`
- [x] Table Layout — `tableLayout()`
- [x] Caption Side — `captionSide()`

## Transitions & Animation

- [x] Transition Property — `transition()`, `transitionAll()`, `transitionColors()`, `transitionOpacity()`, `transitionShadow()`, `transitionTransform()`, `transitionNone()`
- [x] Transition Duration — `duration()`
- [x] Transition Timing Function — `ease()`
- [x] Transition Delay — `delay()`
- [x] Animation — `animate()`

## Transforms

- [x] Scale — `scale()`, `scaleX()`, `scaleY()`
- [x] Rotate — `rotate()`
- [x] Translate — `translateX()`, `translateY()`
- [x] Skew — `skewX()`, `skewY()`
- [x] Transform Origin — `transformOrigin()`

## Interactivity

- [x] Accent Color — `accentColor()`
- [x] Appearance — `appearance()`
- [x] Cursor — `cursor()`
- [x] Caret Color — `caretColor()`
- [x] Pointer Events — `pointerEvents()`
- [x] Resize — `resize()`
- [x] Scroll Behavior — `scrollBehavior()`
- [x] Scroll Margin — `scrollMargin()`, `scrollMarginX()`, `scrollMarginY()`, `scrollMarginT()`, `scrollMarginR()`, `scrollMarginB()`, `scrollMarginL()`
- [x] Scroll Padding — `scrollPadding()`, `scrollPaddingX()`, `scrollPaddingY()`, `scrollPaddingT()`, `scrollPaddingR()`, `scrollPaddingB()`, `scrollPaddingL()`
- [x] Scroll Snap Align — `snapAlign()`
- [x] Scroll Snap Stop — `snapStop()`
- [x] Scroll Snap Type — `snapType()`
- [x] Touch Action — `touchAction()`
- [x] User Select — `select()`
- [x] Will Change — `willChange()`

## SVG

- [x] Fill — `fill()`
- [x] Stroke — `stroke()`
- [x] Stroke Width — `strokeWidth()`

## Accessibility

- [x] Screen Readers — `srOnly()`, `notSrOnly()`
- [x] Forced Color Adjust — `forcedColorAdjust()`

---

## Modifiers (Variants)

### Pseudo-class

- [x] hover — `hover()`
- [x] focus — `focus()`
- [x] active — `active()`
- [x] disabled — `disabled()`
- [x] focus-visible — `focusVisible()`
- [x] focus-within — `focusWithin()`
- [x] first-child — `firstChild()`
- [x] last-child — `lastChild()`
- [x] visited — `visited()`
- [x] checked — `checked()`
- [x] indeterminate — `indeterminate()`
- [x] default — `default_()`
- [x] required — `required_()`
- [x] valid — `valid()`
- [x] invalid — `invalid()`
- [x] in-range — `inRange()`
- [x] out-of-range — `outOfRange()`
- [x] placeholder-shown — `placeholderShown()`
- [x] autofill — `autofill()`
- [x] read-only — `readOnly()`
- [x] empty — `empty()`
- [x] even — `even()`
- [x] odd — `odd()`
- [x] first-of-type — `firstOfType()`
- [x] last-of-type — `lastOfType()`
- [x] only-child — `onlyChild()`
- [x] only-of-type — `onlyOfType()`
- [x] target — `target()`
- [x] open — `open_()`

### Group & Peer

- [x] group-hover — `groupHover()`
- [x] group-focus — `groupFocus()`
- [x] group-active — `groupActive()`
- [x] group-{modifier} — `groupFocusVisible()`, `groupFocusWithin()`, `groupDisabled()`, `groupChecked()`, `groupEmpty()`, `groupFirst()`, `groupLast()`, `groupOdd()`, `groupEven()`
- [x] peer-hover — `peerHover()`
- [x] peer-focus — `peerFocus()`
- [x] peer-active — `peerActive()`
- [x] peer-{modifier} — `peerFocusVisible()`, `peerDisabled()`, `peerChecked()`, `peerInvalid()`, `peerRequired()`, `peerPlaceholderShown()`

### Pseudo-elements

- [x] before — `before()`
- [x] after — `after()`
- [x] placeholder — `placeholder_()`
- [x] file — `file_()`
- [x] marker — `marker()`
- [x] selection — `selection_()`
- [x] first-line — `firstLine()`
- [x] first-letter — `firstLetter()`
- [x] backdrop — `backdrop_()`

### Responsive

- [x] sm — `sm()`, 640px
- [x] md — `md()`, 768px
- [x] lg — `lg()`, 1024px
- [x] xl — `xl()`, 1280px
- [x] 2xl — `_2xl()`, 1536px
- [x] max-sm — `maxSm()`
- [x] max-md — `maxMd()`
- [x] max-lg — `maxLg()`
- [x] max-xl — `maxXl()`
- [x] max-2xl — `max2xl()`
- [ ] min-[custom] — arbitrary breakpoints (users can use `css()` escape hatch)
- [ ] max-[custom] — arbitrary breakpoints (users can use `css()` escape hatch)

### Color Scheme

- [x] dark — `dark()`

### Media & Feature Queries

- [x] motion-reduce — `motionReduce()`
- [x] motion-safe — `motionSafe()`
- [x] print — `print_()`
- [x] portrait — `portrait()`
- [x] landscape — `landscape()`
- [x] contrast-more — `contrastMore()`
- [x] contrast-less — `contrastLess()`
- [x] forced-colors — `forcedColors()`

### Accessibility

- [x] aria-checked — `ariaChecked()`
- [x] aria-disabled — `ariaDisabled()`
- [x] aria-expanded — `ariaExpanded()`
- [x] aria-hidden — `ariaHidden()`
- [x] aria-pressed — `ariaPressed()`
- [x] aria-readonly — `ariaReadonly()`
- [x] aria-required — `ariaRequired()`
- [x] aria-selected — `ariaSelected()`
- [x] aria-[custom] — `aria()`

### Data Attributes

- [x] data-[custom] — `data()`

### Direction

- [x] rtl — `rtl()`
- [x] ltr — `ltr()`

### Container Queries (Plugin)

- [ ] @container — Tailwind plugin, not core
- [ ] @sm / @md / @lg / @xl / @2xl — Tailwind plugin, not core
