import Head from "next/head";

export default function Layout({children}) {
  return (
    <>
      <Head>
        <title>Find Me A Doctor</title>
        <meta name="description" content=""/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>
      <main>{children}</main>
    </>
  )
}