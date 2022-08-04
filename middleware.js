import {NextResponse} from "next/server"

export default function middleware(req) {
  const url = req.url;

  if (
    url.includes("/dashboard") ||
    url.includes("/doctors-list") ||
    url.includes("/my-appointments") ||
    url.includes("/booking-form") ||
    url.includes("/login")
  ) {

    // if (!verifyToken(req.headers))
    // return NextResponse.redirect("/login");

    return NextResponse.next();
  }

  return NextResponse.next();
}
