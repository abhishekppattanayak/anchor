import { createContext, JSXElement, useContext } from "solid-js";
import { createStore } from "solid-js/store";
import { ITodo } from "../types/interface";

const StoreContext = createContext<IStoreContextValue>(
	{} as IStoreContextValue
);

export function useStoreContext() {
	return useContext(StoreContext);
}

interface StoreProviderProps {
	children?: JSXElement;
}

interface IStoreContextValue {
	store: ITodo[];
	createTodo: (text: string) => void;
	updateTodo: (id: number, text: string) => void;
	deleteTodo: (id: number) => void;
	createChild: (parentId: number, text: string) => void;
	updateChild: (parentId: number, childId: number, text: string) => void;
	deleteChild: (parentId: number, childId: number) => void;
	setTodoCompleted: (id: number, completed: boolean) => void;
	setChildCompleted: (
		parentId: number,
		childId: number,
		completed: boolean
	) => void;
}

export default function StoreContextProvider(props: StoreProviderProps) {
	const [store, setStore] = createStore<ITodo[]>([]);

	const createTodo = (text: string) => {
		const newTodo: ITodo = {
			id: Date.now(),
			text,
			parentId: 0,
			completed: false,
		};
		setStore([...store, newTodo]);
	};

	const updateTodo = (id: number, text: string) => {
		setStore(store.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
	};

	const deleteTodo = (id: number) => {
		setStore(store.filter((todo) => todo.id !== id));
	};

	const createChild = (parentId: number, text: string) => {
		const newChild: ITodo = {
			id: Date.now(),
			text,
			parentId,
			completed: false,
		};
		setStore(
			store.map((todo) =>
				todo.id === parentId
					? {
							...todo,
							completed: false,
							children: [...(todo.children || []), newChild],
					  }
					: todo
			)
		);
	};

	const updateChild = (parentId: number, childId: number, text: string) => {
		setStore(
			store.map((todo) =>
				todo.id === parentId
					? {
							...todo,
							children: todo.children?.map((child) =>
								child.id === childId ? { ...child, text } : child
							),
					  }
					: todo
			)
		);
	};

	const deleteChild = (parentId: number, childId: number) => {
		setStore(
			store.map((todo) =>
				todo.id === parentId
					? {
							...todo,
							completed:
								todo.children
									?.filter((child) => child.id !== childId)
									.every((child) => child.completed) ?? false,
							children: todo.children?.filter((child) => child.id !== childId),
					  }
					: todo
			)
		);
	};

	const setTodoCompleted = (id: number, completed: boolean) => {
		setStore(
			store.map((todo) =>
				todo.id === id
					? {
							...todo,
							completed,
							children: todo.children?.map((child) => ({
								...child,
								completed,
							})),
					  }
					: todo
			)
		);
	};

	const setChildCompleted = (
		parentId: number,
		childId: number,
		completed: boolean
	) => {
		setStore(
			store.map((todo) =>
				todo.id === parentId
					? {
							...todo,
							completed:
								completed &&
								(todo.children?.every((c) =>
									c.id === childId ? completed : c.completed
								) ??
									true),
							children: todo.children?.map((child) =>
								child.id === childId ? { ...child, completed } : child
							),
					  }
					: todo
			)
		);
	};

	return (
		<StoreContext.Provider
			value={{
				store,
				createTodo,
				updateTodo,
				deleteTodo,
				createChild,
				updateChild,
				deleteChild,
				setTodoCompleted,
				setChildCompleted,
			}}
		>
			{props.children}
		</StoreContext.Provider>
	);
}
