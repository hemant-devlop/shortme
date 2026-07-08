import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/db";
import User from "@/modals/user";
import { signupSchema } from "@/lib/validator";



export async function POST(req) {
  try {
    await connectDB();

    const body = await req.json();

    const validation = signupSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const { username, email, password } = validation.data;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
    });

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}