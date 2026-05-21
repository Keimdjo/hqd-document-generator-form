---
name: React + TypeScript style
description: Rules for editing React/TS source files
globs: src/**/*.{ts,tsx}
---

# React + TypeScript style

- Function components only. No class components.
- Default-export the component when the file is named after it (`FormPage.tsx`
  exports `FormPage` as default). Named-export helpers/types.
- Hooks: keep state local to the component unless multiple components need it.
  No global store, no context provider — the app is small.
- Strict TS: respect `noUnusedLocals` and `noUnusedParameters`. Prefix unused
  args with `_` only if truly unavoidable.
- Use `type`-only imports for type symbols:
  `import { useState, type ChangeEvent } from 'react'`.
- Discriminated unions for state machines (see `SubmitStatus` in
  `CoursEssaiForm.tsx`) — prefer them over multiple booleans.
- Event types: `ChangeEvent<HTMLInputElement>`, `FormEvent<HTMLFormElement>`, etc.
- Accessibility: every `<input>` has a `<label htmlFor>`. Use `aria-invalid` on
  fields with errors.
