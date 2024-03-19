import http from 'src/utils/http'
import { LoginResponse } from 'src/types/auth.type'
import { User } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'

export const URL_SIGNUP = 'authenticate/signup'
export const URL_SIGNIN = 'authenticate/signin'
export const URL_REFRESH_TOKEN = 'authenticate/refresh-token'
const URL_CONFIRM = 'authenticate/confirm'
const URL_RESEND = 'authenticate/resend'

const authApi = {
  signUp: (body: Pick<User, 'email' | 'password' | 'lastName' | 'firstName' | 'phone' | 'birthday'>) => {
    return http.post<SuccessResponse>(URL_SIGNUP, body)
  },
  signIn: (body: Pick<User, 'email' | 'password'>) => {
    return http.post<LoginResponse>(URL_SIGNIN, body)
  },
  confirmAccount: (body: { email: string; code: string }) => {
    return http.post<SuccessResponse>(URL_CONFIRM, body)
  },
  resendConfirmCode: (email: string) => {
    return http.post<SuccessResponse>(`${URL_RESEND}` + '?email=' + email)
  },
  forgotPassword: (email: string) => {
    return http.post<SuccessResponse>(`authenticate/forgot-password?email=${email}`)
  },
  confirmForgotPassword: (body: { email: string; code: string }) => {
    return http.post<SuccessResponse>(`authenticate/confirm-forgot-code`, body)
  }
}

export default authApi
