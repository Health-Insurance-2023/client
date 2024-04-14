import { Input } from '@material-tailwind/react'
import { useFormik } from 'formik'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuestion } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react'
import Support from '../../components/Support'
import HomeHeader from 'src/components/HomeHeader'

const Request = () => {
  const [isSupportVisible, setSupportVisible] = useState(false)

  const formik = useFormik({
    initialValues: {
      amount: '',
      request_date: new Date(),
      request_content: ''
    },
    initialTouched: {
      amount: false,
      request_content: false
    },

    onSubmit: async (data) => {
      console.log(data)
    }
  })
  const toggleSupportVisibility = () => {
    setSupportVisible(!isSupportVisible)
  }
  return (
    <div className='flex flex-col items-center relative'>
      <HomeHeader />
      <div className='inline-flex gap-2.5 bg-white rounded-[25px] mb-[40px] shadow border-2 border-blue-900 mt-[80px] relative flex-col text-center '>
        <div className="text-center text-blue-900 text-4xl font-bold font-['Montserrat'] capitalize pt-[40px]">
          Yêu cầu
        </div>
        <form id='insurance-registration-form' onSubmit={formik.handleSubmit}>
          <div className='flex flex-col gap-2 justify-between items-center mb-[20px] mx-[40px]'>
            <div className='w-[400px]'>
              <Input
                id='insurance-registration-form-name'
                name='amount'
                value={formik.values.amount}
                onChange={formik.handleChange}
                label='Tống số tiền'
                size='lg'
                variant='outlined'
                crossOrigin={undefined}
                color='blue'
              />
            </div>
            <div className='w-[400px]'>
              <Input
                label='Nội dung yêu cầu thanh toán'
                size='lg'
                name='request_content'
                className='h-[100px]'
                value={formik.values.request_content}
                onChange={formik.handleChange}
                crossOrigin={undefined}
                color='blue'
              />
            </div>
            <div className='flex w-full justify-end'>
              <div className='flex w-fit h-fit bg-blue-900 rounded-[25px] shadow border-2 justify-center items-center gap-2.5'>
                <span className="text-white text-lg font-semibold font-['Montserrat'] px-[40px] py-[10px]">Gửi</span>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div className='w-full flex mt-[20px] justify-center items-center  bg-white'>{/* <Slider/> */}</div>
      {/* Component Support */}
      {isSupportVisible && (
        <div className='absolute bottom-[100px] right-[80px] z-50'>
          <Support />
        </div>
      )}
      <button
        onClick={toggleSupportVisibility}
        className='w-[50px] h-[50px] flex justify-center items-center absolute right-[60px] bottom-[40px] bg-blue-900 rounded-[50px]'
      >
        <FontAwesomeIcon icon={faQuestion} className='text-2xl text-white' />
      </button>
    </div>
  )
}

export default Request
