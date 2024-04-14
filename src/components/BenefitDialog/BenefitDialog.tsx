import { faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, IconButton, Dialog, DialogHeader, DialogBody, DialogFooter, Tooltip } from '@material-tailwind/react'
import { Fragment } from 'react'
import facebookIcon3 from 'src/assets/images/facbook_icon_3.png'
import { additionalBenefits, insuranceBenefits } from 'src/constants/insuranceBenefits'
import { AdditionalBenefitsInfor } from 'src/pages/InsuranceService/InsuranceService'
import { InsurancePlan } from 'src/types/insurancePlan.type'
import { formatNumber } from 'src/utils/utils'
import { AdditionalBenefitListType } from '../InsurancePlanCard/InsurancePlanCard'

interface Props {
  openBenefitDialog: boolean
  handleOpenBenefitDialog: () => void
  checkboxState: any
  insurancePlanList: InsurancePlan[]
  selectedPlan: number
  additionalBenefitList: AdditionalBenefitListType
  isHasAdditionalBenefits: boolean
  groupAge: number
}

const BenefitDialog = ({
  openBenefitDialog,
  handleOpenBenefitDialog,
  checkboxState,
  insurancePlanList,
  selectedPlan,
  additionalBenefitList,
  isHasAdditionalBenefits,
  groupAge
}: Props) => {
  return (
    <Dialog
      open={openBenefitDialog}
      dismiss={{ enabled: false }}
      handler={handleOpenBenefitDialog}
      size='xs'
      className='w-[1000px]'
    >
      <DialogHeader className='bg-white rounded-t-md h-[60px] p-0 block'>
        <div className=''>
          <div className='flex items-center h-[60px] border-b border-gray-300'>
            <div className='w-full flex justify-center'>
              <span className='text-[20px] text-[#050505] font-bold'>Quyền lợi bảo hiểm</span>
            </div>
            <div className='flex justify-end absolute w-full -ml-4'>
              <IconButton
                color='blue-gray'
                className=' bg-[#e4e6eb] rounded-full hover:bg-[#d8dadf] px-4'
                variant='text'
                onClick={handleOpenBenefitDialog}
              >
                <div
                  style={{ backgroundImage: `url(${facebookIcon3})` }}
                  className='bg-[length:190px_186px] bg-[-22px_-110px] h-5 w-5 opacity-60'
                ></div>
              </IconButton>
            </div>
          </div>
        </div>
      </DialogHeader>
      <DialogBody className='flex gap-4 w-full h-[500px] overflow-auto text-black'>
        <div>
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
                        className={`max-w-[250px] z-[99999]`}
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
        {/* thông tin quyền lợi */}
        <div className='w-[500px]'>
          <div className='bg-[#FFFBF8] p-4 pb-[14px] pt-[42px]'>
            <ul className='list-disc ml-4'>
              <li className='relative mb-4'>
                <span className='font-bold'>
                  {formatNumber(insurancePlanList[selectedPlan].accidentInsurance)}/ Người/ Năm
                </span>
              </li>
              <li className='relative mb-4'>
                <span>Theo Bảng tỷ lệ trả tiền bảo hiểm thương tật</span>
              </li>
            </ul>
          </div>
          {/* quyền lợi 2 */}
          <div className='bg-[#fff] p-4 pb-[14px] pt-[42px]'>
            <ul className='list-disc ml-4'>
              <li className='relative mb-[22px]'>
                <span className='font-bold'>
                  {formatNumber(insurancePlanList[selectedPlan].hospitalization / 20)}/ Ngày
                  <br /> Tối đa {formatNumber(insurancePlanList[selectedPlan].hospitalization)}/ Người/ Năm
                </span>
              </li>
              <li className='relative mb-4'>
                <span className='font-bold'>{formatNumber(insurancePlanList[selectedPlan].surgery)}/ Người/ Năm</span>
              </li>
            </ul>
          </div>
          {/* quyền lợi 3 */}
          <div className='bg-[#FFFBF8] p-4 pb-[14px] pt-[42px]'>
            <ul className='list-disc ml-4'>
              <li className='relative mb-4'>
                <span className='font-bold'>
                  {formatNumber(insurancePlanList[selectedPlan].beforeAdmission)}/ Người/ Năm
                </span>
              </li>
              <li className='relative mb-6'>
                <span className='font-bold'>
                  {formatNumber(insurancePlanList[selectedPlan].afterDischarge)}/ Người/ Năm
                </span>
              </li>
              <li className='relative mb-9'>
                <span className='font-bold'>
                  {formatNumber(insurancePlanList[selectedPlan].takeCareAtHome)}/ Người/ Năm
                </span>
              </li>
              <li className='relative mb-4'>
                <span className='font-bold'>
                  {formatNumber(insurancePlanList[selectedPlan].hospitalizationAllowance)}/ Người/ Năm
                </span>
              </li>
              <li className='relative mb-5'>
                <span className='font-bold'>
                  {formatNumber(insurancePlanList[selectedPlan].emergencyTransport)}/ Người/ Năm
                </span>
              </li>
              <li className='relative mb-4'>
                <span className='font-bold'>
                  {formatNumber(insurancePlanList[selectedPlan].funeralAllowance)}/ Người/ Năm
                </span>
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
                      {formatNumber(additionalBenefitList.outpatient[groupAge - 1].perTimesPayout)}/Lần khám (Tối đa 10
                      lần khám)
                    </span>
                  </li>
                )}
                {checkboxState.OutpatientCheckbox && (
                  <li className='relative mb-4'>
                    <span className='font-bold'>
                      {formatNumber(additionalBenefitList.outpatient[groupAge - 1].maxPayout / 100)}/Lần (Tối đa 60 lần
                      khám)
                    </span>
                  </li>
                )}
                {checkboxState.DentalCheckbox && (
                  <li className='relative mb-4'>
                    <span className='font-bold'>
                      {formatNumber(additionalBenefitList.dental[0].maxPayout)}/Năm. Tối đa{' '}
                      {formatNumber(additionalBenefitList.dental[0].perTimesPayout)}/Lần khám
                    </span>
                  </li>
                )}
                {checkboxState.MaternityCheckbox && (
                  <li className='relative mb-4'>
                    <span className='font-bold'>
                      {additionalBenefitList.maternity.length === 0
                        ? 'Không áp dụng'
                        : formatNumber(additionalBenefitList.maternity[0].maxPayout) + '/Năm'}
                    </span>
                  </li>
                )}
                {checkboxState.DeathCheckbox && (
                  <li className='relative mb-3'>
                    <span className='font-bold'>{formatNumber(additionalBenefitList.death[0].maxPayout)}</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </DialogBody>
      <DialogFooter>
        <Button variant='text' color='red' onClick={handleOpenBenefitDialog} className='mr-1'>
          <span>Hủy</span>
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default BenefitDialog
