import Link from 'next/link'
import styles from '../styles/Dashboard.module.css'
import Container from '@mui/material/Container'

export default function Custom401() {
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