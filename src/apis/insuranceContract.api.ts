import { ContractType, ListContractType } from 'src/types/insuranceContract.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_GET_USER_CONTRACT = 'insurance-contract/get'
const URL_GET_ALL_CONTRACT = 'insurance-contract/get-all'
const URL_CANCEL_CONTRACT = 'insurance-contract/cancel'
const URL_REQUEST_CANCEL_CONTRACT = 'insurance-contract/request-cancel'

const insuranceContractApi = {
  getUserContract: (page: number, size: number) => {
    return http.get<ListContractType>(`${URL_GET_USER_CONTRACT}?page=${page}&size=${size}`)
  },
  getAllContract: (page: number, size: number) => {
    return http.get<ListContractType>(`${URL_GET_ALL_CONTRACT}?page=${page}&size=${size}`)
  },
  getContractById: (id: number) => {
    return http.get<ContractType>(`${URL_GET_USER_CONTRACT}/${id}`)
  },
  cancelContract: (id: number) => {
    return http.patch<SuccessResponse>(`${URL_CANCEL_CONTRACT}/${id}`)
  },
  requestCancelContract: (id: number) => {
    return http.patch<SuccessResponse>(`${URL_REQUEST_CANCEL_CONTRACT}/${id}`)
  }
}

export default insuranceContractApi
