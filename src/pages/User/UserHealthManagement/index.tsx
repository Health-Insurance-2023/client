import _ from 'lodash'
import { useRef, useState } from 'react'
import Button from 'src/components/AdminCustomButton'
import { FormInput, FormSelect } from 'src/components/Form'
import Lucide from 'src/components/Lucide'
// import Tippy from 'src/components/Tippy'
import { Dialog } from 'src/components/Headless'
import Table from 'src/components/Table'
import { useQuery } from '@tanstack/react-query'
import insuranceContractApi from 'src/apis/insuranceContract.api'
import { ContractType } from 'src/types/insuranceContract.type'
import HealthTableRow from 'src/components/HealthTableRow'

function Main() {
  const [deleteConfirmationModal, setDeleteConfirmationModal] = useState(false)
  const deleteButtonRef = useRef(null)
  const [pageNumber, setPageNumber] = useState(0)
  const [size, setSize] = useState('10')

  const getUserContract = useQuery({
    queryKey: [`get-user-contract`, pageNumber, size],
    queryFn: () => insuranceContractApi.getUserContract(pageNumber, parseInt(size)),
    onError: (err) => console.log(err)
  })

  const userContractList = getUserContract.data?.data.content as ContractType[]
  const totalPage = getUserContract.data?.data.totalPages as number

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

  if (getUserContract.isLoading) return <div>Loading...</div>

  return (
    <>
      <h2 className={`mt-10 text-lg font-medium intro-y`}>Danh sách tình trạng sức khỏe</h2>
      <div className='grid grid-cols-12 gap-6 mt-5'>
        <div className='flex flex-wrap items-center col-span-12 mt-2 intro-y sm:flex-nowrap'>
          <div className='hidden mx-auto md:block text-slate-500'></div>
          <div className='w-full mt-3 sm:w-auto sm:mt-0 sm:ml-auto md:ml-0'>
            <div className='relative w-56 text-slate-500'>
              <FormInput type='text' className='w-56 pr-10 !box' placeholder='Search...' />
              <Lucide icon='Search' className='absolute inset-y-0 right-0 w-4 h-4 my-auto mr-3' />
            </div>
          </div>
        </div>
        {/* BEGIN: Data List */}
        <div className='col-span-12 overflow-auto intro-y lg:overflow-visible'>
          <Table className='border-spacing-y-[10px] border-separate -mt-2'>
            <Table.Thead>
              <Table.Tr>
                <Table.Th className='border-b-0 whitespace-nowrap'>ID</Table.Th>
                <Table.Th className='border-b-0 whitespace-nowrap'>Người được bảo hiểm</Table.Th>
                <Table.Th className='border-b-0 whitespace-nowrap'>Email</Table.Th>
                <Table.Th className='border-b-0 whitespace-nowrap min-w-[150px]'>Gói bảo hiểm</Table.Th>
                <Table.Th className='border-b-0 whitespace-nowrap min-w-[150px]'>Mã bảo hiểm</Table.Th>
                <Table.Th className='border-b-0 whitespace-nowrap'>Quan hệ</Table.Th>
                <Table.Th className='text-center border-b-0 whitespace-nowrap'></Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {userContractList.map((userContract, index) => (
                <HealthTableRow userContract={userContract} key={index} refetch={() => getUserContract.refetch()} />
              ))}
            </Table.Tbody>
          </Table>
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
      {/* BEGIN: Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmationModal}
        onClose={() => {
          setDeleteConfirmationModal(false)
        }}
        initialFocus={deleteButtonRef}
      >
        <Dialog.Panel>
          <div className='p-5 text-center'>
            <Lucide icon='XCircle' className='w-16 h-16 mx-auto mt-3 text-danger' />
            <div className='mt-5 text-3xl'>Are you sure?</div>
            <div className='mt-2 text-slate-500'>
              Do you really want to delete these records? <br />
              This process cannot be undone.
            </div>
          </div>
          <div className='px-5 pb-8 text-center'>
            <Button
              variant='outline-secondary'
              type='button'
              onClick={() => {
                setDeleteConfirmationModal(false)
              }}
              className='w-24 mr-1'
            >
              Cancel
            </Button>
            <Button variant='danger' type='button' className='w-24' ref={deleteButtonRef}>
              Delete
            </Button>
          </div>
        </Dialog.Panel>
      </Dialog>
      {/* END: Delete Confirmation Modal */}
    </>
  )
}

export default Main
