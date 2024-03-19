import faker from 'src/utils/faker'
import Lucide from 'src/components/Lucide'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { calAge, isAxiosBadRequestError, isAxiosInternalServerError } from 'src/utils/utils'
import { useState } from 'react'
import { Tabs, TabsHeader, Tab, TabsBody, TabPanel, Select, Option } from '@material-tailwind/react'
import { useFormik } from 'formik'
import { User, passwordSchema, updateInforSchema } from 'src/types/user.type'
import CustomInput from 'src/components/CustomInput'
import DatePicker from 'src/components/DatePicker'
import { useMutation, useQuery } from '@tanstack/react-query'
import userAccountApi from 'src/apis/userAccount.api'
import { toast } from 'react-toastify'
import { ErrorResponse } from 'src/types/utils.type'
import { setUserAccountAction } from 'src/redux/actions/userAccountAction'

function Profile() {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('profile')
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  const [openPopoverFirstName, setOpenPopoverFirstName] = useState<boolean>(false)
  const [openPopoverLastName, setOpenPopoverLastName] = useState<boolean>(false)
  const [openPopoverEmail, setOpenPopoverEmail] = useState<boolean>(false)
  const [openPopoverAddress, setOpenPopoverAddress] = useState<boolean>(false)
  const [openPopoverCMND, setOpenPopoverCMND] = useState<boolean>(false)
  const [openPopoverPhone, setOpenPopoverPhone] = useState<boolean>(false)
  const [openPopoverOldPassword, setOpenPopoverOldPassword] = useState<boolean>(false)
  const [openPopoverNewPassword, setOpenPopoverNewPassword] = useState<boolean>(false)
  const [openPopoverConfirmPassword, setOpenPopoverConfirmPassword] = useState<boolean>(false)
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [birthday, setBirthday] = useState<string>(userAccount.birthday.toString().slice(0, 10))
  const [gender, setGender] = useState(userAccount.gender)

  const updateMutation = useMutation({
    mutationFn: (
      body: Pick<User, 'email' | 'lastName' | 'firstName' | 'phone' | 'gender' | 'birthday' | 'address' | 'cmnd'>
    ) => userAccountApi.updateUserInfor(body),
    onSuccess: () => {
      toast.success('Cập nhật thông tin thành công', { autoClose: 2000 })
    },
    onError: (error) => {
      if (isAxiosInternalServerError<ErrorResponse>(error)) {
        const formError = error.response?.data
        if (formError && formError.errorKey == 'UpdateFailed') {
          toast.error('Cập nhật thông tin thất bại', { autoClose: 2000 })
        }
      }
    }
  })

  const updatePasswordMutation = useMutation({
    mutationFn: (body: { oldPassword: string; newPassword: string }) => userAccountApi.updatePassword(body),
    onSuccess: () => {
      toast.success('Cập nhật mật khẩu thành công', { autoClose: 2000 })
    },
    onError: (error) => {
      if (isAxiosBadRequestError<ErrorResponse>(error)) {
        const formError = error.response?.data
        if (formError && formError.errorKey == 'WrongPassword') {
          toast.error('Mật khẩu sai', { autoClose: 2000 })
        }
      }
    }
  })

  useQuery({
    queryKey: ['profile'],
    queryFn: () => userAccountApi.getUserInfor(),
    enabled: updateMutation.isSuccess,
    onSuccess: (data) => {
      const profile = data.data
      dispatch(setUserAccountAction(profile))
    },
    onError: (error) => {
      console.log(error)
    }
  })

  const formik = useFormik({
    initialValues: {
      email: userAccount.email,
      firstName: userAccount.firstName,
      lastName: userAccount.lastName,
      phone: userAccount.phone,
      address: userAccount.address,
      cmnd: userAccount.cmnd
    },
    initialTouched: {
      firstName: false,
      lastName: false,
      phone: false,
      address: false,
      cmnd: false
    },
    validationSchema: updateInforSchema,
    onSubmit: async (data) => {
      const body = {
        ...data,
        gender: gender,
        birthday: new Date(birthday)
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      await updateMutation.mutate(body)
    }
  })

  const formikPassword = useFormik({
    initialValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: ''
    },
    initialTouched: {
      oldPassword: false,
      newPassword: false,
      confirmPassword: false
    },
    validationSchema: passwordSchema,
    onSubmit: async (data) => {
      await updatePasswordMutation.mutate({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      })
    }
  })

  const isInfoChange = () => {
    if (
      formik.values.email === userAccount.email &&
      formik.values.firstName === userAccount.firstName &&
      formik.values.lastName === userAccount.lastName &&
      formik.values.phone === userAccount.phone &&
      formik.values.address === userAccount.address &&
      formik.values.cmnd === userAccount.cmnd &&
      birthday === userAccount.birthday.toString().slice(0, 10) &&
      gender === userAccount.gender
    ) {
      return false
    }
    return true
  }

  return (
    <>
      <div className='intro-y flex items-center mt-8'>
        <h2 className='text-lg font-medium mr-auto'>Thông tin tài khoản</h2>
      </div>
      <div>
        {/* BEGIN: Profile Info */}
        <div className='intro-y box px-5 pt-5 mt-5'>
          <div className='flex flex-col lg:flex-row border-b border-slate-200/60 dark:border-darkmode-400 pb-5 -mx-5'>
            <div className='flex flex-1 px-5 items-center justify-center lg:justify-start'>
              <div className='w-20 h-20 sm:w-24 sm:h-24 flex-none lg:w-32 lg:h-32 image-fit relative'>
                <img alt='Midone Tailwind HTML Admin Template' className='rounded-full' src={faker[0].photos[0]} />
              </div>
              <div className='ml-5'>
                <div className='w-24 sm:w-40 truncate sm:whitespace-normal font-medium text-lg'>
                  {userAccount.firstName + ' ' + userAccount.lastName}
                </div>
                <div className='text-slate-500'>{calAge(userAccount.birthday.toString())} Tuổi</div>
              </div>
            </div>
            <div className='mt-6 lg:mt-0 flex-1 px-5 border-l border-r border-slate-200/60 dark:border-darkmode-400 border-t lg:border-t-0 pt-5 lg:pt-0'>
              <div className='font-medium text-center lg:text-left lg:mt-3'>Chi tiết liên hệ</div>
              <div className='flex flex-col justify-center items-center lg:items-start mt-4'>
                <div className='truncate sm:whitespace-normal flex items-center'>
                  <Lucide icon='Mail' className='w-4 h-4 mr-2' />
                  {userAccount.email}
                </div>
                <div className='truncate sm:whitespace-normal flex items-center mt-3'>
                  <Lucide icon='Instagram' className='w-4 h-4 mr-2' />
                  {userAccount.firstName + ' ' + userAccount.lastName}
                </div>
                <div className='truncate sm:whitespace-normal flex items-center mt-3'>
                  <Lucide icon='Twitter' className='w-4 h-4 mr-2' />
                  {userAccount.firstName + ' ' + userAccount.lastName}
                </div>
              </div>
            </div>
            <div className='mt-6 lg:mt-0 flex-1 flex items-center justify-center px-5 border-t lg:border-0 border-slate-200/60 dark:border-darkmode-400 pt-5 lg:pt-0'>
              <div className='text-center rounded-md w-20 py-3'>
                <div className='font-medium text-primary text-xl'>201</div>
                <div className='text-slate-500'>Đơn đăng ký</div>
              </div>
              <div className='text-center rounded-md w-20 py-3'>
                <div className='font-medium text-primary text-xl'>1k</div>
                <div className='text-slate-500'>Hợp đồng</div>
              </div>
              <div className='text-center rounded-md w-20 py-3'>
                <div className='font-medium text-primary text-xl'>492</div>
                <div className='text-slate-500'>Yêu cầu</div>
              </div>
            </div>
          </div>
          <Tabs value={activeTab} className='p-2'>
            <TabsHeader
              className='rounded-none border-b border-blue-gray-50 bg-transparent p-0 w-[300px]'
              indicatorProps={{
                className: 'bg-transparent border-b-2 border-gray-900 shadow-none rounded-none'
              }}
            >
              <Tab
                value='profile'
                onClick={() => setActiveTab('profile')}
                className={activeTab === 'profile' ? 'text-gray-900' : ''}
              >
                <div className='flex items-center'>
                  <Lucide icon='Shield' className='w-4 h-4 mr-1' />
                  <span>Thông tin</span>
                </div>
              </Tab>
              <Tab
                value={'password'}
                onClick={() => setActiveTab('password')}
                className={activeTab === 'password' ? 'text-gray-900' : ''}
              >
                <div className='flex items-center'>
                  <Lucide icon='Lock' className='w-4 h-4 mr-1' />
                  Đổi mật khẩu
                </div>
              </Tab>
            </TabsHeader>
            <TabsBody className='mt-6'>
              <TabPanel value={'profile'}>
                <div className='flex justify-center'>
                  <form id='form-change-infor' onSubmit={formik.handleSubmit} className='grid grid-cols-4 gap-4 mb-8'>
                    {/* email */}
                    <CustomInput
                      readOnly={true}
                      type='text'
                      openPopoverError={openPopoverEmail}
                      setOpenPopoverError={setOpenPopoverEmail}
                      formik={formik}
                      errorMsg={errorMsg}
                      setErrorMsg={setErrorMsg}
                      label='Email'
                      id='my-email'
                      name='email'
                    />
                    {/* first name */}
                    <CustomInput
                      type='text'
                      openPopoverError={openPopoverFirstName}
                      setOpenPopoverError={setOpenPopoverFirstName}
                      formik={formik}
                      errorMsg={errorMsg}
                      setErrorMsg={setErrorMsg}
                      label='Họ'
                      id='firstName'
                      name='firstName'
                    />
                    {/* last name */}
                    <CustomInput
                      type='text'
                      openPopoverError={openPopoverLastName}
                      setOpenPopoverError={setOpenPopoverLastName}
                      formik={formik}
                      errorMsg={errorMsg}
                      setErrorMsg={setErrorMsg}
                      label='Tên'
                      id='lastName'
                      name='lastName'
                    />
                    <Select label='Giới tính' size='md' color='blue' onChange={setGender} value={gender}>
                      <Option value='male'>Nam</Option>
                      <Option value='female'>Nữ</Option>
                    </Select>
                    {/* Phone */}
                    <CustomInput
                      type='text'
                      openPopoverError={openPopoverPhone}
                      setOpenPopoverError={setOpenPopoverPhone}
                      formik={formik}
                      errorMsg={errorMsg}
                      setErrorMsg={setErrorMsg}
                      label='Số điện thoại'
                      id='my-phone'
                      name='phone'
                    />

                    <DatePicker isForm={false} date={birthday} setDate={setBirthday} id='birthday' name='birthday' />

                    <CustomInput
                      type='text'
                      openPopoverError={openPopoverAddress}
                      setOpenPopoverError={setOpenPopoverAddress}
                      formik={formik}
                      errorMsg={errorMsg}
                      setErrorMsg={setErrorMsg}
                      label='Địa chỉ'
                      id='my-address'
                      name='address'
                    />
                    <CustomInput
                      type='text'
                      openPopoverError={openPopoverCMND}
                      setOpenPopoverError={setOpenPopoverCMND}
                      formik={formik}
                      errorMsg={errorMsg}
                      setErrorMsg={setErrorMsg}
                      label='CMND'
                      id='my-cmnd'
                      name='cmnd'
                    />
                  </form>
                </div>
                <div className='flex justify-center items-center'>
                  <button
                    disabled={!isInfoChange()}
                    form='form-change-infor'
                    type='submit'
                    className={` rounded-md py-2 px-4 font-semibold text-white ${
                      isInfoChange() ? 'bg-primary hover:bg-primary/80' : 'bg-gray-300 cursor-not-allowed'
                    }`}
                  >
                    Lưu
                  </button>
                </div>
              </TabPanel>
              <TabPanel value={'password'}>
                <div className='flex justify-center'>
                  <form
                    id='form-change-password'
                    onSubmit={formikPassword.handleSubmit}
                    className='flex flex-col w-[400px] gap-4 mb-8'
                  >
                    {/* mật khẩu cũ */}
                    <CustomInput
                      type='password'
                      openPopoverError={openPopoverOldPassword}
                      setOpenPopoverError={setOpenPopoverOldPassword}
                      formik={formikPassword}
                      errorMsg={errorMsg}
                      setErrorMsg={setErrorMsg}
                      label='Mât khẩu cũ'
                      id='old-password'
                      name='oldPassword'
                    />
                    {/* Mật khẩu mới */}
                    <CustomInput
                      type='password'
                      openPopoverError={openPopoverNewPassword}
                      setOpenPopoverError={setOpenPopoverNewPassword}
                      formik={formikPassword}
                      errorMsg={errorMsg}
                      setErrorMsg={setErrorMsg}
                      label='Mât khẩu mới'
                      id='new-password'
                      name='newPassword'
                    />
                    {/* Nhập lại mật khẩu mới */}
                    <CustomInput
                      type='password'
                      openPopoverError={openPopoverConfirmPassword}
                      setOpenPopoverError={setOpenPopoverConfirmPassword}
                      formik={formikPassword}
                      errorMsg={errorMsg}
                      setErrorMsg={setErrorMsg}
                      label='Nhap lai mât khẩu mới'
                      id='confirm-password'
                      name='confirmPassword'
                    />
                  </form>
                </div>
                <div className='flex justify-center items-center'>
                  <button
                    form='form-change-password'
                    type='submit'
                    className={` rounded-md py-2 px-4 font-semibold text-white bg-primary hover:bg-primary/80`}
                  >
                    Đổi mật khẩu
                  </button>
                </div>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </div>

        {/* END: Profile Info */}
      </div>
    </>
  )
}

export default Profile
