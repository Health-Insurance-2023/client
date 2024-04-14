import { ChangeEvent, useEffect, useRef, useState } from 'react'
import Button from 'src/components/AdminCustomButton'
import Lucide from 'src/components/Lucide'
// import Tippy from 'src/components/Tippy'
import { useMutation, useQuery } from '@tanstack/react-query'
import claimApi from 'src/apis/claim.api'
import routes from 'src/constants/routes'
import { Link, useNavigate } from 'react-router-dom'
import { faVenusMars, faAddressCard } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Checkbox, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Tooltip } from '@material-tailwind/react'
import {
  calAge,
  formatDate,
  formatDateStringForDatabase,
  formatNumber,
  mergeFileLists,
  transferBooleanToNumber
} from 'src/utils/utils'
import { FormInput } from 'src/components/Form'
import Litepicker from 'src/components/Litepicker'
import DatePicker from 'src/components/DatePicker'
import Table from 'src/components/Table'
import insuranceContractApi from 'src/apis/insuranceContract.api'
import { ContractType } from 'src/types/insuranceContract.type'
import bankingLogo from 'src/assets/Images/icon/banking.png'
import cashLogo from 'src/assets/Images/icon/cash.png'
// import facebookIcon10 from 'src/assets/Images/icon/facbook_icon_10.png'
import pdfLogo from 'src/assets/images/icon/pdf.png'
import docxLogo from 'src/assets/images/icon/docx.png'
import { useFormik } from 'formik'
import { toast } from 'react-toastify'

function Main() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null)
  const [accidentDate, setAccidentDate] = useState('')
  const [examinationDate, setExaminationDate] = useState('')
  const [hospitalizedDate, setHospitalizedDate] = useState('')
  const [daterange, setDaterange] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('banking')

  const [viewDetailModal, setViewDetailModal] = useState(true)
  const [typeTreatment, setTypeTreatment] = useState('outpatient')
  const [isDisable, setIsDisable] = useState(true)

  const [checkboxState, setCheckboxState] = useState({
    injuredCheckbox: false,
    transportCheckbox: false,
    medicalExpenseCheckbox: false,
    deathCheckbox: false,
    benefitCheckbox: false
  })

  const createClaimMutation = useMutation({
    mutationFn: (body: FormData) => claimApi.createClaim(body),
    onSuccess: () => {
      toast.success('Gửi yêu cầu thành công', { autoClose: 2000 })
      handleOpen()
      navigate(routes.userClaimManagement)
    },
    onError: () => toast.error('Gửi yêu cầu thất bại', { autoClose: 2000 })
  })

  const handleAddFile = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    const mergeFileList = mergeFileLists(selectedFiles, files)
    setSelectedFiles(mergeFileList)
  }

  const handleRemoveFile = (indexToRemove: number) => {
    if (indexToRemove >= 0 && indexToRemove < selectedFiles.length) {
      const updatedFiles = Array.from(selectedFiles as FileList)

      // Tạo DataTransfer để tạo lại FileList
      const dataTransfer = new DataTransfer()

      //Loại bỏ phần tử tại vị trí indexToRemove && Thêm các file từ mảng mới vào DataTransfer
      updatedFiles
        .filter((_, index) => index !== indexToRemove)
        .forEach((file) => {
          dataTransfer.items.add(file)
        })

      // Lấy FileList từ DataTransfer
      setSelectedFiles(dataTransfer.files)
    } else {
      console.error('Invalid index')
    }
  }

  const handleCheckboxChange = (checkboxName) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [checkboxName]: !prevState[checkboxName]
    }))
  }

  const handleOpen = () => setViewDetailModal(!viewDetailModal)

  const getUserContract = useQuery({
    queryKey: ['get-user-contract123'],
    queryFn: () => insuranceContractApi.getUserContract(0, 100),
    onError: (err) => console.log(err)
  })

  const userContractList = getUserContract.data?.data.content.filter(
    (contract) => contract.status === 'activated'
  ) as ContractType[]
  const [selectedContract, setSelectedContract] = useState<ContractType | null>(
    getUserContract.isLoading ? null : userContractList[0]
  )

  const handleSelectContract = (contract: ContractType) => {
    setSelectedContract(contract)
  }

  const handleSelectPaymentMethod = (method: string) => {
    setPaymentMethod(method)
  }

  const handleSelectTypeTreatment = (type: string) => {
    setTypeTreatment(type)
  }

  const formik = useFormik({
    initialValues: {
      accidentPlace: '',
      treatmentPlace: '',
      reason: '',
      consequence: '',
      amount: '',
      stk: '',
      bank: ''
    },

    onSubmit: async (data) => {
      const dateRangeArray = daterange.split(' - ')
      const formData = new FormData()
      formData.append('accidentDate', accidentDate)
      formData.append('accidentPlace', data.accidentPlace)
      formData.append('examinationDate', examinationDate)
      formData.append('hospitalizedDate', hospitalizedDate)
      formData.append('treatmentPlace', data.treatmentPlace)
      formData.append('reason', data.reason)
      formData.append('consequence', data.consequence)
      formData.append('typeTreatment', typeTreatment)
      formData.append('endDate', formatDateStringForDatabase(dateRangeArray[1]))
      formData.append('startDate', formatDateStringForDatabase(dateRangeArray[0]))
      formData.append('paymentMethod', paymentMethod)
      formData.append('insuranceContractId', selectedContract.id.toString())
      formData.append('stk', data.stk)
      formData.append('bank', data.bank)
      formData.append('deathCheckbox', transferBooleanToNumber(checkboxState.deathCheckbox))
      formData.append('injuredCheckbox', transferBooleanToNumber(checkboxState.injuredCheckbox))
      formData.append('transportCheckbox', transferBooleanToNumber(checkboxState.transportCheckbox))
      formData.append('medicalExpenseCheckbox', transferBooleanToNumber(checkboxState.medicalExpenseCheckbox))
      formData.append('benefitCheckbox', transferBooleanToNumber(checkboxState.benefitCheckbox))

      if (selectedFiles) {
        Array.from(selectedFiles).forEach((file) => {
          formData.append('files', file)
        })
      }
      formData.append('amount', data.amount)
      if (!selectedFiles) {
        toast.error('Vui lòng chọn ít nhất 1 tài liệu', { autoClose: 2000 })
      } else {
        createClaimMutation.mutate(formData)
      }
    }
  })

  useEffect(() => {
    if (selectedFiles) {
      if (selectedFiles.length <= 0) {
        setSelectedFiles(null)
      }
    }
  }, [selectedFiles])

  useEffect(() => {
    if (userContractList) {
      setSelectedContract(userContractList[0])
    }
  }, [getUserContract.isLoading])

  if (getUserContract.isLoading) return <div>Loading...</div>

  return (
    <>
      <h2 className={`mt-10 text-lg font-medium intro-y`}>Yêu cầu bồi thường</h2>
      <form className='mt-5' id='claim-request-form' onSubmit={formik.handleSubmit}>
        <div className='flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap'>
          <Link to={routes.userClaimManagement}>
            <Button variant='primary' className='mr-2 shadow-md flex items-center justify-center gap-1'>
              <Lucide icon='ChevronLeft' className='w-4 h-4' />
              Quay lại
            </Button>
          </Link>

          <div className='hidden invisible mx-auto md:block text-slate-500'>Showing 1 to 10 of 150 entries</div>

          <button
            onClick={handleOpen}
            className='w-full sm:w-auto sm:mt-0 sm:ml-auto md:ml-0 bg-[#1E40AF] rounded-md p-2 cursor-pointer'
          >
            <div className='relative w-56 text-white flex justify-between items-center'>
              {selectedContract && (
                <div>
                  {'IC-' + formatDate(selectedContract.createdAt.toString()).slice(0, 2) + selectedContract.id}
                  <span className='ml-2'>{selectedContract.registrationForm.insuredPerson.name}</span>
                </div>
              )}
              <Lucide icon='RefreshCw' className='w-4 h-4' />
            </div>
          </button>
        </div>
        {/* BEGIN: Data List */}

        <>
          {/* BEGIN: Transaction Details */}
          <div className='intro-y grid grid-cols-12 gap-3 mt-5'>
            <div className='col-span-12 lg:col-span-4 2xl:col-span-8'>
              <div className='box p-5 rounded-md'>
                <div className='flex items-center justify-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 '>
                  <div className='font-medium text-lg text-blue-700 truncate'>
                    <div>THÔNG TIN VỀ TAI NẠN / BỆNH VÀ KHÁM CHỮA</div>
                  </div>
                </div>
                {/*  */}
                <div className='flex justify-between items-center'>
                  <div className='flex items-center mt-3 flex-1'>
                    <span className='font-semibold'>Ngày tai nạn: </span>
                    <DatePicker
                      isForm={false}
                      date={accidentDate}
                      setDate={setAccidentDate}
                      id='accidentDate'
                      name='accidentDate'
                    />
                  </div>
                  <div className='flex items-center mt-3 flex-1'>
                    <span className='font-semibold'>Nơi tai nạn: </span>
                    <FormInput
                      id='accidentPlace'
                      name='accidentPlace'
                      type='text'
                      placeholder='Nơi tai nạn'
                      value={formik.values.accidentPlace}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className='flex justify-between items-center'>
                  <div className='flex items-center mt-3 flex-1'>
                    <span className='font-semibold mr-1'>Ngày khám bệnh: </span>
                    <div>
                      <DatePicker
                        isForm={false}
                        date={examinationDate}
                        setDate={setExaminationDate}
                        id='examinationDate'
                        name='examinationDate'
                      />
                    </div>
                  </div>
                  <div className='flex items-center mt-3 flex-1'>
                    <span className='font-semibold mr-1'>Ngày nhập viện: </span>
                    <DatePicker
                      isForm={false}
                      date={hospitalizedDate}
                      setDate={setHospitalizedDate}
                      id='hospitalizedDate'
                      name='hospitalizedDate'
                    />
                  </div>
                </div>
                {/*  */}
                <div className='flex items-center mt-3 flex-1'>
                  <span className='font-semibold mr-9'>Nơi điều trị: </span>
                  <div>
                    <FormInput
                      className='w-[300px]'
                      id='treatmentPlace'
                      name='treatmentPlace'
                      type='text'
                      placeholder='Nơi điều trị'
                      value={formik.values.treatmentPlace}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                {/*  */}
                <div className='flex flex-col justify-center mt-2 flex-1 gap-1'>
                  <span className='font-semibold mr-1'>Nguyên nhân / Chẩn đoán về tai nạn/bệnh: </span>
                  <div>
                    <textarea
                      id='reason'
                      name='reason'
                      className='w-full h-24 border border-gray-300 rounded-md resize-none placeholder:opacity-50'
                      placeholder='Nguyên nhân / Chẩn đoán về tai nạn/bệnh'
                      value={formik.values.reason}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                {/*  */}
                <div className='flex flex-col justify-center mt-3 gap-1 flex-1'>
                  <span className='font-semibold mr-1'>Hậu quả: </span>
                  <div>
                    <textarea
                      id='consequence'
                      name='consequence'
                      className='w-full h-24 border border-gray-300 rounded-md resize-none placeholder:opacity-50'
                      placeholder='Hậu quả'
                      value={formik.values.consequence}
                      onChange={formik.handleChange}
                    />
                    {/* <FormInput id='regular-form-1' type='text' placeholder='Input text' /> */}
                  </div>
                </div>
                {/*  */}
                <div className='flex items-center mt-3 flex-1 justify-between'>
                  <div className='flex items-center'>
                    <span className='font-semibold mr-2'>Hình thức điều trị: </span>
                    <div className='flex gap-4 items-center'>
                      <div>
                        <input
                          type='radio'
                          name='typeTreatment'
                          id='boarding'
                          value='Nội trú'
                          checked={typeTreatment === 'boarding'}
                          onChange={() => handleSelectTypeTreatment('boarding')}
                          className='cursor-pointer w-5 h-5 mr-1 -mt-[3px]'
                        />
                        <label htmlFor='boarding' className='cursor-pointer select-none'>
                          Nội trú
                        </label>
                      </div>

                      <div>
                        <input
                          type='radio'
                          name='typeTreatment'
                          id='outpatient'
                          value='Ngoại trú'
                          checked={typeTreatment === 'outpatient'}
                          onChange={() => handleSelectTypeTreatment('outpatient')}
                          className='cursor-pointer w-5 h-5 mr-1 -mt-[3px]'
                        />
                        <label htmlFor='outpatient' className='cursor-pointer select-none'>
                          Ngoại trú
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className='flex items-center gap-2'>
                    <span className='font-semibold'>Từ ngày-Đến ngày: </span>

                    <Litepicker
                      value={daterange}
                      onChange={setDaterange}
                      options={{
                        autoApply: false,
                        singleMode: false,
                        numberOfColumns: 2,
                        numberOfMonths: 2,
                        showWeekNumbers: true,
                        dropdowns: {
                          minYear: 1990,
                          maxYear: null,
                          months: true,
                          years: true
                        }
                      }}
                      className='block w-56 mx-auto'
                    />
                  </div>
                </div>

                {/*  */}

                {/*  */}
              </div>

              {/* THÔNG TIN THANH TOÁN */}
              <div className='col-span-12 lg:col-span-4 2xl:col-span-8'>
                <div className='box p-5 rounded-md'>
                  <div className='flex items-center justify-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                    <div className='font-medium text-lg text-blue-700 truncate'>
                      <div>THÔNG TIN THANH TOÁN</div>
                    </div>
                  </div>
                  {/*  */}
                  <div className='flex items-center mt-3'>
                    <div className='flex items-center w-[140px]'>
                      <Lucide icon='CreditCard' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>Số tiền yêu cầu: </span>
                    </div>
                    <FormInput
                      required
                      className='w-[300px]'
                      id='amount'
                      name='amount'
                      type='number'
                      placeholder='Số tiền yêu cầu bồi thường'
                      value={formik.values.amount}
                      onChange={formik.handleChange}
                    />
                  </div>
                  <div className='flex flex-col mt-1'>
                    <div className='font-semibold mr-1'>Chi trả cho trường hợp: </div>
                    <div className='flex gap-2 w-full'>
                      <Checkbox
                        className='flex-1'
                        labelProps={{ className: 'font-normal text-black' }}
                        crossOrigin={undefined}
                        color='blue'
                        label='Tử vong'
                        checked={checkboxState.deathCheckbox}
                        onChange={() => handleCheckboxChange('deathCheckbox')}
                      ></Checkbox>
                      <Checkbox
                        className='flex-1'
                        labelProps={{ className: 'font-normal text-black' }}
                        crossOrigin={undefined}
                        color='blue'
                        label='Thương tật'
                        checked={checkboxState.injuredCheckbox}
                        onChange={() => handleCheckboxChange('injuredCheckbox')}
                      ></Checkbox>
                      <Checkbox
                        className='flex-1'
                        labelProps={{ className: 'font-normal text-black' }}
                        crossOrigin={undefined}
                        color='blue'
                        label='Chi phí y tế'
                        checked={checkboxState.medicalExpenseCheckbox}
                        onChange={() => handleCheckboxChange('medicalExpenseCheckbox')}
                      ></Checkbox>
                    </div>
                    <div className='flex gap-2 w-full'>
                      <Checkbox
                        className='flex-1'
                        labelProps={{ className: 'font-normal text-black' }}
                        crossOrigin={undefined}
                        color='blue'
                        label='Trợ cấp'
                        checked={checkboxState.benefitCheckbox}
                        onChange={() => handleCheckboxChange('benefitCheckbox')}
                      ></Checkbox>
                      <Checkbox
                        className='flex-1'
                        labelProps={{ className: 'font-normal text-black' }}
                        crossOrigin={undefined}
                        color='blue'
                        label='Vận chuyển cấp cứu'
                        checked={checkboxState.transportCheckbox}
                        onChange={() => handleCheckboxChange('transportCheckbox')}
                      ></Checkbox>
                    </div>
                  </div>
                  {/*  */}
                  <div className='flex flex-col mt-1'>
                    <div className='font-semibold mr-1'>Hình thức thanh toán: </div>
                    <div className='flex gap-4 p-4'>
                      <button
                        onClick={() => handleSelectPaymentMethod('banking')}
                        className={`${
                          paymentMethod === 'banking' ? 'border-blue-600' : 'border-gray-300'
                        } rounded-md w-full h-20 border-2  cursor-pointer flex flex-col items-center justify-center`}
                      >
                        <img src={bankingLogo} className='h-8' />
                        <div className='font-bold mt-1'>Chuyển khoản</div>
                      </button>
                      <button
                        type='button'
                        onClick={() => handleSelectPaymentMethod('cash')}
                        className={`${
                          paymentMethod === 'cash' ? 'border-blue-600' : 'border-gray-300'
                        } rounded-md w-full h-20 border-2  cursor-pointer flex flex-col items-center justify-center`}
                      >
                        <img src={cashLogo} className='h-8' />
                        <div className='font-bold mt-1'>Tiền mặt</div>
                      </button>
                    </div>
                  </div>
                  {/* */}
                  {paymentMethod === 'banking' && (
                    <div className='flex justify-between items-center gap-2 mt-1'>
                      <div className='flex-1'>
                        <div className='font-semibold mr-1'>
                          Số tài khoản:{' '}
                          <span className='font-normal'>
                            {' '}
                            <FormInput
                              required
                              className='arrow-hide'
                              id='stk'
                              name='stk'
                              type='number'
                              placeholder='Số tài khoản'
                              value={formik.values.stk}
                              onChange={formik.handleChange}
                            />
                          </span>
                        </div>
                      </div>
                      <div className='flex-1'>
                        <div className='font-semibold mr-1'>
                          Ngân hàng:{' '}
                          <span className='font-normal'>
                            {' '}
                            <FormInput
                              required
                              className=''
                              id='bank'
                              name='bank'
                              type='text'
                              placeholder='Tên ngân hàng'
                              value={formik.values.bank}
                              onChange={formik.handleChange}
                            />
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/*  */}
                </div>

                {/* Chương trình bảo hiểm */}
              </div>
              <div className='col-span-12 lg:col-span-4 2xl:col-span-8'>
                <div className='box p-5 rounded-md'>
                  <div className='flex items-center justify-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                    <div className='font-medium text-lg text-blue-700 truncate'>
                      <div>CÁC GIẤY TỜ LIÊN QUAN</div>
                    </div>
                  </div>
                  <div className='text-[16px]'>
                    <span className='font-bold text-red-600 text-[18px]'>Lưu ý: </span>{' '}
                    <span>
                      Các giấy tờ cần thiết <span className='font-bold'>(pdf/doc)</span> khi yêu cầu bồi thường bảo hiểm
                      có trong
                    </span>
                    <span className='font-bold'>
                      {' '}
                      Mục 1: Hồ sơ yêu cầu bồi thường (Chương V: THỦ TỤC THANH TOÁN BỒI THƯỜNG)
                    </span>{' '}
                    trong{' '}
                    <a
                      href='src/assets/pdf/policy.pdf'
                      download='Quy tắc và điều khoản.pdf'
                      className='font-bold text-[#99542d] hover:underline'
                    >
                      Quy tắc và điều khoản
                    </a>
                  </div>
                  {/*  */}
                  {selectedFiles ? (
                    <div className=' group/all'>
                      <div className='grid grid-cols-12 mt-3 border-2 rounded-md pt-3 bg-[#f7f8fa]'>
                        {Array.from(selectedFiles).map((file, index) => (
                          <Tooltip key={index} content={file.name} placement='bottom'>
                            <div className='flex flex-col items-center col-span-2 mb-3 group text-center'>
                              <img
                                src={file.type === 'application/pdf' ? pdfLogo : docxLogo}
                                className={`${file.type === 'application/pdf' ? 'w-12' : 'w-14'}  mb-1`}
                              />
                              <button
                                type='button'
                                onClick={() => handleRemoveFile(index)}
                                className='w-6 h-6 ml-8 -mt-2 rounded-full bg-black absolute hidden group-hover:block'
                              >
                                <Lucide icon='X' className='w-4 h-4 text-white ml-1' />
                              </button>
                              <div>
                                <p className='truncate max-w-[100px]'>{file.name}</p> ({formatNumber(file.size)} bytes)
                              </div>
                            </div>
                          </Tooltip>
                        ))}
                      </div>

                      <div className=''>
                        <button
                          type='button'
                          className='absolute -mt-10 right-8 hidden group-hover/all:flex items-center text-white bg-blue-700 p-1 rounded-md px-4 hover:bg-blue-500'
                        >
                          Thêm
                        </button>
                        <input
                          ref={fileInputRef}
                          type='file'
                          title=''
                          accept='application/pdf, .docx'
                          onChange={handleAddFile}
                          className='w-[68px] h-[28px] -mt-10 right-8 absolute opacity-0 border-4 cursor-pointer rounded-lg file:cursor-pointer'
                          multiple
                        />
                      </div>
                    </div>
                  ) : (
                    <div className='flex justify-center mt-3'>
                      <div className='group  w-[550px]'>
                        <div className='w-[550px] h-[183px] absolute cursor-pointer flex flex-col justify-center items-center gap-1 bg-[#f7f8fa] rounded-lg group-hover:bg-[#eaebed]'>
                          {/* icon và chữ */}
                          <div className='p-[10px] rounded-full bg-[#e4e6eb] group-hover:bg-[#d8dadf]'>
                            {/* <div
                              className='bg-[length:38px_122px] bg-[0px_-64px] h-5 w-5'
                              style={{ backgroundImage: `url(${facebookIcon10})` }}
                            ></div> */}
                          </div>
                          <span className='text-[#050505] text-[17px] leading-5 font-normal'>
                            Thêm tài liệu PDF/DOC
                          </span>
                          <span className='text-[#65676b] text-[12px] leading-4 font-normal'>hoặc Kéo và thả</span>
                          {/*  */}
                        </div>
                        {/* input file */}
                        <input
                          ref={fileInputRef}
                          type='file'
                          title=''
                          accept='application/pdf, .docx'
                          onChange={handleAddFile}
                          className='w-[550px] h-[183px] opacity-0 cursor-pointer rounded-lg file:cursor-pointer'
                          multiple
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Chương trình bảo hiểm */}
              </div>
            </div>
            {selectedContract && (
              <div className='col-span-12 lg:col-span-4 2xl:col-span-4'>
                <div className='box p-5 rounded-md'>
                  <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                    <div className='font-medium text-lg text-blue-700 truncate'>NGƯỜI ĐƯỢC BẢO HIỂM</div>
                  </div>
                  {/* họ tên và sđt */}

                  <div className='flex items-center'>
                    <Lucide icon='Clipboard' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Tên:</span>{' '}
                    {selectedContract.registrationForm.insuredPerson.name}
                  </div>
                  <div className='flex items-center mt-3'>
                    <Lucide icon='Phone' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>SĐT:</span>{' '}
                    {selectedContract.registrationForm.insuredPerson.phone}
                  </div>

                  {/* email và gender */}

                  <div className='flex items-center mt-3'>
                    <Lucide icon='Mail' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Email:</span>
                    {selectedContract.registrationForm.insuredPerson.email}
                  </div>
                  <div className='flex items-center mt-3'>
                    <FontAwesomeIcon icon={faVenusMars} className='w-4 h-4 mt-1 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Giới tính:</span>{' '}
                    {selectedContract.registrationForm.insuredPerson.gender === 'male' ? 'Nam' : 'Nữ'}
                  </div>

                  {/* cmnd và ngày sinh */}

                  <div className='flex items-center mt-3'>
                    <FontAwesomeIcon icon={faAddressCard} className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>CMND:</span>{' '}
                    {selectedContract.registrationForm.insuredPerson.cmnd}
                  </div>
                  <div className='flex items-center mt-3'>
                    <Lucide icon='Cake' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Ngày sinh:</span>{' '}
                    {formatDate(selectedContract.registrationForm.insuredPerson.birthday.toString())}
                  </div>

                  {/* địa chỉ */}
                  <div className='flex items-center mt-3'>
                    <Lucide icon='MapPin' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Địa chỉ:</span>{' '}
                    {selectedContract.registrationForm.insuredPerson.address}
                  </div>
                </div>

                {/* Chương trình bảo hiểm */}
                <div className='col-span-12 lg:col-span-7 2xl:col-span-5 mt-3'>
                  <div className='box p-5 pb-2 rounded-md rounded-b-none'>
                    <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                      <div className='font-medium text-lg text-blue-700 truncate'>CHƯƠNG TRÌNH BẢO HIỂM</div>
                    </div>

                    {/*  */}
                    <div className='flex items-center'>
                      <Lucide icon='Shield' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>Gói:</span>
                      <div className=''>{selectedContract.registrationForm.insuranceInformation.planName}</div>
                    </div>

                    <div className='mt-3'>
                      <div className='flex items-center'>
                        <Lucide icon='PlusCircle' className='w-4 h-4 text-slate-500 mr-2' />
                        <span className='font-semibold mr-1'> Quyền lợi bổ sung:</span>
                      </div>
                      {selectedContract.registrationForm.insuranceInformation.outpatientTreatment !== 0 && (
                        <div className='ml-5'> + Bảo hiểm điều trị ngoại trú</div>
                      )}
                      {selectedContract.registrationForm.insuranceInformation.maternity !== 0 && (
                        <div className='ml-5'> + Bảo hiểm thai sản</div>
                      )}
                      {selectedContract.registrationForm.insuranceInformation.dentalCare !== 0 && (
                        <div className='ml-5'> + Bảo hiểm chăm sóc răng</div>
                      )}
                      {selectedContract.registrationForm.insuranceInformation.death !== 0 && (
                        <div className='ml-5'> + Bảo hiểm tử vong</div>
                      )}
                    </div>
                  </div>
                </div>
                <div>
                  <label className={`w-full mt-3 cursor-pointer select-none flex items-start gap-3`}>
                    <input
                      type='checkbox'
                      className='opacity-0 peer/privacy'
                      onChange={() => setIsDisable((cur) => !cur)}
                    />
                    <span
                      className={`absolute h-5 w-5 ml-1 mt-2 rounded-full border-2 border-gray-500
             peer-checked/privacy:bg-[#5F33E6] peer-checked/privacy:border-none after:content-[''] after:hidden after:absolute peer-checked/privacy:after:inline
             after:w-[6px] after:h-[13px] after:border-r-[3px] after:border-b-[3px] after:left-[7.5px] after:top-[3px] after:border-solid after:border-white after:rotate-45
             `}
                    ></span>

                    <p className='font-normal text-base ml-3'>
                      Tôi/Chúng tôi đồng ý cam kết và/hoặc được ủy quyền hợp pháp của Người được bảo hiểm đồng ý cam kết
                      rằng các thông tin đã khai báo trên đây là trung thực, đầy đủ, chính xác và hoàn toàn chịu trách
                      nhiệm về các thông tin đã khai báo này. Và
                      <span className='text-blue-400'> thỏa thuận sử dụng website</span>
                    </p>
                  </label>
                </div>
                <button
                  disabled={isDisable}
                  type='submit'
                  className={`${
                    isDisable ? 'bg-gray-300' : 'bg-blue-700 hover:bg-blue-500'
                  }  text-white w-full font-semibold py-3 mt-3 text-[16px]  flex justify-center gap-2`}
                >
                  {createClaimMutation.isLoading ? 'Đang gửi yêu cầu' : 'Gửi yêu cầu'}
                  <svg
                    className={`animate-spin h-5 w-5 text-white ${createClaimMutation.isLoading ? 'inline' : 'hidden'}`}
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-50'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-100'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    ></path>
                  </svg>
                </button>
              </div>
            )}

            {/*  */}

            {/* BEGIN */}
          </div>
        </>
        {/* END: Pagination */}
      </form>

      <Dialog
        dismiss={{ enabled: false }}
        size='xs'
        className={`${selectedContract ? 'w-[1000px]' : 'w-[500px]'} dark:bg-darkmode-400`}
        open={viewDetailModal}
        handler={handleOpen}
      >
        <DialogHeader className='bg-white dark:bg-darkmode-400 rounded-t-md h-[60px] p-0 block'>
          <div className=''>
            <div className='flex items-center h-[60px] border-b border-gray-300'>
              <div className='w-full flex justify-center'>
                <span className='text-[20px] text-[#050505] dark:text-white font-bold'>Hợp đồng bảo hiểm</span>
              </div>
              <div className='flex justify-end absolute w-full -ml-4'>
                <IconButton
                  color='blue-gray'
                  className=' bg-[#e4e6eb] dark:bg-darkmode-400 rounded-full hover:bg-[#d8dadf] px-4'
                  variant='text'
                  onClick={() => {
                    handleOpen()
                    !selectedContract && navigate(routes.userClaimManagement)
                  }}
                >
                  <Lucide icon='X' className='w-5 h-5' />
                </IconButton>
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogBody className='bg-[#F1F5F9] dark:bg-dark/70 max-h-[500px] overflow-auto pr-2'>
          {!selectedContract ? (
            <div>
              Bạn chưa có hợp đồng nào. Vui lòng thanh toán hóa đơn để được cấp hợp đồng.
              <div>
                Hoặc nếu chưa có thì bạn có thể đăng ký mới{' '}
                <Link to={routes.registerInsurance} className='font-bold text-[#99542d] hover:underline'>
                  Tại đây
                </Link>
              </div>
            </div>
          ) : (
            <div className='col-span-12 overflow-auto lg:overflow-visible'>
              <Table className='border-spacing-y-[10px] border-separate -mt-5'>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th className='border-b-0 whitespace-nowrap'>Mã</Table.Th>
                    <Table.Th className='border-b-0 whitespace-nowrap'>Người được bảo hiểm</Table.Th>
                    <Table.Th className='border-b-0 whitespace-nowrap'>Email</Table.Th>
                    <Table.Th className='border-b-0 whitespace-nowrap min-w-[150px]'>Gói bảo hiểm</Table.Th>
                    <Table.Th className='border-b-0 whitespace-nowrap min-w-[150px]'>Ngày bắt đầu</Table.Th>
                    <Table.Th className='border-b-0 whitespace-nowrap'>Ngày kết thúc</Table.Th>
                  </Table.Tr>
                </Table.Thead>

                <Table.Tbody>
                  {userContractList.map((userContract, index) => (
                    <Table.Tr key={index} className='cursor-pointer' onClick={() => handleSelectContract(userContract)}>
                      <Table.Td
                        className={`first:rounded-l-md last:rounded-r-md w-[90px]  ${
                          userContract.id === selectedContract.id ? 'bg-blue-700 text-white' : 'bg-white'
                        } border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]`}
                      >
                        <div className='flex'>
                          {'IC-' + formatDate(userContract.createdAt.toString()).slice(0, 2) + userContract.id}
                        </div>
                      </Table.Td>
                      <Table.Td
                        className={`${
                          userContract.id === selectedContract.id ? 'bg-blue-700 text-white' : 'bg-white'
                        } first:rounded-l-md last:rounded-r-md max-w-[290px] border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]`}
                      >
                        <a href='' className='font-medium'>
                          {userContract.registrationForm.insuredPerson.name}
                        </a>
                        <div
                          className={` text-xs mt-0.5 ${
                            userContract.id === selectedContract.id ? 'text-white' : 'text-slate-500'
                          }`}
                        >
                          {calAge(userContract.registrationForm.insuredPerson.birthday.toString())} tuổi
                        </div>
                      </Table.Td>
                      <Table.Td
                        className={`${
                          userContract.id === selectedContract.id ? 'bg-blue-700 text-white' : 'bg-white'
                        } first:rounded-l-md last:rounded-r-md w-10  border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]`}
                      >
                        <div className='flex'>{userContract.registrationForm.insuredPerson.email}</div>
                      </Table.Td>

                      <Table.Td
                        className={`${
                          userContract.id === selectedContract.id ? 'bg-blue-700 text-white' : 'bg-white'
                        } first:rounded-l-md last:rounded-r-md w-10 border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]`}
                      >
                        <div className='flex'>{userContract.registrationForm.insuranceInformation.planName}</div>
                      </Table.Td>
                      <Table.Td
                        className={`${
                          userContract.id === selectedContract.id ? 'bg-blue-700 text-white' : 'bg-white'
                        } first:rounded-l-md last:rounded-r-md w-10  border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]`}
                      >
                        <div className='flex'>{formatDate(userContract.startDate.toString())}</div>
                      </Table.Td>
                      <Table.Td
                        className={`${
                          userContract.id === selectedContract.id ? 'bg-blue-700 text-white' : 'bg-white'
                        } first:rounded-l-md last:rounded-r-md w-10 border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]`}
                      >
                        <div className='flex'>{formatDate(userContract.endDate.toString())}</div>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </div>
          )}

          {/* <div className='flex flex-col gap-3'>
            <div className='bg-white w-full h-20 rounded-md'></div>
          </div> */}
        </DialogBody>
        <DialogFooter className='border-t gap-2'>
          {!selectedContract ? (
            <button
              onClick={() => {
                handleOpen()
                navigate(routes.userClaimManagement)
              }}
              className='flex items-center text-white bg-blue-700 p-1 rounded-md px-4 hover:bg-blue-500'
            >
              Quay lại
            </button>
          ) : (
            <button
              onClick={handleOpen}
              className='flex items-center text-white bg-blue-700 p-1 rounded-md px-4 hover:bg-blue-500'
            >
              Đóng
            </button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default Main
