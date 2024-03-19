import * as yup from 'yup'
import { PageableType } from './utils.type'

export const registrationFormSchema = yup.object({
  id: yup.number(),
  email: yup
    .string()
    .matches(/^[A-Za-z0-9]{1,30}@[a-z0-9]{2,10}(\.[a-z0-9]{2,10}){1,3}$/, 'Vui lòng nhập lại địa chỉ email hợp lệ.')
    .required('Bạn sẽ sử dụng thông tin này để nhận các thông báo về bảo hiểm.'),
  name: yup.string().required('Tên của bạn là gì?').min(5, 'Vui lòng nhập đây đủ họ và tên của bạn'),
  phone: yup
    .string()
    .required('Hãy nhập số điện thoại')
    .min(10, 'Số điện thoại phải có 10 chữ số')
    .max(10, 'Số điện thoại phải có 10 chữ số')
    .matches(/^0[0-9]+$/, 'Số điện thoại không hợp lệ'),
  address: yup.string().required('Hãy nhập địa chỉ của bạn'),
  cmnd: yup.string().required('Hãy nhập số chứng minh nhân dân của bạn').min(9, 'Số CMND phải có 9 chữ số')
})

export type newInsuredPersonType = {
  name: string
  email: string
  phone: string
  birthday: Date
  gender: string
  address: string
  relationshipWithBuyers: string
  cmnd: string
}

export type newHealthInformationType = {
  injured: string
  medicalTreatment: string
  radiationTreatment: string
  neurologicalTreatment: string
  cardiovascularTreatment: string
  metabolicTreatment: string
  infectiousDiseaseTreatment: string
  disability: string
  strokeOrAsthma: string
  pregnant: null | string
  complicationHistory: null | string
}

export type newInsuranceInformationType = {
  planName: string
  planCost: number
  additionalCost: number
  accidentInsurance: number
  hospitalization: number
  surgery: number
  beforeAdmission: number
  afterDischarge: number
  takeCareAtHome: number
  hospitalizationAllowance: number
  emergencyTransport: number
  funeralAllowance: number
  outpatientTreatmentMax: number | null
  outpatientTreatment: number | null
  dentalCare: number | null
  maternity: number | null
  death: number | null
}

export type newRegistrationFormType = {
  insuredPerson: newInsuredPersonType
  healthInformation: newHealthInformationType
  insuranceInformation: newInsuranceInformationType
}

export type HealthInformationType = {
  id: number
  injured: string
  medicalTreatment: string
  radiationTreatment: string
  neurologicalTreatment: string
  cardiovascularTreatment: string
  metabolicTreatment: string
  infectiousDiseaseTreatment: string
  disability: string
  strokeOrAsthma: string
  pregnant: string | null
  complicationHistory: string | null
  timeCreated: Date
  timeUpdated: Date
}

export type InsuredPersonType = {
  id: number
  name: string
  email: string
  phone: string
  birthday: Date
  gender: string
  address: string
  relationshipWithBuyers: string
  healthInformation: HealthInformationType
  timeCreated: Date
  timeUpdated: Date
  status: string
  cmnd: string
}

export type InsuranceInformationType = {
  id: number
  planName: string
  planCost: number
  additionalCost: number
  accidentInsurance: number
  hospitalization: number
  surgery: number
  beforeAdmission: number
  afterDischarge: number
  takeCareAtHome: number
  hospitalizationAllowance: number
  emergencyTransport: number
  funeralAllowance: number
  outpatientTreatmentMax: number | null
  outpatientTreatment: number | null
  dentalCare: number | null
  maternity: number | null
  death: number | null
  status: string
}

export type RegistrationFormType = {
  id: number
  applyDate: Date
  note: null | string
  createdAt: Date
  updatedAt: Date
  status: string
  userAccountId: number
  insuredPerson: InsuredPersonType
  insuranceInformation: InsuranceInformationType
}

export type ListRegistrationFormType = {
  content: RegistrationFormType[]
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
