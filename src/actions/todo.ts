"use server";

import { client } from "@/lib/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const createTodo = async (formData: FormData) => {
	const title = formData.get("title") as string;
	const sendData = `{"title":"${title}"}`;

	await client.create({
		endpoint: "todo",
		content: JSON.parse(sendData),
	});

	revalidatePath("/", "page");
};

export const updateTodo = async (formData: FormData) => {
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

export const deleteTodo = async (FormData: FormData) => {
	const id = FormData.get("id") as string;

	await client.delete({
		endpoint: "todo",
		contentId: id,
	});

	revalidatePath("/", "page");
};
