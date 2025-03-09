declare interface ITodo {
	key?: number;
	id: number;
	text: string;
	parentId: number;
	completed: boolean;
	children?: ITodo[];
}

export { ITodo };
