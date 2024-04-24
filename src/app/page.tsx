import { client } from "@/lib/client";
import type { DataType } from "@/types/todo";
import { revalidatePath } from "next/cache";
import Link from "next/link";

const createTodo = async (formData: FormData) => {
	"use server";
	const title = formData.get("title") as string;
	const sendData = `{"title":"${title}"}`;

	await client.create({
		endpoint: "todo",
		content: JSON.parse(sendData),
	});

	revalidatePath("/", "page");
};

const deleteTodo = async (FormData: FormData) => {
	"use server";
	const id = FormData.get("id") as string;

	await client.delete({
		endpoint: "todo",
		contentId: id,
	});

	revalidatePath("/", "page");
};

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
