import { createSignal } from "solid-js";
import MenuSvg from "../components/svg/menu.svg";
import Timer from "../components/ui/timer_";
import TodoList from "../components/ui/todo-list";
import Menu from "../components/ui/menu";

export default function IndexPage() {
	const [showMenu, setShowMenu] = createSignal(false);
	const [currentInterval, setCurrentInterval] = createSignal<25 | 5>(25);

	const openMenu = () => setShowMenu(true);
	const closeMenu = () => setShowMenu(false);

	const toggleInterval = () => {
		setCurrentInterval((prev) => (prev === 25 ? 5 : 25));
	};

	return (
		<main class="py-2 min-w-25 bg-neutral-950 h-screen flex flex-col items-center gap-4 text-white">
			<Timer
				minuteCount={currentInterval}
				onTimerComplete={toggleInterval}
			/>
			<TodoList />
			<div
				class="fixed bottom-0 left-0 h-6 aspect-square hover:bg-white/10 hover:cursor-pointer rounded-sm p-1 m-1"
				onclick={openMenu}
			>
				<MenuSvg class="h-full aspect-square" />
			</div>
			{showMenu() && <Menu closeMenu={closeMenu} />}
		</main>
	);
}
