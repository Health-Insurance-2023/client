import { selectColorScheme, setColorScheme, ColorSchemes } from 'src/redux/colorSchemeSlice'
import { selectDarkMode } from 'src/redux/darkModeSlice'
import { useAppSelector, useAppDispatch } from 'src/redux/hooks'
import { Popover } from 'src/components/Headless'

import clsx from 'clsx'
import Lucide from '../Lucide'

interface Props {
  iconColor: string
}

function Main({ iconColor }: Props) {
  const dispatch = useAppDispatch()
  const colorScheme = useAppSelector(selectColorScheme)
  const darkMode = useAppSelector(selectDarkMode)

  const setColorSchemeClass = () => {
    const el = document.querySelectorAll('html')[0]
    el.setAttribute('class', colorScheme)
    darkMode && el.classList.add('dark')
  }

  const switchColorScheme = (colorScheme: ColorSchemes) => {
    dispatch(setColorScheme(colorScheme))
    localStorage.setItem('colorScheme', colorScheme)
    setColorSchemeClass()
  }

  setColorSchemeClass()

  return (
    <>
      {/* BEGIN: Main Color Switcher */}
      <Popover className=''>
        <Popover.Button className='relative text-slate-600 outline-none block'>
          <Lucide icon='Paintbrush2' className={`w-4 h-4 ${iconColor} dark:text-slate-500`} />
        </Popover.Button>
        <Popover.Panel className='w-[220px] sm:w-[220px] p-5 mt-2'>
          <div className='mb-2 font-medium '>Bảng màu</div>
          <div className='flex'>
            <a
              onClick={() => {
                switchColorScheme('default')
              }}
              className={clsx({
                'block w-8 h-8 cursor-pointer bg-blue-800 rounded-full border-4 mr-1 hover:border-slate-200': true,
                'border-slate-300 dark:border-darkmode-800/80': colorScheme == 'default',
                'border-white dark:border-darkmode-600': colorScheme != 'default'
              })}
            ></a>
            <a
              onClick={() => {
                switchColorScheme('theme-1')
              }}
              className={clsx({
                'block w-8 h-8 cursor-pointer bg-emerald-900 rounded-full border-4 mr-1 hover:border-slate-200': true,
                'border-slate-300 dark:border-darkmode-800/80': colorScheme == 'theme-1',
                'border-white dark:border-darkmode-600': colorScheme != 'theme-1'
              })}
            ></a>
            <a
              onClick={() => {
                switchColorScheme('theme-2')
              }}
              className={clsx({
                'block w-8 h-8 cursor-pointer bg-blue-900 rounded-full border-4 mr-1 hover:border-slate-200': true,
                'border-slate-300 dark:border-darkmode-800/80': colorScheme == 'theme-2',
                'border-white dark:border-darkmode-600': colorScheme != 'theme-2'
              })}
            ></a>
            <a
              onClick={() => {
                switchColorScheme('theme-3')
              }}
              className={clsx({
                'block w-8 h-8 cursor-pointer bg-cyan-900 rounded-full border-4 mr-1 hover:border-slate-200': true,
                'border-slate-300 dark:border-darkmode-800/80': colorScheme == 'theme-3',
                'border-white dark:border-darkmode-600': colorScheme != 'theme-3'
              })}
            ></a>
            <a
              onClick={() => {
                switchColorScheme('theme-4')
              }}
              className={clsx({
                'block w-8 h-8 cursor-pointer bg-indigo-900 rounded-full border-4 hover:border-slate-200': true,
                'border-slate-300 dark:border-darkmode-800/80': colorScheme == 'theme-4',
                'border-white dark:border-darkmode-600': colorScheme != 'theme-4'
              })}
            ></a>
          </div>
        </Popover.Panel>
      </Popover>

      {/* END: Main Color Switcher */}
    </>
  )
}

export default Main
