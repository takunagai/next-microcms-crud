import { client } from "@/lib/client";
import type { DataType } from "@/types/todo";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
	id: string;
	title: string;
};

export default async function updateTodo({ params }: { params: Props }) {
	const data: DataType = await client.get({
		endpoint: "todo",
		// TODO: `contentId: params.id,` を使った実装に (https://note.com/chihi_note/n/ncfefca6f8c5c)
		queries: {
			fields: "id,title",
			filters: `id[equals]${params.id}`,
		},
	});

	const updateTodo = async (formData: FormData) => {
		"use server";
		const id = formData.get("id") as string;
		const title = formData.get("title") as string;
		const sendData = `{"title":"${title}"}`;

		await client.update({
			endpoint: "todo",
			contentId: id,
			content: JSON.parse(sendData),
		});

		revalidatePath("/", "page");
		revalidatePath("/todo/[id]", "page");
		redirect("/");
	};

	return (
		<div className="flex flex-col gap-4">
			<header>
				<h1 className="text-2xl">Todo List - 編集</h1>
				<p>
					<Link
						href="/"
						className="text-sm underline text-blue-500 hover:text-blue-400"
					>
						« 一覧に戻る
					</Link>
				</p>
			</header>
			<form className="flex gap-2" action={updateTodo}>
				<input type="hidden" name="id" value={data.contents[0].id} />
				<input
					type="text"
					name="title"
					placeholder="編集…"
					defaultValue={data.contents[0].title}
					className="text-black"
				/>
				<button type="submit" className="px-2 bg-gray-700 hover:bg-gray-600">
					保存する
				</button>
			</form>
		</div>
	);
}
