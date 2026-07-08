import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import getUser from "@/lib/getUser";
import Link from "@/modals/link";

export async function GET(){

    await connectDB();

    const user=await getUser();

    if(!user){

        return NextResponse.json({

            success:false

        },{status:401});

    }

    const links=await Link.find({

        userId:user.id

    }).sort({

        createdAt:-1

    });

    return NextResponse.json({

        success:true,

        links

    });

}