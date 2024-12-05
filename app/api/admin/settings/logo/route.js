import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const [result] = await db.execute(
      `SELECT logo, logo_footer, logo_email, favicon FROM general_settings WHERE id = 1`
    );
    return NextResponse.json(result);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "internal error" }, { status: 500 });
  }
}

export async function PUT(req) {
  const payload = await req.formData();
  const logo = payload.get("logo");
  const logo_footer = payload.get("logo_footer");
  const logo_email = payload.get("logo_email");
  const favicon = payload.get("favicon");

  try {
    let query = "UPDATE general_settings SET ";
    let values = [];
    let updates = [];

    const primaryUploadDir = path.join(process.cwd(), "public/uploads/logo");

    if (!fs.existsSync(primaryUploadDir)) {
      fs.mkdirSync(primaryUploadDir, { recursive: true });

      const htmlContent = `<!DOCTYPE html>
            <html>
            <head>
              <title>403 Forbidden</title>
            </head>
            <body>
              <p>Directory access is forbidden.</p>
            </body>
            </html>`;

      fs.writeFileSync(`${primaryUploadDir}/index.html`, htmlContent);
    }

    if (logo) {
      updates.push("logo = ?");
      const imageFilename = logo.name;
      const imageFileExtension = path.extname(imageFilename);
      const newimagename = `${uuidv4()}${imageFileExtension}`;
      const imagePath = path.join(primaryUploadDir, newimagename);

      // Save the first file
      const firstFileBuffer = Buffer.from(await logo.arrayBuffer());

      fs.writeFileSync(imagePath, firstFileBuffer);
      const logourl = `uploads/logo/${newimagename}`;
      values.push(logourl);
    }

    if (logo_footer) {
      updates.push("logo_footer = ?");
      const imageFilename = logo_footer.name;
      const imageFileExtension = path.extname(imageFilename);
      const newimagename = `${uuidv4()}${imageFileExtension}`;
      const imagePath = path.join(primaryUploadDir, newimagename);

      // Save the first file
      const firstFileBuffer = Buffer.from(await logo_footer.arrayBuffer());

      fs.writeFileSync(imagePath, firstFileBuffer);
      const logo_footerurl = `uploads/logo/${newimagename}`;
      values.push(logo_footerurl);
    }

    if (logo_email) {
      updates.push("logo_email = ?");
      const imageFilename = logo_email.name;
      const imageFileExtension = path.extname(imageFilename);
      const newimagename = `${uuidv4()}${imageFileExtension}`;
      const imagePath = path.join(primaryUploadDir, newimagename);

      // Save the first file
      const firstFileBuffer = Buffer.from(await logo_email.arrayBuffer());

      fs.writeFileSync(imagePath, firstFileBuffer);
      const logo_emailurl = `uploads/logo/${newimagename}`;
      values.push(logo_emailurl);
    }

    if (favicon) {
      updates.push("favicon = ?");
      const imageFilename = favicon.name;
      const imageFileExtension = path.extname(imageFilename);
      const newimagename = `${uuidv4()}${imageFileExtension}`;
      const imagePath = path.join(primaryUploadDir, newimagename);

      // Save the first file
      const firstFileBuffer = Buffer.from(await favicon.arrayBuffer());

      fs.writeFileSync(imagePath, firstFileBuffer);
      const faviconurl = `uploads/logo/${newimagename}`;
      values.push(faviconurl);
    }

    query += updates.join(", ") + " WHERE id = 1";

    await db.execute(query, values);

    return NextResponse.json({ message: "logo updated" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "internal error" }, { status: 500 });
  }
}
