import { PageableType } from './utils.type'

export type document = {
  id: number
  name: string
  url: string
  fileType: string
  timeCreated: Date
}

export type ClaimType = {
  id: number
  amount: number
  requestDate: Date
  accidentDate: null | Date
  accidentPlace: string | null
  examinationDate: null | Date
  hospitalizedDate: null | Date
  treatmentPlace: string | null
  reason: string | null
  consequence: string | null
  typeTreatment: string
  endDate: Date
  startDate: Date
  death: boolean
  injured: boolean
  transport: boolean
  medicalExpense: boolean
  benefit: boolean
  documents: document[]
  insuranceContractId: number
  userAccountId: number
  status: string
  paymentMethod: string
  bank: string
  stk: string
}

export type ListClaimType = {
  content: ClaimType[]
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
