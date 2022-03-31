import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  if (req.nextUrl.pathname === "/cards") {
    const session = await getToken({
      req,
      secret: process.env.SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) return NextResponse.redirect("/auth/signin");
    // If user is authenticated, continue.
  }
  if (req.nextUrl.pathname === "/create") {
    const session = await getToken({
      req,
      secret: process.env.SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) return NextResponse.redirect("/auth/signin");
    // If user is authenticated, continue.
  }
  if (req.nextUrl.pathname === "/auth/signin") {
    const session = await getToken({
      req,
      secret: process.env.SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (session) return NextResponse.redirect("/cards");
    // If user is authenticated, continue.
  }
  if (req.nextUrl.pathname === "/resetpassword") {
    const session = await getToken({
      req,
      secret: process.env.SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (session) return NextResponse.redirect("/cards");
    // If user is authenticated, continue.
  }
  if (req.nextUrl.pathname === "/pricing") {
    const session = await getToken({
      req,
      secret: process.env.SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) return NextResponse.redirect("/auth/signin");
    // If user is authenticated, continue.
  }
  if (req.nextUrl.pathname === "/subscription") {
    const session = await getToken({
      req,
      secret: process.env.SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) return NextResponse.redirect("/auth/signin");
    // If user is authenticated, continue.
  }
  if (req.nextUrl.pathname === "/insights") {
    const session = await getToken({
      req,
      secret: process.env.SECRET,
      secureCookie: process.env.NODE_ENV === "production",
    });
    // You could also check for any property on the session object,
    // like role === "admin" or name === "John Doe", etc.
    if (!session) return NextResponse.redirect("/auth/signin");
    // If user is authenticated, continue.
  }
}
