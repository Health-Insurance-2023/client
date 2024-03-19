import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from '@material-tailwind/react'

import loginBackground from 'src/assets/Images/Login_background.png'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import routes from 'src/constants/routes'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import { isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'
import { useFormik } from 'formik'
import userAccountApi from 'src/apis/userAccount.api'
import * as yup from 'yup'
import CustomInput from 'src/components/CustomInput'

const ResetPassword = () => {
  const { email } = useParams()
  const [code, setCode] = useState('')
  const [isCorrectCode, setIsCorrectCode] = useState(false)
  const [openPopoverPassword, setOpenPopoverPassword] = useState<boolean>(false)
  const [openPopoverConfirmPassword, setOpenPopoverCofirmPassword] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const navigate = useNavigate()

  const forgotPasswordMutation = useMutation({
    mutationFn: (body: { email: string; code: string }) => authApi.confirmForgotPassword(body),
    onSuccess: () => {
      toast.success('Mã xác nhận đúng. Vui lòng nhập mật khẩu mới', { autoClose: 2000 })
      setIsCorrectCode(true)
    },
    onError: (error) => {
      if (isAxiosBadRequestError<ErrorResponse>(error)) {
        const formError = error.response?.data
        if (formError) {
          toast.error(
            formError.errorKey === 'ForgotPasswordCodeIsExpired' ? 'Mã xác nhận hết hạn' : 'Mã xác nhận không đúng',
            {
              autoClose: 2000
            }
          )
        }
      }
    }
  })

  const setNewPassworddMutation = useMutation({
    mutationFn: (body: { email: string; newPassword: string }) => userAccountApi.setNewPassword(body),
    onSuccess: () => {
      toast.success('Đã đổi mật khẩu thành công', { autoClose: 2000 })
      navigate(routes.login)
    },
    onError: (error) => {
      if (isAxiosBadRequestError<ErrorResponse>(error)) {
        const formError = error.response?.data
        if (formError) {
          toast.error('Không thể thực hiện', {
            autoClose: 2000
          })
        }
      }
    }
  })

  const hanldeForgotPassword = (e) => {
    e.preventDefault()
    if (code !== '') forgotPasswordMutation.mutate({ email: email, code: code })
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: yup.object({
      password: yup
        .string()
        .required('Vui lòng nhập mật khẩu của bạn')
        .min(6, 'Nhập mật khẩu có ít nhất 6 ký tự, có thể bao gồm số, chữ cái và dấu câu (như ! và &).'),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Mật khẩu xác nhận không khớp.')
        .required('Vui lòng xác nhận mật khẩu của bạn.')
    }),
    onSubmit: async (data) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await setNewPassworddMutation.mutate({ email: email, newPassword: data.password })
    }
  })

  return (
    <div className='w-screen h-screen flex justify-center items-center bg-white'>
      <div className='bg-[#ebf0f4] flex-1 h-full flex justify-center items-center rounded-br-[50px]'>
        <img src={loginBackground} className='object-none'></img>
      </div>

      <div className={`w-2/5 h-full bg-[#ebf0f4]`}>
        <div className='w-full h-full bg-white flex justify-center items-center rounded-tl-[50px]'>
          <div className={`transition-[height] duration-150 ease-in-out `}>
            <div className='bg-[#ebeaea] w-[384px] -mt-4 absolute h-[100px] rounded-xl flex gap-8 items-start'></div>
            <Card className='w-96'>
              {isCorrectCode ? (
                <>
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color='transparent'
                    className='mb-10 flex flex-col justify-center items-center gap-2 place-items-center mt-10'
                  >
                    <Typography variant='h4' className='text-[#0c2964]'>
                      Nhập mã xác nhận
                    </Typography>
                    <span className='text-[#0c2964]'>
                      Quay lại?{' '}
                      <Link to={routes.login} className='text-[#3873f2]'>
                        Đăng nhập
                      </Link>
                    </span>
                  </CardHeader>
                  <CardBody className='mb-3'>
                    <form id='form-reset-password' onSubmit={formik.handleSubmit} className='flex flex-col gap-4'>
                      <CustomInput
                        type='password'
                        openPopoverError={openPopoverPassword}
                        setOpenPopoverError={setOpenPopoverPassword}
                        formik={formik}
                        errorMsg={errorMsg}
                        setErrorMsg={setErrorMsg}
                        label='Mật khẩu'
                        id='my-password'
                        name='password'
                      />
                      {/* password */}
                      <CustomInput
                        type='password'
                        openPopoverError={openPopoverConfirmPassword}
                        setOpenPopoverError={setOpenPopoverCofirmPassword}
                        formik={formik}
                        errorMsg={errorMsg}
                        setErrorMsg={setErrorMsg}
                        label='Nhập lại mật khẩu'
                        id='my-confirm-password'
                        name='confirmPassword'
                      />
                    </form>
                  </CardBody>
                  <CardFooter className='pt-0'>
                    <Button
                      form='form-reset-password'
                      type='submit'
                      variant='gradient'
                      color='blue'
                      className='text-lg leading-5'
                      fullWidth
                    >
                      Đổi mật khẩu
                    </Button>
                  </CardFooter>
                </>
              ) : (
                <>
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color='transparent'
                    className='mb-10 flex flex-col justify-center items-center gap-2 place-items-center mt-10'
                  >
                    <Typography variant='h4' className='text-[#0c2964]'>
                      Nhập mã xác nhận
                    </Typography>
                    <span className='text-[#0c2964]'>
                      Quay lại?{' '}
                      <Link to={routes.login} className='text-[#3873f2]'>
                        Đăng nhập
                      </Link>
                    </span>
                  </CardHeader>
                  <CardBody className='mb-3'>
                    <form id='form-login' className='flex flex-col gap-4'>
                      <Input
                        type='text'
                        id='code'
                        name='code'
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        color='blue'
                        label='Mã xác nhận'
                        size='lg'
                        crossOrigin={undefined}
                        required
                      />
                    </form>
                  </CardBody>
                  <CardFooter className='pt-0'>
                    <Button
                      form='form-login'
                      type='submit'
                      onClick={hanldeForgotPassword}
                      variant='gradient'
                      color='blue'
                      className='text-lg leading-5'
                      fullWidth
                    >
                      Xác nhận
                    </Button>
                  </CardFooter>
                </>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
