import { updateTodo } from "@/actions/todo";
import { client } from "@/lib/client";
import type { DataType } from "@/types/todo";
import Link from "next/link";

type Props = {
	id: string;
	title: string;
};

export default async function todoEdit({ params }: { params: Props }) {
	const data: DataType = await client.get({
		endpoint: "todo",
		// TODO: `contentId: params.id,` を使った実装に (https://note.com/chihi_note/n/ncfefca6f8c5c)
		queries: {
			fields: "id,title",
			filters: `id[equals]${params.id}`,
		},
	});

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
