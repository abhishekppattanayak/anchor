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
}

export default function StoreContextProvider(props: StoreProviderProps) {
	const [store, setStore] = createStore<ITodo[]>([]);

	const createTodo = (text: string) => {
		const newTodo = { id: Date.now(), text, parentId: 0 };
		setStore([...store, newTodo]);
	};

	const updateTodo = (id: number, text: string) => {
		setStore(store.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
	};

	const deleteTodo = (id: number) => {
		setStore(store.filter((todo) => todo.id !== id));
	};

	const createChild = (parentId: number, text: string) => {
		const newChild = { id: Date.now(), text, parentId };
		setStore(
			store.map((todo) =>
				todo.id === parentId
					? { ...todo, children: [...(todo.children || []), newChild] }
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
							children: todo.children?.filter((child) => child.id !== childId),
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
			}}
		>
			{props.children}
		</StoreContext.Provider>
	);
}
