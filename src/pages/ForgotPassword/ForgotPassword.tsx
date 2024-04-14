import { Button, Card, CardBody, CardFooter, CardHeader, Input, Typography } from '@material-tailwind/react'

import loginBackground from 'src/assets/images/Login_background.png'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import routes from 'src/constants/routes'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import authApi from 'src/apis/auth.api'
import { encodeBase64, isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorResponse } from 'src/types/utils.type'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const forgotPasswordMutation = useMutation({
    mutationFn: (email: string) => authApi.forgotPassword(encodeBase64(email)),
    onSuccess: () => {
      toast.success('Đã gửi yêu cầu đặt lại mật khẩu', { autoClose: 2000 })
      navigate('/reset-password/' + encodeBase64(email))
    },
    onError: (error) => {
      if (isAxiosBadRequestError<ErrorResponse>(error)) {
        const formError = error.response?.data
        if (formError) {
          toast.error(formError.message, { autoClose: 2000 })
        }
      }
    }
  })

  const hanldeForgotPassword = (e) => {
    e.preventDefault()
    if (email !== '') forgotPasswordMutation.mutate(email)
  }
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
              <CardHeader
                floated={false}
                shadow={false}
                color='transparent'
                className='mb-10 flex flex-col justify-center items-center gap-2 place-items-center mt-10'
              >
                <Typography variant='h4' className='text-[#0c2964]'>
                  Quên mật khẩu
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
                    id='email'
                    name='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    color='blue'
                    label='Email'
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
                  Quên mật khẩu
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
