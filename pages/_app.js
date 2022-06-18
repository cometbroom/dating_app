import { CssBaseline, ThemeProvider } from "@mui/material";
import { DefaultSeo } from "next-seo";
import seoConfig from "../seo.config";
import Layout from "../src/components/layout";
import configurateTheme from "../src/tools/ThemeConfig";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const theme = configurateTheme();

  return (
    <>
      <DefaultSeo {...seoConfig} />
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
