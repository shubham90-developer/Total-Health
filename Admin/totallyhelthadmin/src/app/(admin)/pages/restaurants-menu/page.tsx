import React from 'react'
import PageTItle from '@/components/PageTItle'
import { Metadata } from 'next'

import MenuManagement from './restaurants-menu-add/page'
export const metadata: Metadata = { title: 'Menu Management' }

const MenuManagementPage = () => {
  return (
    <>
      <PageTItle title="Menu Management" />
      <MenuManagement />
    </>
  )
}

export default MenuManagementPage
