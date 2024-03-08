import Head from "next/head";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import HomeView from "@/ui/views/home";

function Home() {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <>
      <Head>{t("AppTitle")}</Head>
      <main>
        <HomeView />
      </main>
    </>
  );
}

export default Home;
