import connectDB from "@/lib/db";
import Link from "@/modals/link";
import { redirect, notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } =  params;
  console.log(id)

  try {
    await connectDB();

    const link = await Link.findOne({ shortId: id, active: true });

    if (!link) {
      notFound();
    }

    try {
      await Link.findByIdAndUpdate(link._id, { $inc: { clicks: 1 } });
    } catch (e) {
      console.error("Failed to increment clicks:", e);
    }

    return redirect(link.originalUrl);
    } catch (err) {
    console.error(err);
    notFound();
  }
}
