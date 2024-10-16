import AccountPage from '@/components/Page/AccountPage/AccountPage'
import { meta } from '@/constants/meta'
import Head from 'next/head'
import React from 'react'

function Account() {
  return (
    <>
    <Head>
      <title>Account Settings - Emailery</title>
      <meta name="description" content={meta.description} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={meta.webUrl} />
      <meta property="og:type" content="website" />
    </Head>
    <AccountPage />
  </>
  )
}

export default Account