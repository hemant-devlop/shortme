import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import getUser from "@/lib/getUser";
import Link from "@/modals/link";

export async function DELETE(req,{params}){

    await connectDB();

    const user=await getUser();

    await Link.deleteOne({

        _id:params.id,

        userId:user.id

    });

    return NextResponse.json({

        success:true

    });

}