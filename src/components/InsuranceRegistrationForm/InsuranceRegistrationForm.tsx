import { Select, Option, Input } from '@material-tailwind/react'
import { useEffect, useState } from 'react'
import DatePicker from '../DatePicker'
import { AdditionalBenefit, InsurancePlan } from 'src/types/insurancePlan.type'
import { calAge, formatNumber } from 'src/utils/utils'
import { additionalBenefits } from 'src/constants/insuranceBenefits'
import CustomInput from '../CustomInput'
import { AdditionalBenefitListType } from '../InsurancePlanCard/InsurancePlanCard'

interface Props {
  insurancePlanList: InsurancePlan[]
  checkboxState: any
  handleCheckboxChange: (checkboxName: any) => void
  age: number
  setAge: React.Dispatch<React.SetStateAction<number>>
  relationship: string
  setRelationship: React.Dispatch<React.SetStateAction<string>>
  gender: string
  setGender: React.Dispatch<React.SetStateAction<string>>
  date: string
  setDate: React.Dispatch<React.SetStateAction<string>>
  selectedPlan: number
  setSelectedPlan: React.Dispatch<React.SetStateAction<number>>
  formik: any
  handleOpenBenefitDialog: () => void
  additionalBenefitList: AdditionalBenefitListType
  setAdditionalBenefitList: React.Dispatch<React.SetStateAction<AdditionalBenefitListType>>
  isHasAdditionalBenefits: boolean
  setIsHasAdditionalBenefits: React.Dispatch<React.SetStateAction<boolean>>
  groupAge: number
  setGroupAge: React.Dispatch<React.SetStateAction<number>>
  totalPrice: number
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>
}

const checkboxList = ['OutpatientCheckbox', 'DentalCheckbox', 'MaternityCheckbox', 'DeathCheckbox']

const InsuranceRegistrationForm = (props: Props) => {
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [openPopoverEmail, setOpenPopoverEmail] = useState<boolean>(false)
  const [openPopoverPhone, setOpenPopoverPhone] = useState<boolean>(false)
  const [openPopoverCMND, setOpenPopoverCMND] = useState<boolean>(false)
  const [openPopoverAddress, setOpenPopoverAddress] = useState<boolean>(false)
  const [openPopoverName, setOpenPopoverName] = useState<boolean>(false)

  const handleSelectPlan = (e: any) => {
    props.setSelectedPlan(e.target.value)
  }

  const maternityPrice = (): string => {
    if (props.gender === 'Nam' || props.additionalBenefitList.maternity.length === 0) {
      return 'Không áp dụng'
    } else {
      return formatNumber(props.additionalBenefitList?.maternity[0]?.price)
    }
  }

  const blockMaternity = (): boolean => {
    if (props.gender === 'Nam') return true
    if (props.age < 19 || props.age > 50) return true
    if (props.additionalBenefitList.maternity.length === 0) return true
    return false
  }

  useEffect(() => {
    if (
      props.checkboxState.OutpatientCheckbox ||
      props.checkboxState.DentalCheckbox ||
      props.checkboxState.MaternityCheckbox ||
      props.checkboxState.DeathCheckbox
    ) {
      props.setIsHasAdditionalBenefits(true)
    } else {
      props.setIsHasAdditionalBenefits(false)
    }
  }, [props.checkboxState])

  useEffect(() => {
    if (props.checkboxState.MaternityCheckbox && props.gender === 'Nam') {
      props.handleCheckboxChange('MaternityCheckbox')
    }
  }, [props.gender])

  const calTotalPrice = (isHasAdditionalBenefits: boolean, additionalBenefits) => {
    let total = props.insurancePlanList[props.selectedPlan].prices[props.groupAge - 1].price
    if (isHasAdditionalBenefits) {
      if (props.checkboxState.OutpatientCheckbox) {
        total += additionalBenefits.outpatient[props.groupAge - 1].price
      }
      if (props.checkboxState.DentalCheckbox) {
        total += additionalBenefits.dental[0].price
      }
      if (props.checkboxState.MaternityCheckbox && additionalBenefits.maternity.length !== 0) {
        total += additionalBenefits.maternity[0].price
      }
      if (props.checkboxState.DeathCheckbox) {
        total += additionalBenefits.death[0].price
      }
    }
    return total
  }
  useEffect(() => {
    props.setTotalPrice(calTotalPrice(props.isHasAdditionalBenefits, props.additionalBenefitList))
  }, [props.isHasAdditionalBenefits, props.checkboxState, additionalBenefits, props.selectedPlan])

  useEffect(() => {
    props.setAge(calAge(props.date))
  }, [props.date])

  useEffect(() => {
    if (props.age >= 0 && props.age < 3) {
      props.setGroupAge(1)
    } else if (props.age >= 4 && props.age < 11) {
      props.setGroupAge(2)
    } else if (props.age >= 11 && props.age < 19) {
      props.setGroupAge(3)
    } else if (props.age >= 19 && props.age < 41) {
      props.setGroupAge(4)
    } else if (props.age >= 41 && props.age < 51) {
      props.setGroupAge(5)
    } else if (props.age >= 51 && props.age < 61) {
      props.setGroupAge(6)
    }
  }, [props.age])

  useEffect(() => {
    // Tính toán lại mảng khi data thay đổi
    const newOutpatient = props.insurancePlanList[props.selectedPlan].benefits.filter(
      (item) => item.benefitName === 'Bảo hiểm Điều trị ngoại trú'
    )
    const newDental = props.insurancePlanList[props.selectedPlan].benefits.filter(
      (item) => item.benefitName === 'Bảo hiểm Chăm sóc răng'
    )
    let newMaternity: AdditionalBenefit[] = []
    if (props.groupAge === 4 || props.groupAge === 5) {
      newMaternity = props.insurancePlanList[props.selectedPlan].benefits.filter(
        (item) => item.benefitName === 'Bảo hiểm Thai sản'
      )
    }
    const newDeath = props.insurancePlanList[props.selectedPlan].benefits.filter(
      (item) => item.benefitName === 'Bảo hiểm Tử vong do ốm đau, bệnh tật'
    )

    // Cập nhật state của tất cả các mảng
    props.setAdditionalBenefitList({
      outpatient: newOutpatient,
      dental: newDental,
      maternity: newMaternity,
      death: newDeath
    })
  }, [props.insurancePlanList[props.selectedPlan].benefits])

  return (
    <div className='flex flex-col gap-4 w-full'>
      <p className='font-bold text-xl text-black'>Thông tin người được bảo hiểm (NĐBH)</p>
      <form className='flex flex-col gap-3' id='insurance-registration-form' onSubmit={props.formik.handleSubmit}>
        <div className='flex gap-4 justify-between items-center w-full'>
          <div className='w-full'>
            <Select
              label='Mối quan hệ với người mua'
              size='lg'
              color='blue'
              onChange={props.setRelationship}
              value={props.relationship}
            >
              <Option value='Bản thân'>Bản thân</Option>
              <Option value='Cha mẹ'>Cha mẹ</Option>
              <Option value='Vợ/chồng'>Vợ/chồng</Option>
              <Option value='Anh/chị'>Anh/chị</Option>
              <Option value='Con'>Con</Option>
            </Select>
          </div>
          <div className='w-full'>
            <CustomInput
              type='text'
              openPopoverError={openPopoverName}
              setOpenPopoverError={setOpenPopoverName}
              formik={props.formik}
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
              label='Họ và tên'
              id='my-name'
              name='name'
            />
          </div>
          <div className='w-full relative'>
            <label className='absolute'>Ngày sinh</label>
            <DatePicker
              isForm={false}
              date={props.date}
              setDate={props.setDate}
              id='birthday'
              name='birthday'
              maxYear={2023}
            />
          </div>
          <div className='w-full select-none relative'>
            <Input
              value={props.age + ' tuổi'}
              label='Tuổi'
              size='lg'
              crossOrigin={undefined}
              color='blue'
              readOnly={true}
              disabled
            />
          </div>
        </div>
        <div className='flex gap-4 w-full justify-between items-center'>
          <div className='w-full '>
            <Select label='Giới tính' size='lg' color='blue' onChange={props.setGender} value={props.gender}>
              <Option value='Nam'>Nam</Option>
              <Option value='Nữ'>Nữ</Option>
            </Select>
          </div>
          <div className='w-full'>
            <CustomInput
              type='text'
              openPopoverError={openPopoverPhone}
              setOpenPopoverError={setOpenPopoverPhone}
              formik={props.formik}
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
              label='Số điện thoại'
              id='my-phone'
              name='phone'
            />
          </div>
          <div className='w-full'>
            <CustomInput
              type='text'
              openPopoverError={openPopoverEmail}
              setOpenPopoverError={setOpenPopoverEmail}
              formik={props.formik}
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
              label='Email'
              id='my-email'
              name='email'
            />
          </div>
          <div className='w-full'>
            <CustomInput
              type='text'
              openPopoverError={openPopoverCMND}
              setOpenPopoverError={setOpenPopoverCMND}
              formik={props.formik}
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
              label='CMND'
              id='my-cmnd'
              name='cmnd'
            />
          </div>
        </div>
        <div className='flex gap-4 w-full justify-between items-center'>
          <div className='w-full'>
            <CustomInput
              type='text'
              openPopoverError={openPopoverAddress}
              setOpenPopoverError={setOpenPopoverAddress}
              formik={props.formik}
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
              label='Địa chỉ'
              id='my-address'
              name='address'
            />
          </div>
          <div className='w-full'></div>
          <div className='w-full'></div>
          <div className='w-full'></div>
        </div>
      </form>
      {/* Chọn gói bảo hiểm */}
      <div className='flex items-center gap-2'>
        <span className='font-bold text-xl text-black inline'>Chọn gói bảo hiểm</span>
        <span className='text-[14px]'>(nhập đúng tuổi để hiển thị giá chính xác)</span>
      </div>
      <div className='grid grid-cols-4 justify-center items-center gap-4'>
        {props.insurancePlanList.map((insurancePlan, index) => (
          <label
            key={index}
            className={`w-full h-[70px] cursor-pointer border rounded-lg border-gray-300 select-none flex justify-start items-center gap-3 ${
              props.selectedPlan == index ? 'bg-[#5F33E6] text-white' : ''
            }`}
          >
            <input
              onChange={handleSelectPlan}
              type='radio'
              value={index}
              radioGroup='insurance-plan'
              name='insurance-plan'
              checked={props.selectedPlan == index}
              id={`plan-${index}`}
              className='opacity-0 peer/privacy'
            />
            <span
              className={`absolute h-5 w-5 ml-2 rounded-full border-2 border-gray-500 cursor-pointer
             peer-checked/privacy:bg-white peer-checked/privacy:border-none after:content-[''] after:hidden after:absolute peer-checked/privacy:after:inline
             after:w-[6px] after:h-[13px] after:border-r-[3px] after:border-b-[3px] after:left-[7.5px] after:top-[3px] after:border-solid after:border-[#5F33E6] after:rotate-45
             `}
            ></span>
            <div className='flex flex-col ml-4'>
              <p className='font-bold '>Gói {insurancePlan.planName}</p>
              <p className={` ${props.selectedPlan == index ? 'text-[#FFA500]' : 'text-red-600'}`}>
                <span className='text-[16px] font-bold'>
                  {formatNumber(insurancePlan.prices[props.groupAge - 1].price)}
                </span>{' '}
                <span className='text-[14px] '>đồng/Năm</span>
              </p>
            </div>
          </label>
        ))}
      </div>
      {/* quyền lợi bổ sung */}
      <div className='flex items-center gap-2 mt-4'>
        <span className='font-bold text-xl text-black inline'>Quyền lợi bổ sung</span>
      </div>
      <div className='grid grid-cols-4 justify-center items-center gap-4'>
        {additionalBenefits.AdditionalBenefits.filter(
          (additionalBenefits) => additionalBenefits.key !== 'Physical therapy'
        ).map((additionalBenefits, index) => (
          <label
            key={index}
            className={`w-full h-[70px]  border rounded-lg border-gray-300 select-none flex items-center gap-3
            ${props.checkboxState[checkboxList[index]] ? ' text-[#5F33E6] ring-[#5F33E6] ring-2' : ''}
            ${
              additionalBenefits.key === 'Maternity' && blockMaternity()
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            }`}
          >
            <input
              checked={props.checkboxState[checkboxList[index]]}
              onChange={() => props.handleCheckboxChange(checkboxList[index])}
              type='checkbox'
              id={`addition-benefit-${index}`}
              className='opacity-0 peer/privacy'
              disabled={additionalBenefits.key === 'Maternity' && blockMaternity()}
            />
            <span
              className={`absolute h-5 w-5 ml-2 rounded-full border-2 border-gray-500
             peer-checked/privacy:bg-[#5F33E6] peer-checked/privacy:border-none after:content-[''] after:hidden after:absolute peer-checked/privacy:after:inline
             after:w-[6px] after:h-[13px] after:border-r-[3px] after:border-b-[3px] after:left-[7.5px] after:top-[3px] after:border-solid after:border-white after:rotate-45
             `}
            ></span>
            <div className='flex flex-col ml-4'>
              <p className='font-bold '>{additionalBenefits.name.split('\n')[0]}</p>
              <p className={` `}>
                <span className='text-[16px] text-red-600 font-bold'>
                  {additionalBenefits.key === 'Outpatient treatment' &&
                    formatNumber(props.additionalBenefitList?.outpatient[props.groupAge - 1]?.price)}
                  {additionalBenefits.key === 'Dental Care' &&
                    formatNumber(props.additionalBenefitList?.dental[0]?.price)}
                  {additionalBenefits.key === 'Death' && formatNumber(props.additionalBenefitList?.death[0]?.price)}
                  {additionalBenefits.key === 'Maternity' && maternityPrice()}
                </span>{' '}
                <span
                  className='text-[14px] text-red-600'
                  hidden={additionalBenefits.key === 'Maternity' && maternityPrice() === 'Không áp dụng'}
                >
                  đồng/Năm
                </span>
              </p>
            </div>
          </label>
        ))}
      </div>
      {/* Tổng thanh toán */}
      <div className='flex justify-between items-center font-semibold mt-4'>
        <button className='p-2 px-4 bg-[#5F33E6] text-white rounded-md' onClick={props.handleOpenBenefitDialog}>
          Quyền lợi
        </button>
        <div>
          <span className='font-bold text-xl text-black inline'>Tổng chi phí: </span>
          <span className='text-[16px] text-red-600 font-bold'>{formatNumber(props.totalPrice)} đồng/Năm</span>
        </div>
      </div>
    </div>
  )
}

export default InsuranceRegistrationForm
