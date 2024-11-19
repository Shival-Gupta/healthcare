import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();
    // Here you can perform your database operations
    return NextResponse.json({ message: "Connected to MongoDB successfully!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to connect to MongoDB" }, { status: 500 });
  }
}
