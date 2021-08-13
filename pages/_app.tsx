import "../styles/globals.css";
import type { AppProps } from "next/app";
import intl from "react-intl-universal";
import { useRouter } from "next/router";
import zh_CN from "../locale/zh-CN";
import en_US from "../locale/en-US";
import Head from "next/head";
import PageTitle from "../components/title";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  intl.init({
    locales: {
      "zh-CN": zh_CN,
      "en-US": en_US,
    },
    currentLocale: router.locale,
  });
  return (
    <>
      <Head>
        <meta name="description" content="NextJs,React Lib" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
