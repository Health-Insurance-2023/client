import { Dispatch, SetStateAction } from 'react'
import { NavigateFunction } from 'react-router-dom'
import { slideUp, slideDown } from '../../utils/helper'
import { FormattedMenu } from 'src/utils/side-menu'

const linkTo = (
  menu: FormattedMenu,
  navigate: NavigateFunction,
  setActiveMobileMenu: Dispatch<SetStateAction<boolean>>
) => {
  if (menu.subMenu) {
    menu.activeDropdown = !menu.activeDropdown
  } else {
    if (menu.pathname !== undefined) {
      setActiveMobileMenu(false)
      navigate(menu.pathname)
    }
  }
}

const enter = (el: HTMLElement) => {
  slideDown(el, 300)
}

const leave = (el: HTMLElement) => {
  slideUp(el, 300)
}

export { linkTo, enter, leave }
