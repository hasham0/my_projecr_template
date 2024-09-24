import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { eq } from "drizzle-orm";
import { InsertUserModel, users } from "@/db/schema";
import { db } from "@/db/db";

type UserIDParams = {
  params: { id: string };
};

export async function PUT(
  request: NextRequest,
  { params: { id } }: UserIDParams
) {
  try {
    const { name, email }: InsertUserModel = await request.json();

    const updatedUser = await db
      .update(users)
      .set({
        name,
        email,
      })
      .where(eq(users.id, Number(id)))
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
      });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      data: updatedUser,
    });
  } catch (error) {
    console.error("Error updating user: ", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params: { id } }: UserIDParams
) {
  try {
    const deletedUser = await db.delete(users).where(eq(users.id, Number(id)));
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      data: "working",
    });
  } catch (error) {
    console.error("Error deleting user: ", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
