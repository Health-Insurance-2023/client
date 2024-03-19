import _ from 'lodash'
import Lucide from 'src/components/Lucide'
import Table from 'src/components/Table'
import { useState } from 'react'
import { Dialog, DialogBody, DialogFooter, DialogHeader, IconButton } from '@material-tailwind/react'
import { calAge, formatDate, formatNumber, isAxiosBadRequestError } from 'src/utils/utils'
import { faAddressCard, faQuestion, faVenusMars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { ContractType } from 'src/types/insuranceContract.type'
import {
  healthQuestions,
  healthYesNoQuestions,
  healthQuestionsForFemale
} from '../HealthInformationForm/HealthInformationForm'
import { useMutation } from '@tanstack/react-query'
import { ErrorResponse } from 'react-router-dom'
import { toast } from 'react-toastify'
import healthApi from 'src/apis/health.api'
import { newHealthInformationType } from 'src/types/registrationForm.type'

interface Props {
  userContract: ContractType
  refetch: () => void
}

const ContractTableRow = ({ userContract, refetch }: Props) => {
  const [viewDetailModal, setViewDetailModal] = useState(false)
  const registrationForm = userContract.registrationForm
  const healthInfo = userContract.registrationForm.insuredPerson.healthInformation
  const [healthAnswers, setHealthAnswers] = useState<Record<string, string>>({
    radiationTreatment: healthInfo.radiationTreatment,
    neurologicalTreatment: healthInfo.neurologicalTreatment,
    cardiovascularTreatment: healthInfo.cardiovascularTreatment,
    metabolicTreatment: healthInfo.metabolicTreatment,
    infectiousDiseaseTreatment: healthInfo.infectiousDiseaseTreatment,
    disability: healthInfo.disability,
    strokeOrAsthma: healthInfo.strokeOrAsthma,
    injured: healthInfo.injured,
    medicalTreatment: healthInfo.medicalTreatment,
    pregnant: healthInfo.pregnant,
    ComplicationHistory: healthInfo.complicationHistory
  })

  const updateHealthInforMutation = useMutation({
    mutationFn: (body: newHealthInformationType) =>
      healthApi.updateHealthInfor(body, userContract.registrationForm.insuredPerson.healthInformation.id),
    onSuccess: () => {
      toast.success('Đã cập nhật thông tin sức khỏe', { autoClose: 2000 })
      refetch()
      handleOpen()
    },
    onError: (error) => {
      if (isAxiosBadRequestError<ErrorResponse>(error)) {
        const formError = error.response?.data
        if (formError) {
          toast.error('không thể thực hiện', { autoClose: 2000 })
        }
      }
    }
  })

  const updateHealthInfor = () => {
    updateHealthInforMutation.mutate(healthAnswers as newHealthInformationType)
  }

  const handleOpen = () => setViewDetailModal(!viewDetailModal)

  const handleAnswerChange = (key: string, value: string) => {
    // Cập nhật giá trị câu trả lời
    setHealthAnswers((prevAnswers) => ({ ...prevAnswers, [key]: value }))
  }

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
          <div className='flex'>
            IC-{formatDate(userContract.createdAt.toString()).slice(0, 2)}
            {userContract.id}
          </div>
        </Table.Td>
        <Table.Td className='first:rounded-l-md last:rounded-r-md w-[120px] bg-white border-b-0 dark:bg-darkmode-600 shadow-[20px_3px_20px_#0000000b]'>
          <div className='flex'>{userContract.registrationForm.insuredPerson.relationshipWithBuyers}</div>
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
          <>
            {/* BEGIN: Transaction Details */}
            <div className='intro-y grid grid-cols-12 gap-3'>
              <div className='col-span-12 lg:col-span-4 2xl:col-span-4'>
                <div className='box p-5 rounded-md'>
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
                  <div className='flex flex-col ml-4'>
                    <div className='flex gap-2 items-center'>
                      <p className='font-bold text-xl text-black'>Tình trạng sức khỏe cá nhân</p>
                      <button className='w-5 h-5 rounded-full bg-[#5F33E6] text-white flex justify-center items-center'>
                        <FontAwesomeIcon className='h-3 w-3' icon={faQuestion} />
                      </button>
                    </div>
                    <p>
                      Nếu câu hỏi cần có câu trả lời chi tiết vui lòng trả lời đầy đủ nếu Ông/bà đã từng bị để chúng tôi
                      dễ dàng xét duyệt hồ sơ của bạn. Nếu không thì ghi không <br />
                      Để đảm bảo quyền lợi cho Người được bảo hiểm, bạn vui lòng đọc kĩ và tích(✔) Có hoặc Không nếu
                      Người được bảo hiểm đã, đang mắc phải một trong các bệnh hoặc tình trạng dưới đây:
                    </p>
                    {/* câu hỏi trả lời */}
                    <div className='w-full'>
                      {healthQuestions.map((question, index) => (
                        <div key={index} className='mt-4 text-[18px]'>
                          <div className='flex'>
                            <span className='font-bold w-[60px]'>{`Câu ${index + 1}: `}</span>
                            <div>{question.question}</div>
                          </div>
                          <textarea
                            value={healthAnswers[question.key]}
                            onChange={(e) => handleAnswerChange(question.key, e.target.value)}
                            placeholder='Câu trả lời'
                            className='mt-2 ml-12 w-2/3 resize-none rounded-md bg-white text-gray-900 shadow-lg border-gray-300 shadow-gray-900/5 text-[17px] focus:border-2'
                          />
                        </div>
                      ))}
                    </div>
                    {/* Câu hỏi có không */}
                    {healthYesNoQuestions.map((question, index) => (
                      <div key={index}>
                        <div className='mt-4 text-[18px]'>
                          <span className='font-bold'>{`Câu ${index + 3}: `}</span>
                          <span>{question.question}</span>
                        </div>
                        <div className='flex gap-8 mt-2 ml-14'>
                          {/* có */}
                          <label className='flex items-center gap-3 cursor-pointer'>
                            <input
                              checked={healthAnswers[question.key] === 'Có'}
                              type='radio'
                              name={`questions-${question.key}`}
                              className='invisible peer/privacy'
                              onChange={() => handleAnswerChange(question.key, 'Có')}
                            />
                            <span
                              className={`absolute h-5 w-5 rounded-full border-2 border-gray-500 cursor-pointer
             peer-checked/privacy:bg-white peer-checked/privacy:border-[#5F33E6] after:content-[''] after:hidden after:absolute peer-checked/privacy:after:inline
             after:w-[6px] after:h-[13px] after:border-r-[3px] after:border-b-[3px] after:left-[6px] after:top-[0px] after:border-solid after:border-[#5F33E6] after:rotate-45
             `}
                            ></span>
                            <p className='font-bold '>Có</p>
                          </label>
                          {/* không */}
                          <label className='flex items-center gap-3 cursor-pointer'>
                            <input
                              checked={healthAnswers[question.key] === 'Không'}
                              type='radio'
                              name={`questions-${question.key}`}
                              className='invisible peer/privacy'
                              onChange={() => handleAnswerChange(question.key, 'Không')}
                            />
                            <span
                              className={`absolute h-5 w-5 rounded-full border-2 border-gray-500 cursor-pointer
             peer-checked/privacy:bg-white peer-checked/privacy:border-[#5F33E6] after:content-[''] after:hidden after:absolute peer-checked/privacy:after:inline
             after:w-[6px] after:h-[13px] after:border-r-[3px] after:border-b-[3px] after:left-[6px] after:top-[0px] after:border-solid after:border-[#5F33E6] after:rotate-45
             `}
                            ></span>
                            <p className='font-bold '>Không</p>
                          </label>
                        </div>
                      </div>
                    ))}
                    {/* Câu hỏi chỉ dành cho nữ */}
                    {userContract.registrationForm.insuredPerson.gender == 'female' &&
                      healthQuestionsForFemale.map((question, index) => (
                        <div key={index}>
                          <div className='mt-4 text-[18px]'>
                            <span className='font-bold'>{`Câu ${index + 9}: `}</span>
                            <span>{question.question}</span>
                          </div>
                          <div className='flex gap-8 mt-2 ml-14'>
                            {/* có */}
                            <label className='flex items-center gap-3 cursor-pointer'>
                              <input
                                checked={healthAnswers[question.key] === 'Có'}
                                type='radio'
                                name={`questions-${question.key}`}
                                className='invisible peer/privacy'
                                onChange={() => handleAnswerChange(question.key, 'Có')}
                              />
                              <span
                                className={`absolute h-5 w-5 rounded-full border-2 border-gray-500 cursor-pointer
           peer-checked/privacy:bg-white peer-checked/privacy:border-[#5F33E6] after:content-[''] after:hidden after:absolute peer-checked/privacy:after:inline
           after:w-[6px] after:h-[13px] after:border-r-[3px] after:border-b-[3px] after:left-[6px] after:top-[0px] after:border-solid after:border-[#5F33E6] after:rotate-45
           `}
                              ></span>
                              <p className='font-bold '>Có</p>
                            </label>
                            {/* không */}
                            <label className='flex items-center gap-3 cursor-pointer'>
                              <input
                                checked={healthAnswers[question.key] === 'Không'}
                                type='radio'
                                name={`questions-${question.key}`}
                                className='invisible peer/privacy'
                                onChange={() => handleAnswerChange(question.key, 'Không')}
                              />
                              <span
                                className={`absolute h-5 w-5 rounded-full border-2 border-gray-500 cursor-pointer
           peer-checked/privacy:bg-white peer-checked/privacy:border-[#5F33E6] after:content-[''] after:hidden after:absolute peer-checked/privacy:after:inline
           after:w-[6px] after:h-[13px] after:border-r-[3px] after:border-b-[3px] after:left-[6px] after:top-[0px] after:border-solid after:border-[#5F33E6] after:rotate-45
           `}
                              ></span>
                              <p className='font-bold '>Không</p>
                            </label>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        </DialogBody>
        <DialogFooter className={`border-t gap-2 `}>
          <div className='flex'>
            <button
              onClick={updateHealthInfor}
              className='flex items-center mr-3 text-white bg-blue-700 p-1 rounded-md px-4 hover:bg-blue-500'
            >
              Cập nhật
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
