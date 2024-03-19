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
      pathname: '/user/profile',
      title: 'Thông tin'
    },
    {
      icon: 'FileText',
      title: 'Đơn đăng ký',
      pathname: '/user/form'
    },
    {
      icon: 'HeartHandshake',
      title: 'Hợp đồng của tôi',
      pathname: '/user/contract'
    },
    {
      icon: 'CreditCard',
      title: 'Thanh toán',
      pathname: '/user/payment'
    },
    {
      icon: 'Wallet',
      title: 'Yêu cầu bồi thường',
      pathname: '/user/claim/management'
    },
    {
      icon: 'HeartPulse',
      title: 'Sức khỏe',
      pathname: '/user/health/management'
    }
  ]
}

export const userSideMenuSlice = createSlice({
  name: 'sideMenu',
  initialState,
  reducers: {}
})

export const selectUserSideMenu = (state: RootState) => state.rootReducer.userSideMenu.menu

export default userSideMenuSlice.reducer
