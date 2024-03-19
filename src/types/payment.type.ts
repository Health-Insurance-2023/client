import { RegistrationFormType } from './registrationForm.type'
import { PageableType } from './utils.type'

export type PaymentType = {
  id: number
  amount: number
  paymentDate: Date | null
  paymentMethod: string | null
  implementer: number
  status: string
  createdAt: Date
  deadline: Date
  registrationForm: RegistrationFormType
}

export type ListPaymentType = {
  content: PaymentType[]
  pageable: PageableType
  last: boolean
  totalElements: number
  totalPages: number
  size: number
  number: number
  sort: {
    empty: boolean
    sorted: boolean
    unsorted: boolean
  }
  numberOfElements: number
  first: boolean
  empty: boolean
}
