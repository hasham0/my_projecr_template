import { db } from "@/db/db";
import { InsertUserModel, SelectUserModel, users } from "@/db/schema";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET() {
  try {
    const usersData: SelectUserModel[] = await db.select().from(users);
    return NextResponse.json({
      data: usersData,
    });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: NextRequest) {
  const { name, email }: InsertUserModel = await request.json();
  const newUserData: InsertUserModel[] = await db
    .insert(users)
    .values({
      name,
      email,
    })
    .returning();
  return NextResponse.json({
    data: newUserData,
  });
}
