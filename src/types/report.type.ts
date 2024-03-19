export type GeneralReport = {
  countInsuranceContract: number
  countRegistrationForm: number
  countInsuredPerson: number
  revenue: number | null
}

export type MonthlyReport = {
  current: GeneralReport
  prev: GeneralReport
}

export type AgeReport = {
  ageGroup: string
  quantity: number
}

export type PlanReport = {
  packageName: string
  contractCount: number
}

export type IncomeReport = {
  month: number
  year: number
  compensationAmount: number
  totalAmount: number
}
