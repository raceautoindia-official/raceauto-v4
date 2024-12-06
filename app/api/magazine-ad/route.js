export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const currentDate = new Date();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const year = String(currentDate.getFullYear());
const folderName = `${year}${month}`;

export async function GET() {
  try {
    const [results] = await db.execute(
      `SELECT * FROM newsletter_ad WHERE id = 1`
    );

    return NextResponse.json(results);
  } catch (err) {
    console.log(err);
    return NextResponse.json("internal server error", { status: 500 });
  }
}

export async function PUT(req) {
  const formData = await req.formData();
  const title = formData.get("title");
  const description = formData.get("description");
  const edition_name = formData.get("edition_name");
  const thumbnail = formData.get("thumbnail");

  try {
    if (!thumbnail) {
      await db.execute(
        `UPDATE newsletter_ad SET title = ?, description = ?, edition_name = ? WHERE id = 1`,
        [title, description, edition_name]
      );
      return NextResponse.json("updated");
    }

    const primaryFolder = folderName;

    const primaryUploadDir = path.join(
      process.cwd(),
      "public/uploads/newsletter",
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

    const imageFilename = thumbnail.name;
    const imageFileExtension = path.extname(imageFilename);
    const newImageName = `${uuidv4()}${imageFileExtension}`;
    const imagePath = path.join(primaryUploadDir, newImageName);

    // Save the image file
    const imageFileBuffer = Buffer.from(await thumbnail.arrayBuffer());
    fs.writeFileSync(imagePath, imageFileBuffer);

    const thumbnailValue = `uploads/newsletter/${folderName}/${newImageName}`;
    const query = [title, description, thumbnailValue, edition_name];
    await db.execute(
      `UPDATE newsletter_ad SET title = ?, description = ?, thumbnail = ?, edition_name = ? WHERE id = 1`,
      query
    );
    return NextResponse.json("updated success");
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "internal server error" }, { status: 500 });
  }
}
