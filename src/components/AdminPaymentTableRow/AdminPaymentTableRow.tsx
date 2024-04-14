import _ from 'lodash'
import clsx from 'clsx'
import Lucide from 'src/components/Lucide'
import Table from 'src/components/Table'
import { useState } from 'react'
import { Dialog, DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react'
import { calAge, formatDate, formatDateTime, formatNumber } from 'src/utils/utils'
import { faAddressCard, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { PaymentType } from 'src/types/payment.type'

import masterCardLogo from 'src/assets/images/icon/master-card.png'
import visaLogo from 'src/assets/images/icon/visa_card.png'
import paypalLogo from 'src/assets/images/icon/paypal.png'
import momoLogo from 'src/assets/images/icon/momo.png'
import vnpayLogo from 'src/assets/images/icon/vnpay.png'
import bankingLogo from 'src/assets/images/icon/banking.png'
import cashLogo from 'src/assets/images/icon/cash.png'

interface Props {
  userPayment: PaymentType
  payBill: (request: { body: { method: string }; id: number }) => void
}

const PaymentTableRow = ({ userPayment, payBill }: Props) => {
  const [viewDetailModal, setViewDetailModal] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState(
    userPayment.status === 'paid' ? userPayment.paymentMethod : userPayment.status === 'dued' ? '' : 'master card'
  )
  const handleOpen = () => setViewDetailModal(!viewDetailModal)
  const changePymentMethod = (method) => {
    setPaymentMethod(method)
  }

  return (
    <>
      <Table.Tr className='intro-x'>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{userPayment.id}</div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md max-w-[290px] bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <a href='' className='font-medium'>
            {userPayment.registrationForm.insuredPerson.name}
          </a>
          <div className='text-slate-500 text-xs mt-0.5'>
            {calAge(userPayment.registrationForm.insuredPerson.birthday.toString())} tuổi
          </div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{userPayment.registrationForm.insuredPerson.email}</div>
        </Table.Td>

        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{userPayment.registrationForm.insuranceInformation.planName}</div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex text-red-600 font-semibold'>{formatNumber(userPayment.amount)} VNĐ</div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{formatDate(userPayment.deadline.toString())}</div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div
            className={clsx([
              'flex items-center justify-center',
              { 'text-yellow-600': userPayment.status === 'unpaid' },
              { 'text-danger': userPayment.status === 'dued' },
              { 'text-success': userPayment.status === 'paid' }
            ])}
          >
            <Lucide
              icon={userPayment.status === 'unpaid' ? 'Clock' : userPayment.status === 'paid' ? 'Check' : 'X'}
              className='w-4 h-4 mr-2'
            />
            {userPayment.status === 'unpaid'
              ? 'Chưa thanh toán'
              : userPayment.status === 'paid'
                ? 'Đã thanh toán'
                : 'Quá hạn'}
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
        className='w-[1100px] dark:bg-darkmode-400'
        open={viewDetailModal}
        handler={handleOpen}
      >
        <DialogHeader className='bg-white dark:bg-darkmode-400 rounded-t-md h-[60px] p-0 block'>
          <div className=''>
            <div className='flex items-center h-[60px] border-b border-gray-300'>
              <div className='w-full flex justify-center'>
                <span className='text-[20px] text-[#050505] dark:text-white font-bold'>Chi tiết hóa đơn</span>
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
          <>
            {/* BEGIN: Transaction Details */}
            <div className='intro-y grid grid-cols-12 gap-3'>
              <div className='col-span-12 lg:col-span-4 2xl:col-span-7'>
                <div className='box p-5 rounded-md'>
                  <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                    <div className='font-medium text-lg text-blue-700 truncate'>Người được bảo hiểm</div>
                  </div>
                  {/* họ tên và sđt */}
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center'>
                      <Lucide icon='Clipboard' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>Tên:</span> {userPayment.registrationForm.insuredPerson.name}
                    </div>
                    <div className='flex items-center'>
                      <Lucide icon='Phone' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>SĐT:</span>{' '}
                      {userPayment.registrationForm.insuredPerson.phone}
                    </div>
                  </div>

                  {/* email và gender */}
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center mt-3'>
                      <Lucide icon='Mail' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>Email:</span>
                      {userPayment.registrationForm.insuredPerson.email}
                    </div>
                    <div className='flex items-center mt-3'>
                      <FontAwesomeIcon icon={faVenusMars} className='w-4 h-4 mt-1 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>Giới tính:</span>{' '}
                      {userPayment.registrationForm.insuredPerson.gender === 'male' ? 'Nam' : 'Nữ'}
                    </div>
                  </div>

                  {/* cmnd và ngày sinh */}
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center mt-3'>
                      <FontAwesomeIcon icon={faAddressCard} className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>CMND:</span>{' '}
                      {userPayment.registrationForm.insuredPerson.cmnd}
                    </div>
                    <div className='flex items-center mt-3'>
                      <Lucide icon='Cake' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>Ngày sinh:</span>{' '}
                      {formatDate(userPayment.registrationForm.insuredPerson.birthday.toString())}
                    </div>
                  </div>

                  {/* địa chỉ */}
                  <div className='flex items-center mt-3'>
                    <Lucide icon='MapPin' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Địa chỉ:</span>{' '}
                    {userPayment.registrationForm.insuredPerson.address}
                  </div>
                </div>

                {userPayment.status !== 'paid' && (
                  <div className='box p-5 pb-2 rounded-md rounded-b-none mt-3'>
                    <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                      <div className='font-medium text-lg text-blue-700 truncate'>Thông tin hóa đơn</div>
                    </div>
                    <div className='flex items-center '>
                      <Lucide icon='Clipboard' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold'>Mã:</span>
                      <span className='underline decoration-dotted ml-1'>
                        PM-{formatDate(userPayment.createdAt.toString()).slice(0, 2)}
                        {userPayment.registrationForm.id}
                      </span>
                    </div>
                    <div className='flex items-center mt-3'>
                      <Lucide icon='Calendar' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>Hạn cuối: </span>
                      {formatDateTime(userPayment.deadline.toString())}
                    </div>
                    {userPayment.status === 'paid' && (
                      <div className='flex items-center mt-3'>
                        <Lucide icon='Calendar' className='w-4 h-4 text-slate-500 mr-2' />
                        <span className='font-semibold mr-1'>Ngày thanh toán: </span>
                        {formatDateTime(userPayment.paymentDate.toString())}
                      </div>
                    )}
                    <div className='flex items-center mt-3'>
                      <Lucide icon='Clock' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold'>Trạng thái:</span>
                      <span
                        className={clsx([
                          'flex items-center justify-center rounded px-2 ml-1',
                          { 'text-white bg-yellow-600': userPayment.status === 'unpaid' },
                          { 'bg-danger text-white': userPayment.status === 'dued' },
                          { 'bg-success text-white': userPayment.status === 'paid' }
                        ])}
                      >
                        {userPayment.status === 'unpaid'
                          ? 'Chưa thanh toán'
                          : userPayment.status === 'paid'
                            ? 'Đã thanh toán'
                            : 'Đã quá hạn'}
                      </span>
                    </div>
                  </div>
                )}

                {/* payment method */}
                {userPayment.status === 'paid' && (
                  <div className='box p-5 rounded-md mt-3'>
                    <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                      <div className='font-medium text-lg text-blue-700 truncate'>Hình thức thanh toán</div>
                    </div>

                    <div className='flex gap-2'>
                      {/*  */}
                      <button
                        disabled={true}
                        onClick={() => changePymentMethod('master card')}
                        className={`${
                          paymentMethod === 'master card' ? 'border-blue-600' : 'border-gray-300'
                        } rounded-md w-full h-20 border-2  cursor-pointer flex flex-col items-center justify-center`}
                      >
                        <img src={masterCardLogo} className='h-20 w-20 -mt-5' />
                        <div className='font-bold -mt-5'>Master Card</div>
                      </button>
                      {/*  */}
                      <button
                        disabled={true}
                        onClick={() => changePymentMethod('visa card')}
                        className={`${
                          paymentMethod === 'visa card' ? 'border-blue-600' : 'border-gray-300'
                        } rounded-md w-full h-20 border-2 cursor-pointer flex flex-col items-center justify-center`}
                      >
                        <img src={visaLogo} className='h-12 w-12' />
                        <div className='font-bold -mt-1'>Visa Card</div>
                      </button>
                      {/*  */}
                      <button
                        disabled={true}
                        onClick={() => changePymentMethod('paypal')}
                        className={`${
                          paymentMethod === 'paypal' ? 'border-blue-600 ' : 'border-gray-300 '
                        } rounded-md w-full h-20 border-2 cursor-pointer flex flex-col items-center justify-center`}
                      >
                        <img src={paypalLogo} className='h-12 ' />
                        <div className='font-bold -mt-2'>Paypal</div>
                      </button>
                    </div>

                    <div className='flex gap-2 mt-2'>
                      {/*  */}
                      <button
                        disabled={true}
                        onClick={() => changePymentMethod('momo')}
                        className={`${
                          paymentMethod === 'momo' ? 'border-blue-600 ' : 'border-gray-300'
                        } rounded-md w-full h-20 border-2  cursor-pointer flex flex-col items-center justify-center`}
                      >
                        <img src={momoLogo} className='h-9' />
                        <div className='font-bold'>Ví Momo</div>
                      </button>
                      <button
                        disabled={true}
                        onClick={() => changePymentMethod('vnpay')}
                        className={`${
                          paymentMethod === 'vnpay' ? 'border-blue-600' : 'border-gray-300'
                        } rounded-md w-full h-20 border-2  cursor-pointer flex flex-col items-center justify-center`}
                      >
                        <img src={vnpayLogo} className='h-9' />
                        <div className='font-bold '>Ví Vnpay</div>
                      </button>
                      <button
                        disabled={true}
                        onClick={() => changePymentMethod('banking')}
                        className={`${
                          paymentMethod === 'banking' ? 'border-blue-600' : 'border-gray-300'
                        } rounded-md w-full h-20 border-2  cursor-pointer flex flex-col items-center justify-center`}
                      >
                        <img src={bankingLogo} className='h-8' />
                        <div className='font-bold mt-1'>Chuyển khoản</div>
                      </button>
                    </div>
                    <div className='flex gap-2 mt-2'>
                      <button
                        disabled={true}
                        className={`${
                          paymentMethod === 'cash' ? 'border-blue-600' : 'border-gray-300 opacity-50'
                        } rounded-md w-full h-20 border-2  cursor-pointer flex flex-col items-center justify-center`}
                      >
                        <img src={cashLogo} className='h-8' />
                        <div className='font-bold mt-1'>Tiền mặt</div>
                      </button>
                      <div className='w-full'></div>
                      <div className='w-full'></div>
                    </div>
                  </div>
                )}
              </div>

              {/* thông tin hóa đơn */}
              <div className='col-span-12 lg:col-span-7 2xl:col-span-5'>
                {userPayment.status === 'paid' && (
                  <div className='box p-5 pb-2 rounded-md rounded-b-none'>
                    <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                      <div className='font-medium text-lg text-blue-700 truncate'>Thông tin hóa đơn</div>
                    </div>
                    <div className='flex items-center '>
                      <Lucide icon='Clipboard' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold'>Mã:</span>
                      <span className='underline decoration-dotted ml-1'>
                        PM-{formatDate(userPayment.createdAt.toString()).slice(0, 2)}
                        {userPayment.registrationForm.id}
                      </span>
                    </div>
                    <div className='flex items-center mt-3'>
                      <Lucide icon='Calendar' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>Hạn cuối: </span>
                      {formatDateTime(userPayment.deadline.toString())}
                    </div>
                    {userPayment.status === 'paid' && (
                      <div className='flex items-center mt-3'>
                        <Lucide icon='Calendar' className='w-4 h-4 text-slate-500 mr-2' />
                        <span className='font-semibold mr-1'>Ngày thanh toán: </span>
                        {formatDateTime(userPayment.paymentDate.toString())}
                      </div>
                    )}
                    <div className='flex items-center mt-3'>
                      <Lucide icon='Clock' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold'>Trạng thái:</span>
                      <span
                        className={clsx(['flex items-center justify-center rounded px-2 ml-1 bg-success text-white'])}
                      >
                        Đã thanh toán
                      </span>
                    </div>
                  </div>
                )}

                <div className='box p-5 pt-0 border-t  rounded-md rounded-t-none'>
                  <hr className='px-4 mb-4' />
                  {userPayment.status !== 'paid' && (
                    <div>
                      <div className='flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5 mb-5'>
                        <div className='font-medium text-lg text-blue-700 truncate'>Thông tin hóa đơn</div>
                      </div>
                    </div>
                  )}
                  <div className='flex items-center'>
                    <Lucide icon='Shield' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Gói:</span>
                    <div className='ml-auto'>{userPayment.registrationForm.insuranceInformation.planName}</div>
                  </div>
                  <div className='flex items-center mt-3'>
                    <Lucide icon='CreditCard' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'>Phí bảo hiểm:</span>
                    <div className='ml-auto '>
                      {formatNumber(userPayment.registrationForm.insuranceInformation.planCost)} VNĐ
                    </div>
                  </div>
                  <div className='mt-3'>
                    <div className='flex items-center'>
                      <Lucide icon='PlusCircle' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'> Quyền lợi bổ sung:</span>
                    </div>
                    {userPayment.registrationForm.insuranceInformation.outpatientTreatment !== 0 && (
                      <div className='ml-5'> + Bảo hiểm điều trị ngoại trú</div>
                    )}
                    {userPayment.registrationForm.insuranceInformation.maternity !== 0 && (
                      <div className='ml-5'> + Bảo hiểm thai sản</div>
                    )}
                    {userPayment.registrationForm.insuranceInformation.dentalCare !== 0 && (
                      <div className='ml-5'> + Bảo hiểm chăm sóc răng</div>
                    )}
                    {userPayment.registrationForm.insuranceInformation.death !== 0 && (
                      <div className='ml-5'> + Bảo hiểm tử vong</div>
                    )}
                  </div>
                  <div className='flex items-center mt-3'>
                    <Lucide icon='CreditCard' className='w-4 h-4 text-slate-500 mr-2' />
                    <span className='font-semibold mr-1'> Phí bổ sung:</span>
                    <div className='ml-auto'>
                      {formatNumber(userPayment.registrationForm.insuranceInformation.additionalCost)} VNĐ
                    </div>
                  </div>
                  <div className='flex items-center border-t border-slate-200/60 dark:border-darkmode-400 pt-5 mt-5 font-medium'>
                    <Lucide icon='CreditCard' className='w-4 h-4 text-slate-500 mr-2' />
                    Tổng chi phí:
                    <div className='ml-auto text-red-600 font-bold text-[18px]'>
                      {formatNumber(
                        userPayment.registrationForm.insuranceInformation.additionalCost +
                          userPayment.registrationForm.insuranceInformation.planCost
                      )}{' '}
                      VNĐ
                    </div>
                  </div>
                </div>
                {userPayment.status === 'unpaid' && (
                  <button
                    onClick={() => {
                      handleOpen()
                      setPaymentMethod('cash')
                      payBill({ body: { method: 'cash' }, id: userPayment.id })
                    }}
                    className='bg-blue-700 text-white w-full font-semibold py-2 hover:bg-blue-500'
                  >
                    Thanh toán
                  </button>
                )}
              </div>
            </div>
          </>
        </DialogBody>
        <DialogFooter className='border-t gap-2'>
          <button
            onClick={handleOpen}
            className='flex items-center mr-3 text-white bg-blue-700 p-1 rounded-md px-4 hover:bg-blue-500'
          >
            Đóng
          </button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default PaymentTableRow
