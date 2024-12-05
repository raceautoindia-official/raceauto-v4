import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db";

export async function GET(req) {
  try {
    const { pathname } = new URL(req.url);
    const title = pathname.split("/").pop();
    const [results] = await db.execute(
      `SELECT * FROM ad_spaces WHERE ad_space = ?`,
      [title]
    );
    return NextResponse.json(results);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "internal server error" }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const { pathname } = new URL(req.url);
    const title = pathname.split("/").pop();

    const formData = await req.formData();
    const responsiveCode = formData.get("responsiveCode");
    const isChecked = formData.get("isChecked");

    const size_1200 = formData.get("size_1200");
    const size_728 = formData.get("size_728");
    const size_468 = formData.get("size_468");
    const size_300 = formData.get("size_300");
    const size_234 = formData.get("size_234");

    const primaryUploadDir = path.join(process.cwd(), "public/uploads/blocks");

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

    let query = "UPDATE ad_spaces SET";
    let queryParams = [];

    // Dynamic query construction for file fields
    if (size_1200) {
      const image1200 = size_1200.name;
      const image1200FileExtension = path.extname(image1200);
      const new1200imagename = `${uuidv4()}${image1200FileExtension}`;
      const imagePath = path.join(primaryUploadDir, new1200imagename);

      // Save the first file
      const firstFileBuffer = Buffer.from(await size_1200.arrayBuffer());

      fs.writeFileSync(imagePath, firstFileBuffer);
      query += " ad_code_1200 = ?,";
      queryParams.push(`uploads/blocks/${new1200imagename}`);
    }
    if (size_728) {
      const image728 = size_728.name;
      const image728FileExtension = path.extname(image728);
      const new728imagename = `${uuidv4()}${image728FileExtension}`;
      const imagePath = path.join(primaryUploadDir, new728imagename);

      // Save the first file
      const firstFileBuffer = Buffer.from(await size_728.arrayBuffer());

      fs.writeFileSync(imagePath, firstFileBuffer);
      query += " ad_code_728 = ?,";
      queryParams.push(`uploads/blocks/${new728imagename}`);
    }
    if (size_468) {
      const image468 = size_468.name;
      const image468FileExtension = path.extname(image468);
      const new468imagename = `${uuidv4()}${image468FileExtension}`;
      const imagePath = path.join(primaryUploadDir, new468imagename);

      // Save the first file
      const firstFileBuffer = Buffer.from(await size_468.arrayBuffer());

      fs.writeFileSync(imagePath, firstFileBuffer);
      query += " ad_code_468 = ?,";
      queryParams.push(`uploads/blocks/${new468imagename}`);
    }
    if (size_300) {
      const image300 = size_300.name;
      const image300FileExtension = path.extname(image300);
      const new300imagename = `${uuidv4()}${image300FileExtension}`;
      const imagePath = path.join(primaryUploadDir, new300imagename);

      // Save the first file
      const firstFileBuffer = Buffer.from(await size_300.arrayBuffer());

      fs.writeFileSync(imagePath, firstFileBuffer);
      query += " ad_code_300 = ?,";
      queryParams.push(`uploads/blocks/${new300imagename}`);
    }
    if (size_234) {
      const image234 = size_234.name;
      const image234FileExtension = path.extname(image234);
      const new234imagename = `${uuidv4()}${image234FileExtension}`;
      const imagePath = path.join(primaryUploadDir, new234imagename);

      // Save the first file
      const firstFileBuffer = Buffer.from(await size_234.arrayBuffer());

      fs.writeFileSync(imagePath, firstFileBuffer);
      query += " ad_code_234 = ?,";
      queryParams.push(`uploads/blocks/${new234imagename}`);
    }

    // Static fields
    query += " responsive_ad_code = ?, is_responsive = ? WHERE ad_space = ?";
    queryParams.push(
      responsiveCode || null,
      isChecked === "true" ? 1 : 0,
      title
    );

    await db.execute(query, queryParams);

    return NextResponse.json({ message: "Data updated successfully" });
  } catch (error) {
    console.error("Error updating data:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
