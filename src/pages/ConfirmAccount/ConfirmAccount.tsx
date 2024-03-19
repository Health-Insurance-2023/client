import { useMutation } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import authApi from 'src/apis/auth.api'
import { ErrorResponse } from 'src/types/utils.type'
import { decodeBase64, isAxiosBadRequestError, secondsToMinutes } from 'src/utils/utils'
import * as yup from 'yup'
import { toast } from 'react-toastify'
import { useNavigate, useParams } from 'react-router-dom'
import routes from 'src/constants/routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'

const ConfirmAccount = () => {
  const { email } = useParams()
  let countdown: any // Đối tượng để theo dõi bộ đếm
  let remainingTime: number = 120 // Thời gian còn lại trong giây
  let counting = false // Trạng thái bộ đếm (đang đếm hay không)
  const navigate = useNavigate()
  const [isCounting, setIsCounting] = useState(false)

  const confirmAccountMutation = useMutation({
    mutationFn: (body: { email: string; code: string }) => authApi.confirmAccount(body),
    onSuccess: (res) => {
      toast.success(res.data.message, { autoClose: 2000 })
      navigate(routes.login)
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

  const formik = useFormik({
    initialValues: {
      valueOfCellOne: '',
      valueOfCellTwo: '',
      valueOfCellThree: '',
      valueOfCellFour: '',
      valueOfCellFive: '',
      valueOfCellSix: ''
    },
    validationSchema: yup.object().shape({
      valueOfCellOne: yup.string().required(),
      valueOfCellTwo: yup.string().required(),
      valueOfCellThree: yup.string().required(),
      valueOfCellFour: yup.string().required(),
      valueOfCellFive: yup.string().required(),
      valueOfCellSix: yup.string().required()
    }),
    onSubmit: async (data) => {
      const code =
        data.valueOfCellOne.toString() +
        data.valueOfCellTwo.toString() +
        data.valueOfCellThree.toString() +
        data.valueOfCellFour.toString() +
        data.valueOfCellFive.toString() +
        data.valueOfCellSix.toString()

      confirmAccountMutation.mutateAsync({ email: email as string, code: code })
    }
  })

  const resendCodeMutation = useMutation({
    mutationFn: (email: string) => authApi.resendConfirmCode(email),
    onError: (error) => {
      if (isAxiosBadRequestError<ErrorResponse>(error)) {
        const formError = error.response?.data
        if (formError) {
          toast.error(formError.message, { autoClose: 2000 })
        }
      }
    }
  })

  const handleResendCode = () => {
    resendCodeMutation.mutate(email as string)
    startCountdown(document.getElementById('resend') as HTMLButtonElement)
  }

  useEffect(() => {
    const codes = document.getElementsByClassName('confirm-code') as HTMLCollectionOf<HTMLInputElement>

    for (let i = 0; i < codes.length; i++) {
      codes[i].addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
          codes[i].value = ''
          if (i !== codes.length - 1) {
            setTimeout(() => {
              codes[i + 1].focus()
            }, 10)
          }
        } else if (e.key === 'Backspace') {
          //codes[i].value = ''
          if (i !== 0) {
            setTimeout(() => {
              codes[i - 1].focus()
            }, 10)
          }
        }
      })
    }
  })

  function startCountdown(yourButtonElement: HTMLButtonElement) {
    if (!counting) {
      counting = true
      setIsCounting(true)
      countdown = setInterval(function () {
        remainingTime--
        // Cập nhật giao diện của button
        if (remainingTime > 0) {
          // Cập nhật văn bản trên button
          yourButtonElement.textContent = `Resend (${secondsToMinutes(remainingTime)})`
        } else {
          // Dừng bộ đếm và khôi phục trạng thái ban đầu
          clearInterval(countdown)
          counting = false
          setIsCounting(false)
          yourButtonElement.textContent = 'Resend'
        }
      }, 1000) // Cứ mỗi giây làm cập nhật
    }
  }

  useEffect(() => {
    startCountdown(document.getElementById('resend') as HTMLButtonElement)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className='flex h-screen w-screen justify-center items-center bg-gradient-to-br overflow-hidden
     from-[#9861c2] to-[#5cc0de] font-[Lato]'
    >
      <div className='bg-[rgba(255,255,255,0.3)] p-[30px] rounded-[10px] text-center'>
        <FontAwesomeIcon
          icon={faHouse}
          className='absolute -ml-[280px] -mt-[10px] cursor-pointer'
          onClick={() => navigate(routes.home)}
        />
        <h2 className='font-semibold text-2xl'>Verify your account</h2>
        <p className='mt-2'>
          We emailed you the six digit code to <span className='font-semibold'>{decodeBase64(email as string)}</span>{' '}
        </p>
        <span>Enter the code below to confirm your email address</span>

        <form
          id='confirm-form'
          className='flex items-center justify-center font-[Lato] text-[30px] my-8'
          onSubmit={formik.handleSubmit}
        >
          <input
            className={`confirm-code bg-[rgba(255,255,255,0.6)] rounded-[10px] border border-[#eee] w-[70px] h-[75px] m-[10px]
            text-center font-light arrow-hide caret-transparent valid:border-[#9861c2] valid:shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.25)]
             `}
            id='valueOfCellOne'
            name='valueOfCellOne'
            type='number'
            value={formik.values.valueOfCellOne}
            onChange={formik.handleChange}
            min='0'
            max='9'
            placeholder='0'
            required
            autoFocus
          />
          {/* 2 */}
          <input
            className={`confirm-code bg-[rgba(255,255,255,0.6)] rounded-[10px] border border-[#eee] w-[70px] h-[75px] m-[10px]
            text-center font-light arrow-hide caret-transparent valid:border-[#9861c2] valid:shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.25)]
             `}
            id='valueOfCellTwo'
            name='valueOfCellTwo'
            type='number'
            value={formik.values.valueOfCellTwo}
            onChange={formik.handleChange}
            min='0'
            max='9'
            placeholder='0'
            required
          />
          {/* 3 */}
          <input
            className={`confirm-code bg-[rgba(255,255,255,0.6)] rounded-[10px] border border-[#eee] w-[70px] h-[75px] m-[10px]
            text-center font-light arrow-hide caret-transparent valid:border-[#9861c2] valid:shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.25)]
            `}
            id='valueOfCellThree'
            name='valueOfCellThree'
            type='number'
            value={formik.values.valueOfCellThree}
            onChange={formik.handleChange}
            min='0'
            max='9'
            placeholder='0'
            required
          />
          {/* 4 */}
          <input
            className={`confirm-code bg-[rgba(255,255,255,0.6)] rounded-[10px] border border-[#eee] w-[70px] h-[75px] m-[10px]
          text-center font-light arrow-hide caret-transparent valid:border-[#9861c2] valid:shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.25)]
           `}
            id='valueOfCellFour'
            name='valueOfCellFour'
            type='number'
            value={formik.values.valueOfCellFour}
            onChange={formik.handleChange}
            min='0'
            max='9'
            placeholder='0'
            required
          />
          {/* 5 */}
          <input
            className={`confirm-code bg-[rgba(255,255,255,0.6)] rounded-[10px] border border-[#eee] w-[70px] h-[75px] m-[10px]
            text-center font-light arrow-hide caret-transparent valid:border-[#9861c2] valid:shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.25)]
            `}
            id='valueOfCellFive'
            name='valueOfCellFive'
            type='number'
            value={formik.values.valueOfCellFive}
            onChange={formik.handleChange}
            min='0'
            max='9'
            placeholder='0'
            required
          />
          {/* 6 */}
          <input
            className={`confirm-code bg-[rgba(255,255,255,0.6)] rounded-[10px] border border-[#eee] w-[70px] h-[75px] m-[10px]
            text-center font-light arrow-hide caret-transparent valid:border-[#9861c2] valid:shadow-[0px_10px_10px_-5px_rgba(0,0,0,0.25)]
            `}
            id='valueOfCellSix'
            name='valueOfCellSix'
            type='number'
            value={formik.values.valueOfCellSix}
            onChange={formik.handleChange}
            min='0'
            max='9'
            placeholder='0'
            required
          />
        </form>

        <div className='mb-4'>
          <button
            form='confirm-form'
            disabled={!formik.isValid || formik.values.valueOfCellOne === ''}
            type='submit'
            className='py-2 font-[Lato] min-w-[400px] rounded-[10px] uppercase tracking-wide bg-[#9861c2] text-white disabled:cursor-not-allowed disabled:opacity-30'
          >
            Verify
          </button>
        </div>
        <small className='text-[14px]'>
          If you didn't recevie a code !!{' '}
          <button
            disabled={isCounting}
            onClick={handleResendCode}
            id='resend'
            className='text-[#1b74e4] text-[15px] mt-2 ml-1 font-[600] disabled:text-gray-600'
          >
            Resend
          </button>
        </small>
      </div>
    </div>
  )
}

export default ConfirmAccount
