import { NextResponse } from "next/server";

export async function GET(req) {
  const jwt = req.cookies.get("jwt")?.value;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signout`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json", Cookie: `jwt=${jwt}` },
    }
  );

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(data, { status: res.status });
  }

  const response = NextResponse.json(data);

  // 🔥 Clear the cookie by overwriting it
  response.cookies.set({
    name: "jwt",
    value: "",
    httpOnly: true,
    secure: true,
    sameSite: "none",
    path: "/",
    maxAge: 0, // expire immediately
  });

  return response;
}
