export type DataType = {
	contents: ContentsType[];
	totalCount: number;
	limit: number;
	offset: number;
};

export type ContentsType = {
	id: string;
	title: string;
};
