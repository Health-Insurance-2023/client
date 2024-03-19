import _ from 'lodash'
import clsx from 'clsx'
import Lucide from 'src/components/Lucide'
import Tippy from 'src/components/Tippy'
import { Menu } from 'src/components/Headless'
import ReportLineChart from 'src/components/ReportLineChart'
import Litepicker from 'src/components/Litepicker'
import { useState } from 'react'
import ReportPieChart from 'src/components/ReportPieChart'
import ReportDonutChart from 'src/components/ReportDonutChart'
import reportApi from 'src/apis/report.api'
import { useQuery } from '@tanstack/react-query'
import { AgeReport, IncomeReport, MonthlyReport, PlanReport } from 'src/types/report.type'
import { calPercent, calculatePercentageChange, determineChangeType, formatNumber } from 'src/utils/utils'
import VerticalBarChart from 'src/components/VerticalBarChart'

function Main() {
  const [salesReportFilter, setSalesReportFilter] = useState<string>()
  const [isReloadData, setIsReloadData] = useState<boolean>(false)

  const handleReloadData = () => {
    setIsReloadData(!isReloadData)
  }
  const getGeneralReport = useQuery({
    queryKey: [`get-general-report`, isReloadData],
    queryFn: () => reportApi.getGeneralReport(),
    onError: (err) => console.log(err)
  })

  const getAgeReport = useQuery({
    queryKey: [`get-age-report`],
    queryFn: () => reportApi.getAgeReport(),
    onError: (err) => console.log(err)
  })

  const getPlanReport = useQuery({
    queryKey: [`get-plan-report`],
    queryFn: () => reportApi.getPlanReport(),
    onError: (err) => console.log(err)
  })

  const getIncomeReport = useQuery({
    queryKey: [`get-income-report`],
    queryFn: () => reportApi.getIncomeReport(),
    onError: (err) => console.log(err)
  })

  const generalReport = getGeneralReport.data?.data as MonthlyReport
  const ageReport = getAgeReport.data?.data as AgeReport[]
  const planReport = getPlanReport.data?.data as PlanReport[]
  const incomeReport = getIncomeReport.data?.data as IncomeReport[]

  const chartColors = ['#FA812D', '#FAD12C', '#3453B7', '#90D12D', '#DF3B3B', '#800080']

  if (getGeneralReport.isLoading || getAgeReport.isLoading || getPlanReport.isLoading || getIncomeReport.isLoading)
    return <div>Loading...</div>

  ageReport.sort((a, b) => {
    // Chuyển đổi ageGroup thành số để so sánh
    const ageGroupToNumber = (ageGroup) => {
      const [start, end] = ageGroup.split('-')
      return (parseInt(start, 10) + parseInt(end, 10)) / 2
    }

    const ageGroupA = ageGroupToNumber(a.ageGroup)
    const ageGroupB = ageGroupToNumber(b.ageGroup)

    return ageGroupA - ageGroupB
  })

  return (
    <div className='grid grid-cols-12 gap-6'>
      <div className='col-span-12 2xl:col-span-12'>
        <div className='grid grid-cols-12 gap-6'>
          {/* BEGIN: General Report */}
          <div className='col-span-12 mt-8'>
            <div className='flex items-center h-10 intro-y'>
              <h2 className='mr-5 text-lg font-medium truncate'>Thống kê trong tháng</h2>
              <button onClick={handleReloadData} className='flex items-center ml-auto text-primary'>
                <Lucide icon='RefreshCcw' className='w-4 h-4 mr-3' /> Reload Data
              </button>
            </div>
            <div className='grid grid-cols-12 gap-6 mt-5'>
              <div className='col-span-12 sm:col-span-6 xl:col-span-3 intro-y'>
                <div
                  className={clsx([
                    'relative zoom-in',
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70"
                  ])}
                >
                  <div className='p-5 box'>
                    <div className='flex'>
                      <Lucide icon='ShoppingCart' className='w-[28px] h-[28px] text-primary' />
                      <div className='ml-auto'>
                        <Tippy
                          as='div'
                          className={` ${
                            determineChangeType(
                              generalReport.current.countInsuranceContract,
                              generalReport.prev.countInsuranceContract
                            ).type === 'increase'
                              ? ' bg-success'
                              : 'bg-danger'
                          } cursor-pointer py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium`}
                          content={
                            determineChangeType(
                              generalReport.current.countInsuranceContract,
                              generalReport.prev.countInsuranceContract
                            ).content
                          }
                        >
                          {calculatePercentageChange(
                            generalReport.current.countInsuranceContract,
                            generalReport.prev.countInsuranceContract
                          )}
                          %
                          <Lucide
                            icon={
                              determineChangeType(
                                generalReport.current.countInsuranceContract,
                                generalReport.prev.countInsuranceContract
                              ).type === 'increase'
                                ? 'ChevronUp'
                                : 'ChevronDown'
                            }
                            className='w-4 h-4 ml-0.5'
                          />
                        </Tippy>
                      </div>
                    </div>
                    <div className='mt-6 text-3xl font-medium leading-8'>
                      {formatNumber(generalReport.current.countInsuranceContract)}
                    </div>
                    <div className='mt-1 text-base text-slate-500'>Hợp đồng</div>
                  </div>
                </div>
              </div>
              <div className='col-span-12 sm:col-span-6 xl:col-span-3 intro-y'>
                <div
                  className={clsx([
                    'relative zoom-in',
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70"
                  ])}
                >
                  <div className='p-5 box'>
                    <div className='flex'>
                      <Lucide icon='CreditCard' className='w-[28px] h-[28px] text-pending' />
                      <div className='ml-auto'>
                        <Tippy
                          as='div'
                          className={` ${
                            determineChangeType(
                              generalReport.current.revenue ? generalReport.current.revenue : 0,
                              generalReport.prev.revenue ? generalReport.prev.revenue : 0
                            ).type === 'increase'
                              ? ' bg-success'
                              : 'bg-danger'
                          } cursor-pointer bg-danger py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium`}
                          content={
                            determineChangeType(
                              generalReport.current.revenue ? generalReport.current.revenue : 0,
                              generalReport.prev.revenue ? generalReport.prev.revenue : 0
                            ).content
                          }
                        >
                          {calculatePercentageChange(
                            generalReport.current.revenue ? generalReport.current.revenue : 0,
                            generalReport.prev.revenue ? generalReport.prev.revenue : 0
                          )}
                          %
                          <Lucide
                            icon={
                              determineChangeType(
                                generalReport.current.revenue ? generalReport.current.revenue : 0,
                                generalReport.prev.revenue ? generalReport.prev.revenue : 0
                              ).type === 'increase'
                                ? 'ChevronUp'
                                : 'ChevronDown'
                            }
                            className='w-4 h-4 ml-0.5'
                          />
                        </Tippy>
                      </div>
                    </div>
                    <div className='mt-6 text-3xl font-medium leading-8 text-red-600'>
                      {formatNumber(generalReport.current.revenue ? generalReport.current.revenue : 0)}
                    </div>
                    <div className='mt-1 text-base text-slate-500'>Doanh thu</div>
                  </div>
                </div>
              </div>
              <div className='col-span-12 sm:col-span-6 xl:col-span-3 intro-y'>
                <div
                  className={clsx([
                    'relative zoom-in',
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70"
                  ])}
                >
                  <div className='p-5 box'>
                    <div className='flex'>
                      <Lucide icon='Monitor' className='w-[28px] h-[28px] text-warning' />
                      <div className='ml-auto'>
                        <Tippy
                          as='div'
                          className={`${
                            determineChangeType(
                              generalReport.current.countRegistrationForm,
                              generalReport.prev.countRegistrationForm
                            ).type === 'increase'
                              ? ' bg-success'
                              : 'bg-danger'
                          } cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium`}
                          content={
                            determineChangeType(
                              generalReport.current.countRegistrationForm,
                              generalReport.prev.countRegistrationForm
                            ).content
                          }
                        >
                          {calculatePercentageChange(
                            generalReport.current.countRegistrationForm,
                            generalReport.prev.countRegistrationForm
                          )}
                          %{' '}
                          <Lucide
                            icon={
                              determineChangeType(
                                generalReport.current.countRegistrationForm,
                                generalReport.prev.countRegistrationForm
                              ).type === 'increase'
                                ? 'ChevronUp'
                                : 'ChevronDown'
                            }
                            className='w-4 h-4 ml-0.5'
                          />
                        </Tippy>
                      </div>
                    </div>
                    <div className='mt-6 text-3xl font-medium leading-8'>
                      {formatNumber(generalReport.current.countRegistrationForm)}
                    </div>
                    <div className='mt-1 text-base text-slate-500'>Đơn đăng ký</div>
                  </div>
                </div>
              </div>
              <div className='col-span-12 sm:col-span-6 xl:col-span-3 intro-y'>
                <div
                  className={clsx([
                    'relative zoom-in',
                    "before:content-[''] before:w-[90%] before:shadow-[0px_3px_20px_#0000000b] before:bg-slate-50 before:h-full before:mt-3 before:absolute before:rounded-md before:mx-auto before:inset-x-0 before:dark:bg-darkmode-400/70"
                  ])}
                >
                  <div className='p-5 box'>
                    <div className='flex'>
                      <Lucide icon='User' className='w-[28px] h-[28px] text-success' />
                      <div className='ml-auto'>
                        <Tippy
                          as='div'
                          className={`${
                            determineChangeType(
                              generalReport.current.countInsuredPerson,
                              generalReport.prev.countInsuredPerson
                            ).type === 'increase'
                              ? ' bg-success'
                              : 'bg-danger'
                          } cursor-pointer bg-success py-[3px] flex rounded-full text-white text-xs pl-2 pr-1 items-center font-medium`}
                          content={
                            determineChangeType(
                              generalReport.current.countInsuredPerson,
                              generalReport.prev.countInsuredPerson
                            ).content
                          }
                        >
                          {calculatePercentageChange(
                            generalReport.current.countInsuredPerson,
                            generalReport.prev.countInsuredPerson
                          )}
                          %{' '}
                          <Lucide
                            icon={
                              determineChangeType(
                                generalReport.current.countInsuredPerson,
                                generalReport.prev.countInsuredPerson
                              ).type === 'increase'
                                ? 'ChevronUp'
                                : 'ChevronDown'
                            }
                            className='w-4 h-4 ml-0.5'
                          />
                        </Tippy>
                      </div>
                    </div>
                    <div className='mt-6 text-3xl font-medium leading-8'>
                      {formatNumber(generalReport.current.countInsuredPerson)}
                    </div>
                    <div className='mt-1 text-base text-slate-500'>Khách hàng</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END: General Report */}
          {/* BEGIN: Sales Report */}
          <div className='col-span-12 mt-8 lg:col-span-6'>
            <div className='items-center block h-10 intro-y sm:flex'>
              <h2 className='mr-5 text-lg font-medium truncate'>Thống kê doanh thu</h2>
              <div className='relative mt-3 sm:ml-auto sm:mt-0 text-slate-500'>
                <Lucide icon='Calendar' className='absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3' />
                <Litepicker
                  value={salesReportFilter}
                  onChange={setSalesReportFilter}
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
                  className='pl-10 sm:w-56 !box'
                />
              </div>
            </div>
            <div className='p-5 mt-12 intro-y box sm:mt-5'>
              <div className='flex flex-col md:flex-row md:items-center'>
                <div className='flex'>
                  <div>
                    <div className='text-lg font-medium text-primary dark:text-slate-300 xl:text-xl'>$15,000</div>
                    <div className='mt-0.5 text-slate-500'>This Month</div>
                  </div>
                  <div className='w-px h-12 mx-4 border border-r border-dashed border-slate-200 dark:border-darkmode-300 xl:mx-5'></div>
                  <div>
                    <div className='text-lg font-medium text-slate-500 xl:text-xl'>$10,000</div>
                    <div className='mt-0.5 text-slate-500'>Last Month</div>
                  </div>
                </div>
                <Menu className='mt-5 md:ml-auto md:mt-0'>
                  <Menu.Button as={'button'} variant='outline-secondary' className='font-normal'>
                    Filter by Category
                    <Lucide icon='ChevronDown' className='w-4 h-4 ml-2' />
                  </Menu.Button>
                  <Menu.Items className='w-40 h-32 overflow-y-auto'>
                    <Menu.Item>PC & Laptop</Menu.Item>
                    <Menu.Item>Smartphone</Menu.Item>
                    <Menu.Item>Electronic</Menu.Item>
                    <Menu.Item>Photography</Menu.Item>
                    <Menu.Item>Sport</Menu.Item>
                  </Menu.Items>
                </Menu>
              </div>
              <div
                className={clsx([
                  'relative',
                  "before:content-[''] before:block before:absolute before:w-16 before:left-0 before:top-0 before:bottom-0 before:ml-10 before:mb-7 before:bg-gradient-to-r before:from-white before:via-white/80 before:to-transparent before:dark:from-darkmode-600",
                  "after:content-[''] after:block after:absolute after:w-16 after:right-0 after:top-0 after:bottom-0 after:mb-7 after:bg-gradient-to-l after:from-white after:via-white/80 after:to-transparent after:dark:from-darkmode-600"
                ])}
              >
                <ReportLineChart height={275} className='mt-6 -mb-6' />
              </div>
            </div>
          </div>
          {/* END: Sales Report */}
          {/* BEGIN: Weekly Top Seller */}
          <div className='col-span-12 mt-8 sm:col-span-6 lg:col-span-3'>
            <div className='flex items-center h-10 intro-y'>
              <h2 className='mr-5 text-lg font-medium truncate'>Thống kê theo độ tuổi</h2>
            </div>
            <div className='p-5 mt-5 intro-y box'>
              <div className='mt-3'>
                <ReportPieChart height={213} ageReport={ageReport} />
              </div>
              <div className='mx-auto mt-8 w-52 sm:w-auto'>
                {ageReport.map((item, index) => (
                  <div key={index} className='flex items-center mt-2'>
                    <div style={{ backgroundColor: chartColors[index] }} className={`w-2 h-2 mr-3 rounded-full `}></div>
                    <span className='truncate'>{item.ageGroup}</span>
                    <span className='ml-auto font-medium'>
                      {calPercent(item.quantity, generalReport.current.countInsuranceContract)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* END: Weekly Top Seller */}
          {/* BEGIN: Sales Report */}
          <div className='col-span-12 mt-8 sm:col-span-6 lg:col-span-3'>
            <div className='flex items-center h-10 intro-y'>
              <h2 className='mr-5 text-lg font-medium truncate'>Thống kê theo gói</h2>
            </div>
            <div className='p-5 mt-5 intro-y box'>
              <div className='mt-3'>
                <ReportDonutChart height={213} planReport={planReport} />
              </div>
              <div className='mx-auto mt-8 w-52 sm:w-auto'>
                {planReport.map((item, index) => (
                  <div key={index} className='flex items-center mt-2'>
                    <div style={{ backgroundColor: chartColors[index] }} className='w-2 h-2 mr-3 rounded-full'></div>
                    <span className='truncate'>Gói {item.packageName}</span>
                    <span className='ml-auto font-medium'>
                      {calPercent(item.contractCount, generalReport.current.countInsuranceContract)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* END: Sales Report */}
          {/* BEGIN: Sales Report */}
          <div className='col-span-12 sm:col-span-6 lg:col-span-12'>
            <div className='flex items-center h-10 intro-y'>
              <h2 className='mr-5 text-lg font-medium truncate'>Thống kê doanh thu/bồi thường theo năm</h2>
            </div>
            <div className='p-5 intro-y box'>
              <div className='mt-3'>
                <VerticalBarChart height={400} incomeReport={incomeReport} />
              </div>
            </div>
          </div>
          {/* END: Sales Report */}
        </div>
      </div>
    </div>
  )
}

export default Main
