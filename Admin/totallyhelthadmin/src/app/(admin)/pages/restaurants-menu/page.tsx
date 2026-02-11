import React from 'react'
import PageTItle from '@/components/PageTItle'
import { Metadata } from 'next'
<<<<<<< HEAD
import RestaurantsMenu from './components/RestaurantsMenu'

export const metadata: Metadata = { title: 'Restaurants Menu' }

const RestaurantsMenuPage = () => {
  return (
    <>
      <PageTItle title="Restaurants Menu" />
      <RestaurantsMenu />
=======

import MenuManagement from './restaurants-menu-add/page'
export const metadata: Metadata = { title: 'Menu Management' }

const MenuManagementPage = () => {
  return (
    <>
      <PageTItle title="Menu Management" />
      <MenuManagement />
>>>>>>> origin/main
    </>
  )
}

<<<<<<< HEAD
export default RestaurantsMenuPage
=======
export default MenuManagementPage
>>>>>>> origin/main
