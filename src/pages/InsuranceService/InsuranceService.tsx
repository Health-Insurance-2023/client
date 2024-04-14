import { faCircleInfo, faMars, faVenus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Checkbox, Tab, TabPanel, Tabs, TabsBody, TabsHeader, Tooltip } from '@material-tailwind/react'
import { useQuery } from '@tanstack/react-query'
import { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import insurancePlanApi from 'src/apis/insurancePlan.api'
import DatePicker from 'src/components/DatePicker'
import InsurancePlanCard from 'src/components/InsurancePlanCard'
import { additionalBenefits, insuranceBenefits } from 'src/constants/insuranceBenefits'
import routes from 'src/constants/routes'
import { InsurancePlan } from 'src/types/insurancePlan.type'
import { calAge } from 'src/utils/utils'
import { Swiper, SwiperSlide } from 'swiper/react'

interface AdditionalBenefitsInforProps {
  indexArray: number
}

export const AdditionalBenefitsInfor = ({ indexArray }: AdditionalBenefitsInforProps) => {
  return (
    <li className='relative mb-4'>
      <div>
        <span>{additionalBenefits.AdditionalBenefits[indexArray].name}</span>
        {additionalBenefits.AdditionalBenefits[indexArray].description && (
          <Tooltip
            className='max-w-[250px]'
            content={
              <div>
                {additionalBenefits.AdditionalBenefits[indexArray].description.split('\n').map((line, index) => (
                  <Fragment key={index}>
                    {line}
                    {index !== additionalBenefits.AdditionalBenefits[indexArray].description.split('\n').length - 1 && (
                      <br />
                    )}
                  </Fragment>
                ))}
              </div>
            }
          >
            <FontAwesomeIcon className='ml-2' icon={faCircleInfo} />
          </Tooltip>
        )}
      </div>
    </li>
  )
}

const data = [
  {
    label: '1-3 tuổi',
    value: '1',
    desc: `It really matters and then like it really doesn't matter.
    What matters is the people who are sparked by it. And the people 
    who are like offended by it, it doesn't matter.`
  },
  {
    label: '4-10 tuổi',
    value: '2',
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`
  },
  {
    label: '11-18 tuổi',
    value: '3',
    desc: `We're not always in the position that we want to be at.
    We're constantly growing. We're constantly making mistakes. We're
    constantly trying to express ourselves and actualize our dreams.`
  },
  {
    label: '19-40 tuổi',
    value: '4',
    desc: `Because it's about motivating the doers. Because I'm here
    to follow my dreams and inspire other people to follow their dreams, too.`
  },
  {
    label: '41-50 tuổi',
    value: '5',
    desc: `We're not always in the position that we want to be at.
    We're constantly growing. We're constantly making mistakes. We're
    constantly trying to express ourselves and actualize our dreams.`
  },
  {
    label: '51-60 tuổi',
    value: '6',
    desc: `We're not always in the position that we want to be at.
    We're constantly growing. We're constantly making mistakes. We're
    constantly trying to express ourselves and actualize our dreams.`
  }
]

export const InsuranceService = () => {
  const [isMale, setIsMale] = useState(true)
  const [date, setDate] = useState('')
  const [activeTab, setActiveTab] = useState('1')
  const [checkboxState, setCheckboxState] = useState({
    OutpatientCheckbox: false,
    DentalCheckbox: false,
    MaternityCheckbox: false,
    DeathCheckbox: false
  })

  const handleCheckboxChange = (checkboxName) => {
    setCheckboxState((prevState) => ({
      ...prevState,
      [checkboxName]: !prevState[checkboxName]
    }))
  }

  const getAllPlan = useQuery({
    queryKey: [`get-all-plan`],
    queryFn: () => insurancePlanApi.getAllInsurancePlan(),
    onError: (err) => console.log(err)
  })

  const insurancePlanList = getAllPlan.data?.data as InsurancePlan[]

  useEffect(() => {
    let age = calAge(date)
    if (age >= 0 && age < 3) {
      setActiveTab('1')
    } else if (age >= 4 && age < 11) {
      setActiveTab('2')
    } else if (age >= 11 && age < 19) {
      setActiveTab('3')
    } else if (age >= 19 && age < 41) {
      setActiveTab('4')
    } else if (age >= 41 && age < 51) {
      setActiveTab('5')
    } else if (age >= 51 && age < 61) {
      setActiveTab('6')
    }
  }, [date])

  useEffect(() => {
    const tabButton: any = document.querySelector(`li[data-value="${activeTab}"]`)
    if (tabButton) {
      tabButton.click()
    }
  }, [activeTab])

  if (getAllPlan.isLoading) {
    return (
      <div className='loading loading-center-body bg-gray-200'>
        <div className='loader-circle-8'>
          <svg className='circular' viewBox='25 25 50 50'>
            <circle className='path' cx='50' cy='50' r='20' fill='none' strokeWidth='5' strokeMiterlimit='10' />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className='h-full flex flex-col items-center mb-12'>
      <h3 className='mt-10 mb-12 text-2xl lg:text-4xl font-bold lg:max-w-[50%] mx-auto lg:mx-0'>
        Biểu phí và quyền lợi các gói bảo hiểm
      </h3>

      <div className='flex flex-col border-2 border-[#DDD2C0] justify-center items-center rounded-md '>
        {/* banner */}
        <div className='h-[242px] max-w-[1330px] flex bg-white rounded-t-md mt-[1px] border-b-4 border-[#DDD2C0]'>
          <img className='w-[315px] h-[238px]' src='src/assets/images/insurance_service_banner.png' />
          <div className='row-span-2 flex-col justify-center mx-10 my-4 md:mx-0 md:p-4 md:pr-5 md:flex lg:m-6'>
            <p className='text-[#d60007] block leading-none mb-2 text-2xl font-bold lg:font-normal md:font-normal text-c1-500 hover:underline md:text-2xl'>
              Bảo hiểm sức khỏe toàn diện
            </p>
            <span className='text-sm'>
              Bảo vệ sức khỏe cho bản thân và gia đình luôn là ưu tiên hàng đầu, đặc biệt là trước bệnh ung thư. Ung thư
              sẽ không còn đáng lo nếu bạn có một kế hoạch tài chính hiệu quả.
            </span>
          </div>
          <div className='flex justify-center items-center mr-4 '>
            <Link to={routes.support}>
              <button className='w-[180px] h-10 transition bg-white border border-gray-300 rounded-md text-[#d60007] font-bold hover:bg-red-200'>
                Tìm hiểu cách mua
              </button>
            </Link>
          </div>
        </div>
        {/*end banner  */}

        <p className='text-base font-medium text-center mb-3 mt-8'>
          Bạn vui lòng nhập thông tin để tham khảo mức phí phù hợp
        </p>

        {/* tùy chọn */}
        <div className='flex gap-4 mb-8'>
          {/* Giới tính */}
          <div className='h-[130px] w-[300px] bg-white flex flex-col justify-center items-center gap-2 rounded-md'>
            <p className='font-medium'>Bạn là:</p>
            <div className='flex gap-3'>
              <button
                className={`h-12 w-12 rounded-full border-[2px] ${
                  isMale ? 'border-[#D60007] bg-[#FFF8F3] ' : 'bg-white'
                } `}
                onClick={() => {
                  setCheckboxState((prevState) => ({
                    ...prevState,
                    MaternityCheckbox: false
                  }))
                  setIsMale(true)
                }}
              >
                <FontAwesomeIcon icon={faMars} color={`${isMale ? '#D60007' : ''}`} />
              </button>
              <button
                className={`h-12 w-12 rounded-full border-[2px] ${
                  !isMale ? 'border-[#D60007] bg-[#FFF8F3] ' : 'bg-white'
                } `}
                onClick={() => setIsMale(false)}
              >
                <FontAwesomeIcon icon={faVenus} color={`${!isMale ? '#D60007' : ''}`} />
              </button>
            </div>
          </div>

          {/* ngày sinh */}
          <div className='h-[130px] w-[300px] bg-white flex flex-col justify-center items-center gap-2 rounded-md '>
            <p className='font-medium'>Ngày sinh:</p>
            <DatePicker isForm={false} date={date} setDate={setDate} id='birthday' name='birthday' />
          </div>

          {/* quyền lợi bổ sung */}
          <div className='h-[130px] w-[600px] bg-white flex flex-col justify-center items-center gap-2 rounded-md '>
            <p className='font-medium'>Quyền lợi bổ sung</p>
            <div className='flex gap-2'>
              <div className='flex flex-col'>
                <Checkbox
                  color='red'
                  label='Bảo hiểm Điều trị ngoại trú'
                  crossOrigin={undefined}
                  labelProps={{ className: 'font-medium' }}
                  checked={checkboxState.OutpatientCheckbox}
                  onChange={() => handleCheckboxChange('OutpatientCheckbox')}
                />
                <Checkbox
                  color='red'
                  label='Bảo hiểm Chăm sóc răng'
                  crossOrigin={undefined}
                  labelProps={{ className: 'font-medium' }}
                  checked={checkboxState.DentalCheckbox}
                  onChange={() => handleCheckboxChange('DentalCheckbox')}
                />
              </div>
              <div className='flex flex-col'>
                <Checkbox
                  color='red'
                  label='Bảo hiểm Thai sản'
                  disabled={isMale}
                  crossOrigin={undefined}
                  labelProps={{ className: 'font-medium' }}
                  checked={checkboxState.MaternityCheckbox}
                  onChange={() => handleCheckboxChange('MaternityCheckbox')}
                />
                <Checkbox
                  color='red'
                  label='Bảo hiểm Tử vong do ốm đau, bệnh tật'
                  crossOrigin={undefined}
                  labelProps={{ className: 'font-medium' }}
                  checked={checkboxState.DeathCheckbox}
                  onChange={() => handleCheckboxChange('DeathCheckbox')}
                />
              </div>
            </div>
          </div>
        </div>
        {/* end tùy chọn */}

        <div className='flex'>
          {/* tên quyền lợi */}
          <div className='w-[500px] flex flex-col'>
            <div className='w-full h-[175px] rounded-md bg-transparent mb-[60px]'></div>
            {insuranceBenefits.map((item, index) => (
              <div key={index} className={`p-4 ${index % 2 == 0 ? 'bg-[#FAF2EC]' : 'bg-[#FFFBF8]'}`}>
                <p className='font-bold text-sm text-[#99542D] mb-2'>{item.typeName.toUpperCase()}</p>

                <ul className='list-disc ml-4'>
                  {item.benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className={`relative mb-4`}
                      style={{ marginBottom: benefit.name.includes('\n') ? '42px' : '' }}
                    >
                      <span>{benefit.name}</span>
                      {benefit.description && (
                        <Tooltip
                          className={`max-w-[250px]`}
                          content={
                            <div className={``}>
                              {benefit.description.split('\n').map((line, index) => (
                                <Fragment key={index}>
                                  {line}
                                  {index !== benefit.description.split('\n').length - 1 && <br />}
                                </Fragment>
                              ))}
                            </div>
                          }
                        >
                          <FontAwesomeIcon className='ml-2' icon={faCircleInfo} />
                        </Tooltip>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* quyền lợi bổ sung */}
            {(checkboxState.OutpatientCheckbox ||
              checkboxState.DentalCheckbox ||
              checkboxState.MaternityCheckbox ||
              checkboxState.DeathCheckbox) && (
              <div className={`p-4 bg-[#FFFBF8]`}>
                <p className='font-bold text-sm text-[#99542D] mb-2'>{additionalBenefits.typeName.toUpperCase()}</p>
                <ul className='list-disc ml-4'>
                  {checkboxState.OutpatientCheckbox && <AdditionalBenefitsInfor indexArray={0} />}
                  {checkboxState.OutpatientCheckbox && <AdditionalBenefitsInfor indexArray={1} />}
                  {checkboxState.DentalCheckbox && <AdditionalBenefitsInfor indexArray={2} />}
                  {checkboxState.MaternityCheckbox && <AdditionalBenefitsInfor indexArray={3} />}
                  {checkboxState.DeathCheckbox && <AdditionalBenefitsInfor indexArray={4} />}
                </ul>
              </div>
            )}
          </div>
          {/* end quyền lợi */}

          {/* Các gói bảo hiểm */}
          <Tabs value={activeTab} className='mr-2'>
            <TabsHeader className='w-[828px] m-0 p-1 bg-gray-300'>
              {data.map(({ label, value }) => (
                <Tab key={value} value={value} className='p-[5px]'>
                  {label}
                </Tab>
              ))}
            </TabsHeader>
            <TabsBody
              className='w-[828px]'
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 }
              }}
            >
              {data.map(({ value }) => (
                <TabPanel key={value} value={value} className='p-0 pt-4 m-0'>
                  <div className=''>
                    <Swiper spaceBetween={16} slidesPerView={2}>
                      {insurancePlanList.map((insurancePlan, index) => (
                        <SwiperSlide key={index}>
                          <InsurancePlanCard
                            insurancePlan={insurancePlan}
                            value={value}
                            checkboxState={checkboxState}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
        <div className='h-[72px] flex justify-between items-center w-full bg-[#FBE2CC] px-3'>
          <div className='flex items-center gap-2'>
            <img src='src/assets/images/icon/policy.png' className='w-10 h-10' />
            <a
              href='src/assets/pdf/policy.pdf'
              download='Quy tắc và điều khoản.pdf'
              className='font-bold text-[#99542d] hover:underline'
            >
              Quy tắc và điều khoản
            </a>
          </div>
          <div className='flex items-center gap-2'>
            <img src='src/assets/images/icon/info.png' className='w-8 h-10' />
            <a
              href='src/assets/pdf/info.pdf'
              download='Thông tin sản phẩm.pdf'
              className='font-bold text-[#99542d] hover:underline'
            >
              Thông tin sản phẩm
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InsuranceService
