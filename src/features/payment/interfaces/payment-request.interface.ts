import { PersonalData } from './personal-data.interface'

export interface PaymentRequest {
  title: string
  amount: {
    value: number
    currencyCode: string
  }
  description: string
  additionalData?: string
  returnUrl?: string
  negativeReturnUrl?: string
  paymentChannel?: string
  languageCode?: string
  personalData?: PersonalData
  referer?: string
}
