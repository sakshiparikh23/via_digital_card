import Head from "next/head";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import LandingPage from "../components/Landing/LandingPage";
import { Navbar } from "../components/Navbar";

const Index = () => (
  <>
    <Head>
      <title>Via Digital Card | Landing Page</title>
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/assets/images/favicon.ico"
      ></link>
      
    </Head>
    <>
      <DarkModeSwitch />
      <Navbar />
      <LandingPage />
    </>
  </>
);

export default Index;
