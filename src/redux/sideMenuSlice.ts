import { createSlice } from '@reduxjs/toolkit'
import { RootState } from './store'
import { icons } from 'src/components/Lucide'

export interface Menu {
  icon: keyof typeof icons
  title: string
  pathname?: string
  subMenu?: Menu[]
  ignore?: boolean
}

export interface SideMenuState {
  menu: Array<Menu | 'divider'>
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: 'Home',
      pathname: '/admin/dashboard',
      title: 'Dashboard'
    },
    {
      icon: 'Users',
      title: 'Quản lý tài khoản',
      pathname: '/admin/account-management'
    },
    {
      icon: 'FileText',
      title: 'Quản lý đơn đăng ký',
      pathname: '/admin/form-management'
    },
    {
      icon: 'HeartHandshake',
      title: 'Quản lý hợp đồng',
      pathname: '/admin/contract-management'
    },
    {
      icon: 'CreditCard',
      title: 'Thanh toán',
      pathname: '/admin/payment-management'
    },
    {
      icon: 'Wallet',
      title: 'Yêu cầu bồi thường',
      pathname: '/admin/claim-management'
    },
    {
      icon: 'ShieldCheck',
      title: 'Gói bảo hiểm',
      pathname: '/admin/insurance-package-management'
    }
  ]
}

export const sideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {}
})

export const selectSideMenu = (state: RootState) => state.rootReducer.sideMenu.menu

export default sideMenuSlice.reducer
