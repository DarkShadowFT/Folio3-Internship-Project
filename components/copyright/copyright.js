import Typography from "@mui/material/Typography"
import Link from "next/link"
import styles from '../../styles/Dashboard.module.css'

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      <Link href="/dashboard">
        <a className={styles.link}>{"Find Me A Doctor"}</a>
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
