import Head from "next/head";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function Home() {
  const router = useRouter()
  router.replace("/login")

  return (
    <Head>
      <title>Find Me A Doctor</title>
      <meta name="description" content="" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
