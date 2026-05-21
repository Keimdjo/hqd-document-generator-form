export type FormType = 'cours-essai'

export interface CoursEssaiFormValues {
  firstName: string
  lastName: string
  birthdate: string
  city: string
  zipCode: string
  phone: string
  email: string
  contact: string
  contactPhone: string
  date1stClass: string
  date2ndClass: string
}

export type CoursEssaiErrors = Partial<Record<keyof CoursEssaiFormValues, string>>

export const emptyCoursEssai: CoursEssaiFormValues = {
  firstName: '',
  lastName: '',
  birthdate: '',
  city: '',
  zipCode: '',
  phone: '',
  email: '',
  contact: '',
  contactPhone: '',
  date1stClass: '',
  date2ndClass: '',
}
