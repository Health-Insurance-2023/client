import { ListRegistrationFormType, newRegistrationFormType } from 'src/types/registrationForm.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_SIGN_UP_FORM = 'registration-form/create'
const URL_GET_ALL = 'registration-form/get-all'
const URL_GET_ALL_USER = 'registration-form/get-by-user'
const URL_APPROVE_FORM = 'registration-form/approve'
const URL_REFUSE_FORM = 'registration-form/refuse'

const registrationFormApi = {
  signUpNewInsurance: (body: newRegistrationFormType) => {
    return http.post<SuccessResponse>(URL_SIGN_UP_FORM, body)
  },
  getAll: (page: number, size: number) => {
    return http.get<ListRegistrationFormType>(`${URL_GET_ALL}?page=${page}&size=${size}`)
  },
  getAllByUser: (page: number, size: number) => {
    return http.get<ListRegistrationFormType>(`${URL_GET_ALL_USER}?page=${page}&size=${size}`)
  },
  approveForm: (formId: number) => {
    return http.patch<SuccessResponse>(`${URL_APPROVE_FORM}/${formId}`)
  },
  refuseForm: (formId: number) => {
    return http.patch<SuccessResponse>(`${URL_REFUSE_FORM}/${formId}`)
  }
}

export default registrationFormApi
