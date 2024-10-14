import "@/styles/globals.css";
import { ConfigProvider } from "antd";
import { GoogleTagManager } from "@next/third-parties/google"
export default function App({ Component, pageProps }) {
  return (
    <ConfigProvider>
      <Component {...pageProps} />
      <GoogleTagManager gtmId="GTM-P227RZ4K" />
    </ConfigProvider>
  );
}
