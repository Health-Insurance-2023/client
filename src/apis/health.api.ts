import { newHealthInformationType } from 'src/types/registrationForm.type'
import { SuccessResponse } from 'src/types/utils.type'
import http from 'src/utils/http'

const URL_UPDATE_HEALTH = 'health/update'

const healthApi = {
  updateHealthInfor: (body: newHealthInformationType, id: number) => {
    return http.put<SuccessResponse>(`${URL_UPDATE_HEALTH}/${id}`, body)
  }
}

export default healthApi
