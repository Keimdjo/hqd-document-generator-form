---
name: Form component pattern
description: Shape to follow when adding or editing a *Form.tsx component
globs: src/components/*Form.tsx
---

# Form component pattern

All form components follow the same shape — match it when adding a new one.

## Shape

1. **Constants at the top**: `REQUIRED_FIELDS` array of `keyof <Values>`, plus
   any regex (`EMAIL_REGEX`, etc.).
2. **`validate(values)` function**: returns an errors object. Required-field
   loop first, then format-specific checks. Pure function — no side effects.
3. **`SubmitStatus` discriminated union**: `idle | submitting | success | error`.
4. **Component body**:
   - `useState` for `values`, `errors`, `status`.
   - `handleChange` updates `values` via functional setState.
   - `handleSubmit` validates, sets status, reads `VITE_API_URL`, POSTs
     `{ documentType, data: values }` to `${apiUrl}/document/create`, resets
     form on success.
5. **`<Field>` local subcomponent**: renders label + input + inline error. Use
   it for every input — don't inline `<input>` in the form JSX.

## Submit payload

```ts
{ documentType: '<form-type>', data: values }
```

POST to `${import.meta.env.VITE_API_URL}/document/create`. If
`VITE_API_URL` is missing, surface an error to the user — don't fall back
silently.

## Required vs optional fields

List required fields explicitly in `REQUIRED_FIELDS`. Fields not in the list
are optional and must not trigger the "champ obligatoire" error.

## UI text

All labels, placeholders, button text, and error messages are in French.
