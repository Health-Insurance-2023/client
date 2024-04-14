import { Accordion, AccordionHeader, AccordionBody, Card, CardBody } from '@material-tailwind/react'
import { useState } from 'react'
import { Icon } from 'src/pages/Support/Support'
import { InsurancePlan } from 'src/types/insurancePlan.type'
import { formatDate, formatNumber } from 'src/utils/utils'
import { AdditionalBenefitListType } from '../InsurancePlanCard/InsurancePlanCard'
import {
  healthQuestions,
  healthQuestionsForFemale,
  healthYesNoQuestions
} from '../HealthInformationForm/HealthInformationForm'

interface Props {
  checkboxState: any
  insurancePlanList: InsurancePlan[]
  selectedPlan: number
  gender: string
  birthday: string
  age: number
  formik: any
  groupAge: number
  additionalBenefitList: AdditionalBenefitListType
  healthAnswers: Record<string, string>
  setIsAcceptPolicy: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConfirmInfor = (props: Props) => {
  const [open, setOpen] = useState(1)
  const [open2, setOpen2] = useState(2)

  const handleOpen = (value) => setOpen(open === value ? 0 : value)
  const handleOpen2 = (value) => setOpen2(open2 === value ? 0 : value)
  const planPrice = props.insurancePlanList[props.selectedPlan].prices[props.groupAge - 1].price
  let outpatientPrice = 0
  let dentalPrice = 0
  let maternityPrice = 0
  let deathPrice = 0

  if (props.checkboxState.OutpatientCheckbox == true) {
    outpatientPrice = props.additionalBenefitList.outpatient[props.groupAge - 1].price
  }
  if (props.checkboxState.DentalCheckbox == true) {
    dentalPrice = props.additionalBenefitList.dental[0].price
  }
  if (props.checkboxState.MaternityCheckbox == true) {
    maternityPrice += props.additionalBenefitList.maternity[0].price
  }
  if (props.checkboxState.DeathCheckbox == true) {
    deathPrice += props.additionalBenefitList.death[0].price
  }

  return (
    <div className='flex flex-col ml-4'>
      <div className='flex gap-2 items-center'>
        <p className='font-bold text-xl text-black'>Xác nhận thông tin đăng ký bảo hiểm</p>
      </div>
      <div className='flex gap-[40px] mt-6 item-start justify-between'>
        <div className='flex flex-col gap-4'>
          <Accordion className='rounded-md w-[720px]' open={open == 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader
              className={` ${
                open == 1 ? 'bg-[#1E40AF] text-white rounded-t-md' : 'bg-gray-100 rounded-md text-black'
              } hover:bg-[#1E40AF] hover:text-white px-4 h-[50px] text-[18px]`}
              onClick={() => handleOpen(1)}
            >
              Người được bảo hiểm
            </AccordionHeader>
            <AccordionBody className='px-8 border border-gray-300 rounded-b-md text-[15px] grid grid-cols-2 gap-2'>
              <div>
                <span className='font-semibold mr-2'>Họ tên:</span>
                <span>{props.formik.values.name}</span>
              </div>
              <div>
                <span className='font-semibold mr-2'>Ngày sinh:</span>
                <span>
                  {formatDate(props.birthday)} ({props.age} tuổi )
                </span>
              </div>
              <div>
                <span className='font-semibold mr-2'>Giới tính:</span>
                <span>{props.gender}</span>
              </div>
              <div>
                <span className='font-semibold mr-2'>Điện thoại:</span>
                <span>{props.formik.values.phone}</span>
              </div>
              <div>
                <span className='font-semibold mr-2'>Email:</span>
                <span>{props.formik.values.email}</span>
              </div>
              <div>
                <span className='font-semibold mr-2'>CMND:</span>
                <span>{props.formik.values.cmnd}</span>
              </div>
              <div>
                <span className='font-semibold mr-2'>Địa chỉ:</span>
                <span>{props.formik.values.address}</span>
              </div>
            </AccordionBody>
          </Accordion>
          <Accordion className='rounded-md w-[720px]' open={open2 == 2} icon={<Icon id={2} open={open2} />}>
            <AccordionHeader
              className={` ${
                open2 == 2 ? 'bg-[#1E40AF] text-white rounded-t-md' : 'bg-gray-100 rounded-md text-black'
              } hover:bg-[#1E40AF] hover:text-white px-4 h-[50px] text-[18px]`}
              onClick={() => handleOpen2(2)}
            >
              Thông tin sức khỏe
            </AccordionHeader>
            <AccordionBody className='px-8 border border-gray-300 rounded-b-md text-[16px] gap-2'>
              {healthQuestions.map((question, index) => (
                <div key={index} className='mt-4'>
                  <span className='font-bold'>{`Câu ${index + 1}: `}</span>
                  <span>{question.question}</span>
                  <p className='font-semibold'>
                    Câu trả lời: <span className='text-base font-normal'>{props.healthAnswers[question.key]}</span>{' '}
                  </p>
                </div>
              ))}
              {healthYesNoQuestions.map((question, index) => (
                <div key={index}>
                  <div className='mt-4'>
                    <span className='font-bold'>{`Câu ${index + 3}: `}</span>
                    <span>{question.question}</span>
                  </div>
                  <p className='font-semibold'>
                    Câu trả lời: <span className='text-base font-normal'>{props.healthAnswers[question.key]}</span>{' '}
                  </p>
                </div>
              ))}
              {props.gender == 'Nữ' &&
                healthQuestionsForFemale.map((question, index) => (
                  <div key={index}>
                    <div className='mt-4 '>
                      <span className='font-bold'>{`Câu ${index + 9}: `}</span>
                      <span>{question.question}</span>
                      <p className='font-semibold'>
                        Câu trả lời: <span className='text-base font-normal'>{props.healthAnswers[question.key]}</span>{' '}
                      </p>
                    </div>
                  </div>
                ))}
            </AccordionBody>
          </Accordion>
        </div>
        <div>
          <div className='flex w-96 flex-col gap-4'>
            <Card className=' w-full shadow-md'>
              <CardBody className='flex items-center gap-2'>
                <div className='flex items-center gap-3'>
                  <img src='/src/assets/images/icon/icon-02-primary.png' alt='logo' width='32' height='32' />
                  <div className='font-bold'>CÔNG TY INSURE LIFE VIỆT NAM</div>
                </div>
              </CardBody>
            </Card>

            <div className='flex flex-col'>
              <Card className=' h-full w-full rounded-b-none '>
                <CardBody>
                  <div color='blue-gray' className='mb-2 text-lg font-bold'>
                    Tổng chi phí
                  </div>
                  <div className='flex items-center justify-between'>
                    <span>Gói {props.insurancePlanList[props.selectedPlan].planName}</span>
                    <span className='text-sm font-bold text-gray-900'>{formatNumber(planPrice)} VNĐ</span>
                  </div>
                </CardBody>
              </Card>
              <Card className=' h-full w-full rounded-none border-t border-gray-300'>
                <CardBody className='flex flex-col gap-2'>
                  {props.checkboxState.OutpatientCheckbox && (
                    <div className='flex items-center justify-between'>
                      <span className=''>{props.additionalBenefitList.outpatient[0].benefitName}</span>
                      <span className='text-sm font-bold text-gray-900'>{formatNumber(outpatientPrice)} VNĐ</span>
                    </div>
                  )}
                  {props.checkboxState.DentalCheckbox && (
                    <div className='flex items-center justify-between'>
                      <span className=''>{props.additionalBenefitList.dental[0].benefitName}</span>
                      <span className='text-sm font-bold text-gray-900'>{formatNumber(dentalPrice)} VNĐ</span>
                    </div>
                  )}
                  {props.checkboxState.MaternityCheckbox && (
                    <div className='flex items-center justify-between'>
                      <span className=''>{props.additionalBenefitList.maternity[0].benefitName}</span>
                      <span className='text-sm font-bold text-gray-900'>{formatNumber(maternityPrice)} VNĐ</span>
                    </div>
                  )}
                  {props.checkboxState.DeathCheckbox && (
                    <div className='flex items-center justify-between'>
                      <span className='w-[250px]'>{props.additionalBenefitList.death[0].benefitName}</span>
                      <span className='text-sm font-bold text-gray-900'>{formatNumber(deathPrice)} VNĐ</span>
                    </div>
                  )}
                  <div className='flex items-center justify-between'>
                    <span className='text-black'>Tổng phí bổ sung</span>
                    <span className='text-sm font-bold text-gray-900'>
                      {formatNumber(outpatientPrice + dentalPrice + maternityPrice + deathPrice)} VNĐ
                    </span>
                  </div>
                </CardBody>
              </Card>
              <Card className=' h-full w-full rounded-none border-t border-gray-300 '>
                <CardBody>
                  <div className='flex h-10 items-center justify-between  '>
                    <div className='flex items-center gap-1 leading-none'>
                      <span className='text-black'>Tổng cộng</span>
                      <div className='md:hidden'>
                        <span role='img' aria-label='caret-up' className='anticon anticon-caret-up text-gray-500'>
                          <svg
                            viewBox='0 0 1024 1024'
                            focusable='false'
                            data-icon='caret-up'
                            width='1em'
                            height='1em'
                            fill='currentColor'
                            aria-hidden='true'
                          >
                            <path d='M858.9 689L530.5 308.2c-9.4-10.9-27.5-10.9-37 0L165.1 689c-12.2 14.2-1.2 35 18.5 35h656.8c19.7 0 30.7-20.8 18.5-35z'></path>
                          </svg>
                        </span>
                      </div>
                    </div>

                    <span className='flex flex-col'>
                      <span className='text-xl font-medium text-red-600 md:text-base'>
                        {formatNumber(planPrice + outpatientPrice + dentalPrice + maternityPrice + deathPrice)} VNĐ
                      </span>
                    </span>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
          <label className={`w-full mt-3 cursor-pointer select-none flex items-start gap-3`}>
            <input
              type='checkbox'
              className='opacity-0 peer/privacy'
              onChange={() => props.setIsAcceptPolicy((cur) => !cur)}
            />
            <span
              className={`absolute h-5 w-5 ml-1 mt-2 rounded-full border-2 border-gray-500
             peer-checked/privacy:bg-[#5F33E6] peer-checked/privacy:border-none after:content-[''] after:hidden after:absolute peer-checked/privacy:after:inline
             after:w-[6px] after:h-[13px] after:border-r-[3px] after:border-b-[3px] after:left-[7.5px] after:top-[3px] after:border-solid after:border-white after:rotate-45
             `}
            ></span>

            <p className='font-normal text-base ml-3'>
              Tôi/Chúng tôi đồng ý cam kết và/hoặc được ủy quyền hợp pháp của Người được bảo hiểm đồng ý cam kết rằng
              các thông tin đã khai báo trên đây là trung thực, đầy đủ, chính xác và hoàn toàn chịu trách nhiệm về các
              thông tin đã khai báo này. Đồng thời Tôi/Chúng tôi xác nhận đã được giải thích đầy đủ, rõ ràng và đọc,
              hiểu rõ, chấp nhận toàn bộ các{' '}
              <span className='text-blue-400'>
                điều kiện,điều khoản bảo hiểm, điều khoản loại trừ, quy tắc bảo hiểm và các tài liệu đính kèm Và thỏa
                thuận sử dụng website
              </span>{' '}
              Và
              <span className='text-blue-400'> thỏa thuận sử dụng website</span>
            </p>
          </label>
        </div>
      </div>
    </div>
  )
}

export default ConfirmInfor
