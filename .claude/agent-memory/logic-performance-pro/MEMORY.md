# Logic & Performance Agent Memory

## tw-mantine Migration (Feb 2026)
- 20 component files migrated from `@/lib/tw-mantine` to plain HTML + Tailwind
- `<select>` elements do NOT support `placeholder` attribute (TS error) -- use `<option value="">` as placeholder instead
- The shim file at `src/lib/tw-mantine.tsx` maps Mantine-like components to Tailwind divs
- 6 files outside `src/components/` still import tw-mantine: pages/programs, app/media-archive, app/admin
- `@/lib/tw-mantine-form` and `@/lib/tw-mantine-hooks` are separate shims still in use (useForm, useDisclosure, useMediaQuery)
- `@/lib/tw-mantine-carousel` is still used by Timeline component (Carousel wraps embla-carousel)

## Key Component APIs (preserved during migration)
- `Button` (ui): Props = { label, size, backgroundColor, onClick, type, color, disabled }
- `Paragraph` (ui): Props = { children, size, className, fontFamily, fontWeight }
- `Title` (ui): Props = { label, size, onClick, color, className }
- `Search` (ui): Props = { items, buttonLabel, placeholder, destination, bg }
- `WhatsAppLink` (shared): Props = { phoneNumber, trackingLocation, children, className, c, fw }

## Project Patterns
- Forms use `@/lib/tw-mantine-form` (useForm) -- NOT migrated, separate utility
- Phone inputs use `react-phone-input-2` library
- UTM tracking: sessionStorage-first, URL fallback pattern
- Accordion in FinancialPlanning was replaced with native `<details>/<summary>` elements
