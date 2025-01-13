import EmailVerifierPage from "@/components/Page/EmailVerifierPage/EmailVerifierPage";
import { meta } from "@/constants/meta";
import Head from "next/head";

function EmailVerifier() {
  return (
    <>
      <Head>
        <title>Emailery - Clean your email list</title>
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
