import Link from 'next/link'
import styles from '../styles/Dashboard.module.css'
import Container from '@mui/material/Container'
import Layout from "../components/Layout";
import {Box} from "@mui/material";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function Custom401() {
  const router = useRouter()

  useEffect(() => {
    (async() => {
      await router.replace('./401')
    })()
  }, [])

  return (
    <>
      <Container>
        <h1>{"401 - Unauthorized"}</h1>
        <Link href="/login">
          <a className={styles.link}>
            {"Login"}
          </a>
        </Link>
      </Container>
    </>
  )
}

Custom401.getLayout = function getLayout(page) {
  return (
    <Layout>
      <Box sx={{display: "flex"}}>
        {page}
      </Box>
    </Layout>
  )
}