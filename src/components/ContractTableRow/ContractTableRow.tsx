import _ from 'lodash'
import clsx from 'clsx'
import Lucide from 'src/components/Lucide'
import Table from 'src/components/Table'
import { Fragment, useRef, useState } from 'react'
import { Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Tooltip } from '@material-tailwind/react'
import { calAge, formatDate, formatDateTime, formatNumber } from 'src/utils/utils'
import { faAddressCard, faCircleInfo, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import jsPDF from 'jspdf'

import { ContractType } from 'src/types/insuranceContract.type'
import { additionalBenefits, insuranceBenefits } from 'src/constants/insuranceBenefits'
import { AdditionalBenefitsInfor } from 'src/pages/InsuranceService/InsuranceService'

interface Props {
  userContract: ContractType
  cancelContract?: (id: number) => void
  requestCancelContract?: (id: number) => void
  isAdmin?: boolean
}

const ContractTableRow = ({ userContract, cancelContract, requestCancelContract, isAdmin }: Props) => {
  const [viewDetailModal, setViewDetailModal] = useState(false)
  const contractPdfRef = useRef(null)

  const handleOpen = () => setViewDetailModal(!viewDetailModal)

  const handleGeneratePdf = () => {
    const doc = new jsPDF({
      format: 'a4',
      unit: 'px'
    })

    // Adding the fonts.
    doc.setFont('Inter-Regular', 'normal')
    doc.setLanguage('vi')

    doc.html(contractPdfRef.current, {
      async callback(doc) {
        await doc.save(
          'IC-' +
            formatDate(userContract.createdAt.toString()).slice(0, 2) +
            userContract.id +
            '-' +
            userContract.registrationForm.insuredPerson.name +
            '-hợp đồng'
        )
      }
    })
  }

  const insuranceInfo = userContract.registrationForm.insuranceInformation

  return (
    <>
      <Table.Tr className='intro-x'>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{userContract.id}</div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md max-w-[290px] bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <a href='' className='font-medium'>
            {userContract.registrationForm.insuredPerson.name}
          </a>
          <div className='text-slate-500 text-xs mt-0.5'>
            {calAge(userContract.registrationForm.insuredPerson.birthday.toString())} tuổi
          </div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{userContract.registrationForm.insuredPerson.email}</div>
        </Table.Td>

        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{userContract.registrationForm.insuranceInformation.planName}</div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{formatDate(userContract.startDate.toString())}</div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{formatDate(userContract.endDate.toString())}</div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div
            className={clsx([
              'flex items-center justify-center',
              { 'text-yellow-600': userContract.status === 'pending' },
              { 'text-danger': userContract.status === 'expired' },
              { 'text-danger': userContract.status === 'cancelled' },
              { 'text-success': userContract.status === 'activated' }
            ])}
          >
            <Lucide
              icon={userContract.status === 'activated' ? 'Check' : userContract.status === 'pending' ? 'Clock' : 'X'}
              className='w-4 h-4 mr-2'
            />
            {userContract.status === 'activated'
              ? 'Đang áp dụng'
              : userContract.status === 'pending'
                ? 'Yêu cầu hủy'
                : userContract.status === 'cancelled'
                  ? 'Đã hủy'
                  : 'Hết hiệu lực'}
          </div>
        </Table.Td>
        <Table.Td
          className={`first:rounded-l-md last:rounded-r-md
            w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400`}
        >
          <div className='flex items-center justify-center'>
            <button className={`flex items-center mr-3`} onClick={handleOpen}>
              <Lucide icon='Eye' className='w-4 h-4 mr-1' /> Xem
            </button>
          </div>
        </Table.Td>
      </Table.Tr>

      {/* dialog */}
      <Dialog
        dismiss={{ enabled: false }}
        size='xs'
        className='w-[1300px] dark:bg-darkmode-400'
        open={viewDetailModal}
        handler={handleOpen}
      >
        <DialogHeader className='bg-white dark:bg-darkmode-400 rounded-t-md h-[60px] p-0 block'>
          <div className=''>
            <div className='flex items-center h-[60px] border-b border-gray-300'>
              <div className='w-full flex justify-center'>
                <span className='text-[20px] text-[#050505] dark:text-white font-bold'>Chi tiết hợp đồng</span>
              </div>
              <div className='flex justify-end absolute w-full -ml-4'>
                <IconButton
                  color='blue-gray'
                  className=' bg-[#e4e6eb] dark:bg-darkmode-400 rounded-full hover:bg-[#d8dadf] px-4'
                  variant='text'
                  onClick={handleOpen}
                >
                  <Lucide icon='X' className='w-5 h-5' />
                </IconButton>
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogBody className='bg-[#F1F5F9] dark:bg-dark/70 max-h-[500px]  overflow-auto pr-2'>
          <div ref={contractPdfRef}>
            {/* BEGIN: Transaction Details */}
            <div className='intro-y grid grid-cols-12 gap-3'>
              <div className='col-span-12 lg:col-span-4 2xl:col-span-4'>
                <div className='box p-5 rounded-md'>
                  <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                    <div className='font-medium text-lg text-blue-700 truncate'>NGƯỜI ĐƯỢC BẢO HIỂM</div>
                  </div>
                  {/* họ tên và sđt */}

                  <div className='flex items-center'>
                    <Lucide icon='Clipboard' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Tên:</span> {userContract.registrationForm.insuredPerson.name}
                  </div>
                  <div className='flex items-center mt-3'>
                    <Lucide icon='Phone' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>SĐT:</span> {userContract.registrationForm.insuredPerson.phone}
                  </div>

                  {/* email và gender */}

                  <div className='flex items-center mt-3'>
                    <Lucide icon='Mail' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Email:</span>
                    {userContract.registrationForm.insuredPerson.email}
                  </div>
                  <div className='flex items-center mt-3'>
                    <FontAwesomeIcon icon={faVenusMars} className='w-4 h-4 mt-1 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Giới tính:</span>{' '}
                    {userContract.registrationForm.insuredPerson.gender === 'male' ? 'Nam' : 'Nữ'}
                  </div>

                  {/* cmnd và ngày sinh */}

                  <div className='flex items-center mt-3'>
                    <FontAwesomeIcon icon={faAddressCard} className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>CMND:</span> {userContract.registrationForm.insuredPerson.cmnd}
                  </div>
                  <div className='flex items-center mt-3'>
                    <Lucide icon='Cake' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Ngày sinh:</span>{' '}
                    {formatDate(userContract.registrationForm.insuredPerson.birthday.toString())}
                  </div>

                  {/* địa chỉ */}
                  <div className='flex items-center mt-3'>
                    <Lucide icon='MapPin' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Địa chỉ:</span>{' '}
                    {userContract.registrationForm.insuredPerson.address}
                  </div>
                </div>
                {/* Chương trình bảo hiểm */}
                <div className='col-span-12 lg:col-span-7 2xl:col-span-5 mt-3'>
                  <div className='box p-5 pb-2 rounded-md rounded-b-none'>
                    <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                      <div className='font-medium text-lg text-blue-700 truncate'>CHƯƠNG TRÌNH BẢO HIỂM</div>
                    </div>
                    <div className='flex items-center '>
                      <Lucide icon='Clipboard' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold'>Mã:</span>
                      <span className='underline decoration-dotted ml-1'>
                        IC-{formatDate(userContract.createdAt.toString()).slice(0, 2)}
                        {userContract.id}
                      </span>
                    </div>
                    <div className='flex items-center mt-3'>
                      <Lucide icon='Calendar' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>Ngày hiệu lực: </span>
                      {formatDateTime(userContract.startDate.toString())}
                    </div>
                    <div className='flex items-center mt-3'>
                      <Lucide icon='Calendar' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>Hạn kết thúc: </span>
                      {formatDateTime(userContract.endDate.toString())}
                    </div>
                    <div className='flex items-center mt-3'>
                      <Lucide icon='Clock' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold'>Trạng thái:</span>
                      <span
                        className={clsx([
                          'flex items-center justify-center rounded px-2 ml-1',
                          { 'bg-danger text-white': userContract.status === 'expired' },
                          { 'bg-success text-white': userContract.status === 'activated' },
                          {
                            'bg-yellow-600 text-white': userContract.status === 'pending'
                          },
                          { 'bg-danger text-white': userContract.status === 'cancelled' }
                        ])}
                      >
                        {userContract.status === 'activated'
                          ? 'Đang áp dụng'
                          : userContract.status === 'pending'
                            ? 'Yêu cầu hủy'
                            : userContract.status === 'cancelled'
                              ? 'Đã hủy'
                              : 'Hết hiệu lực'}
                      </span>
                    </div>
                  </div>

                  <div className='box p-5 pt-0 border-t  rounded-md rounded-t-none'>
                    <hr className='px-4 mb-4' />
                    <div className='flex items-center'>
                      <Lucide icon='Shield' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>Gói:</span>
                      <div className='ml-auto'>{userContract.registrationForm.insuranceInformation.planName}</div>
                    </div>
                    <div className='flex items-center mt-3'>
                      <Lucide icon='CreditCard' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>Phí bảo hiểm:</span>
                      <div className='ml-auto '>
                        {formatNumber(userContract.registrationForm.insuranceInformation.planCost)} VNĐ
                      </div>
                    </div>
                    <div className='mt-3'>
                      <div className='flex items-center'>
                        <Lucide icon='PlusCircle' className='w-4 h-4 text-slate-500 mr-2' />
                        <span className='font-semibold mr-1'> Quyền lợi bổ sung:</span>
                      </div>
                      {userContract.registrationForm.insuranceInformation.outpatientTreatment !== 0 && (
                        <div className='ml-5'> + Bảo hiểm điều trị ngoại trú</div>
                      )}
                      {userContract.registrationForm.insuranceInformation.maternity !== 0 && (
                        <div className='ml-5'> + Bảo hiểm thai sản</div>
                      )}
                      {userContract.registrationForm.insuranceInformation.dentalCare !== 0 && (
                        <div className='ml-5'> + Bảo hiểm chăm sóc răng</div>
                      )}
                      {userContract.registrationForm.insuranceInformation.death !== 0 && (
                        <div className='ml-5'> + Bảo hiểm tử vong</div>
                      )}
                    </div>
                    <div className='flex items-center mt-3'>
                      <Lucide icon='CreditCard' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'> Phí bổ sung:</span>
                      <div className='ml-auto'>
                        {formatNumber(userContract.registrationForm.insuranceInformation.additionalCost)} VNĐ
                      </div>
                    </div>
                    <div className='flex items-center border-t border-slate-200/60 dark:border-darkmode-400 pt-5 mt-5 font-medium'>
                      <Lucide icon='CreditCard' className='w-4 h-4 text-slate-500 mr-2' />
                      Tổng chi phí:
                      <div className='ml-auto text-red-600 font-bold text-[18px]'>
                        {formatNumber(
                          userContract.registrationForm.insuranceInformation.additionalCost +
                            userContract.registrationForm.insuranceInformation.planCost
                        )}{' '}
                        VNĐ
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BEGIN */}
              <div className='col-span-12 lg:col-span-7 2xl:col-span-8'>
                <div className='box p-5 rounded-md'>
                  <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                    <div className='font-medium text-lg text-blue-700 truncate'>QUYỀN LỢI BẢO HIỂM</div>
                  </div>
                  <div className='overflow-auto lg:overflow-visible -mt-3 flex'>
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
                      {(insuranceInfo.outpatientTreatmentMax !== 0 ||
                        insuranceInfo.dentalCare !== 0 ||
                        insuranceInfo.maternity !== 0 ||
                        insuranceInfo.death !== 0) && (
                        <div className={`p-4 bg-[#FFFBF8]`}>
                          <p className='font-bold text-sm text-[#99542D] mb-2'>
                            {additionalBenefits.typeName.toUpperCase()}
                          </p>
                          <ul className='list-disc ml-4'>
                            {insuranceInfo.outpatientTreatmentMax !== 0 && <AdditionalBenefitsInfor indexArray={0} />}
                            {insuranceInfo.outpatientTreatmentMax !== 0 && <AdditionalBenefitsInfor indexArray={1} />}
                            {insuranceInfo.dentalCare !== 0 && <AdditionalBenefitsInfor indexArray={2} />}
                            {insuranceInfo.maternity !== 0 && <AdditionalBenefitsInfor indexArray={3} />}
                            {insuranceInfo.death !== 0 && <AdditionalBenefitsInfor indexArray={4} />}
                          </ul>
                        </div>
                      )}
                    </div>
                    {/* thông tin quyền lợi */}
                    <div className='w-[500px]'>
                      <div className='bg-[#FFFBF8] p-4 pb-[16px] pt-[42px]'>
                        <ul className='list-disc ml-4'>
                          <li className='relative mb-4'>
                            <span className='font-bold'>
                              {formatNumber(insuranceInfo.accidentInsurance)}/ Người/ Năm
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
                          <li className='relative mt-[20px] mb-[22px]'>
                            <span className='font-bold'>
                              {formatNumber(insuranceInfo.hospitalization / 20)}/ Ngày
                              <br /> Tối đa {formatNumber(insuranceInfo.hospitalization)}/ Người/ Năm
                            </span>
                          </li>
                          <li className='relative mb-4'>
                            <span className='font-bold'>{formatNumber(insuranceInfo.surgery)}/ Người/ Năm</span>
                          </li>
                        </ul>
                      </div>
                      {/* quyền lợi 3 */}
                      <div className='bg-[#FFFBF8] p-4 pb-[14px] pt-[42px]'>
                        <ul className='list-disc ml-4'>
                          <li className='relative mb-12'>
                            <span className='font-bold'>{formatNumber(insuranceInfo.beforeAdmission)}/ Người/ Năm</span>
                          </li>
                          <li className='relative mb-12'>
                            <span className='font-bold'>{formatNumber(insuranceInfo.afterDischarge)}/ Người/ Năm</span>
                          </li>
                          <li className='relative mb-9'>
                            <span className='font-bold'>{formatNumber(insuranceInfo.takeCareAtHome)}/ Người/ Năm</span>
                          </li>
                          <li className='relative mb-10'>
                            <span className='font-bold'>
                              {formatNumber(insuranceInfo.hospitalizationAllowance)}/ Người/ Năm
                            </span>
                          </li>
                          <li className='relative mb-4'>
                            <span className='font-bold'>
                              {formatNumber(insuranceInfo.emergencyTransport)}/ Người/ Năm
                            </span>
                          </li>
                          <li className='relative mb-4'>
                            <span className='font-bold'>
                              {formatNumber(insuranceInfo.funeralAllowance)}/ Người/ Năm
                            </span>
                          </li>
                        </ul>
                      </div>
                      {/* quyền lợi bổ sung */}
                      {(insuranceInfo.outpatientTreatmentMax !== 0 ||
                        insuranceInfo.dentalCare !== 0 ||
                        insuranceInfo.maternity !== 0 ||
                        insuranceInfo.death !== 0) && (
                        <div className='bg-[#fff] p-4 pb-[14px] pt-[42px]'>
                          <ul className='list-disc ml-4'>
                            {insuranceInfo.outpatientTreatmentMax !== 0 && (
                              <li className='relative mb-4'>
                                <span className='font-bold'>
                                  {formatNumber(insuranceInfo.outpatientTreatment)}/Lần khám (Tối đa 10 lần khám)
                                </span>
                              </li>
                            )}
                            {insuranceInfo.outpatientTreatmentMax !== 0 && (
                              <li className='relative mb-4'>
                                <span className='font-bold'>
                                  {formatNumber(insuranceInfo.outpatientTreatmentMax / 100)}/Lần (Tối đa 60 lần khám)
                                </span>
                              </li>
                            )}
                            {insuranceInfo.dentalCare !== 0 && (
                              <li className='relative mb-4'>
                                <span className='font-bold'>
                                  {formatNumber(insuranceInfo.dentalCare)}/Năm. Tối đa{' '}
                                  {formatNumber(insuranceInfo.dentalCare / 2)}/Lần
                                </span>
                              </li>
                            )}
                            {insuranceInfo.maternity !== 0 && (
                              <li className='relative mb-4'>
                                <span className='font-bold'>{formatNumber(insuranceInfo.maternity) + '/Năm'}</span>
                              </li>
                            )}
                            {insuranceInfo.death !== 0 && (
                              <li className='relative mb-3'>
                                <span className='font-bold'>{formatNumber(insuranceInfo.death)}</span>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full mt-3'>
              <div className='box p-5 rounded-md'>
                <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                  <div className='font-medium text-lg text-blue-700 truncate'>
                    ĐIỀU KIỆN, ĐIỀU KHOẢN BẢO HIỂM, ĐIỀU KHOẢN LOẠI TRỪ
                  </div>
                </div>
                <div className='text-[18px]'>
                  Theo quy định tại{' '}
                  <a
                    href='src/assets/pdf/policy.pdf'
                    download='Quy tắc và điều khoản.pdf'
                    className='font-bold text-[#99542d] hover:underline'
                  >
                    Quy tắc và điều khoản
                  </a>
                </div>
              </div>
              <div className='box p-5 rounded-md mt-3'>
                <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                  <div className='font-medium text-lg text-blue-700 truncate'>ĐIỀU KHOẢN BỔ SUNG</div>
                </div>
                <ul className='text-[18px] list-disc ml-6'>
                  <li>Không thực hiện bảo lãnh viện phí</li>
                  <li>
                    Đối với trẻ em tham gia bảo hiểm từ 60 ngày tuổi đến dưới 4 tuổi tại ngày bắt đầu thời hạn bảo hiểm:
                    Áp dụng đồng chi trả 70:30 (VBI chi trả 70%) chi phí y tế thuộc phạm vi bảo hiểm tại cơ sở y tế tư
                    nhân/quốc tế, khoa quốc tế bệnh viện công lập trong suốt thời hạn bảo hiểm.
                  </li>
                  <li>
                    Đối với trẻ em từ 60 ngày tuổi đến dưới 7 tuổi tại ngày bắt đầu thời hạn bảo hiểm: Áp dụng thời gian
                    chờ 90 ngày đối với Viêm phế quản, viêm tiểu phế quản, viêm phổi các loại trong suốt thời hạn bảo
                    hiểm.
                  </li>
                  <li>
                    anh sách bệnh/tình trạng áp dụng đồng chi trả: Viêm xoang mãn tính/Viêm họng mãn tính, Hen, Phổi tắc
                    nghẽn mãn tính (COPD), Suy thận/Sỏi thận, Đái tháo đường, Bệnh lý về huyết áp, Bệnh về khớp, Ung
                    thư, U/Bướu/Nang/Polyp các loại, Viêm dạ dày/đại tràng/trực tràng, Viêm gan virus, Rối loạn tiền
                    đình, Rối loạn tuyến giáp, Bệnh tim.
                  </li>
                  <li>Đối với điều trị đứt dây chằng, rách sụn chêm: Áp dụng thời gian chờ 365 ngày</li>
                </ul>
              </div>
              <div className='box p-5 rounded-md mt-3'>
                <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                  <div className='font-medium text-lg text-blue-700 truncate'>HIỆU LỰC CỦA QUYỀN LỢI BẢO HIỂM</div>
                </div>
                <div className='text-lg'>
                  Từng quyền lợi bảo hiểm có hiệu lực sau thời gian chờ dưới đây(Xem chi tiết hơn ở{' '}
                  <span className='font-bold text-[#99542d] hover:underline'>Quy tắc và điều khoản</span>) kể từ ngày
                  bắt đầu thời hạn bảo hiểm (trừ khi có thỏa thuận khác được quy định tại Điều khoản bổ sung):
                </div>
                <ul className='text-[18px] list-disc ml-6'>
                  <li>0 ngày đối với tai nạn</li>
                  <li>
                    30 ngày đối với điều trị bệnh thông thường/nha khoa (là bệnh/tình trạng không thuộc danh mục bệnh
                    đặc biệt, bệnh có sẵn, tình trạng có sẵn)
                  </li>
                  <li>365 ngày đối với bệnh đặc biệt, bệnh có sẵn, thương tật có sẵn</li>
                  <li>90 ngày đối với tử vong, thương tật toàn bộ vĩnh viễn do bệnh thông thường</li>
                </ul>
                <div className='text-lg'>
                  Đối với Hợp đồng bảo hiểm/Giấy chứng nhận bảo hiểm tái tục liên tục đã vượt qua thời gian chờ theo quy
                  định, các quyền lợi bảo hiểm sẽ không áp dụng thời gian chờ nêu trên với số tiền bảo hiểm và quyền lợi
                  bảo hiểm tương đương.
                </div>
              </div>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className={`border-t gap-2 ${isAdmin ? 'justify-between' : ''}`}>
          {isAdmin && (
            <div>
              <button
                onClick={() => {
                  cancelContract(userContract.id)
                  handleOpen()
                }}
                className={`${
                  userContract.status !== 'activated' ? 'hidden' : ''
                } flex items-center mr-3 text-white bg-red-700 p-1 rounded-md px-4 hover:bg-red-500`}
              >
                <Lucide icon='X' className='w-4 h-4 mr-2' /> Hủy hợp đồng
              </button>
              <button
                onClick={() => {
                  cancelContract(userContract.id)
                  handleOpen()
                }}
                className={`${
                  userContract.status !== 'pending' ? 'hidden' : ''
                } flex items-center mr-3 text-white bg-red-700 p-1 rounded-md px-4 hover:bg-red-500`}
              >
                <Lucide icon='X' className='w-4 h-4 mr-2' /> Chấp nhận
              </button>
            </div>
          )}

          {!isAdmin && (
            <div>
              <button
                onClick={() => {
                  requestCancelContract(userContract.id)
                  handleOpen()
                }}
                className={`${
                  userContract.status !== 'activated' ? 'hidden' : ''
                } flex items-center mr-[920px] text-white bg-red-700 p-1 rounded-md px-4 hover:bg-red-500`}
              >
                <Lucide icon='X' className='w-4 h-4 mr-2' /> Yêu cầu hủy
              </button>
            </div>
          )}

          <div className='flex'>
            <button
              onClick={handleGeneratePdf}
              className='flex items-center mr-3 text-white bg-blue-700 p-1 rounded-md px-4 hover:bg-blue-500'
            >
              <Lucide icon='FileText' className='w-4 h-4 mr-2' /> PDF
            </button>
            <button
              onClick={handleOpen}
              className='flex items-center mr-3 text-white bg-blue-700 p-1 rounded-md px-4 hover:bg-blue-500'
            >
              Đóng
            </button>
          </div>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default ContractTableRow
