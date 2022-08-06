import Link from 'next/link'
import styles from '../styles/Dashboard.module.css'
import Container from '@mui/material/Container'

export default function Custom403() {
  return (
    <>
      <Container>
        <h1>{"403 - Unauthorized"}</h1>
        <Link href="/login">
          <a className={styles.link}>
            {"Login Again?"}
          </a>
        </Link>
      </Container>
    </>
  )
}