import { redirect } from "next/navigation";

export default function Page({ params }) {
	const { id } = params;
	return redirect(`/shortme/${id}`);
}
