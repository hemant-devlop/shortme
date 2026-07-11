import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import getUser from "@/lib/getUser";
import Link from "@/modals/link";

export async function DELETE(req, { params }) {
    // `params` is a Promise in Next
    const { id } = await params;

    await connectDB();

    const user = await getUser();

    await Link.deleteOne({
        _id: id,
        userId: user.id,
    });

    return NextResponse.json({
        success: true,
    });
}