import HowToUsePage from "@/components/Page/HowToUsePage/HowToUsePage";
import { meta } from "@/constants/meta";
import Head from "next/head";

function HowToUse() {
  return (
    <>
      <Head>
        <title>How to use Email Verifier</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.webUrl} />
        <meta property="og:type" content="website" />
      </Head>
      <HowToUsePage />
    </>
  );
}

export default HowToUse;
