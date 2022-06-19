import { NextSeo } from "next-seo";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <NextSeo
        title="Submarine Dating"
        description="Dating website for unique people."
      />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/submarine.svg" />
      </Head>
      {children}
    </>
  );
}
