import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { chakraTheme } from "@/ui/theme/chakraTheme";
import { I18nextProvider } from "react-i18next";
import { i18n } from "@/infrastructure/config/i18n.config";
import Navbar from "@/ui/components/Navbar/Navbar";
import Footer from "@/ui/components/Footer/Footer";
import { AuthProvider } from "@/context/auth.context";
import { ModalProvider } from "@/context/modal.context";
import { GoogleMapsProvider } from "@/context/googleMapsLoader.context";
import Head from "next/head";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <I18nextProvider i18n={i18n}>
      <ChakraProvider theme={chakraTheme}>
        <AuthProvider>
          <GoogleMapsProvider>
            <ModalProvider>
              <Head>
                <link rel="icon" href="/Images/wecookinfavicon.png" />
                <title>We Cookin'</title>
              </Head>
              <Navbar />
              <Component {...pageProps} />
              <Footer />
            </ModalProvider>
          </GoogleMapsProvider>
        </AuthProvider>
      </ChakraProvider>
    </I18nextProvider>
  );
}
