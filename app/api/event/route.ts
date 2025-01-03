export const dynamic = "force-dynamic";
import db from "@/lib/db";
import { NextResponse } from "next/server";

// Function to remove ordinal suffixes like "st", "nd", "rd", "th"
function removeOrdinalSuffix(date: string) {
  return date.replace(/(\d+)(st|nd|rd|th)/, '$1');
}

export async function GET() {
  try {
    const [results]: any = await db.execute("SELECT * FROM event");

    const sortedResults = results.sort((a: any, b: any) => {

      const startDateA = new Date(removeOrdinalSuffix(a.event_date.split(" -")[0]));
      const startDateB = new Date(removeOrdinalSuffix(b.event_date.split(" -")[0]));
      
      return startDateA.getTime() - startDateB.getTime();
    });


    return NextResponse.json(sortedResults);
  } catch (err) {
    console.error("Error fetching data from reports:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
