import { type AxiosError, isAxiosError, HttpStatusCode } from 'axios'
import { ErrorResponse } from 'src/types/utils.type'
import { AES, enc } from 'crypto-js'

export function isAxiosBadRequestError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.BadRequest
}

export function isAxiosInternalServerError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.InternalServerError
}

export function isAxiosUnauthorizedError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosUnauthorizedError<ErrorResponse>(error) && error.response?.data.errorKey === 'TokenIsExpired'
}

export const formatDate = (date: string) => {
  const _date = new Date(date)
  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit', year: 'numeric' }
  const formattedDate = _date.toLocaleDateString('en-GB', options)

  return formattedDate
}

export const formatCurrentDateTime = () => {
  const now = new Date()

  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const year = now.getFullYear()

  return `${hours}:${minutes} ${day}/${month}/${year}`
}

export const formatDateTime = (date: string) => {
  const now = new Date(date)

  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const day = now.getDate().toString().padStart(2, '0')
  const month = (now.getMonth() + 1).toString().padStart(2, '0')
  const year = now.getFullYear()

  return `${hours}:${minutes} ${day}/${month}/${year}`
}

export const formatNumber = (num: number) => {
  return Intl.NumberFormat('en-DE').format(num)
}

export function secondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60)
  const remainingSeconds = seconds % 60
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`
}

export function decodeBase64(encodedString: string): string {
  try {
    const decodedString = atob(encodedString)
    return decodedString
  } catch (error) {
    console.error('Error decoding Base64:', error)
    return '' // Trả về chuỗi trống nếu có lỗi
  }
}

export function encodeBase64(inputString: string): string {
  try {
    const encodedString = btoa(inputString)
    return encodedString
  } catch (error) {
    console.error('Error encoding Base64:', error)
    return '' // Trả về chuỗi trống nếu có lỗi
  }
}

// Hàm mã hóa dữ liệu
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const encryptData = (data: any) => {
  const ciphertext = AES.encrypt(JSON.stringify(data), import.meta.env.VITE_SECRET_KEY as string)
  return ciphertext.toString()
}

// Hàm giải mã dữ liệu
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const decryptData = (encryptedData: any) => {
  const bytes = AES.decrypt(encryptedData, import.meta.env.VITE_SECRET_KEY as string)
  const decryptedData = JSON.parse(bytes.toString(enc.Utf8))
  return decryptedData
}

// Hàm tính tuổi
export const calAge = (birthday: string) => {
  const today = new Date()
  const birthDate = new Date(birthday)
  let age = today.getFullYear() - birthDate.getFullYear()
  const month = today.getMonth() - birthDate.getMonth()

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

export const mergeFileLists = (fileList1: FileList | null, fileList2: FileList): FileList => {
  // Chuyển FileList thành mảng
  if (fileList1) {
    const array1 = Array.from(fileList1)
    const array2 = Array.from(fileList2)

    // Gộp hai mảng
    const mergedArray = array1.concat(array2)

    // Tạo một đối tượng FileList mới từ mảng gộp
    const dataTransfer = new DataTransfer()

    // Thêm các tệp vào đối tượng DataTransfer
    mergedArray.forEach((file) => {
      dataTransfer.items.add(file)
    })

    // Lấy FileList từ đối tượng DataTransfer
    const mergedFileList = dataTransfer.files

    return mergedFileList
  } else return fileList2
}

export function formatDateStringForDatabase(inputDateString) {
  // Tạo đối tượng Date từ chuỗi
  const dateObject = new Date(Date.parse(inputDateString))

  // Lấy các thành phần ngày, tháng, năm
  const day = dateObject.getDate()
  const month = dateObject.getMonth() + 1 // Tháng bắt đầu từ 0, cần cộng thêm 1
  const year = dateObject.getFullYear()

  // Định dạng lại thành chuỗi có thể lưu vào cơ sở dữ liệu (vd: "2024-01-24")
  const formattedDateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`

  return formattedDateString
}

export const transferBooleanToNumber = (value: boolean) => {
  return value ? '1' : '0'
}

export function calculatePercentageChange(currentValue, previousValue) {
  if (previousValue === 0) {
    return 0
  }

  return Math.abs(Math.round(((currentValue - previousValue) / Math.abs(previousValue)) * 100))
}

export function determineChangeType(currentValue, previousValue) {
  if (currentValue - previousValue >= 0) {
    return {
      type: 'increase',
      content: `Tăng ${calculatePercentageChange(currentValue, previousValue)}% so với tháng trước`
    } //tăng
  } else {
    return {
      type: 'decrease',
      content: `Giảm ${calculatePercentageChange(currentValue, previousValue)}% so với tháng trước`
    } //giảm
  }
}

export const calPercent = (num1: number, num2: number) => {
  return Math.round((num1 / num2) * 100) + '%'
}

export function formatNumberToM(number) {
  if (number >= 1000000) {
    return (number / 1000000).toFixed(1) + 'M'
  } else {
    return number.toString()
  }
}
