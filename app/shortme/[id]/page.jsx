import connectDB from "@/lib/db";
import Link from "@/modals/link";
import { redirect, notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } = await params;
  console.log("Server ", id);

  try {
    await connectDB();

    console.log("Searching DB for shortId:", id);
    const link = await Link.findOne({ shortId: id, active: true });
    console.log("DB lookup result:", link);

    if (!link) {
      console.warn("Link not found for id:", id);
      return notFound();
    }

    if (!link.originalUrl) {
      console.error("Found link has no originalUrl:", link);
      return notFound();
    }

    try {
      await Link.findByIdAndUpdate(link._id, { $inc: { clicks: 1 } });
    } catch (e) {
      console.error("Failed to increment clicks:", e);
    }

    console.log("Redirecting to:", link.originalUrl);
    return redirect(link.originalUrl);
  } catch (err) {
    if (err && err.message === "NEXT_REDIRECT") throw err;
    console.error(err);
    notFound();
  }
}
