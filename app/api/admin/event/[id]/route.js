import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db";

export async function GET(req) {
  try {
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

    const [results] = await db.execute("SELECT * FROM event WHERE id = ?", [
      id,
    ]);

    if (results.length > 0) {
      return NextResponse.json(results);
    } else {
      return NextResponse.json({ err: "data not found" }, { status: 404 });
    }
  } catch (err) {
    console.error("Error fetching data from reports:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();
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
    let query =
      "UPDATE event SET title = ?, summary = ?, location = ?, referenceLink = ?, event_date = ?";

    const values = [title, summary, location, referenceLink, event_date];

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

    if (image_url) {
      const imageFilename = image_url.name;
      const imageFileExtension = path.extname(imageFilename);
      const newImageName = `${uuidv4()}${imageFileExtension}`;
      const imagePath = path.join(primaryUploadDir, newImageName);
      const imageFileBuffer = Buffer.from(await image_url.arrayBuffer());
      fs.writeFileSync(imagePath, imageFileBuffer);
      query += ", image_url = ?";
      const image = `uploads/eventpage/${folderName}/${newImageName}`;
      values.push(image);
    }

    // Append the WHERE clause
    query += " WHERE id = ?";
    values.push(id);

    // Execute the query
    const [results] = await db.execute(query, values);

    return NextResponse.json(results);
  } catch (err) {
    console.error("Error fetching data from reports:", err);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}

export async function DELETE(req) {
  try {
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

    await db.execute(`DELETE FROM event WHERE id = ${id}`);

    return NextResponse.json({ message: "recorded and deleted successfully" });
  } catch (err) {
    console.error("Error submitting form:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
