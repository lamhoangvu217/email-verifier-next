import React from "react";
import { createCache, extractStyle, StyleProvider } from "@ant-design/cssinjs";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { meta } from "@/constants/meta";

const MyDocument = () => (
  <Html lang="en">
    <Head>
      <meta
        name="description"
        content={meta.description}
      />
      <meta name="robots" content="index,follow" />
      <meta property="og:title" content={meta.title} />
      <meta
        property="og:description"
        content={meta.description}
      />
      <meta property="og:url" content={meta.webUrl} />
      <meta
        name="google-adsense-account"
        content={`ca-pub-${process.env.NEXT_PUBLIC_URL_GG_ADS_CODE}`}
      />
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-${process.env.NEXT_PUBLIC_URL_GG_ADS_CODE}`}
        crossOrigin="anonymous"
      ></script>
    </Head>
    <body>
      <Main />
      <NextScript />
    </body>
  </Html>
);
MyDocument.getInitialProps = async (ctx) => {
  const cache = createCache();
  const originalRenderPage = ctx.renderPage;
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <StyleProvider cache={cache}>
            <App {...props} />
          </StyleProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const style = extractStyle(cache, true);
  return {
    ...initialProps,
    styles: (
      <>
        {initialProps.styles}
        <style dangerouslySetInnerHTML={{ __html: style }} />
      </>
    ),
  };
};
export default MyDocument;
