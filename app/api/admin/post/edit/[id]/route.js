import db from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import fs from "fs";
import path from "path";
import sharp from "sharp";
import schedule from "node-schedule";

const currentDate = new Date();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const year = String(currentDate.getFullYear());
const folderName = `${year}${month}`;

export async function GET(req) {
  try {
    const { pathname } = new URL(req.url);
    const id = pathname.split("/").pop();

    const [joinedRow] = await db.execute(
      `SELECT posts.id, posts.image_mid, posts.summary, posts.title, posts.content, posts.market, posts.keywords, posts.pageviews, posts.user_id, posts.image_description, posts.status, posts.is_slider, posts.is_featured, posts.is_breaking, posts.is_recommended, posts.category_id, posts.is_scheduled, posts.created_at, categories.name_slug AS name_slug, categories.parent_id AS parent_id, categories.color AS color, categories.name AS sub_category, users.username AS username 
      FROM posts
      INNER JOIN users ON posts.user_id = users.id
      INNER JOIN categories ON posts.category_id = categories.id
      WHERE posts.id = ${id}`
    );

    const [category] = await db.execute(
      `SELECT parent_id, name, name_slug, id FROM categories WHERE parent_id = 0`
    );
    const [tags] = await db.execute(`SELECT * FROM tags WHERE post_id = ?`, [
      id,
    ]);

    const [additionalImages] = await db.execute(
      `SELECT image_big as image_mid FROM post_images WHERE post_id = ?`,
      [id]
    );

    const results = joinedRow.map((item) => {
      const findParent = category.find((obj) => item.parent_id == obj.id);

      if (findParent) {
        return {
          ...item,
          main_category: findParent.name,
          main_category_slug: findParent.name_slug,
          tag: tags,
          imageDefault: joinedRow[0].image_mid,
          additionalImages: additionalImages,
        };
      } else {
        return {
          ...item,
          main_category: "",
          main_category_slug: "",
          tag: tags,
          imageDefault: joinedRow[0].image_mid,
          additionalImages: additionalImages,
        };
      }
    });
    return NextResponse.json(results);
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "internel server err" }, { status: 500 });
  }
}

export async function PUT(req) {
  const { pathname } = new URL(req.url);
  const id = pathname.split("/").pop();
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const content = formData.get("content");
    const summary = formData.get("summary");
    const category_id = formData.get("category_id");
    const keywords = formData.get("keywords");
    const tags = formData.get("tags");
    const is_slider = formData.get("is_slider");
    const is_featured = formData.get("is_featured");
    const is_recommended = formData.get("is_recommended");
    const is_breaking = formData.get("is_breaking");
    const image_description = formData.get("image_description");
    const market = formData.get("market");
    const draftValue = formData.get("draft");
    // const scheduled = formData.get("schedule_time");
    const image_default = formData.get("image_default");
    const additional_image = formData.get("additional_image");
    const draft = draftValue == "true" ? 0 : 1;
    const tags_split = tags.split(",");
    const title_slug = title.split(" ").join("-");
    const updateDate = new Date().toISOString().slice(0, 19).replace("T", " ");
    const scheduled = formData.get("schedule_time");
    const scheduleTime =
      scheduled === null || scheduled === "" || scheduled === undefined
        ? 0
        : new Date(scheduled) < new Date()
        ? 0
        : 1;
    let queryParams = [
      title,
      title_slug,
      content,
      summary,
      image_description,
      is_breaking,
      is_featured,
      is_slider,
      is_recommended,
      keywords,
      category_id,
      market,
      draft,
      updateDate,
      scheduleTime,
    ];

    let queryStr = `
      UPDATE posts SET
        title = ?,
        title_slug = ?,
        content = ?,
        summary = ?,
        image_description = ?,
        is_breaking = ?,
        is_featured = ?,
        is_slider = ?,
        is_recommended = ?,
        keywords = ?,
        category_id = ?,
        market = ?,
        status = ?,
        updated_at = ?,
        is_scheduled = ?
      WHERE id = ?
    `;

    const primaryFolder = folderName;

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

      fs.writeFileSync(`${destiny}/index.html`, htmlContent);
    }
    const files = [];

    // Collect all files from formData
    for (const [key, value] of formData.entries()) {
      if (key === "additional_image" && value instanceof Blob) {
        files.push(value); // Push file only if key matches and value is a Blob
      }
    }

    if (image_default) {
      const firstFile = image_default;
      const firstFilename = firstFile.name;
      const firstFileExtension = path.extname(firstFilename);
      const newFirstFilename = `${uuidv4()}${firstFileExtension}`;
      const firstFilePath = path.join(primaryUploadDir, newFirstFilename);

      // Save the first file
      const firstFileBuffer = Buffer.from(await firstFile.arrayBuffer());
      fs.writeFileSync(firstFilePath, firstFileBuffer);

      // uploadedFiles.push({
      //   originalFilename: firstFilename,
      //   newFilename: newFirstFilename,
      //   filePath: `/uploads/${primaryFolder}/${newFirstFilename}`,
      // });
      const image_default_url = `./public/uploads/images/${folderName}/${newFirstFilename}`;

      const image_big = `./public/uploads/images/${folderName}/750${newFirstFilename}`;
      const image_small = `./public/uploads/images/${folderName}/140${newFirstFilename}`;
      const image_mid = `./public/uploads/images/${folderName}/380${newFirstFilename}`;

      const img_default = `uploads/images/${folderName}/${newFirstFilename}`;
      const img_big = `uploads/images/${folderName}/750${newFirstFilename}`;
      const img_small = `uploads/images/${folderName}/140${newFirstFilename}`;
      const img_mid = `uploads/images/${folderName}/380${newFirstFilename}`;

      queryStr = `
      UPDATE posts SET
        title = ?,
        title_slug = ?,
        content = ?,
        summary = ?,
        image_description = ?,
        is_breaking = ?,
        is_featured = ?,
        is_slider = ?,
        is_recommended = ?,
        image_default = ?,
        image_big = ?,
        image_small = ?,
        image_mid = ?,
        keywords = ?,
        category_id = ?,
        market = ?,
        status = ?,
        updated_at = ?,
        is_scheduled = ?
      WHERE id = ?
    `;

      queryParams = [
        title,
        title_slug,
        content,
        summary,
        image_description,
        is_breaking,
        is_featured,
        is_slider,
        is_recommended,
        img_default,
        img_big,
        img_small,
        img_mid,
        keywords,
        category_id,
        market,
        draft,
        updateDate,
        scheduleTime,
        id,
      ];

      await sharp(image_default_url).resize(750, 500).toFile(image_big);
      await sharp(image_default_url).resize(140, 90).toFile(image_small);
      await sharp(image_default_url).resize(380, 226).toFile(image_mid);
    } else {
      queryParams.push(id);
    }

    if (additional_image) {
      const filePromises = files.map(async (file) => {
        const firstFile = file;
        const firstFilename = firstFile.name;
        const firstFileExtension = path.extname(firstFilename);
        const newFirstFilename = `${uuidv4()}${firstFileExtension}`;
        const firstFilePath = path.join(primaryUploadDir, newFirstFilename);
        const firstFileBuffer = Buffer.from(await firstFile.arrayBuffer());
        fs.writeFileSync(firstFilePath, firstFileBuffer);

        const img_default = `uploads/images/${folderName}/${newFirstFilename}`;
        const img_big = `uploads/images/${folderName}/750${newFirstFilename}`;

        await sharp(`./public/uploads/images/${folderName}/${newFirstFilename}`)
          .resize(750, 500)
          .toFile(`./public/${img_big}`);

        await db.execute(
          `
        INSERT INTO post_images (post_id, image_big, image_default)
        VALUES (?, ?, ?)
        `,
          [id, img_big, img_default]
        );
      });

      await Promise.all(filePromises);
    }
    if (scheduled) {
      const publishTime = new Date(scheduled);
      const currentTime = new Date();
      const updateCreated_at = new Date()
        .toISOString()
        .replace("T", " ")
        .split(".")[0];

      // Check if the scheduled time is in the past
      if (publishTime < currentTime) {
        await db.execute(`UPDATE posts SET created_at = ? WHERE id = ?`, [
          publishTime,
          id,
        ]);
        console.log("Scheduled time is in the past. No action taken.");
      } else {
        schedule.scheduleJob(publishTime, async function () {
          await db.execute(
            `UPDATE posts SET is_scheduled = 0, created_at = ? WHERE id = ?`,
            [updateCreated_at, id]
          );
          console.log(`Post with ID ${id} is now published.`);
        });
      }
    }

    await db.execute(queryStr, queryParams);
    await db.execute("DELETE FROM tags WHERE post_id = ?", [id]);
    for (const item of tags_split) {
      const tag_slug = item.split(" ").join("-");
      await db.execute(
        `INSERT INTO tags (post_id, tag, tag_slug) VALUES (?, ?, ?)`,
        [id, item, tag_slug]
      );
    }

    return NextResponse.json("updated");
  } catch (err) {
    console.log(err);
    return NextResponse.json({ err: "internal server err" }, { status: 500 });
  }
}
