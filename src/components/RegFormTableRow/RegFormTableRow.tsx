import _ from 'lodash'
import clsx from 'clsx'
import Lucide from 'src/components/Lucide'
import Table from 'src/components/Table'
import { useState } from 'react'
import { Dialog, DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react'
import { RegistrationFormType } from 'src/types/registrationForm.type'
import { calAge, formatDate, formatNumber } from 'src/utils/utils'
import { faAddressCard, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  healthQuestions,
  healthQuestionsForFemale,
  healthYesNoQuestions
} from '../HealthInformationForm/HealthInformationForm'

interface Props {
  registrationForm: RegistrationFormType
  isUser?: boolean
  approveForm?: (id: number) => void
  refuseForm?: (id: number) => void
}

const RegFormTableRow = ({ registrationForm, isUser, approveForm, refuseForm }: Props) => {
  const [viewDetailModal, setViewDetailModal] = useState(false)
  const [confirmDialog, setConfirmDialog] = useState(false)
  const [buttonClick, setButtonClick] = useState('')

  const handleOpen = () => setViewDetailModal(!viewDetailModal)
  const handleOpen2 = () => setConfirmDialog(!confirmDialog)

  return (
    <>
      <Table.Tr className='intro-x'>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{registrationForm.id}</div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md max-w-[290px] bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <a href='' className='font-medium'>
            {registrationForm.insuredPerson.name}
          </a>
          <div className='text-slate-500 text-xs mt-0.5'>
            {calAge(registrationForm.insuredPerson.birthday.toString())} tuổi
          </div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{registrationForm.insuredPerson.email}</div>
        </Table.Td>

        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{registrationForm.insuranceInformation.planName}</div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{formatDate(registrationForm.applyDate.toString())}</div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div
            className={clsx([
              'flex items-center justify-center',
              { 'text-yellow-600': registrationForm.status === 'pending' },
              { 'text-danger': registrationForm.status === 'refused' },
              { 'text-success': registrationForm.status === 'approved' }
            ])}
          >
            <Lucide
              icon={
                registrationForm.status === 'pending' ? 'Clock' : registrationForm.status === 'approved' ? 'Check' : 'X'
              }
              className='w-4 h-4 mr-2'
            />
            {registrationForm.status === 'pending'
              ? 'Chờ duyệt'
              : registrationForm.status === 'approved'
                ? 'Đã duyệt'
                : 'Từ chối'}
          </div>
        </Table.Td>
        <Table.Td
          className={`first:rounded-l-md last:rounded-r-md ${
            isUser ? 'w-10' : 'w-60'
          } bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b] py-0 relative before:block before:w-px before:h-8 before:bg-slate-200 before:absolute before:left-0 before:inset-y-0 before:my-auto before:dark:bg-darkmode-400`}
        >
          <div className='flex items-center justify-center'>
            <button className={`flex items-center mr-3`} onClick={handleOpen}>
              <Lucide icon='Eye' className='w-4 h-4 mr-1' /> Xem
            </button>
            <button
              onClick={() => {
                setButtonClick('approve')
                handleOpen2()
              }}
              disabled={registrationForm.status !== 'pending'}
              className={`flex items-center mr-3 text-green-600 ${
                registrationForm.status === 'pending' ? '' : 'opacity-50 cursor-not-allowed'
              } ${isUser ? 'hidden' : ''}`}
            >
              <Lucide icon='Check' className='w-4 h-4 mr-1' /> Duyệt
            </button>
            <button
              onClick={() => {
                setButtonClick('refuse')
                handleOpen2()
              }}
              className={`flex items-center text-danger ${
                registrationForm.status === 'pending' ? '' : 'opacity-50 cursor-not-allowed'
              } ${isUser ? 'hidden' : ''}`}
            >
              <Lucide icon='X' className='w-4 h-4 mr-1' /> Từ chối
            </button>
          </div>
        </Table.Td>
      </Table.Tr>

      <Dialog
        dismiss={{ enabled: false }}
        size='xs'
        className='w-[1180px] dark:bg-darkmode-400'
        open={viewDetailModal}
        handler={handleOpen}
      >
        <DialogHeader className='bg-white dark:bg-darkmode-400 rounded-t-md h-[60px] p-0 block'>
          <div className=''>
            <div className='flex items-center h-[60px] border-b border-gray-300'>
              <div className='w-full flex justify-center'>
                <span className='text-[20px] text-[#050505] dark:text-white font-bold'>Chi tiết đơn đăng ký</span>
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
        <DialogBody className='bg-[#F1F5F9] dark:bg-dark/70 max-h-[500px] overflow-auto pr-2'>
          <>
            {/* BEGIN: Transaction Details */}
            <div className='intro-y grid grid-cols-12 gap-3'>
              <div className='col-span-12 lg:col-span-4 2xl:col-span-4'>
                <div className='box p-5 rounded-md'>
                  <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                    <div className='font-medium text-lg text-blue-700 truncate'>Thông tin đơn đăng ký</div>
                  </div>
                  <div className='flex items-center '>
                    <Lucide icon='Clipboard' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold'>Mã:</span>
                    <span className='underline decoration-dotted ml-1'>
                      RF-{formatDate(registrationForm.applyDate.toString()).slice(0, 2)}
                      {registrationForm.id}
                    </span>
                  </div>
                  <div className='flex items-center mt-3'>
                    <Lucide icon='Calendar' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Ngày gửi: </span>
                    {formatDate(registrationForm.applyDate.toString())}
                  </div>
                  <div className='flex items-center mt-3'>
                    <Lucide icon='Clock' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold'>Trạng thái:</span>
                    <span
                      className={clsx([
                        'flex items-center justify-center rounded px-2 ml-1',
                        { 'text-white bg-yellow-600': registrationForm.status === 'pending' },
                        { 'bg-danger text-white': registrationForm.status === 'refused' },
                        { 'bg-success text-white': registrationForm.status === 'approved' }
                      ])}
                      // className='bg-success/20 text-success '
                    >
                      {registrationForm.status === 'pending'
                        ? 'Chờ duyệt'
                        : registrationForm.status === 'approved'
                          ? 'Đã duyệt'
                          : 'Từ chối'}
                    </span>
                  </div>
                </div>
                <div className='box p-5 rounded-md mt-3'>
                  <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                    <div className='font-medium text-lg text-blue-700 truncate'>Người được bảo hiểm</div>
                  </div>
                  <div className='flex items-center'>
                    <Lucide icon='Clipboard' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Tên:</span> {registrationForm.insuredPerson.name}
                  </div>
                  <div className='flex items-center mt-3'>
                    <Lucide icon='Phone' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>SĐT:</span> {registrationForm.insuredPerson.phone}
                  </div>
                  <div className='flex items-center mt-3'>
                    <Lucide icon='Mail' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Email:</span>
                    {registrationForm.insuredPerson.email}
                  </div>
                  <div className='flex items-center mt-3'>
                    <FontAwesomeIcon icon={faVenusMars} className='w-4 h-4 mt-1 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Giới tính:</span>{' '}
                    {registrationForm.insuredPerson.gender === 'male' ? 'Nam' : 'Nữ'}
                  </div>
                  <div className='flex items-center mt-3'>
                    <FontAwesomeIcon icon={faAddressCard} className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>CMND:</span> {registrationForm.insuredPerson.cmnd}
                  </div>
                  <div className='flex items-center mt-3'>
                    <Lucide icon='Cake' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Ngày sinh:</span>{' '}
                    {formatDate(registrationForm.insuredPerson.birthday.toString())}
                  </div>
                  <div className='flex items-center mt-3'>
                    <Lucide icon='MapPin' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Địa chỉ:</span> {registrationForm.insuredPerson.address}
                  </div>
                </div>
                <div className='box p-5 rounded-md mt-3'>
                  <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                    <div className='font-medium text-lg text-blue-700 truncate'>Thông tin gói bảo hiểm</div>
                  </div>
                  <div className='flex items-center'>
                    <Lucide icon='Shield' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Gói:</span>
                    <div className='ml-auto'>{registrationForm.insuranceInformation.planName}</div>
                  </div>
                  <div className='flex items-center mt-3'>
                    <Lucide icon='CreditCard' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Phí bảo hiểm:</span>
                    <div className='ml-auto '>{formatNumber(registrationForm.insuranceInformation.planCost)} VNĐ</div>
                  </div>
                  <div className='mt-3'>
                    <div className='flex items-center'>
                      <Lucide icon='PlusCircle' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'> Quyền lợi bổ sung:</span>
                    </div>
                    {registrationForm.insuranceInformation.outpatientTreatment !== 0 && (
                      <div className='ml-5'> + Bảo hiểm điều trị ngoại trú</div>
                    )}
                    {registrationForm.insuranceInformation.maternity !== 0 && (
                      <div className='ml-5'> + Bảo hiểm thai sản</div>
                    )}
                    {registrationForm.insuranceInformation.dentalCare !== 0 && (
                      <div className='ml-5'> + Bảo hiểm chăm sóc răng</div>
                    )}
                    {registrationForm.insuranceInformation.death !== 0 && (
                      <div className='ml-5'> + Bảo hiểm tử vong</div>
                    )}
                  </div>
                  <div className='flex items-center mt-3'>
                    <Lucide icon='CreditCard' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'> Phí bổ sung:</span>
                    <div className='ml-auto'>
                      {formatNumber(registrationForm.insuranceInformation.additionalCost)} VNĐ
                    </div>
                  </div>
                  <div className='flex items-center border-t border-slate-200/60 dark:border-darkmode-400 pt-5 mt-5 font-medium'>
                    <Lucide icon='CreditCard' className='w-4 h-4 text-slate-500 mr-2' />
                    Tổng chi phí:
                    <div className='ml-auto text-red-600 font-semibold'>
                      {formatNumber(
                        registrationForm.insuranceInformation.additionalCost +
                          registrationForm.insuranceInformation.planCost
                      )}{' '}
                      VNĐ
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-span-12 lg:col-span-7 2xl:col-span-8'>
                <div className='box p-5 rounded-md'>
                  <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                    <div className='font-medium text-lg text-blue-700 truncate'>Thông tin sức khỏe</div>
                  </div>
                  <div className='overflow-auto lg:overflow-visible -mt-3'>
                    <table className='table table-striped'>
                      <thead>
                        <tr>
                          <th className='whitespace-nowrap !py-3'>Câu hỏi</th>
                          <th className='whitespace-nowrap text-center'>Câu trả lời</th>
                        </tr>
                      </thead>
                      <tbody>
                        {healthQuestions.map((question, index) => (
                          <tr key={index} className={`${index % 2 == 0 ? 'bg-gray-200' : ''} rounded-md`}>
                            <td className='!py-2 w-[500px]'>
                              <div className='flex items-center'>
                                <span className='ml-4'>{question.question}</span>
                              </div>
                            </td>
                            <td className='text-center w-[200px]'>
                              {registrationForm.insuredPerson.healthInformation[question.key]}
                            </td>
                          </tr>
                        ))}
                        {healthYesNoQuestions.map((question, index) => (
                          <tr key={index} className={`${(index + 2) % 2 == 0 ? 'bg-gray-200' : ''} rounded-md`}>
                            <td className='!py-2 w-[500px]'>
                              <div className='flex items-center'>
                                <span className='ml-4'>{question.question}</span>
                              </div>
                            </td>
                            <td className='text-center w-[200px]'>
                              {registrationForm.insuredPerson.healthInformation[question.key]}
                            </td>
                          </tr>
                        ))}
                        {registrationForm.insuredPerson.gender === 'female' &&
                          healthQuestionsForFemale.map((question, index) => (
                            <tr key={index} className={`${(index + 9) % 2 == 0 ? 'bg-gray-200' : ''} rounded-md`}>
                              <td className='!py-2 w-[500px]'>
                                <div className='flex items-center'>
                                  <span className='ml-4'>{question.question}</span>
                                </div>
                              </td>
                              <td className='text-center w-[200px]'>
                                {registrationForm.insuredPerson.healthInformation[question.key]}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        </DialogBody>
        <DialogFooter className='border-t gap-2'>
          {isUser ? (
            <button
              onClick={handleOpen}
              className='flex items-center mr-3 text-white bg-blue-700 p-1 rounded-md px-4 hover:bg-blue-500'
            >
              Đóng
            </button>
          ) : registrationForm.status === 'pending' ? (
            <>
              <button
                onClick={() => {
                  handleOpen()
                  refuseForm(registrationForm.id)
                }}
                className='flex items-center text-danger hover:bg-red-200 p-2 rounded-md'
              >
                <Lucide icon='X' className='w-4 h-4 mr-1' /> Từ chối
              </button>
              <button
                onClick={() => {
                  handleOpen()
                  approveForm(registrationForm.id)
                }}
                className='flex items-center mr-3 text-green-600 hover:bg-green-200 p-2 rounded-md'
              >
                <Lucide icon='Check' className='w-4 h-4 mr-1' /> Duyệt
              </button>
            </>
          ) : (
            <button
              onClick={handleOpen}
              className='flex items-center mr-3 text-white bg-blue-700 p-1 rounded-md px-4 hover:bg-blue-500'
            >
              Đóng
            </button>
          )}
        </DialogFooter>
      </Dialog>

      {/* dialog confirm */}
      <Dialog open={confirmDialog} handler={handleOpen2}>
        <DialogHeader className='bg-white dark:bg-darkmode-400 rounded-t-md h-[60px] p-0 block'>
          <div className=''>
            <div className='flex items-center h-[60px] border-b border-gray-300'>
              <div className='w-full flex justify-center'>
                <span className='text-[20px] text-[#050505] dark:text-white font-bold'>
                  {buttonClick === 'approve' ? 'Duyệt đơn' : 'Từ chối đơn'}
                </span>
              </div>
              <div className='flex justify-end absolute w-full -ml-4'>
                <IconButton
                  color='blue-gray'
                  className=' bg-[#e4e6eb] dark:bg-darkmode-400 rounded-full hover:bg-[#d8dadf] px-4'
                  variant='text'
                  onClick={handleOpen2}
                >
                  <Lucide icon='X' className='w-5 h-5' />
                </IconButton>
              </div>
            </div>
          </div>
        </DialogHeader>
        <DialogBody className='my-4 text-[17px]'>
          {buttonClick === 'approve'
            ? 'Bạn có chắc chắn muốn duyệt đơn đăng ký này'
            : 'Bạn có chắc chắn muốn từ chối đơn đăng ký này'}
        </DialogBody>
        <DialogFooter className='border-t p-2 gap-2'>
          <button
            onClick={handleOpen2}
            className='flex items-center text-white bg-blue-700 p-1 rounded-md px-4 hover:bg-blue-500'
          >
            Đóng
          </button>
          {buttonClick === 'approve' ? (
            <button
              onClick={() => {
                handleOpen2()
                approveForm(registrationForm.id)
              }}
              className='flex items-center mr-3 text-white bg-green-600 hover:bg-green-500 p-1 px-2 rounded-md'
            >
              <Lucide icon='Check' className='w-4 h-4 mr-1' /> Duyệt
            </button>
          ) : (
            <button
              onClick={() => {
                handleOpen2()
                refuseForm(registrationForm.id)
              }}
              className='flex items-center text-white bg-red-600 hover:bg-red-500 p-1 px-2 rounded-md'
            >
              <Lucide icon='X' className='w-4 h-4 mr-1' /> Từ chối
            </button>
          )}
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default RegFormTableRow
