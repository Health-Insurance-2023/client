import { ListPaymentType } from 'src/types/payment.type'
import http from 'src/utils/http'

const URL_GET_USER_PAYMENT = 'insurance-payment/get'
const URL_GET_ALL_PAYMENT = 'insurance-payment/get-all'
const URL_PAY_BILL = 'insurance-payment/pay'

const paymentApi = {
  getUserPayment: (page: number, size: number) => {
    return http.get<ListPaymentType>(`${URL_GET_USER_PAYMENT}?page=${page}&size=${size}`)
  },
  payBill: (request: { body: { method: string }; id: number }) => {
    return http.post(`${URL_PAY_BILL}/${request.id}`, request.body)
  },
  getAllPayment: (page: number, size: number) => {
    return http.get<ListPaymentType>(`${URL_GET_ALL_PAYMENT}?page=${page}&size=${size}`)
  }
}

export default paymentApi
