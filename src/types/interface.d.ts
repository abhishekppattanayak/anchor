declare interface ITodo {
	key?: number;
	id: number;
	text: string;
	parentId: number;
	children?: ITodo[];
}

export { ITodo };
