import React from 'react'
import PageTItle from '@/components/PageTItle'
import { Metadata } from 'next'

import PartnerInHealth from './healthPartner'

export const metadata: Metadata = { title: 'Partner in Health' }

const PartnerInHealthPage = () => {
  return (
    <>
      <PageTItle title="Partner in Health" />
      <PartnerInHealth />
    </>
  )
}

export default PartnerInHealthPage
