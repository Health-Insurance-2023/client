import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import HomeFooter from 'src/components/HomeFooter'

import HomeHeader from 'src/components/HomeHeader'
function MainLayout() {
  // const [isLoading, setIsLoading] = useState(true)
  // setTimeout(() => {
  //   {
  //     setIsLoading(false)
  //   }
  // }, 1000)
  // if (isLoading) {
  //   return (
  //     <div className='loading loading-center-body bg-gray-200'>
  //       <div className='loader-circle-8'>
  //         <svg className='circular' viewBox='25 25 50 50'>
  //           <circle className='path' cx='50' cy='50' r='20' fill='none' strokeWidth='5' strokeMiterlimit='10' />
  //         </svg>
  //       </div>
  //     </div>
  //   )
  // }
  return (
    <div className='h-full bg-[#f2f4f7]'>
      <HomeHeader />
      <div className=''>
        <Outlet />
      </div>
      <HomeFooter />
    </div>
  )
}

export default memo(MainLayout)
