import http from 'src/utils/http'
import { User, UserInfor } from 'src/types/user.type'
import { SuccessResponse } from 'src/types/utils.type'

const URL_GET_USER_INFOR = 'user/infor'
const URL_UPDATE_USER_INFOR = 'user/update'
const URL_UPDATE_PASSWORD = 'user/update-password'

const userAccountApi = {
  getUserInfor: () => {
    return http.get<UserInfor>(URL_GET_USER_INFOR)
  },
  updateUserInfor: (
    body: Pick<User, 'email' | 'lastName' | 'firstName' | 'phone' | 'gender' | 'birthday' | 'address' | 'cmnd'>
  ) => {
    return http.put<SuccessResponse>(URL_UPDATE_USER_INFOR, body)
  },
  updatePassword: (body: { oldPassword: string; newPassword: string }) => {
    return http.patch<SuccessResponse>(URL_UPDATE_PASSWORD, body)
  },
  setNewPassword: (body: { email: string; newPassword: string }) => {
    return http.patch<SuccessResponse>(`user/set-new-password`, body)
  }
}

export default userAccountApi
