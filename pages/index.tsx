import Head from "next/head";
import Banner from "../business/home/banner";
import Attachment from "../business/home/attachment/Attachment";
import Macbook from "../business/home/macbook";

export default function Home() {
  return (
    <div>
      <Head>
        <title>首页</title>
        <meta name="description" content="官网首页" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Macbook />
      <Banner />
      <Attachment />
    </div>
  );
}
