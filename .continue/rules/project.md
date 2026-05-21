---
name: HQD project conventions
description: Always-on context for the HQD document-generator-form repo
alwaysApply: true
---

# HQD Document Generator Form

React 18 + TypeScript + Vite app. A page hosts a `<select>` that chooses a document
type and renders the matching form. Submit POSTs `{ documentType, data }` to
`${VITE_API_URL}/document/create`.

## Stack

- React 18, TypeScript (strict), Vite, plain CSS
- Prettier: no semicolons, single quotes, trailing commas, 100-col width, LF line endings

## Layout

- `src/main.tsx` — root
- `src/App.tsx` — renders `FormPage`
- `src/pages/FormPage.tsx` — page with the `<select>`; one render branch per form type
- `src/components/*Form.tsx` — one component per form type
- `src/types/forms.ts` — `FormType` union + per-form value types + empty defaults
- `src/styles/index.css` — global styles

## Conventions

- UI strings are in French.
- Form components own their state, validation, and submit logic.
- Validation runs on submit; required-field check plus format checks (e.g. email regex).
- Use `type`-only imports for type symbols.
- Endpoint URL comes from `import.meta.env.VITE_API_URL`.

## Don't

- Don't add a routing library — single page.
- Don't introduce a form library (Formik, react-hook-form, …) unless asked.
- Don't add backend code here.
