import { CssBaseline, ThemeProvider } from "@mui/material";
import LandingContent from "../src/components/LandingContent";
import Layout from "../src/components/layout";
import Navbar from "../src/components/Navbar";
import configurateTheme from "../src/tools/ThemeConfig";


export default function Home() {
  return (
    <>
      <Navbar></Navbar>
      <LandingContent></LandingContent>
    </>
  );
}
