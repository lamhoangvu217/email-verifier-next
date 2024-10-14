import EmailVerifierPage from "@/components/Page/EmailVerifierPage/EmailVerifierPage";
import { meta } from "@/constants/meta";
import Head from "next/head";
import React from "react";

function EmailVerifier() {
  return (
    <>
      <Head>
        <title>Email Verifier</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.webUrl} />
        <meta property="og:type" content="website" />
      </Head>
      <EmailVerifierPage />
    </>
  );
}

export default EmailVerifier;
