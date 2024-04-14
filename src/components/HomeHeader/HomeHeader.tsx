import { useEffect, useState } from 'react'

import { Typography, Button, MenuHandler, MenuList, MenuItem, Menu, Avatar } from '@material-tailwind/react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'src/redux/store'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import routes from 'src/constants/routes'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons'
import logo from 'src/assets/images/icon/icon-02-primary.png'
import { clearUserAccountAction } from 'src/redux/actions/userAccountAction'
import { clearLS } from 'src/utils/auth'
import classNames from 'classnames'

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const hanldeLogout = () => {
    clearLS()
    dispatch(clearUserAccountAction())
    navigate(routes.home)
  }

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement='bottom-end'>
      <MenuHandler>
        <Button
          variant='text'
          color='blue-gray'
          className='flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto'
        >
          <Avatar
            variant='circular'
            size='sm'
            alt='tania andrew'
            className='border border-gray-900 p-0.5'
            src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'
          />
          <FontAwesomeIcon
            icon={faChevronDown}
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`}
          />
        </Button>
      </MenuHandler>
      <MenuList className='p-1 z-[9999]'>
        <Link to={routes.profile}>
          <MenuItem className={`flex items-center gap-2 rounde text-black`}>
            <FontAwesomeIcon icon={faUser} />
            <Typography as='span' variant='small' className='font-semibold' color={'inherit'}>
              {userAccount.firstName + ' ' + userAccount.lastName}
            </Typography>
          </MenuItem>
        </Link>
        <MenuItem
          onClick={hanldeLogout}
          className={`flex items-center gap-2 rounded isLastItem ? 'hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10'`}
        >
          <FontAwesomeIcon icon={faRightFromBracket} className='text-red-500' />
          <Typography as='span' variant='small' className='font-semibold' color={'red'}>
            Đăng xuất
          </Typography>
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

function HomeHeader() {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)

  useEffect(() => {
    window.addEventListener('scroll', function () {
      var navbar = document.querySelector('.sticky-top')

      if (window.scrollY > 150) {
        navbar.classList.remove('-top-[100px]')
        navbar.classList.add('drop-shadow-md', 'top-0', 'sticky')
      } else {
        navbar.classList?.remove('drop-shadow-md', 'top-0', 'sticky')
        navbar.classList?.add('-top-[100px]')
      }
    })
  }, [])

  return (
    <div className='z-[9999] sticky-top transition-all duration-500'>
      {/* <!-- Navbar Start --> */}
      <nav className='flex justify-between relative flex-wrap items-center content-between py-3 px-4 bg-white text-black pl-10 pr-4'>
        <a href={routes.home} className='mr-4 text-lg whitespace-no-wrap flex items-center'>
          <h1 className='m-0 flex items-center'>
            <img className='max-w-full w-[60px] h-auto mr-3' src={logo} alt='' />
            <span className='text-4xl font-semibold font-[Poppins,sans-serif]'>Insure</span>
          </h1>
        </a>
        <button
          type='button'
          className='py-1 px-2 text-md leading-normal bg-transparent border border-transparent rounded xl:hidden'
          data-bs-toggle='collapse'
          data-bs-target='#navbarCollapse'
        >
          <span className='px-5 py-1 border border-gray-600 rounded '></span>
        </button>
        <div className='my-0' id='navbarCollapse'>
          <div className='flex justify-center items-center gap-6 bg-[#F6F7FC] rounded px-6 py-3 lg:py-[10px]'>
            <NavLink
              to={routes.home}
              className={({ isActive }) =>
                classNames(
                  'inline-block font-semibold hover:text-[#015FC9]',
                  {
                    'text-[#015FC9]': isActive
                  },
                  { 'text-[#696E77]': !isActive }
                )
              }
            >
              Trang chủ
            </NavLink>
            <NavLink
              to={routes.support}
              className={({ isActive }) =>
                classNames(
                  'inline-block font-semibold hover:text-[#015FC9]',
                  {
                    'text-[#015FC9]': isActive
                  },
                  { 'text-[#696E77]': !isActive }
                )
              }
            >
              Hỗ trợ
            </NavLink>
            <NavLink
              to={routes.service}
              className={({ isActive }) =>
                classNames(
                  'inline-block font-semibold hover:text-[#015FC9]',
                  {
                    'text-[#015FC9]': isActive
                  },
                  { 'text-[#696E77]': !isActive }
                )
              }
            >
              Dịch vụ
            </NavLink>
            <NavLink
              to={routes.registerInsurance}
              className={({ isActive }) =>
                classNames(
                  'inline-block font-semibold hover:text-[#015FC9]',
                  {
                    'text-[#015FC9]': isActive
                  },
                  { 'text-[#696E77]': !isActive }
                )
              }
            >
              Đăng ký
            </NavLink>
          </div>
        </div>
        {!userAccount.email ? (
          <div className='flex items-center gap-x-1'>
            <Link to={routes.login}>
              <Button variant='text' color='blue' size='sm' className=' hidden lg:inline-block '>
                <span className='py-2'>Đăng ký</span>
              </Button>
            </Link>
            <Link to={routes.login}>
              <Button variant='gradient' size='sm' color='blue' className='hidden lg:inline-block'>
                <span>Đăng nhập</span>
              </Button>
            </Link>
          </div>
        ) : (
          <div className='flex gap-4 justify-center items-center'>
            <Link to={routes.registerInsurance}>
              <button className='rounded-[10px] bg-[#015fc9] text-white hover:bg-[#0dd3f1] align-middle text-center border font-normal py-1 px-3 hidden lg:block'>
                Nhận báo giá
              </button>
            </Link>
            <ProfileMenu />
          </div>
        )}
      </nav>
      {/* <!-- Navbar End --> */}
    </div>
  )
}

export default HomeHeader
