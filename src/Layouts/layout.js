import { AnimatePresence, motion } from "framer-motion";
import { NextSeo } from "next-seo";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <>
      <NextSeo
        title="Submarine Social"
        description="Social website for unique people."
      />
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/submarine.svg" />
      </Head>
      <AnimatePresence>
        <motion.div exit={{ opacity: 0, transition: { duration: 1 } }}>
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
