"use client";

import { useState } from "react";
import { Check, Copy, Trash } from "lucide-react";
import api from "@/services/api";

export default function LinkCard({ link, onDeleted = () => {} }) {
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [copied, setCopied] = useState(false);

    async function copy() {
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/shortme/${link.shortId}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    }

    async function confirmRemove() {
        try {
            setIsDeleting(true);
            await api.delete(`/links/${link._id}`);
            onDeleted(link._id);
            setShowConfirm(false);
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.message || "Failed to delete");
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <button
                            onClick={copy}
                            aria-label="Copy link"
                            className={`rounded-full p-2 transition ${
                                copied
                                    ? "bg-violet-600 text-white"
                                    : "text-gray-500 hover:bg-violet-50 hover:text-violet-600"
                            }`}
                        >
                            {copied ? <Check size={16} /> : <Copy size={16} />}
                        </button>
                        <div className="min-w-0">
                            <h3 className="truncate text-xs text-gray-900 sm:max-w-80 sm:text-sm lg:max-w-120">
                                {link.originalUrl}
                            </h3>
                            <a
                                href={`${process.env.NEXT_PUBLIC_BASE_URL}/shortme/${link.shortId}`}
                                target="_blank"
                                rel="noreferrer"
                                className="mt-2 block truncate text-sm text-violet-600"
                            >
                                <span className="hidden sm:inline-block">{process.env.NEXT_PUBLIC_BASE_URL}</span>/shortme/{link.shortId}
                            </a>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setShowConfirm(true)}
                            aria-label="Delete link"
                            className="rounded-full p-2 text-rose-500 transition hover:bg-rose-50"
                        >
                            <Trash size={16} />
                        </button>
                    </div>
                </div>
            </div>

            {showConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
                    <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-50 text-rose-500">
                                <Trash size={18} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">Delete this link?</h3>
                                <p className="text-sm text-gray-500">
                                    This action cannot be undone.
                                </p>
                            </div>
                        </div>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                onClick={() => setShowConfirm(false)}
                                className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmRemove}
                                disabled={isDeleting}
                                className="rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600 disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {isDeleting ? "Deleting..." : "Remove"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}