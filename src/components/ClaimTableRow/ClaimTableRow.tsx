import _ from 'lodash'
import clsx from 'clsx'
import Lucide from 'src/components/Lucide'
import Table from 'src/components/Table'
import { useEffect, useState } from 'react'
import { Checkbox, Dialog, DialogBody, DialogFooter, DialogHeader, IconButton, Tooltip } from '@material-tailwind/react'
import { calAge, formatDate, formatDateTime, formatNumber } from 'src/utils/utils'
import { faAddressCard, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ClaimType } from 'src/types/claim.type'
import insuranceContractApi from 'src/apis/insuranceContract.api'
import { useQuery } from '@tanstack/react-query'
import { ContractType } from 'src/types/insuranceContract.type'
import bankingLogo from 'src/assets/images/icon/banking.png'
import cashLogo from 'src/assets/images/icon/cash.png'
import pdfLogo from 'src/assets/images/icon/pdf.png'
import docxLogo from 'src/assets/images/icon/docx.png'
import { StatusFilterType } from 'src/types/utils.type'

interface Props {
  userClaim: ClaimType
  approveClaim?: (id: number) => void
  refuseClaim?: (id: number) => void
  isAdmin?: boolean
  status?: StatusFilterType
  plan?: StatusFilterType
  search?: string
}

const ClaimTableRow = ({ userClaim, approveClaim, refuseClaim, isAdmin, status, plan, search }: Props) => {
  const [viewDetailModal, setViewDetailModal] = useState(false)
  const [isTrue, setIsTrue] = useState(false)

  const handleOpen = () => setViewDetailModal(!viewDetailModal)

  const getUserContract = useQuery({
    queryKey: [`get-user-contract`],
    queryFn: () => insuranceContractApi.getContractById(userClaim.insuranceContractId),
    onError: (err) => console.log(err)
  })

  const userContract = getUserContract.data?.data as ContractType

  useEffect(() => {
    if (getUserContract.isLoading) {
      return // Nếu đang tải, không thực hiện gì cả
    }

    let newFilterList = false

    if (plan.key !== 'all') {
      console.log(plan.key + '\n')
      console.log('Gói' + userContract.registrationForm.insuranceInformation.planName)
      newFilterList = userContract.registrationForm.insuranceInformation.planName === plan.key
    } else {
      newFilterList = true
    }

    if (search !== '') {
      const searchTermLowerCase = search.toLowerCase()
      newFilterList = userContract.registrationForm.insuredPerson.name.toLowerCase().includes(searchTermLowerCase)
    }

    setIsTrue(newFilterList)
  }, [status, plan, getUserContract.isLoading, userContract, search])

  // console.log(isTrue)

  if (getUserContract.isLoading || !userContract) return <div>Loading...</div>

  return (
    <>
      <Table.Tr className={`intro-x ${isTrue ? '' : 'hidden'}`}>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-10 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{userClaim.id}</div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md max-w-[290px] bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <span className='font-medium'>{userContract.registrationForm.insuredPerson.name}</span>
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
          <div className='flex'>{formatDate(userClaim.requestDate.toString())}</div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-[150px] bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex text-red-600 font-semibold'>{formatNumber(userClaim.amount)} VNĐ</div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-40 bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div
            className={clsx([
              'flex items-center justify-center',
              { 'text-yellow-600': userClaim.status === 'pending' },
              { 'text-danger': userClaim.status === 'refused' },
              { 'text-success': userClaim.status === 'approved' }
            ])}
          >
            <Lucide
              icon={userClaim.status === 'approved' ? 'Check' : userClaim.status === 'pending' ? 'Clock' : 'X'}
              className='w-4 h-4 mr-2'
            />
            {userClaim.status === 'approved'
              ? 'Đã thanh toán'
              : userClaim.status === 'pending'
                ? 'Chờ thanh toán'
                : 'Đã từ chối'}
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
        className='w-[1000px] dark:bg-darkmode-400'
        open={viewDetailModal}
        handler={handleOpen}
      >
        <DialogHeader className='bg-white dark:bg-darkmode-400 rounded-t-md h-[60px] p-0 block'>
          <div className=''>
            <div className='flex items-center h-[60px] border-b border-gray-300'>
              <div className='w-full flex justify-center'>
                <span className='text-[20px] text-[#050505] dark:text-white font-bold'>
                  Chi tiết yêu cầu bồi thường
                </span>
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
                      <span className='font-semibold mr-1'>Ngày tai nạn: </span>
                      {userClaim.accidentDate === null ? '' : formatDate(userClaim.accidentDate.toString())}
                    </div>
                    <div className='flex items-center mt-3 flex-1'>
                      <span className='font-semibold mr-1'>Nơi xảy ra tai nạn: </span>
                      {userClaim.accidentPlace === null ? '' : userClaim.accidentPlace}
                    </div>
                  </div>
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center mt-3 flex-1'>
                      <span className='font-semibold mr-1'>Ngày khám bệnh: </span>
                      {userClaim.examinationDate === null ? '' : formatDate(userClaim.examinationDate.toString())}
                    </div>
                    <div className='flex items-center mt-3 flex-1'>
                      <span className='font-semibold mr-1'>Ngày nhập viện: </span>
                      {userClaim.hospitalizedDate === null ? '' : formatDate(userClaim.hospitalizedDate.toString())}
                    </div>
                  </div>
                  {/*  */}
                  <div className='flex items-center mt-3 flex-1'>
                    <span className='font-semibold mr-1'>Nơi điều trị: </span>
                    {userClaim.treatmentPlace === null ? '' : userClaim.treatmentPlace}
                  </div>
                  {/*  */}
                  <div className='flex items-center mt-3 flex-1'>
                    <span className='font-semibold mr-1'>Nguyên nhân / Chẩn đoán về tai nạn/bệnh: </span>
                    {userClaim.reason === null ? '' : userClaim.reason}
                  </div>
                  {/*  */}
                  <div className='flex items-center mt-3 flex-1'>
                    <span className='font-semibold mr-1'>Hậu quả: </span>
                    {userClaim.consequence === null ? '' : userClaim.consequence}
                  </div>
                  {/*  */}
                  <div className='flex items-center mt-3'>
                    <span className='font-semibold mr-2'>Hình thức điều trị: </span>
                    <div className='flex gap-4 items-center'>
                      <div>
                        <input
                          type='radio'
                          name='typeTreatment'
                          id='boarding'
                          value='Nội trú'
                          checked={userClaim.typeTreatment === 'boarding'}
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
                          checked={userClaim.typeTreatment === 'outpatient'}
                          className='cursor-pointer w-5 h-5 mr-1 -mt-[3px]'
                        />
                        <label htmlFor='outpatient' className='cursor-pointer select-none'>
                          Ngoại trú
                        </label>
                      </div>
                    </div>
                  </div>
                  {/*  */}
                  <div className='flex justify-between items-center'>
                    <div className='flex items-center mt-3 flex-1'>
                      <span className='font-semibold mr-1'>Từ ngày: </span>
                      {userClaim.startDate === null ? '' : formatDateTime(userClaim.startDate.toString())}
                    </div>
                    <div className='flex items-center mt-3 flex-1'>
                      <span className='font-semibold mr-1'>Đến ngày: </span>
                      {userClaim.endDate === null ? '' : formatDateTime(userClaim.endDate.toString())}
                    </div>
                  </div>
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
                    {/* họ tên và sđt */}
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center '>
                        <Lucide icon='Clipboard' className='w-4 h-4 text-slate-500 mr-2' />
                        <span className='font-semibold'>Mã:</span>
                        <span className='underline decoration-dotted ml-1'>
                          CR-{formatDate(userClaim.requestDate.toString()).slice(0, 2)}
                          {userContract.registrationForm.id}
                        </span>
                      </div>
                      <div className='flex items-center mt-3'>
                        <Lucide icon='Clock' className='w-4 h-4 text-slate-500 mr-2' />
                        <span className='font-semibold'>Trạng thái:</span>
                        <span
                          className={clsx([
                            'flex items-center justify-center rounded px-2 ml-1',
                            { 'bg-danger text-white': userClaim.status === 'refused' },
                            { 'bg-success text-white': userClaim.status === 'approved' },
                            {
                              'bg-yellow-600 text-white': userClaim.status === 'pending'
                            }
                          ])}
                        >
                          {userClaim.status === 'approved'
                            ? 'Đã thanh toán'
                            : userClaim.status === 'pending'
                              ? 'Chờ thanh toán'
                              : 'Đã từ chối'}
                        </span>
                      </div>
                    </div>
                    {/*  */}
                    <div className='flex items-center mt-3'>
                      <Lucide icon='Calendar' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>Ngày yêu cầu: </span>
                      {formatDateTime(userClaim.requestDate.toString())}
                    </div>

                    {/*  */}
                    <div className='flex items-center mt-3'>
                      <Lucide icon='CreditCard' className='w-4 h-4 text-slate-500 mr-2' />
                      <span className='font-semibold mr-1'>
                        Số tiền yêu cầu:{' '}
                        <span className='text-red-600 font-semibold'>{formatNumber(userClaim.amount)} VNĐ</span>{' '}
                      </span>
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
                          checked={userClaim.death}
                        ></Checkbox>
                        <Checkbox
                          className='flex-1'
                          labelProps={{ className: 'font-normal text-black' }}
                          crossOrigin={undefined}
                          color='blue'
                          label='Thương tật'
                          checked={userClaim.injured}
                        ></Checkbox>
                        <Checkbox
                          className='flex-1'
                          labelProps={{ className: 'font-normal text-black' }}
                          crossOrigin={undefined}
                          color='blue'
                          label='Chi phí y tế'
                          checked={userClaim.medicalExpense}
                        ></Checkbox>
                      </div>
                      <div className='flex gap-2 w-full'>
                        <Checkbox
                          className='flex-1'
                          labelProps={{ className: 'font-normal text-black' }}
                          crossOrigin={undefined}
                          color='blue'
                          label='Trợ cấp'
                          checked={userClaim.benefit}
                        ></Checkbox>
                        <Checkbox
                          className='flex-1'
                          labelProps={{ className: 'font-normal text-black' }}
                          crossOrigin={undefined}
                          color='blue'
                          label='Vận chuyển cấp cứu'
                          checked={userClaim.transport}
                        ></Checkbox>
                      </div>
                    </div>
                    {/*  */}
                    <div className='flex flex-col mt-1'>
                      <div className='font-semibold mr-1'>Hình thức thanh toán: </div>
                      <div className='flex gap-4 p-4'>
                        <button
                          disabled={true}
                          className={`${
                            userClaim.paymentMethod === 'banking' ? 'border-blue-600' : 'border-gray-300'
                          } rounded-md w-full h-20 border-2  cursor-pointer flex flex-col items-center justify-center`}
                        >
                          <img src={bankingLogo} className='h-8' />
                          <div className='font-bold mt-1'>Chuyển khoản</div>
                        </button>
                        <button
                          disabled={true}
                          className={`${
                            userClaim.paymentMethod === 'cash' ? 'border-blue-600' : 'border-gray-300'
                          } rounded-md w-full h-20 border-2  cursor-pointer flex flex-col items-center justify-center`}
                        >
                          <img src={cashLogo} className='h-8' />
                          <div className='font-bold mt-1'>Tiền mặt</div>
                        </button>
                      </div>
                    </div>
                    {/* */}
                    {userClaim.paymentMethod === 'banking' && (
                      <div className='flex justify-between items-center mt-1'>
                        <div className='flex-1'>
                          <div className='font-semibold mr-1'>
                            Số tài khoản: <span className='font-normal'>{userClaim.stk}</span>
                          </div>
                        </div>
                        <div className='flex-1'>
                          <div className='font-semibold mr-1'>
                            Ngân hàng: <span className='font-normal'>{userClaim.bank}</span>
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

                    {/*  */}
                    {userClaim.documents.length > 0 && (
                      <div className=' group/all'>
                        <div className='grid grid-cols-12 mt-3 border-2 rounded-md pt-3 bg-[#f7f8fa]'>
                          {userClaim.documents.map((file, index) => (
                            <a href={file.url} key={index} target='_blank' className='col-span-3'>
                              <Tooltip key={index} content={file.name} placement='bottom' className='z-[99999]'>
                                <div className='flex flex-col items-center  mb-3 group text-center'>
                                  <img
                                    src={file.fileType === 'application/pdf' ? pdfLogo : docxLogo}
                                    className='w-12 mb-1'
                                  />

                                  <div>
                                    <p className='truncate max-w-[100px]'>{file.name}</p>
                                  </div>
                                </div>
                              </Tooltip>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Chương trình bảo hiểm */}
                </div>
              </div>
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
                    <span className='font-semibold mr-1 w-[70px]'>Địa chỉ:</span>{' '}
                    {userContract.registrationForm.insuredPerson.address}
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
                      <div className=''>{userContract.registrationForm.insuranceInformation.planName}</div>
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
                  </div>
                </div>
              </div>

              {/*  */}

              {/* BEGIN */}
            </div>
          </>
        </DialogBody>
        <DialogFooter className='border-t gap-2'>
          {userClaim.status === 'pending' && (
            <div className={`${isAdmin ? '' : 'hidden'} flex items-center gap-2`}>
              <button
                onClick={() => {
                  handleOpen()
                  approveClaim(userClaim.id)
                }}
                className='flex h-[34px] items-center  text-white bg-green-600 hover:bg-green-500 text-bold px-2 rounded-md'
              >
                <Lucide icon='Check' className='w-4 h-4 mr-1' /> Duyệt
              </button>
              <button
                onClick={() => {
                  handleOpen()
                  refuseClaim(userClaim.id)
                }}
                className='flex h-[34px] items-center text-white bg-red-600 hover:bg-red-500 text-bold px-2 rounded-md'
              >
                <Lucide icon='X' className='w-4 h-4 mr-1' /> Từ chối
              </button>
            </div>
          )}
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

export default ClaimTableRow
