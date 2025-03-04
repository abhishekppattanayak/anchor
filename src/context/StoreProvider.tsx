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
}

export default function StoreContextProvider(props: StoreProviderProps) {
	const [store, setStore] = createStore<ITodo[]>([]);

	const createTodo = (text: string) => {
		const newTodo = { id: Date.now(), text };
		setStore([...store, newTodo]);
	};

	const updateTodo = (id: number, text: string) => {
		setStore(store.map((todo) => (todo.id === id ? { ...todo, text } : todo)));
	};

	const deleteTodo = (id: number) => {
		setStore(store.filter((todo) => todo.id !== id));
	};

	return (
		<StoreContext.Provider
			value={{ store, createTodo, updateTodo, deleteTodo }}
		>
			{props.children}
		</StoreContext.Provider>
	);
}
