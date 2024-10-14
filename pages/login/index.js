import LoginPage from "@/components/Page/LoginPage/LoginPage";
import { meta } from "@/constants/meta";
import Head from "next/head";

function Login() {
  return (
    <>
      <Head>
        <title>Login to Emailery</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.webUrl} />
        <meta property="og:type" content="website" />
      </Head>
      <LoginPage />
    </>
  );
}

export default Login;
