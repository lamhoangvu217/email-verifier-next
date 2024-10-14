import AboutPage from '@/components/Page/AboutPage/AboutPage'
import { meta } from '@/constants/meta'
import Head from 'next/head'
import React from 'react'

function About() {
  return (
    <>
      <Head>
        <title>About Emailery</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.webUrl} />
        <meta property="og:type" content="website" />
      </Head>
      <AboutPage />
    </>
    
  )
}

export default About