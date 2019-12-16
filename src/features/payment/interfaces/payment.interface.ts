import { PersonalData } from './personal-data.interface'
import { PaymentStatus } from '../enums/payment.status'

export interface Payment {
  id: string
  title: string
  status: PaymentStatus
  paymentChannel: string
  description: string
  additionalData?: string
  amount: {
    currencyCode: string
    value: number
  }
  requestedAmount: {
    currencyCode: string
    value: number
  }
  personalData: PersonalData
}
