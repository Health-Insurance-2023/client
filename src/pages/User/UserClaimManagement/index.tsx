import _ from 'lodash'
import { useEffect, useState } from 'react'
import Button from 'src/components/AdminCustomButton'
import { FormInput, FormSelect } from 'src/components/Form'
import Lucide from 'src/components/Lucide'
// import Tippy from 'src/components/Tippy'
import Table from 'src/components/Table'
import { useQuery } from '@tanstack/react-query'
import claimApi from 'src/apis/claim.api'
import { ClaimType } from 'src/types/claim.type'
import ClaimTableRow from 'src/components/ClaimTableRow'
import { Link } from 'react-router-dom'
import routes from 'src/constants/routes'
import { StatusFilterType } from 'src/types/utils.type'
import { dataPlan } from 'src/pages/Admin/ContractManegement'
import { formatDateStringForDatabase } from 'src/utils/utils'
import Litepicker from 'src/components/Litepicker'
import { Menu } from 'src/components/Headless'

const data: StatusFilterType[] = [
  {
    key: 'all',
    content: 'Tất cả'
  },
  {
    key: 'approved',
    content: 'Đã thanh toán'
  },
  {
    key: 'pending',
    content: 'Chờ thanh toán'
  },
  {
    key: 'refused',
    content: 'Đã từ chối'
  }
]

function Main() {
  /////
  const [status, setStatus] = useState<StatusFilterType>(data[0])
  const [plan, setPlan] = useState<StatusFilterType>(dataPlan[0])
  const [search, setSearch] = useState('')
  const [daterange, setDaterange] = useState('')

  const [filterList, setFilterList] = useState<ClaimType[]>([])

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

  const getUserClaim = useQuery({
    queryKey: [`get-user-claim`, pageNumber, size],
    queryFn: () => claimApi.getUserClaim(pageNumber, parseInt(size)),
    onError: (err) => console.log(err)
  })

  const userClaimList = getUserClaim.data?.data.content as ClaimType[]
  const totalPage = getUserClaim.data?.data.totalPages as number

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
    if (getUserClaim.isLoading) {
      return // Nếu đang tải, không thực hiện gì cả
    }

    let newFilterList = userClaimList

    if (status.key !== 'all') {
      newFilterList = userClaimList.filter((contract) => contract.status === status.key)
    }

    if (startDate && endDate) {
      newFilterList = newFilterList.filter((claim) => {
        const requestDate = formatDateStringForDatabase(claim.requestDate)

        return requestDate >= startDate && requestDate <= endDate
      })
    }

    setFilterList(newFilterList)
  }, [status, plan, getUserClaim.isLoading, userClaimList, search, daterange])

  if (getUserClaim.isLoading) return <div>Loading...</div>

  return (
    <>
      <h2 className={`mt-10 text-lg font-medium intro-y`}>Danh sách yêu cầu bồi thường</h2>
      <div className='grid grid-cols-12 gap-6 mt-5'>
        <div className='flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap'>
          <Link to={routes.claimRequest}>
            <Button variant='primary' className='mr-2 shadow-md flex items-center justify-center gap-1'>
              <Lucide icon='Plus' className='w-4 h-4' />
              Thêm yêu cầu mới
            </Button>
          </Link>
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
                  <Table.Th className='border-b-0 whitespace-nowrap'>Người được bảo hiểm</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap'>Email</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap min-w-[150px]'>Gói bảo hiểm</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap min-w-[150px]'>Ngày yêu cầu</Table.Th>
                  <Table.Th className='border-b-0 whitespace-nowrap'>Số tiền</Table.Th>
                  <Table.Th className='text-center border-b-0 whitespace-nowrap min-w-[180px]'>Trạng thái</Table.Th>
                  <Table.Th className='text-center border-b-0 whitespace-nowrap'></Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {filterList?.map((userClaim, index) => (
                  <ClaimTableRow userClaim={userClaim} key={index} status={status} plan={plan} search={search} />
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
