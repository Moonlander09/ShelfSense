import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signin`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  const response = NextResponse.json(data);

  response.cookies.set({
    name: "jwt",
    value: data.token,
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: process.env.COOKIE_EXPIRES * 60 * 60 * 24 * 1000,
  });

  return response;
}