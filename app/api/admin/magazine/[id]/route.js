import db from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";

const currentDate = new Date();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const year = String(currentDate.getFullYear());
const folderName = `${year}${month}`;

export async function GET(req) {
  try {
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

    const [rows] = await db.execute("SELECT * FROM newsletter WHERE id = ?", [
      id,
    ]);

    if (rows.length > 0) {
      return NextResponse.json(rows);
    } else {
      return NextResponse.json({ error: "Data not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
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
    const formData = await req.formData();

    const title = formData.get("title");
    const modified_date = formData.get("modified_date");
    const category = formData.get("category");
    const image_url = formData.get("image_url");
    const pdf_url = formData.get("pdf_url");
    const keywords = formData.get("keywords");

    const primaryFolder = folderName;

    // Create upload directories for both folders
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

    let query =
      "UPDATE newsletter SET title = ?, modified_date = ?, category = ?, keywords = ?";
    let queryParams = [title, modified_date, category, keywords];

    if (image_url) {
      const imageFilename = image_url.name;
      const imageFileExtension = path.extname(imageFilename);
      const newimagename = `${uuidv4()}${imageFileExtension}`;
      const imagePath = path.join(primaryUploadDir, newimagename);

      // Save the first file
      const firstFileBuffer = Buffer.from(await image_url.arrayBuffer());

      fs.writeFileSync(imagePath, firstFileBuffer);
      query += ", image_url = ?";
      queryParams.push(`uploads/newsletter/${folderName}/${newimagename}`);
    }

    if (pdf_url) {
      const pdfFilename = pdf_url.name;
      const pdfFileExtension = path.extname(pdfFilename);
      const newpdfname = `${uuidv4()}${pdfFileExtension}`;
      const pdfPath = path.join(primaryUploadDir, newpdfname);

      // Save the first file
      const firstFileBuffer = Buffer.from(await pdf_url.arrayBuffer());
      fs.writeFileSync(pdfPath, firstFileBuffer);
      query += ", pdf_url = ?";
      queryParams.push(`uploads/newsletter/${folderName}/${newpdfname}`);
    }

    query += " WHERE id = ?";
    queryParams.push(id);

    await db.execute(query, queryParams);

    return NextResponse.json("edited");
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "internal server error" }, { status: 500 });
  }
}

export async function DELETE(req) {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();
  try {
    const [rows] = await db.execute(
      "SELECT pdf_url, image_url FROM newsletter WHERE id = ?",
      [id]
    );
    const pdfPath = `public/${rows[0].pdf_url}`;
    const imagePath = `public/${rows[0].image_url}`;
    console.log(pdfPath)
    console.log(imagePath)
    await db.execute(`DELETE FROM newsletter WHERE id = ${id}`);
    fs.unlink(pdfPath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully.");
      }
    });
    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
      } else {
        console.log("File deleted successfully.");
      }
    });
    return NextResponse.json({ message: "recorded and deleted successfully" });
  } catch (err) {
    console.error("Error submitting form:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
