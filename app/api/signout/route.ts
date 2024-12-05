import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Cookie removed successfully" });
  
  // Clear the 'authtoken' cookie by setting it with an expired date
  response.cookies.delete('authToken')

  return response;
}