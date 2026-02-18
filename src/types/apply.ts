/**
 * Apply Page Types
 */

export interface ApplicationFormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  programme: string
  intake: string
  additionalInfo: string
  consent: boolean
}

export interface SelectOption {
  value: string
  label: string
}

export interface KeyDate {
  intake: string
  deadline: string
}
