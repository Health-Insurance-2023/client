import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import routes from 'src/constants/routes'
import { AdditionalBenefit, InsurancePlan } from 'src/types/insurancePlan.type'
import { formatNumber } from 'src/utils/utils'

interface InsurancePlanCardProps {
  insurancePlan: InsurancePlan
  value: string
  checkboxState: {
    OutpatientCheckbox: boolean
    DentalCheckbox: boolean
    MaternityCheckbox: boolean
    DeathCheckbox: boolean
  }
}

export type AdditionalBenefitListType = {
  outpatient: AdditionalBenefit[]
  dental: AdditionalBenefit[]
  maternity: AdditionalBenefit[]
  death: AdditionalBenefit[]
}

const InsurancePlanCard = ({ insurancePlan, value, checkboxState }: InsurancePlanCardProps) => {
  const [isHasAdditionalBenefits, setIsHasAdditionalBenefits] = useState(false)
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const [additionalBenefits, setAdditionalBenefits] = useState<AdditionalBenefitListType>({
    outpatient: [],
    dental: [],
    maternity: [],
    death: []
  })

  useEffect(() => {
    if (
      checkboxState.OutpatientCheckbox ||
      checkboxState.DentalCheckbox ||
      checkboxState.MaternityCheckbox ||
      checkboxState.DeathCheckbox
    ) {
      setIsHasAdditionalBenefits(true)
    } else {
      setIsHasAdditionalBenefits(false)
    }
  }, [checkboxState])

  useEffect(() => {
    setTotalPrice(calTotalPrice(isHasAdditionalBenefits, additionalBenefits))
  }, [isHasAdditionalBenefits, checkboxState, additionalBenefits])

  const calTotalPrice = (isHasAdditionalBenefits: boolean, additionalBenefits) => {
    let total = insurancePlan.prices[parseInt(value) - 1].price
    if (isHasAdditionalBenefits) {
      if (checkboxState.OutpatientCheckbox) {
        total += additionalBenefits.outpatient[parseInt(value) - 1].price
      }
      if (checkboxState.DentalCheckbox) {
        total += additionalBenefits.dental[0].price
      }
      if (checkboxState.MaternityCheckbox && additionalBenefits.maternity.length !== 0) {
        total += additionalBenefits.maternity[0].price
      }
      if (checkboxState.DeathCheckbox) {
        total += additionalBenefits.death[0].price
      }
    }
    return total
  }

  useEffect(() => {
    // Tính toán lại mảng khi data thay đổi
    const newOutpatient = insurancePlan.benefits.filter((item) => item.benefitName === 'Bảo hiểm Điều trị ngoại trú')
    const newDental = insurancePlan.benefits.filter((item) => item.benefitName === 'Bảo hiểm Chăm sóc răng')
    let newMaternity: AdditionalBenefit[] = []
    if (value === '4' || value === '5') {
      newMaternity = insurancePlan.benefits.filter((item) => item.benefitName === 'Bảo hiểm Thai sản')
    }
    const newDeath = insurancePlan.benefits.filter(
      (item) => item.benefitName === 'Bảo hiểm Tử vong do ốm đau, bệnh tật'
    )

    // Cập nhật state của tất cả các mảng
    setAdditionalBenefits({
      outpatient: newOutpatient,
      dental: newDental,
      maternity: newMaternity,
      death: newDeath
    })
  }, [insurancePlan.benefits])

  return (
    <div className='w-[400px] col-span-4 select-none'>
      {/* header */}
      <div className='w-full h-[175px] rounded-t-md bg-[#ba000a] grid grid-rows-2'>
        <div className='row-span-1 flex items-end ml-3 mb-3 text-white'>
          <p className='text-lg font-bold '>Gói {insurancePlan.planName}</p>
        </div>
        <div className='row-span-1 flex items-end mb-3 ml-3 text-white'>
          <div className='mt-6 text-sm'>
            <p className='leading-none' data-metatip='true'>
              Chỉ từ
            </p>
            <div className='flex flex-row items-center'>
              <p>
                <span className='text-2xl font-bold'>
                  {formatNumber(insurancePlan.prices[parseInt(value) - 1].price)}
                </span>{' '}
                đồng/Năm
              </p>
              <div className='block ml-2'></div>
            </div>
          </div>
        </div>
      </div>
      {/* end header */}
      {/* quyền lợi 1 */}
      <div className='bg-[#FFFBF8] p-4 pb-[14px] pt-[42px]'>
        <ul className='list-disc ml-4'>
          <li className='relative mb-4'>
            <span className='font-bold'>{formatNumber(insurancePlan.accidentInsurance)}/ Người/ Năm</span>
          </li>
          <li className='relative mb-4'>
            <span>Theo Bảng tỷ lệ trả tiền bảo hiểm thương tật</span>
          </li>
        </ul>
      </div>
      {/* quyền lợi 2 */}
      <div className='bg-[#fff] p-4 pb-[14px] pt-[42px]'>
        <ul className='list-disc ml-4'>
          <li className='relative mb-4'>
            <span className='font-bold'>
              {formatNumber(insurancePlan.hospitalization / 20)}/ Ngày
              <br /> Tối đa {formatNumber(insurancePlan.hospitalization)}/ Người/ Năm
            </span>
          </li>
          <li className='relative mb-4'>
            <span className='font-bold'>{formatNumber(insurancePlan.surgery)}/ Người/ Năm</span>
          </li>
        </ul>
      </div>
      {/* quyền lợi 3 */}
      <div className='bg-[#FFFBF8] p-4 pb-[14px] pt-[42px]'>
        <ul className='list-disc ml-4'>
          <li className='relative mb-4'>
            <span className='font-bold'>{formatNumber(insurancePlan.beforeAdmission)}/ Người/ Năm</span>
          </li>
          <li className='relative mb-4'>
            <span className='font-bold'>{formatNumber(insurancePlan.afterDischarge)}/ Người/ Năm</span>
          </li>
          <li className='relative mb-8'>
            <span className='font-bold'>{formatNumber(insurancePlan.takeCareAtHome)}/ Người/ Năm</span>
          </li>
          <li className='relative mb-4'>
            <span className='font-bold'>{formatNumber(insurancePlan.hospitalizationAllowance)}/ Người/ Năm</span>
          </li>
          <li className='relative mb-4'>
            <span className='font-bold'>{formatNumber(insurancePlan.emergencyTransport)}/ Người/ Năm</span>
          </li>
          <li className='relative mb-4'>
            <span className='font-bold'>{formatNumber(insurancePlan.funeralAllowance)}/ Người/ Năm</span>
          </li>
        </ul>
      </div>
      {/* quyền lợi bổ sung */}
      {isHasAdditionalBenefits && (
        <div className='bg-[#fff] p-4 pb-[14px] pt-[42px]'>
          <ul className='list-disc ml-4'>
            {checkboxState.OutpatientCheckbox && (
              <li className='relative mb-4'>
                <span className='font-bold'>
                  {formatNumber(additionalBenefits.outpatient[parseInt(value) - 1].perTimesPayout)}/Lần khám (Tối đa 10
                  lần khám)
                </span>
              </li>
            )}
            {checkboxState.OutpatientCheckbox && (
              <li className='relative mb-4'>
                <span className='font-bold'>
                  {formatNumber(additionalBenefits.outpatient[parseInt(value) - 1].maxPayout / 100)}/Lần (Tối đa 60 lần
                  khám)
                </span>
              </li>
            )}
            {checkboxState.DentalCheckbox && (
              <li className='relative mb-4'>
                <span className='font-bold'>
                  {formatNumber(additionalBenefits.dental[0].maxPayout)}/Năm. Tối đa{' '}
                  {formatNumber(additionalBenefits.dental[0].perTimesPayout)}/Lần khám
                </span>
              </li>
            )}
            {checkboxState.MaternityCheckbox && (
              <li className='relative mb-4'>
                <span className='font-bold'>
                  {additionalBenefits.maternity.length === 0
                    ? 'Không áp dụng'
                    : formatNumber(additionalBenefits.maternity[0].maxPayout) + '/Năm'}
                </span>
              </li>
            )}
            {checkboxState.DeathCheckbox && (
              <li className='relative mb-3'>
                <span className='font-bold'>{formatNumber(additionalBenefits.death[0].maxPayout)}</span>
              </li>
            )}
          </ul>
        </div>
      )}
      <div
        className={`h-[160px] px-3 pt-4 mb-12 rounded-b-md`}
        style={{ backgroundColor: isHasAdditionalBenefits ? '#FFFBF8' : '#fff' }}
      >
        <div className='row-span-1 flex items-end mb-3 ml-3 text-[#99542D]'>
          <div className='mt-6 text-sm'>
            <div className='flex flex-row items-center'>
              <p>
                <span className='text-2xl font-bold'>{formatNumber(totalPrice)}</span> đồng/Năm
              </p>
              <div className='block ml-2'></div>
            </div>
          </div>
        </div>
        <Link to={routes.registerInsurance}>
          <button className='h-[55px] bg-[#ba000a] text-white w-full font-bold rounded-md hover:bg-red-400'>
            Mua ngay
          </button>
        </Link>
      </div>
    </div>
  )
}

export default InsurancePlanCard
