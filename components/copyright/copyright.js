import Typography from "@mui/material/Typography";
import Link from "next/link";
import MUILink from "@mui/material/Link";

export default function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {"Copyright © "}
        <MUILink color="inherit">
          <Link href="/dashboard">
            {"Find Me A Doctor"}
          </Link>
        </MUILink>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }
