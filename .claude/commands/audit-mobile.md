# Audit Mobile Responsiveness

Scan all pages and components for mobile layout issues that cause horizontal overflow, unreadable text, or broken layouts on small screens (375px viewport).

## What to Check

### 1. Font sizes without mobile breakpoints (CRITICAL)

Search for `text-[Npx]` where N >= 36 that have NO `md:` or `sm:` prefix. These will overflow or look massive on mobile.

```bash
# Pattern: text-[36px] or higher without a preceding mobile size
# GOOD: text-[24px] md:text-[42px]
# BAD:  text-[42px]
```

**Fix:** Add mobile-first sizing. Rules:
- 36-42px desktop → 24-26px mobile
- 44-52px desktop → 26-28px mobile

### 2. Stats bars / horizontal flex without wrapping

Search for `justify-around` or `justify-between` on flex containers that don't have `flex-wrap`, `grid`, or `md:flex` (meaning they're flex on mobile too).

Also check for fixed-margin dividers like `ml-10` that aren't hidden on mobile.

**Fix:** Use `grid grid-cols-2 gap-6` on mobile, `md:flex md:justify-around` on desktop. Hide dividers on mobile with `hidden md:block`.

### 3. Fixed max-width on text that exceeds mobile viewport

Search for `max-w-[600px]` or higher on text elements without `md:` prefix. On a 375px screen with padding, content wider than ~330px can overflow.

**Fix:** Remove `max-w` on mobile or use `md:max-w-[600px]`.

### 4. Fixed heights on hero sections without mobile breakpoints

Search for `h-[500px]` or higher without `md:h-` breakpoint.

**Fix:** Use `h-[420px] md:h-[520px]` pattern.

### 5. Flex containers without `min-w-0`

In flex layouts where one child contains text, the text child needs `min-w-0` to allow it to shrink below its content width. Without it, long text overflows.

**Fix:** Add `min-w-0` to text-containing flex children.

### 6. Two-column layouts that don't stack on mobile

Search for `flex-row` without `flex-col` (mobile) or `md:flex-row` breakpoint.

**Fix:** Use `flex-col md:flex-row` pattern.

## Files to Scan

- `src/pages/**/*.tsx`
- `src/components/**/*.tsx`
- `src/layouts/**/*.tsx`

## Global CSS Reference

```css
/* These classes are mobile-safe: */
.section-container { @apply mx-auto max-w-[1280px] px-6 md:px-8; }
.section-padding { @apply py-16 md:py-20; }
.section-heading { @apply font-proxima text-3xl font-bold leading-[1.15] md:text-[42px]; }
.section-subheading { @apply font-proxima text-[17px] leading-[1.6]; }
```

Prefer using these global classes over inline sizes.

## Process

1. **Scan** — Use `grep` to find all violations across the codebase
2. **Report** — List every violation with file path, line number, current value, and suggested fix
3. **Fix** — Apply fixes file by file
4. **Verify** — Run `npx next build` to confirm no regressions

## Output

Report:
- Total files scanned
- Violations found per category
- Files fixed (with before/after for each change)
- Any files intentionally skipped (with reason)
