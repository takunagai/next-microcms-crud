import { createClient } from "microcms-js-sdk";

if (!process.env.NEXT_PUBLIC_MICROCMS_API_KEY) {
	throw new Error(
		"The environment variable NEXT_PUBLIC_MICROCMS_API_KEY is not set.",
	);
}

export const client = createClient({
	serviceDomain: "todo-list", //　XXXX.microcms.io の XXXX 部分
	apiKey: process.env.NEXT_PUBLIC_MICROCMS_API_KEY,
});
