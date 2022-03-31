import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import theme from "../theme";
import "../components/Landing/landing-page.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Progress } from "../components/progress/Progress";
import { useProgressStore } from "../store";
import Script from "next/script";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const setIsAnimating = useProgressStore((state) => state.setIsAnimating);
  const isAnimating = useProgressStore((state) => state.isAnimating);
  const router = useRouter();
  useEffect(() => {
    const handleStart = () => {
      setIsAnimating(true);
    };
    const handleStop = () => {
      setIsAnimating(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleStop);
    router.events.on("routeChangeError", handleStop);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleStop);
      router.events.off("routeChangeError", handleStop);
    };
  }, [router]);
  return (
    <>
      <Script
        id="my-script"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-MTB3GT7J8C`}
      />

      <Script id="my-script1" strategy="lazyOnload">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-MTB3GT7J8C', {
        page_path: window.location.pathname,
        });
    `}
      </Script>
      <SessionProvider session={session}>
        <ChakraProvider theme={theme}>
          <ColorModeProvider
            options={{
              useSystemColorMode: false,
            }}
          >
            <Progress isAnimating={isAnimating} />
            <Component {...pageProps} />
          </ColorModeProvider>
        </ChakraProvider>
      </SessionProvider>
    </>
  );
}

export default MyApp;
