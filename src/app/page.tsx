import { client } from "@/lib/client";

type dataType = {
	contents: contentsType[];
	totalCount: number;
	limit: number;
	offset: number;
};

type contentsType = {
	id: string;
	title: string;
};

export default async function Home() {
	const data: dataType = await client.get({
		endpoint: "todo",
		queries: { fields: "id,title" },
	});

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl">Todo List</h1>
			{data?.totalCount ? (
				<ul>
					{data?.contents.map((value) => (
						<li key={value.id} className="list-inside list-disc">
							{value.title}
						</li>
					))}
				</ul>
			) : (
				<p>No data</p>
			)}
		</div>
	);
}
