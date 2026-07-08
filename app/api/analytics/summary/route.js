import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Analytics from "@/modals/analytics";
import Link from "@/modals/link";
import getUser from "@/lib/getUser";

export async function GET(req) {
  try {
    await connectDB();

    const user = await getUser();
    if (!user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const url = new URL(req.url);
    const linkId = url.searchParams.get("linkId");

    if (!linkId) {
      return NextResponse.json({ success: false, message: "linkId is required" }, { status: 400 });
    }

    const link = await Link.findById(linkId);
    if (!link || String(link.userId) !== String(user.id)) {
      return NextResponse.json({ success: false, message: "Not found" }, { status: 404 });
    }

    const now = new Date();
    const from = new Date();
    from.setDate(now.getDate() - 29); // last 30 days

    // daily counts for last 30 days
    const dailyAgg = await Analytics.aggregate([
      { $match: { linkId: link._id, createdAt: { $gte: from } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    // browsers
    const browsersAgg = await Analytics.aggregate([
      { $match: { linkId: link._id } },
      { $group: { _id: "$browser", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    // countries
    const countriesAgg = await Analytics.aggregate([
      { $match: { linkId: link._id } },
      { $group: { _id: "$country", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    return NextResponse.json({
      success: true,
      data: {
        daily: dailyAgg,
        browsers: browsersAgg,
        countries: countriesAgg,
        totalClicks: link.clicks || 0,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
