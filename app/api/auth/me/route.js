import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import getUser from "@/lib/getUser";
import User from "@/modals/user";

export async function GET() {
  try {
    const authUser = await getUser();

    if (!authUser?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    await connectDB();

    const user = await User.findById(authUser.id).select("username email").lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: user._id?.toString?.() ?? user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Failed to load user" },
      { status: 500 }
    );
  }
}
