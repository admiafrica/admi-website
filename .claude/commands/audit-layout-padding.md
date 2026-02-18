# Audit Layout Padding

Audit all pages and components for custom padding that should use global CSS layout classes. Find violations and fix them.

## Global CSS Classes (defined in `src/styles/globals.css`)

```css
/* Section container - boxed content width with horizontal padding */
.section-container {
  @apply mx-auto max-w-[1280px] px-6 md:px-8;
}

/* Section padding - standardized vertical spacing */
.section-padding {
  @apply py-16 md:py-20;
}
```

## Anti-Patterns to Find

Search all `.tsx` files in `src/pages/`, `src/components/`, and `src/layouts/` for:

1. **Custom horizontal padding on sections**: `px-4 md:px-20`, `px-4 sm:px-6 md:px-20`, `px-4 sm:px-6 lg:px-20`, `xl:px-20`, or any `px-*.*md:px-20` variant
2. **Custom container max-width**: `mx-auto max-w-screen-xl` or `mx-auto max-w-[1280px]` without `section-container`
3. **Inconsistent inner containers**: Divs using `mx-auto max-w-screen-xl` instead of `section-container`

## How to Fix

### Section-level padding
Replace custom horizontal padding on `<section>` elements with the container pattern:

**Before:**
```jsx
<section className="bg-white px-4 sm:px-6 py-20 md:px-20">
  <div className="mx-auto max-w-screen-xl">
```

**After:**
```jsx
<section className="bg-white section-padding">
  <div className="section-container">
```

### Rules
- Sections handle background color and vertical padding only (no `px-*`)
- `section-container` handles horizontal padding and max-width
- For sections with custom vertical padding (e.g. `py-10`), keep the custom vertical but remove horizontal and use `section-container` inside
- For CTA sections with narrower max-width (e.g. `max-w-[800px]`), use `section-container max-w-[800px]` to get padding + narrower constraint
- Never remove padding from nav/header elements (those are intentionally different)

## Process

1. Use `grep` to find all violations across `src/pages/`, `src/components/`, `src/layouts/`
2. Report a summary of all files with violations
3. Fix each file, replacing custom padding with global classes
4. Verify no regressions with `npx next build`

## Output

Report:
- Total files scanned
- Files with violations (with line numbers)
- Files fixed
- Any files intentionally skipped (with reason)
