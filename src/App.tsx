import { createSignal } from "solid-js";
import Timer from "./components/ui/timer_";
import TodoList from "./components/ui/todo-list";

function App() {
	const [width, setWidth] = createSignal(window.innerWidth);

	window.addEventListener("resize", () => {
		setWidth(window.innerWidth);
	});

	return (
		<main class="py-2 min-w-25 bg-neutral-950 h-screen flex flex-col items-center gap-4 text-white">
			<Timer minuteCount={25} />
			<TodoList />
		</main>
	);
}

export default App;
