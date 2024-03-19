import { InsurancePlan } from 'src/types/insurancePlan.type'
import http from 'src/utils/http'

const URL_GET_ALL_PLAN = 'insurance-plan/get'

const insurancePlanApi = {
  getAllInsurancePlan: () => {
    return http.get<InsurancePlan[]>(URL_GET_ALL_PLAN)
  }
}

export default insurancePlanApi
