import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  // ✅ READ JWT FROM FRONTEND COOKIE
  const jwt = req.cookies.get("jwt")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/updatePassword`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Cookie: `jwt=${jwt}` },
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
