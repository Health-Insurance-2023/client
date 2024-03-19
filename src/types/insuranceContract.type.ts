import { RegistrationFormType } from './registrationForm.type'
import { PageableType } from './utils.type'

export type ContractType = {
  id: number
  startDate: Date
  endDate: Date
  createdAt: Date
  updatedAt: Date
  status: string
  registrationForm: RegistrationFormType
}

export type ListContractType = {
  content: ContractType[]
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
