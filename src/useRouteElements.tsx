import { /* Suspense, lazy,  */ useContext } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import routes from './constants/routes'
import { AppContext } from './contexts/app.context'
/* Layout */
import MainLayout from './layouts/MainLayout'
/* Pages */
import Auth from './pages/Auth'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ConfirmAccount from './pages/ConfirmAccount'
import AdminLayout from './layouts/AdminLayout'
import Dashboard from './pages/Admin/Dashboard'
import FormManagement from './pages/Admin/FormManagement'
import Profile from './pages/User/UserProfile'
import UserLayout from './layouts/UserLayout'
import InsuranceService from './pages/InsuranceService'
import Request from './pages/Request'
import Support from './pages/Support'
import RegisterInsurance from './pages/RegisterInsurance'
import { useSelector } from 'react-redux'
import { RootState } from './redux/store'
import ContractManegement from './pages/Admin/ContractManegement'
import UserFormManagement from './pages/User/UserFormManagement'
import UserPaymentManagement from './pages/User/UserPaymentManagement'
import PaymentManagement from './pages/Admin/PaymentManagement'
import UserContractManagement from './pages/User/UserContractManagement'
import UserClaimManagement from './pages/User/UserClaimManagement'
import UserClaimRequest from './pages/User/UserClaimRequest'
import ClaimManagement from './pages/Admin/ClaimManagement'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import UserHealthManagement from './pages/User/UserHealthManagement'

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Navigate to={routes.home} /> : <Outlet />
}

function PrivateRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={routes.login} />
}

function AdminRoute() {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  return userAccount?.role === 'ROLE_ADMIN' ? <Outlet /> : <Navigate to={routes.home} />
}

function UserRoute() {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  return userAccount?.role === 'ROLE_USER' ? <Outlet /> : <Navigate to={routes.home} />
}

function IsNotAdmin() {
  const userAccount = useSelector((state: RootState) => state.rootReducer.userAccountReducer)
  return userAccount?.role !== 'ROLE_ADMIN' ? <Outlet /> : <Navigate to={routes.dashboard} />
}

function useRouteElements() {
  const routeElements = useRoutes([
    /* Trang chủ */
    {
      path: '',
      element: <IsNotAdmin />,
      children: [
        {
          path: '',
          element: <MainLayout />,
          children: [
            {
              path: routes.home,
              element: <Home />
            },
            {
              path: routes.service,
              element: <InsuranceService />
            },
            {
              path: routes.support,
              element: <Support />
            }
          ]
        }
      ]
    },
    /* private route */
    {
      path: '',
      element: <PrivateRoute />,
      children: [
        {
          path: routes.home,
          element: <MainLayout />,
          children: [
            {
              path: routes.registerInsurance,
              element: <RegisterInsurance />
            }
          ]
        }
      ]
    },
    /* đăng nhập, đăng ký, xác thực email, quên mật khẩu */
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: routes.login,
          element: <Auth />
        },
        {
          path: routes.confirmAccount,
          element: <ConfirmAccount />
        },
        {
          path: routes.forgotPassword,
          element: <ForgotPassword />
        },
        {
          path: routes.resetPassword,
          element: <ResetPassword />
        }
      ]
    },
    /* role admin */
    {
      path: '',
      element: <AdminRoute />,
      children: [
        {
          path: '',
          element: <AdminLayout />,
          children: [
            {
              path: routes.dashboard,
              element: <Dashboard />
            },
            {
              path: routes.formManagement,
              element: <FormManagement />
            },
            {
              path: routes.contractManagemet,
              element: <ContractManegement />
            },
            {
              path: routes.paymentManagement,
              element: <PaymentManagement />
            },
            {
              path: routes.claimManagement,
              element: <ClaimManagement />
            }
          ]
        }
      ]
    },
    /* Role user: thông tin, quản lý các hợp đồng, đơn đăng ký */
    {
      path: '',
      element: <UserRoute />,
      children: [
        {
          path: '',
          element: <UserLayout />,
          children: [
            {
              path: routes.profile,
              element: <Profile />
            },
            {
              path: routes.userFormManagement,
              element: <UserFormManagement />
            },
            {
              path: routes.userPaymentManagement,
              element: <UserPaymentManagement />
            },
            {
              path: routes.userContractManagement,
              element: <UserContractManagement />
            },
            {
              path: routes.userClaimManagement,
              element: <UserClaimManagement />
            },
            {
              path: routes.claimRequest,
              element: <UserClaimRequest />
            },
            {
              path: routes.userHealthManagement,
              element: <UserHealthManagement />
            }
          ]
        }
      ]
    },
    {
      path: '',
      element: <Request />,
      children: [
        {
          path: routes.request,
          element: <Request />
        }
      ]
    },
    /* page not found */
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routeElements
}

export default useRouteElements
