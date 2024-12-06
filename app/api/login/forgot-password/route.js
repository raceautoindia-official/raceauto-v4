import db from "@/lib/db";
import { mailDetails, mailTransporter } from "@/utils/Mailer";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { email } = await req.json();
    const [user] = await db.execute(`SELECT * FROM users WHERE email = ?`, [
      email,
    ]);

    if (user.length == 0) {
      return NextResponse.json(
        { err: "No user with that email address" },
        { status: 404 }
      );
    }

    const resetToken = jwt.sign({ email: email }, process.env.JWT_KEY, {
      expiresIn: "1hr",
    });
    const link = `${process.env.NEXT_PUBLIC_BACKEND_URL}verifytoken/${resetToken}`;
    mailTransporter.sendMail(
      {
        ...mailDetails,
        to: email,
        subject: "Reset-password Link",
        text: `Please click this link: ${link}`,
      },
      function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      }
    );
    return NextResponse.json(resetToken);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "internal server error" }, { status: 500 });
  }
}
