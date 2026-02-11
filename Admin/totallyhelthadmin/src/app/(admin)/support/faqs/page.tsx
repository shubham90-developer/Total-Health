import React from 'react'
import PageTItle from '@/components/PageTItle'
import { Metadata } from 'next'
import FAQs from './components/FAQ'

export const metadata: Metadata = { title: 'FAQs' }

const FaqsPage = () => {
  return (
    <>
      <PageTItle title="FAQs" />
      <FAQs />
    </>
  )
}

export default FaqsPage
