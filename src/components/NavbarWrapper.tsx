"use client";

import { usePathname }  from "next/navigation";
import Navbar from "./Navbar";


export default function NavbarWrapper() {
    const pathname = usePathname() ?? "";

    // Hide navbar on any route that starts with /login or /signup
    // This covers /login, /login/, /login/verify, etc.
    const hideNavbar = pathname.startsWith("/login") || pathname.startsWith("/signup");

    if (hideNavbar) return null;

    return <Navbar />;
}