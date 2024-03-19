import http from 'src/utils/http'
import { AgeReport, IncomeReport, MonthlyReport, PlanReport } from 'src/types/report.type'

const URL_GET_GENERAL_REPORT = 'report/general'
const URL_GET_AGE_REPORT = 'report/age'
const URL_GET_PLAN_REPORT = 'report/plan'
const URL_GET_INCOME_REPORT = 'report/income'

const reportApi = {
  getGeneralReport: () => {
    return http.get<MonthlyReport>(URL_GET_GENERAL_REPORT)
  },
  getAgeReport: () => {
    return http.get<AgeReport[]>(URL_GET_AGE_REPORT)
  },
  getPlanReport: () => {
    return http.get<PlanReport[]>(URL_GET_PLAN_REPORT)
  },
  getIncomeReport: () => {
    return http.get<IncomeReport[]>(URL_GET_INCOME_REPORT)
  }
}

export default reportApi
