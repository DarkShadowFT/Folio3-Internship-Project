import Typography from "@mui/material/Typography"
import Link from "next/link"
import styles from '../styles/Dashboard.module.css'
import Container from "@mui/material/Container";

export default function Copyright(props) {
  return (
    <Container sx={{bottom: 0, height: 45, top: "95vh"}}>
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {"Copyright © "}
        <Link href="/dashboard">
          <a className={styles.link}>{"Find Me A Doctor"}</a>
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Container>
  );
}
