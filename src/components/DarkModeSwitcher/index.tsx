import { selectDarkMode, setDarkMode } from 'src/redux/darkModeSlice'
import { useAppSelector, useAppDispatch } from 'src/redux/hooks'
import Lucide from '../Lucide'
import { Tooltip } from '@material-tailwind/react'

function Main() {
  const dispatch = useAppDispatch()
  const darkMode = useAppSelector(selectDarkMode)

  const setDarkModeClass = () => {
    const el = document.querySelectorAll('html')[0]
    darkMode ? el.classList.add('dark') : el.classList.remove('dark')
  }

  const switchMode = () => {
    dispatch(setDarkMode(!darkMode))
    localStorage.setItem('darkMode', (!darkMode).toString())
    setDarkModeClass()
  }

  setDarkModeClass()

  return (
    <>
      {/* BEGIN: Dark Mode Switcher */}
      <Tooltip
        // offset={5}
        placement='bottom'
        className={`${darkMode ? 'bg-dark' : 'bg-white'} text-primary`}
        content={`${darkMode ? 'Chuyển sang Light mode' : 'Chuyển sang Dark mode'}`}
        animate={{
          mount: { scale: 1, y: 10 },
          unmount: { scale: 0, y: 0 }
        }}
      >
        <div
          className={`border z-50 shadow-md w-[40px] h-[22px] outline-none rounded-full relative cursor-pointer flex items-center box bg-[#eff0f3] border-[#c2c2c4] dark:border-[#3c3f44] hover:border-primary dark:hover:border-primary`}
          onClick={switchMode}
        >
          <div
            className={`h-[18px] w-[18px] rounded-full flex justify-center items-center mx-[2px] transition-all duration-300 ${
              darkMode ? 'bg-black ml-[18px] ' : 'bg-white'
            }`}
          >
            <Lucide icon={`${darkMode ? 'Moon' : 'Sun'}`} className='w-[10px] h-[10px] dark:text-slate-500' />
          </div>
        </div>
      </Tooltip>

      {/* END: Dark Mode Switcher */}
    </>
  )
}

export default Main
