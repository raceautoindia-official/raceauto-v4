export const dynamic = "force-dynamic";

import db from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import fs from 'fs'
import path from 'path'

const currentDate = new Date();
const year = String(currentDate.getFullYear());
const folderName = `${year}`;

export async function GET() {
  try {
    const [results] = await db.execute(
      `SELECT * FROM event_settings WHERE id = 1`
    );

    return NextResponse.json(results);
  } catch (err) {
    console.error("Error submitting form:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const formData = await req.formData();
  const banner_image = formData.get("banner_image");
  const event_1 = formData.get("event_1");
  const event_2 = formData.get("event_2");
  const event_1_link = formData.get("event_1_link");
  const event_2_link = formData.get("event_2_link");
  const event_1_visible = formData.get("event_1_visible");
  const event_2_visible = formData.get("event_2_visible");
  const banner_content = formData.get("banner_content");

  try {
    let query =
      "UPDATE event_settings SET event_1_link = ?, event_2_link = ?, event_1_visible = ?, event_2_visible = ?, banner_content = ?";

    let values = [
      event_1_link,
      event_2_link,
      event_1_visible == "true" || event_1_visible == 1 ? 1 : 0,
      event_2_visible == "true" || event_2_visible == 1 ? 1 : 0,
      banner_content,
    ];

    const primaryFolder = folderName;
  
    const primaryUploadDir = path.join(
      process.cwd(),
      "public/uploads/eventpage",
      primaryFolder
    );

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

    if (banner_image) {
      const imageFilename = banner_image.name;
      const imageFileExtension = path.extname(imageFilename);
      const newImageName = `${uuidv4()}${imageFileExtension}`;
      const imagePath = path.join(primaryUploadDir, newImageName);
      const imageFileBuffer = Buffer.from(await banner_image.arrayBuffer());
      fs.writeFileSync(imagePath, imageFileBuffer);

      query += ", banner_image = ?";

      const banner_imageUrl = `uploads/eventpage/${folderName}/${newImageName}`;
      values.push(banner_imageUrl);
    }

    if (event_1) {
      const imageFilename = event_1.name;
      const imageFileExtension = path.extname(imageFilename);
      const newImageName = `${uuidv4()}${imageFileExtension}`;
      const imagePath = path.join(primaryUploadDir, newImageName);
      const imageFileBuffer = Buffer.from(await event_1.arrayBuffer());
      fs.writeFileSync(imagePath, imageFileBuffer);

      query += ", upcoming_event_1 = ?";

      const upcoming_event_1 = `uploads/eventpage/${folderName}/${newImageName}`;

      values.push(upcoming_event_1);
    }

    if (event_2) {
      const imageFilename = event_2.name;
      const imageFileExtension = path.extname(imageFilename);
      const newImageName = `${uuidv4()}${imageFileExtension}`;
      const imagePath = path.join(primaryUploadDir, newImageName);
      const imageFileBuffer = Buffer.from(await event_2.arrayBuffer());
      fs.writeFileSync(imagePath, imageFileBuffer);

      query += ", upcoming_event_2 = ?";

      const upcoming_event_2 = `uploads/eventpage/${folderName}/${newImageName}`;

      values.push(upcoming_event_2);
    }

    query += " WHERE id = 1";

    await db.execute(query, values);

    return NextResponse.json({ message: "updated success" });
  } catch (err) {
    console.error("Error submitting form:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
