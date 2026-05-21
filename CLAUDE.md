# HQD Document Generator Form

React 18 + TypeScript + Vite app. A single page hosts a `<select>` that
chooses a document type and renders the matching form. Submitting POSTs
`{ documentType, data }` to `${VITE_API_URL}/document/create`.

## Stack

- React 18 (`react`, `react-dom`)
- TypeScript (strict mode, `noUnusedLocals`, `noUnusedParameters`)
- Vite (dev server + build)
- Plain CSS (no UI library, no CSS framework)
- Prettier (no semicolons, single quotes, trailing commas, 100-col width)

## Commands

```sh
npm run dev          # start Vite dev server
npm run build        # type-check then build
npm run preview      # serve built bundle
npm run format       # prettier --write .
npm run format:check # prettier --check .
```

## Layout

- [src/main.tsx](src/main.tsx) — React root
- [src/App.tsx](src/App.tsx) — renders `FormPage`
- [src/pages/FormPage.tsx](src/pages/FormPage.tsx) — page with the `<select>`; render branches per form type
- [src/components/](src/components/) — one component per form type (e.g. `CoursEssaiForm.tsx`)
- [src/types/forms.ts](src/types/forms.ts) — `FormType` union + per-form value types + empty defaults
- [src/styles/index.css](src/styles/index.css) — global styles, BEM-ish class names

## Conventions

- Form components own their own state, validation, and submit logic.
- Validation runs on submit. Required-field check + format checks (e.g. email regex).
  Optional fields are explicitly listed (currently `date1stClass`, `date2ndClass`).
- All UI strings are in French.
- The submit payload wraps the form data: `{ documentType: FormType, data: <values> }`.
- Endpoint URL is `import.meta.env.VITE_API_URL` (see [.env.example](.env.example)); the form appends `/document/create`.
- Use `type`-only imports for type symbols (`import { type Foo }` / `import type { Foo }`).

## Adding a new form type

1. Extend the `FormType` union in [src/types/forms.ts](src/types/forms.ts) and add an `XxxFormValues` interface + `emptyXxx` default.
2. Create `src/components/XxxForm.tsx` following the `CoursEssaiForm` shape (local state, `validate()`, `handleSubmit`, `Field` subcomponent).
3. Add the option to `FORM_OPTIONS` and a render branch in [src/pages/FormPage.tsx](src/pages/FormPage.tsx).

## Don't

- Don't add a routing library — there's a single page.
- Don't introduce a form library (Formik, react-hook-form, etc.) unless asked; the manual pattern is intentional.
- Don't add backend code in this repo — it's frontend-only and talks to an external API.
