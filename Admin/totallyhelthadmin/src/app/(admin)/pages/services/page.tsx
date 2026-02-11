import React from 'react'
import PageTItle from '@/components/PageTItle'
import { Metadata } from 'next'

import Services from './services'

export const metadata: Metadata = { title: 'Services' }

const ServicesPage = () => {
  return (
    <>
      <PageTItle title="Services" />
      <Services />
    </>
  )
}

export default ServicesPage
