import { createSignal } from "solid-js";
import Timer from "./components/ui/timer";
import TodoList from "./components/ui/todo-list";

function App() {
	const [width, setWidth] = createSignal(window.innerWidth);

	window.addEventListener("resize", () => {
		setWidth(window.innerWidth);
	});

	return (
    <main class="py-6 min-w-25 bg-neutral-950 h-screen flex flex-col items-center gap-4 text-white">
      <Timer />
      <TodoList />
		</main>
	);
}

export default App;
