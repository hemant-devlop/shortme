"use client";

import { useState } from "react";
import api from "@/services/api";

import Button from "../ui/Button";

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

        <div className="bg-zinc-900 rounded-2xl p-6 space-y-5">

            <input

            value={url}

            onChange={(e)=>setUrl(e.target.value)}

            placeholder="Paste your URL"

            className="w-full h-14 rounded-xl bg-zinc-950 px-5 border border-zinc-800 outline-none"

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