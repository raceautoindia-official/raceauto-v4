import db from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const { username, email, password } = await req.json();

    // Check if email already exists
    const [existingEmail] = await db.execute<RowDataPacket[]>(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    if (existingEmail.length !== 0) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Check if username already exists
    const [existingUsername] = await db.execute<RowDataPacket[]>(
      `SELECT * FROM users WHERE username = ?`,
      [username]
    );
    if (existingUsername.length !== 0) {
      return NextResponse.json(
        { message: "User with this username already exists" },
        { status: 408 }
      );
    }

    // Hash the password
    const hash = await bcrypt.hash(password, 10);

    // Insert the new user into the database
    await db.execute(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, hash]
    );

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 200 }
    );
    
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
