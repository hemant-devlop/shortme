import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/db";
import User from "@/modals/user";

import { loginSchema } from "@/lib/validator";
import { generateToken } from "@/lib/jwt";

export async function POST(req) {

  try {

    await connectDB();

    const body = await req.json();

    const validation = loginSchema.safeParse(body);

    if (!validation.success) {

      return NextResponse.json(
        {
          success: false,
          message: validation.error.errors[0].message,
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const user = await User.findOne({ email });

    if (!user) {

      return NextResponse.json(
        {
          success: false,
          message: "Invalid Credentials",
        },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {

      return NextResponse.json(
        {
          success: false,
          message: "Invalid Credentials",
        },
        { status: 401 }
      );
    }

    const token = generateToken({
      id: user._id,
      email: user.email,
    });

    const response = NextResponse.json({
      success: true,
      message: "Login Successful",
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;

  } catch (error) {

    console.log(error);

    return NextResponse.json(
      {
        success: false,
      },
      { status: 500 }
    );
  }

}