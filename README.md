# HQD Document Generator Form

React + TypeScript app (Vite) with a select that renders different forms.
Currently only the `cours-essai` form is implemented.

## Setup

```sh
npm install
cp .env.example .env   # edit VITE_API_URL to point at your backend
npm run dev
```

## Submit endpoint

The form POSTs the JSON payload to `VITE_API_URL` (set in `.env`).

Required: `firstName`, `lastName`, `birthdate`, `city`, `zipCode`, `phone`,
`email`, `contact`, `contactPhone`. Optional: `date1stClass`, `date2ndClass`.

## Adding a new form type

1. Add the value to `FormType` in [src/types/forms.ts](src/types/forms.ts).
2. Create a new form component in [src/components/](src/components/).
3. Register the option and render branch in [src/pages/FormPage.tsx](src/pages/FormPage.tsx).
