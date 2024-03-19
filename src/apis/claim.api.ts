import { ListClaimType } from 'src/types/claim.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_GET_USER_CLAIM = 'claim/get'
const URL_GET_ALL_CLAIM = 'claim/get-all'
const URL_CREATE_CLAIM = 'claim/create'

const claimApi = {
  getUserClaim: (page: number, size: number) => {
    return http.get<ListClaimType>(`${URL_GET_USER_CLAIM}?page=${page}&size=${size}`)
  },
  getAllClaim: (page: number, size: number) => {
    return http.get<ListClaimType>(`${URL_GET_ALL_CLAIM}?page=${page}&size=${size}`)
  },
  createClaim: (body: FormData) => {
    return http.post<SuccessResponse>(URL_CREATE_CLAIM, body, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  approveClaim: (id: number) => {
    return http.patch<SuccessResponse>(`claim/approve/${id}`)
  },
  refuseClaim: (id: number) => {
    return http.patch<SuccessResponse>(`claim/refuse/${id}`)
  }
}

export default claimApi
