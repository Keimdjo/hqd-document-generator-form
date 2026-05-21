import { useState, type FormEvent, type ChangeEvent } from 'react'
import { emptyCoursEssai, type CoursEssaiErrors, type CoursEssaiFormValues } from '../types/forms'

const REQUIRED_FIELDS: Array<keyof CoursEssaiFormValues> = [
  'firstName',
  'lastName',
  'birthdate',
  'city',
  'zipCode',
  'phone',
  'email',
  'contact',
  'contactPhone',
]

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validate(values: CoursEssaiFormValues): CoursEssaiErrors {
  const errors: CoursEssaiErrors = {}

  for (const field of REQUIRED_FIELDS) {
    if (!values[field].trim()) {
      errors[field] = 'Ce champ est obligatoire'
    }
  }

  if (values.email && !EMAIL_REGEX.test(values.email)) {
    errors.email = 'Adresse e-mail invalide'
  }

  return errors
}

type SubmitStatus =
  | { kind: 'idle' }
  | { kind: 'submitting' }
  | { kind: 'success' }
  | { kind: 'error'; message: string }

function extractFilename(contentDisposition: string | null): string | null {
  if (!contentDisposition) return null

  const utf8Match = /filename\*\s*=\s*UTF-8''([^;]+)/i.exec(contentDisposition)
  if (utf8Match) {
    try {
      return decodeURIComponent(utf8Match[1].trim())
    } catch {
      // fall through
    }
  }

  const asciiMatch = /filename\s*=\s*"?([^";]+)"?/i.exec(contentDisposition)
  if (asciiMatch) {
    return asciiMatch[1].trim()
  }

  return null
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}

export default function CoursEssaiForm() {
  const [values, setValues] = useState<CoursEssaiFormValues>(emptyCoursEssai)
  const [errors, setErrors] = useState<CoursEssaiErrors>({})
  const [status, setStatus] = useState<SubmitStatus>({ kind: 'idle' })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) {
      setStatus({ kind: 'idle' })
      return
    }

    setStatus({ kind: 'submitting' })

    const apiUrl = import.meta.env.VITE_API_URL
    if (!apiUrl) {
      setStatus({
        kind: 'error',
        message: "VITE_API_URL n'est pas défini dans le fichier .env",
      })
      return
    }

    try {
      const apiKey = import.meta.env.VITE_API_KEY
      console.log('env', import.meta.env, apiKey)
      const response = await fetch(`${apiUrl}/document/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': apiKey,
        },
        body: JSON.stringify({ documentType: 'cours-essai', data: values }),
      })
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }

      const blob = await response.blob()
      const filename =
        extractFilename(response.headers.get('content-disposition')) ?? 'cours-essai.pdf'
      triggerDownload(blob, filename)

      setStatus({ kind: 'success' })
      setValues(emptyCoursEssai)
    } catch (err) {
      setStatus({
        kind: 'error',
        message: err instanceof Error ? err.message : 'Erreur inconnue',
      })
    }
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <Field
        label="Prénom"
        name="firstName"
        value={values.firstName}
        error={errors.firstName}
        onChange={handleChange}
        required
      />
      <Field
        label="Nom"
        name="lastName"
        value={values.lastName}
        error={errors.lastName}
        onChange={handleChange}
        required
      />
      <Field
        label="Date de naissance"
        name="birthdate"
        type="date"
        value={values.birthdate}
        error={errors.birthdate}
        onChange={handleChange}
        required
      />
      <Field
        label="Ville"
        name="city"
        value={values.city}
        error={errors.city}
        onChange={handleChange}
        required
      />
      <Field
        label="Code postal"
        name="zipCode"
        value={values.zipCode}
        error={errors.zipCode}
        onChange={handleChange}
        required
      />
      <Field
        label="Téléphone"
        name="phone"
        value={values.phone}
        error={errors.phone}
        onChange={handleChange}
        required
      />
      <Field
        label="E-mail"
        name="email"
        type="email"
        value={values.email}
        error={errors.email}
        onChange={handleChange}
        required
      />
      <Field
        label="Personne à contacter"
        name="contact"
        value={values.contact}
        error={errors.contact}
        onChange={handleChange}
        required
      />
      <Field
        label="Téléphone du contact"
        name="contactPhone"
        value={values.contactPhone}
        error={errors.contactPhone}
        onChange={handleChange}
        required
      />
      <Field
        label="Date du 1er cours"
        name="date1stClass"
        type="date"
        value={values.date1stClass}
        error={errors.date1stClass}
        onChange={handleChange}
      />
      <Field
        label="Date du 2ème cours"
        name="date2ndClass"
        type="date"
        value={values.date2ndClass}
        error={errors.date2ndClass}
        onChange={handleChange}
      />

      <div className="form-actions">
        <button type="submit" disabled={status.kind === 'submitting'}>
          {status.kind === 'submitting' ? 'Envoi…' : 'Envoyer'}
        </button>
      </div>

      {status.kind === 'success' && (
        <p className="form-message form-message--success">Formulaire envoyé.</p>
      )}
      {status.kind === 'error' && (
        <p className="form-message form-message--error">Échec de l'envoi : {status.message}</p>
      )}
    </form>
  )
}

interface FieldProps {
  label: string
  name: keyof CoursEssaiFormValues
  value: string
  error?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
  required?: boolean
}

function Field({
  label,
  name,
  value,
  error,
  onChange,
  type = 'text',
  required = false,
}: FieldProps) {
  const id = `field-${name}`
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  )
}
