import PlanPage from "@/components/Page/PlanPage/PlanPage";
import { meta } from "@/constants/meta";
import Head from "next/head";

function Pricing() {
  return (
    <>
      <Head>
        <title>Plans</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.webUrl} />
        <meta property="og:type" content="website" />
      </Head>
      <PlanPage />
    </>
  );
}

export default Pricing;
