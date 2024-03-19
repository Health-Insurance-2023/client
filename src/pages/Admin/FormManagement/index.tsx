import _ from 'lodash'
import { useEffect, useState } from 'react'
import Button from 'src/components/AdminCustomButton'
import { FormInput, FormSelect } from 'src/components/Form'
import Lucide from 'src/components/Lucide'
// import Tippy from 'src/components/Tippy'
import Table from 'src/components/Table'
import RegFormTableRow from 'src/components/RegFormTableRow'
import { useMutation, useQuery } from '@tanstack/react-query'
import registrationFormApi from 'src/apis/registrationForm.api'
import { RegistrationFormType } from 'src/types/registrationForm.type'
import { toast } from 'react-toastify'
import { formatDateStringForDatabase, isAxiosBadRequestError } from 'src/utils/utils'
import { ErrorResponse, StatusFilterType } from 'src/types/utils.type'
import { dataPlan } from '../ContractManegement'
import Litepicker from 'src/components/Litepicker'
import { Menu } from 'src/components/Headless'

const data: StatusFilterType[] = [
  {
    key: 'all',
    content: 'Tất cả'
  },
  {
    key: 'approved',
    content: 'Đã duyệt'
  },
  {
    key: 'pending',
    content: 'Chờ duyệt'
  },
  {
    key: 'refused',
    content: 'Từ chối'
  }
]

function Main() {
  /////
  const [status, setStatus] = useState<StatusFilterType>(data[0])
  const [plan, setPlan] = useState<StatusFilterType>(dataPlan[0])
  const [search, setSearch] = useState('')
  const [daterange, setDaterange] = useState('')

  const [filterList, setFilterList] = useState<RegistrationFormType[]>([])

  const handleStatusChange = (status: StatusFilterType) => {
    setStatus(status)
  }

  const handlePlanChange = (plan: StatusFilterType) => {
    setPlan(plan)
  }

  const dateRangeArray = daterange.split(' - ')
  /////

  const [pageNumber, setPageNumber] = useState(0)
  const [size, setSize] = useState('10')

  const getAllRegistrationForm = useQuery({
    queryKey: [`get-all-form`, pageNumber, size],
    queryFn: () => registrationFormApi.getAll(pageNumber, parseInt(size)),
    onError: (err) => console.log(err)
  })

  const approveFormMutation = useMutation({
    mutationFn: (id: number) => registrationFormApi.approveForm(id),
    onSuccess: () => {
      toast.success('Đã duyệt đơn', { autoClose: 2000 })
      getAllRegistrationForm.refetch()
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

  const refuseFormMutation = useMutation({
    mutationFn: (id: number) => registrationFormApi.refuseForm(id),
    onSuccess: () => {
      toast.success('Đã từ chối đơn đăng ký', { autoClose: 2000 })
      getAllRegistrationForm.refetch()
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

  const registrationFormList = getAllRegistrationForm.data?.data.content as RegistrationFormType[]
  const totalPage = getAllRegistrationForm.data?.data.totalPages as number

  const approveForm = (id: number) => {
    approveFormMutation.mutate(id)
  }

  const refuseForm = (id: number) => {
    refuseFormMutation.mutate(id)
  }

  const handleChangeSize = (event) => {
    const selectedValue = event.target.value
    setSize(selectedValue)
  }

  const handleClickNextPage = () => {
    if (pageNumber < totalPage - 1) {
      setPageNumber(pageNumber + 1)
    }
  }
  const handleClickPrevPage = () => {
    if (pageNumber > 0) {
      setPageNumber(pageNumber - 1)
    }
  }
  const handleClickNext5Page = () => {
    if (pageNumber < totalPage - 5) {
      setPageNumber(pageNumber + 5)
    } else {
      setPageNumber(totalPage - 1)
    }
  }
  const handleClickPrev5Page = () => {
    if (pageNumber > 4) {
      setPageNumber(pageNumber - 5)
    } else {
      setPageNumber(0)
    }
  }

  useEffect(() => {
    let endDate = formatDateStringForDatabase(dateRangeArray[1])
    let startDate = formatDateStringForDatabase(dateRangeArray[0])
    if (getAllRegistrationForm.isLoading) {
      return // Nếu đang tải, không thực hiện gì cả
    }

    let newFilterList = registrationFormList

    if (status.key !== 'all') {
      newFilterList = registrationFormList.filter((contract) => contract.status === status.key)
    }

    if (plan.key !== 'all') {
      newFilterList = newFilterList.filter((contract) => contract.insuranceInformation.planName === plan.key)
    }

    if (search !== '') {
      const searchTermLowerCase = search.toLowerCase()
      newFilterList = newFilterList.filter((contract) =>
        contract.insuredPerson.name.toLowerCase().includes(searchTermLowerCase)
      )
    }

    if (startDate && endDate) {
      newFilterList = newFilterList.filter((claim) => {
        const requestDate = formatDateStringForDatabase(claim.applyDate)

        return requestDate >= startDate && requestDate <= endDate
      })
    }

    setFilterList(newFilterList)
  }, [status, plan, getAllRegistrationForm.isLoading, registrationFormList, search, daterange])

  if (getAllRegistrationForm.isLoading) return <div>Loading...</div>

  return (
    <>
      <h2 className={`mt-10 text-lg font-medium intro-y`}>Danh sách đơn đăng ký</h2>
      <div className='grid grid-cols-12 gap-6 mt-5'>
        <div className='flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap'>
          <Menu className='mt-5 md:mt-0 mr-2 '>
            <Menu.Button
              as={'button'}
              variant='outline-secondary'
              className='w-[150px] font-normal shadow-md flex items-center justify-center gap-1 bg-[#1E40AF] text-white p-2 rounded-md'
            >
              {status.content}
              <Lucide icon='ChevronDown' className='w-4 h-4 ml-2' />
            </Menu.Button>
            <Menu.Items className='w-40 h-32 overflow-y-auto'>
              {data.map((item) => (
                <Menu.Item key={item.key} onClick={() => handleStatusChange(item)}>
                  {item.content}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
          {/*BEGIN filter plan name */}
          <Menu className='mt-5 md:mt-0 mr-2'>
            <Menu.Button
              as={'button'}
              variant='outline-secondary'
              className='w-[220px] font-normal shadow-md flex items-center justify-center gap-1 bg-[#1E40AF] text-white p-2 rounded-md'
            >
              {plan.content}
              <Lucide icon='ChevronDown' className='w-4 h-4 ml-2' />
            </Menu.Button>
            <Menu.Items className='w-[220px] h-32 overflow-y-auto'>
              {dataPlan.map((item) => (
                <Menu.Item key={item.key} onClick={() => handlePlanChange(item)}>
                  {item.content}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
          <Litepicker
            value={daterange}
            onChange={setDaterange}
            options={{
              autoApply: false,
              singleMode: false,
              numberOfColumns: 2,
              numberOfMonths: 2,
              showWeekNumbers: true,
              dropdowns: {
                minYear: 1990,
                maxYear: null,
                months: true,
                years: true
              }
            }}
            className='block w-56'
          />

          <div className='hidden mx-auto md:block text-slate-500'></div>
          <div className='w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0'>
            <div className='relative w-56 text-slate-500'>
              <FormInput
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type='text'
                className='w-56 pr-10 !box'
                placeholder='Search...'
              />
              <Lucide icon='Search' className='absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3' />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className='col-span-12 overflow-auto intro-y lg:overflow-visible'>
          {filterList.length === 0 ? (
            <div className='flex text-center w-full font-bold text-[18px] ml-[500px]'>Không có dữ liệu</div>
          ) : (
            <Table className='border-spacing-y-[10px] border-separate -mt-2'>
              <Table.Thead>
                <Table.Tr>
                  <Table.Th className='border-b-0 whitespace-nowrap'>ID</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap'>Tên khách hàng</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap'>Email</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap min-w-[200px]'>Gói bảo hiểm</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap'>Ngày</Table.Th>
                  <Table.Th className='text-center border-b-0 whitespace-nowrap'>Trạng thái</Table.Th>
                  <Table.Th className='text-center border-b-0 whitespace-nowrap'></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filterList.map((registrationForm, index) => (
                  <RegFormTableRow
                    registrationForm={registrationForm}
                    key={index}
                    approveForm={approveForm}
                    refuseForm={refuseForm}
                  />
                ))}
              </Table.Tbody>
            </Table>
          )}
        </div>
        {/* END: Data List */}
        {/* BEGIN: Pagination */}
        <div className='flex flex-wrap items-center col-span-12 intro-y sm:flex-row sm:flex-nowrap'>
          <div className='flex w-full mr-0 sm:w-auto sm:mr-auto'>
            <Button
              onClick={handleClickPrev5Page}
              as='button'
              className='hover:bg-primary hover:text-white min-w-0 sm:min-w-[40px] shadow-none flex items-center justify-center border-transparent text-slate-800 sm:mr-1 dark:text-slate-300 px-1 sm:px-3 font-medium dark:bg-darkmode-400'
            >
              <Lucide icon='ChevronsLeft' className='w-4 h-4' />
            </Button>
            <Button
              onClick={handleClickPrevPage}
              as='button'
              className='hover:bg-primary hover:text-white min-w-0 sm:min-w-[40px] shadow-none flex items-center justify-center border-transparent text-slate-800 sm:mr-1 dark:text-slate-300 px-1 sm:px-3 font-medium dark:bg-darkmode-400'
            >
              <Lucide icon='ChevronLeft' className='w-4 h-4' />
            </Button>

            {Array.from({ length: totalPage }, (_, index) => index).map((page) => (
              <button
                key={page}
                onClick={() => setPageNumber(page)}
                className={`${
                  page === pageNumber ? 'bg-primary text-white' : 'bg-white'
                } min-w-0 rounded-md sm:min-w-[40px] shadow-none flex items-center justify-center border-transparent text-slate-800 sm:mr-2 dark:text-slate-300 px-1 sm:px-3 font-normal dark:bg-darkmode-400`}
              >
                {page + 1}
              </button>
            ))}

            <Button
              onClick={handleClickNextPage}
              as='button'
              className='hover:bg-primary hover:text-white min-w-0 sm:min-w-[40px] shadow-none flex items-center justify-center border-transparent text-slate-800 sm:mr-1 dark:text-slate-300 px-1 sm:px-3 font-medium dark:bg-darkmode-400'
            >
              <Lucide icon='ChevronRight' className='w-4 h-4' />
            </Button>
            <Button
              as='button'
              onClick={handleClickNext5Page}
              className='hover:bg-primary hover:text-white min-w-0 sm:min-w-[40px] shadow-none flex items-center justify-center border-transparent text-slate-800 sm:mr-1 dark:text-slate-300 px-1 sm:px-3 font-medium dark:bg-darkmode-400'
            >
              <Lucide icon='ChevronsRight' className='w-4 h-4' />
            </Button>
          </div>
          <FormSelect onChange={handleChangeSize} value={size} className='w-20 mt-3 !box sm:mt-0'>
            <option value='10'>10</option>
            <option value='25'>25</option>
            <option value='35'>35</option>
            <option value='50'>50</option>
          </FormSelect>
        </div>
        {/* END: Pagination */}
      </div>
    </>
  )
}

export default Main
