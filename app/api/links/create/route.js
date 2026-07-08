import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

import connectDB from "@/lib/db";
import getUser from "@/lib/getUser";
import validateUrl from "@/lib/validateUrl";
import Link from "@/modals/link";

// import Link from "@/models/Link";

export async function POST(req){

    try{

        await connectDB();

        const user=await getUser();

        if(!user){

            return NextResponse.json({

                success:false,
                message:"Unauthorized"

            },{status:401});

        }

        const body=await req.json();

        const {url}=body;

        if(!validateUrl(url)){

            return NextResponse.json({

                success:false,
                message:"Invalid URL"

            },{status:400});

        }

        const shortId=nanoid(7);

        const link=await Link.create({

            userId:user.id,

            originalUrl:url,

            shortId

        });

        return NextResponse.json({

            success:true,

            link

        });

    }catch(err){

        console.log(err);

        return NextResponse.json({

            success:false

        },{status:500});

    }

}