import { NextResponse } from "next/server";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import db from "@/lib/db";
import s3Client from "@/lib/s3Client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

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

    const bucketName = process.env.AWS_S3_BUCKET_NAME;

    let query = "UPDATE ad_spaces SET";
    let queryParams = [];

    // Helper function to handle S3 uploads
    const uploadToS3 = async (file, folder) => {
      const fileExtension = path.extname(file.name);
      const newFileName = `${uuidv4()}${fileExtension}`;
      const s3Key = `${folder}/${newFileName}`;
      const fileBuffer = Buffer.from(await file.arrayBuffer());

      const uploadParams = {
        Bucket: bucketName,
        Key: s3Key,
        Body: fileBuffer,
        ContentType: file.type,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));
      return s3Key; // Return the key for further use in the database
    };

    // Dynamic query construction for file fields
    if (size_1200) {
      const imageKey = await uploadToS3(size_1200, "uploads/blocks");
      query += " ad_code_1200 = ?,";
      queryParams.push(imageKey);
    }
    if (size_728) {
      const imageKey = await uploadToS3(size_728, "uploads/blocks");
      query += " ad_code_728 = ?,";
      queryParams.push(imageKey);
    }
    if (size_468) {
      const imageKey = await uploadToS3(size_468, "uploads/blocks");
      query += " ad_code_468 = ?,";
      queryParams.push(imageKey);
    }
    if (size_300) {
      const imageKey = await uploadToS3(size_300, "uploads/blocks");
      query += " ad_code_300 = ?,";
      queryParams.push(imageKey);
    }
    if (size_234) {
      const imageKey = await uploadToS3(size_234, "uploads/blocks");
      query += " ad_code_234 = ?,";
      queryParams.push(imageKey);
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
