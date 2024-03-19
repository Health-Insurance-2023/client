import { useState, Fragment } from 'react'
import Lucide from 'src/components/Lucide'
import Breadcrumb from 'src/components/Breadcrumb'
import { FormInput } from 'src/components/Form'
import { Menu } from 'src/components/Headless'
import fakerData from '../../utils/faker'
import _ from 'lodash'
import { Transition } from '@headlessui/react'
import DarkModeSwitcher from '../DarkModeSwitcher'
import MainColorSwitcher from '../MainColorSwitcher'
import { FormattedMenu } from 'src/utils/side-menu'
import routes from 'src/constants/routes'
import { clearUserAccountAction } from 'src/redux/actions/userAccountAction'
import { clearLS } from 'src/utils/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RootState } from 'src/redux/store'

interface Props {
  menuList: ('divider' | FormattedMenu)[]
}

function Main({ menuList }: Props) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchDropdown, setSearchDropdown] = useState(false)
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  const showSearchDropdown = () => {
    setSearchDropdown(true)
  }
  const hideSearchDropdown = () => {
    setSearchDropdown(false)
  }
  const hanldeLogout = () => {
    clearLS()
    dispatch(clearUserAccountAction())
    navigate(routes.home)
  }
  const menuActive: FormattedMenu[] = menuList.filter((menu: FormattedMenu | 'divider') => {
    if (menu != 'divider') {
      return menu.active
    }
  }) as FormattedMenu[]

  return (
    <>
      {/* BEGIN: Top Bar */}
      <div className='h-[67px] z-[51] flex items-center relative border-b border-slate-200'>
        {/* BEGIN: Breadcrumb */}
        <Breadcrumb className='hidden mr-auto -intro-x sm:flex'>
          <Breadcrumb.Link to='/'>Admin</Breadcrumb.Link>
          <Breadcrumb.Link to='/' active={true}>
            {menuActive[0]?.title}
          </Breadcrumb.Link>
        </Breadcrumb>
        {/* END: Breadcrumb */}
        {/* BEGIN: Search */}
        <div className='relative mr-2 intro-x sm:mr-2'>
          <div className='relative hidden sm:block'>
            <FormInput
              type='text'
              className='border-transparent w-56 shadow-none rounded-full bg-slate-300/50 pr-8 transition-[width] duration-300 ease-in-out focus:border-transparent focus:w-72 dark:bg-darkmode-400/70'
              placeholder='Search...'
              onFocus={showSearchDropdown}
              onBlur={hideSearchDropdown}
            />
            <Lucide
              icon='Search'
              className='absolute inset-y-0 right-0 w-5 h-5 my-auto mr-3 text-slate-600 dark:text-slate-500'
            />
          </div>
          <a className='relative text-slate-600 sm:hidden' href=''>
            <Lucide icon='Search' className='w-5 h-5 dark:text-slate-500' />
          </a>
          <Transition
            as={Fragment}
            show={searchDropdown}
            enter='transition-all ease-linear duration-150'
            enterFrom='mt-5 invisible opacity-0 translate-y-1'
            enterTo='mt-[3px] visible opacity-100 translate-y-0'
            leave='transition-all ease-linear duration-150'
            leaveFrom='mt-[3px] visible opacity-100 translate-y-0'
            leaveTo='mt-5 invisible opacity-0 translate-y-1'
          >
            <div className='absolute right-0 z-10 mt-[3px]'>
              <div className='w-[450px] p-5 box'>
                <div className='mb-2 font-medium'>Pages</div>
                <div className='mb-5'>
                  <a href='' className='flex items-center'>
                    <div className='flex items-center justify-center w-8 h-8 rounded-full bg-success/20 dark:bg-success/10 text-success'>
                      <Lucide icon='Inbox' className='w-4 h-4' />
                    </div>
                    <div className='ml-3'>Mail Settings</div>
                  </a>
                  <a href='' className='flex items-center mt-2'>
                    <div className='flex items-center justify-center w-8 h-8 rounded-full bg-pending/10 text-pending'>
                      <Lucide icon='Users' className='w-4 h-4' />
                    </div>
                    <div className='ml-3'>Users & Permissions</div>
                  </a>
                  <a href='' className='flex items-center mt-2'>
                    <div className='flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary/80'>
                      <Lucide icon='CreditCard' className='w-4 h-4' />
                    </div>
                    <div className='ml-3'>Transactions Report</div>
                  </a>
                </div>
                <div className='mb-2 font-medium'>Users</div>
                <div className='mb-5'>
                  {_.take(fakerData, 4).map((faker, fakerKey) => (
                    <a key={fakerKey} href='' className='flex items-center mt-2'>
                      <div className='w-8 h-8 image-fit'>
                        <img alt='Midone Tailwind HTML Admin Template' className='rounded-full' src={faker.photos[0]} />
                      </div>
                      <div className='ml-3'>{faker.users[0].name}</div>
                      <div className='w-48 ml-auto text-xs text-right truncate text-slate-500'>
                        {faker.users[0].email}
                      </div>
                    </a>
                  ))}
                </div>
                <div className='mb-2 font-medium'>Products</div>
                {_.take(fakerData, 4).map((faker, fakerKey) => (
                  <a key={fakerKey} href='' className='flex items-center mt-2'>
                    <div className='w-8 h-8 image-fit'>
                      <img alt='Midone Tailwind HTML Admin Template' className='rounded-full' src={faker.images[0]} />
                    </div>
                    <div className='ml-3'>{faker.products[0].name}</div>
                    <div className='w-48 ml-auto text-xs text-right truncate text-slate-500'>
                      {faker.products[0].category}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </Transition>
        </div>
        {/* END: Search  */}
        {/* BEGIN: Custom theme, dark mode */}
        <div className='mr-2 flex gap-2 items-center'>
          <DarkModeSwitcher />
          <MainColorSwitcher iconColor='text-primary' />
        </div>

        {/* END: Custom theme, dark mode  */}
        {/* BEGIN: Account Menu */}
        <Menu>
          <Menu.Button className='block w-8 h-8 overflow-hidden rounded-full shadow-lg image-fit zoom-in intro-x'>
            <img alt='Midone Tailwind HTML Admin Template' src={fakerData[9].photos[0]} />
          </Menu.Button>
          <Menu.Items className='w-56 mt-px text-white bg-primary'>
            <Menu.Header className='font-normal'>
              <div className='font-medium'>{userAccount.firstName + ' ' + userAccount.lastName}</div>
            </Menu.Header>

            <Menu.Item onClick={hanldeLogout} className='hover:bg-white/5'>
              <Lucide icon='ToggleRight' className='w-4 h-4 mr-2' /> Đăng xuất
            </Menu.Item>
          </Menu.Items>
        </Menu>
      </div>
      {/* END: Top Bar */}
    </>
  )
}

export default Main
