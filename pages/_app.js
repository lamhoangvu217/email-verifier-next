import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import { GoogleTagManager } from "@next/third-parties/google";
import { RecoilRoot } from "recoil";
export default function App({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <ConfigProvider>
        <Component {...pageProps} />
        <GoogleTagManager gtmId="GTM-P227RZ4K" />
      </ConfigProvider>
    </RecoilRoot>
  );
}
