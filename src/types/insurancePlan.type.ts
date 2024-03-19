export type InsurancePrice = {
  id: number
  minAge: number
  maxAge: number
  price: number
  rate: number
  effectiveDate: Date
  status: string
}

export type AdditionalBenefit = {
  id: number
  benefitName: string
  minAge: number
  maxAge: number
  price: number
  maxPayout: number
  perTimesPayout: number
}

export type InsurancePlan = {
  id: number
  planName: string
  duration: string
  accidentInsurance: number
  hospitalization: number
  surgery: number
  beforeAdmission: number
  afterDischarge: number
  takeCareAtHome: number
  hospitalizationAllowance: number
  emergencyTransport: number
  funeralAllowance: number
  prices: InsurancePrice[]
  benefits: AdditionalBenefit[]
}
