import { useState, type ChangeEvent } from 'react'
import CoursEssaiForm from '../components/CoursEssaiForm'
import type { FormType } from '../types/forms'

const FORM_OPTIONS: { value: FormType; label: string }[] = [
  { value: 'cours-essai', label: "Cours d'essai" },
]

export default function FormPage() {
  const [selected, setSelected] = useState<FormType | ''>('')

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value as FormType | '')
  }

  return (
    <main className="page">
      <h1>Générateur de documents HQD</h1>

      <div className="field">
        <label htmlFor="form-type">Type de document</label>
        <select id="form-type" value={selected} onChange={handleSelect}>
          <option value="">— Sélectionner —</option>
          {FORM_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {selected === 'cours-essai' && <CoursEssaiForm />}
    </main>
  )
}
