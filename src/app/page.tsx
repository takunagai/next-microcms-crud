import { createTodo, deleteTodo } from "@/actions/todo";
import { client } from "@/lib/client";
import type { DataType } from "@/types/todo";
import Link from "next/link";

export default async function Home() {
	const data: DataType = await client.get({
		endpoint: "todo",
		queries: { fields: "id,title" },
	});

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl">Todo List</h1>
			<div>
				<form className="flex gap-2" action={createTodo}>
					<input
						type="text"
						name="title"
						placeholder="Todo を入力…"
						defaultValue={""}
						className="text-gray-800 px-1"
					/>
					<button type="submit" className="px-2 bg-gray-700 hover:bg-gray-600">
						入力する
					</button>
				</form>
			</div>
			<div>
				{data?.totalCount ? (
					<ul>
						{data?.contents.map((value) => (
							<li key={value.id} className="flex gap-2">
								{value.title}{" "}
								<Link
									href={`/todo/${value.id}`}
									className="text-sm underline text-blue-500 hover:text-blue-400"
								>
									編集
								</Link>
								<form action={deleteTodo} className="inline">
									<input type="hidden" name="id" value={value.id} />
									<button
										type="submit"
										className="text-sm underline text-red-500 hover:text-red-400"
									>
										削除
									</button>
								</form>
							</li>
						))}
					</ul>
				) : (
					<p>No data</p>
				)}
			</div>
		</div>
	);
}
