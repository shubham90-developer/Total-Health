import React from 'react'
import PageTItle from '@/components/PageTItle'
import { Metadata } from 'next'
import HealthBenefits from './components/HealthBenefits'

export const metadata: Metadata = { title: 'Health Benefits' }

const HealthBenefitsPage = () => {
  return (
    <>
      <PageTItle title="Health Benefits" />
      <HealthBenefits />
    </>
  )
}

export default HealthBenefitsPage
