import Timer from "./components/ui/timer_";
import TodoList from "./components/ui/todo-list";
import StoreContextProvider from "./context/StoreProvider";

function App() {
	return (
		<StoreContextProvider>
			<main class="py-2 min-w-25 bg-neutral-950 h-screen flex flex-col items-center gap-4 text-white">
				<Timer minuteCount={25} />
				<TodoList />
			</main>
		</StoreContextProvider>
	);
}

export default App;
