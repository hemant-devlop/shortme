"use client";

import { Copy, Trash } from "lucide-react";
import api from "@/services/api";

export default function LinkCard({ link, onDeleted = () => {} }) {

    async function copy() {
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/shortme/${link.shortId}`);
        alert("Copied");
    }

    async function remove() {
        if (!confirm("Delete this link?")) return;
        try {
            await api.delete(`/links/${link._id}`);
            onDeleted(link._id);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || 'Failed to delete');
        }
    }

    return (
        <div className="bg-zinc-900 rounded-xl p-5">

            <h3 className="font-semibold">{link.originalUrl}</h3>

            <div className="flex justify-between items-center mt-4">

                <p className="text-blue-500">{process.env.NEXT_PUBLIC_BASE_URL}/shortme/{link.shortId}</p>

                <div className="flex items-center gap-3">
                    <button onClick={copy} aria-label="Copy link">
                        <Copy />
                    </button>

                    <button onClick={remove} aria-label="Delete link" className="text-red-500">
                        <Trash />
                    </button>
                </div>

            </div>

        </div>
    );

}