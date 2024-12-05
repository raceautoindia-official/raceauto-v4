import { NextResponse } from "next/server";
import path from "path";
import fs from 'fs'
import {v4 as uuidv4} from 'uuid'
import db from "@/lib/db";


export async function POST(req) {
  try {
    const currentDate = new Date();
    const year = String(currentDate.getFullYear());
    const folderName = `${year}`;

    const formData = await req.formData();
    const image_url = formData.get("image_url");
    const title = formData.get("title");
    const summary = formData.get("summary");
    const location = formData.get("location");
    const referenceLink = formData.get("referenceLink");
    const event_date = formData.get("event_date");

    const primaryUploadDir = path.join(
      process.cwd(),
      "public/uploads/eventpage",
      folderName
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

      fs.writeFileSync(`${destiny}/index.html`, htmlContent);
    }

    const imageFilename = image_url.name;
    const imageFileExtension = path.extname(imageFilename);
    const newImageName = `${uuidv4()}${imageFileExtension}`;
    const imagePath = path.join(primaryUploadDir, newImageName);
    const imageFileBuffer = Buffer.from(await image_url.arrayBuffer());
    fs.writeFileSync(imagePath, imageFileBuffer);

    const image = `uploads/eventpage/${folderName}/${newImageName}`;
    await db.execute(
      "INSERT INTO event (title, image_url, summary, location, referenceLink, event_date) VALUES (?, ?, ?, ?, ?, ?)",
      [title, image, summary, location, referenceLink, event_date]
    );
    return NextResponse.json({ msg: "upload success" });
  } catch (err) {
    console.error("Error fetching data from reports:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
