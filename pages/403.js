import Link from 'next/link'
import styles from '../styles/Dashboard.module.css'
import Container from '@mui/material/Container'
import Layout from "../components/Layout";
import {Box} from "@mui/material";
import Custom401 from "./401";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function Custom403() {
  const router = useRouter()

  useEffect(() => {
    (async() => {
      await router.replace('./403')
    })()
  }, [])

  return (
    <>
      <Container>
        <h1>{"403 - Forbidden"}</h1>
        <Link href="/login">
          <a className={styles.link}>
            {"Login again?"}
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