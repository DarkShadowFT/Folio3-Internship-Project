import Head from "next/head";
import {useRouter} from "next/router";

export default function Home() {
  const router = useRouter()
  router.prefetch("/login")

  return (
    <Head>
      <title>Find Me A Doctor</title>
      <meta name="description" content="" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
