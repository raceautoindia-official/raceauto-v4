import db from "@/lib/db";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { pathname } = new URL(req.url);
    const title_slug = pathname.split("/").pop();

    const [results] = await db.execute<RowDataPacket[]>(
      `SELECT id, title, image_big, image_default, image_mid, summary, image_description, content, created_at FROM posts WHERE title_slug = ?`,
      [title_slug],
    );

    if (results.length > 0) {
      const postId = results[0].id;

      const [tags] = await db.execute(`SELECT * FROM tags WHERE post_id = ?`, [
        postId,
      ]);

      const [additionalImages] = await db.execute<RowDataPacket[]>(
        `SELECT image_default FROM post_images WHERE post_id = ?`,
        [postId],
      );

      const images = [
        { image_default: results[0].image_default },
        ...additionalImages,
      ];

      const result = results.map((item) => {
        return { ...item, tag: tags, images };
      });
      return NextResponse.json(result);
    } else {
      return NextResponse.json("data not found", { status: 404 });
    }
  } catch (err) {
    console.error("Error:", err);
    return NextResponse.json("Internal Server Error", { status: 500 });
  }
}
