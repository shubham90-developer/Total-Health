import React from 'react'
import PageTItle from '@/components/PageTItle'
import { Metadata } from 'next'
import RestoBanner from './restoBanner'

export const metadata: Metadata = { title: 'Resto Banner' }

const RestoBannerPage = () => {
  return (
    <>
      <PageTItle title="Resto Banner" />
      <RestoBanner />
    </>
  )
}

export default RestoBannerPage
