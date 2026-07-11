"use client";

import { useState } from "react";
import api from "@/services/api";

import Button from "../ui/Button";
import { SvgDestiny } from "../svg/Svg";

export default function UrlForm({

    onCreated

}) {

    const [url,setUrl]=useState("");

    const [loading,setLoading]=useState(false);

    async function generateLink(){

        if(!url) return;

        try{

            setLoading(true);

            const res=await api.post("/links/create",{

                url

            });

            onCreated(res.data.link);

            setUrl("");

        }catch(err){

            alert(err.response?.data?.message);

        }finally{

            setLoading(false);

        }

    }

    return(

        <div className="border-2 sticky top-0 bg-[#ffffff] border-[#e4e1ec] rounded-2xl p-6 space-y-5">
<div className="uppercase sm:text-xl text-[#4200c6] text-sm font-bold flex gap-2"><span><SvgDestiny/></span> DESTINATION URL</div>
            <input

            value={url}

            onChange={(e)=>setUrl(e.target.value)}

            placeholder="https://your-extremely-long-enterprise-link-goes-here.com/deep/path"

            className="w-full h-14 rounded-xl  px-5 border-2 border-[#e4e1ec] focus-within:border-[#4200c6] outline-none"

            />

            <Button

            loading={loading}

            onClick={generateLink}

            className="w-full"

            >

                Generate Short Link

            </Button>

        </div>

    );

}