import connectDB from "@/lib/db";
import getUser from "@/lib/getUser";
import Link from "@/modals/link";
import AnalyticsClient from "@/components/dashboard/AnalyticsClient";

export default async function AnalyticsPage() {

	await connectDB();

	const user = await getUser();
	if (!user) return <div className="p-6 text-gray-400">Unauthorized</div>;

	const links = await Link.find({ userId: user.id }).sort({ createdAt: -1 }).lean();

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
