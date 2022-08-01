import React from "react"
import { Outlet } from "react-router-dom"
import Link from "next/link";
import { useAuth } from "../contexts/AuthContext"

export default function PrivateRoute() {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet/> : <Link href="/login" />;
}
