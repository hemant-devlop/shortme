import connectDB from "@/lib/db";
import getUser from "@/lib/getUser";
import Link from "@/modals/link";
import AnalyticsClient from "@/components/dashboard/AnalyticsClient";

export default async function AnalyticsPage() {

	await connectDB();

	const user = await getUser();
	if (!user) return <div className="p-6 text-gray-400">Unauthorized</div>;

	const rawLinks = await Link.find({ userId: user.id }).sort({ createdAt: -1 }).lean();
	const links = rawLinks.map((link) => ({
		...link,
		_id: link._id?.toString?.() ?? link._id,
		userId: link.userId?.toString?.() ?? link.userId ?? null,
		createdAt: link.createdAt ? new Date(link.createdAt).toISOString() : null,
		updatedAt: link.updatedAt ? new Date(link.updatedAt).toISOString() : null,
		expiresAt: link.expiresAt ? new Date(link.expiresAt).toISOString() : null,
	}));

	return (
		<div className="space-y-6">
			<h3 className="text-2xl font-bold">Analytics</h3>

			{links.length === 0 ? (
				<div className="p-6 bg-zinc-900 rounded-xl text-gray-400">No links yet — create a short link to see analytics.</div>
			) : (
				<AnalyticsClient links={links} />
			)}
		</div>
	);

}
