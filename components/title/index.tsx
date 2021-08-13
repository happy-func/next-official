import Head from "next/head";

export default function PageTitle({ title = "next-official" }) {
  return (
    <Head>
      <title>{title}</title>
    </Head>
  );
}
