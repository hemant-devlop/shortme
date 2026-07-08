"use client";

import { useEffect,useState } from "react";

import api from "@/services/api";

import UrlForm from "@/components/dashboard/UrlForm";
import LinkCard from "@/components/dashboard/LinkCard";

export default function Dashboard(){

    const [links,setLinks]=useState([]);

    useEffect(()=>{

        loadLinks();

    },[]);

    async function loadLinks(){

        const res=await api.get("/links");

        setLinks(res.data.links);

    }

    function addLink(link){

        setLinks(prev=>[link,...prev]);

    }

    function removeLink(id){
        setLinks(prev=>prev.filter(l=>l._id!==id));
    }

    return(

        <div className="space-y-8">

            <UrlForm

            onCreated={addLink}

            />

            {links.length===0 ? (

                <div className="p-6 bg-zinc-900 rounded-xl text-center text-gray-400">
                    No links yet — create your first short link.
                </div>

            ) : (

                <div className="space-y-4">

                    {links.map(link=> (

                        <LinkCard key={link._id} link={link} onDeleted={removeLink} />

                    ))}

                </div>

            )}

        </div>

    );

}