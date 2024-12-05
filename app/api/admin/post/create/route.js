import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import db from "@/lib/db";
import schedule from "node-schedule";

const currentDate = new Date();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const year = String(currentDate.getFullYear());
const folderName = `${year}${month}`;

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const slug = formData.get("title_slug");
    const content = formData.get("content");
    const summary = formData.get("summary");
    const category_id = formData.get("category_id");
    const keywords = formData.get("keywords");
    const tags = formData.get("tags");
    const is_slider = formData.get("is_slider");
    const is_featured = formData.get("is_featured");
    const is_recommended = formData.get("is_recommended");
    const is_breaking = formData.get("is_breaking");
    const user_id = formData.get("user_id");
    const image_description = formData.get("image_description");
    const market = formData.get("market");
    const draftValue = formData.get("draft");
    const scheduled = formData.get("schedule_time");

    const scheduleTime =
      scheduled === null || scheduled === "" || scheduled === undefined
        ? 0
        : new Date(scheduled) < new Date()
        ? 0
        : 1;
    const draft = draftValue == "true" ? 0 : 1;

    const title_slug = slug.split(" ").join("-");

    const tags_split = tags.split(",");

    const uploadedFiles = [];
    const primaryFolder = folderName;

    // Create upload directories for both folders
    const primaryUploadDir = path.join(
      process.cwd(),
      "public/uploads/images",
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

    // Array to hold files
    const files = [];

    // Collect all files from formData
    for (const [key, value] of formData.entries()) {
      if (value instanceof Blob) {
        files.push(value);
      }
    }

   
      const firstFile = files[0];
      const firstFilename = firstFile.name;
      const firstFileExtension = path.extname(firstFilename);
      const newFirstFilename = `${uuidv4()}${firstFileExtension}`;
      const firstFilePath = path.join(primaryUploadDir, newFirstFilename);

      // Save the first file
      const firstFileBuffer = Buffer.from(await firstFile.arrayBuffer());
      fs.writeFileSync(firstFilePath, firstFileBuffer);

      uploadedFiles.push({
        originalFilename: firstFilename,
        newFilename: newFirstFilename,
        filePath: `/uploads/${primaryFolder}/${newFirstFilename}`,
      });
      const image_default = `./public/uploads/images/${folderName}/${newFirstFilename}`;

      const image_big = `./public/uploads/images/${folderName}/750${newFirstFilename}`;
      const image_small = `./public/uploads/images/${folderName}/140${newFirstFilename}`;
      const image_mid = `./public/uploads/images/${folderName}/380${newFirstFilename}`;

      const img_default = `uploads/images/${folderName}/${newFirstFilename}`;
      const img_big = `uploads/images/${folderName}/750${newFirstFilename}`;
      const img_small = `uploads/images/${folderName}/140${newFirstFilename}`;
      const img_mid = `uploads/images/${folderName}/380${newFirstFilename}`;

      await sharp(image_default).resize(750, 500).toFile(image_big);
      await sharp(image_default).resize(140, 90).toFile(image_small);
      await sharp(image_default).resize(380, 226).toFile(image_mid);

      const postQuery = [
        title,
        title_slug,
        keywords,
        summary,
        content,
        category_id,
        img_big,
        img_default,
        img_mid,
        img_small,
        is_slider,
        is_featured,
        is_recommended,
        user_id,
        is_breaking,
        image_description,
        market,
        draft,
        scheduleTime,
      ];
      const [postResult] = await db.execute(
        `
          INSERT INTO posts (
            title, title_slug, keywords, summary, content, category_id, image_big, image_default, 
            image_mid, image_small, is_slider, is_featured, is_recommended, user_id,
            is_breaking, image_description, market, status, is_scheduled) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `,
        postQuery
      );

      const postId = postResult.insertId;

      for (const item of tags_split) {
        const tag_slug = item.split(" ").join("-");
        await db.execute(
          `INSERT INTO tags (post_id, tag, tag_slug) VALUES (?, ?, ?)`,
          [postId, item, tag_slug]
        );
      }

      if (scheduled) {
  const publishTime = new Date(scheduled);
  const currentTime = new Date();

  // Check if the scheduled time is in the past
  if (publishTime < currentTime) {
    await db.execute(`UPDATE posts SET created_at = ? WHERE id = ?`, [
      publishTime,
      postId,
    ]);
    console.log("Scheduled time is in the past. No action taken.");
  }else{
    schedule.scheduleJob(publishTime, async function () {
      await db.execute(`UPDATE posts SET is_scheduled = 0 WHERE id = ?`, [
        postId,
      ]);
      console.log(`Post with ID ${postId} is now published.`);
    });
  }
 
}


    // Handle remaining files (secondary files)
    if (files.length > 1) {
      const remainingFiles = files.slice(1);

      // for (const file of remainingFiles) {
      //   const originalFilename = file.name;
      //   const fileExtension = path.extname(originalFilename);
      //   const newFilename = `${uuidv4()}${fileExtension}`;
      //   const filePath = path.join(primaryUploadDir, newFilename);

      //   // Save each remaining file
      //   const fileBuffer = Buffer.from(await file.arrayBuffer());
      //   fs.writeFileSync(filePath, fileBuffer);

      //   uploadedFiles.push({
      //     originalFilename,
      //     newFilename,
      //     filePath: `/uploads/${primaryFolder}/${newFilename}`,
      //   });
      // }
      const filePromises = remainingFiles.map(async (file) => {
        const originalFilename = file.name;
        const fileExtension = path.extname(originalFilename);
        const newFilename = `${uuidv4()}${fileExtension}`;
        const filePath = path.join(primaryUploadDir, newFilename);

        // Save each remaining file
        const fileBuffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, fileBuffer);
        uploadedFiles.push({
          originalFilename,
          newFilename,
          filePath: `/uploads/${primaryFolder}/${newFilename}`,
        });
        const additional_image_default = `./public/uploads/images/${folderName}/${newFilename}`;
        const additional_image_big = `./public/uploads/images/${folderName}/750${newFilename}`;
        const img_default = `uploads/images/${folderName}/${newFilename}`;
        const img_big = `uploads/images/${folderName}/750${newFilename}`;

        // Move additional image to the target directory

        // Resize additional images
        await sharp(additional_image_default)
          .resize(750, 500)
          .toFile(additional_image_big);

        // Insert additional image data into the database
        await db.execute(
          `
          INSERT INTO post_images (post_id, image_big, image_default) 
          VALUES (?, ?, ?)
          `,
          [postId, img_big, img_default]
        );
      });

      // Wait for all filePromises to complete
      await Promise.all(filePromises);
    }

    return NextResponse.json({
      message: "Files uploaded successfully",
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
