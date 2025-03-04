import { createSignal, For } from "solid-js";
import { ITodo } from "../../types/interface";
import { useStoreContext } from "../../context/StoreProvider";
import DeleteSvg from "../svg/delete.svg";

function Todo(props: ITodo) {
	const { updateTodo, deleteTodo } = useStoreContext();
	const [completed, setCompleted] = createSignal(false);
	const [isHovering, setIsHovering] = createSignal(false);

	const handleMouseEnter = () => setIsHovering(true);
	const handleMouseLeave = () => setIsHovering(false);

	return (
		<li
			class="flex items-center gap-2 px-2 py-0.5 rounded-sm hover:bg-white/5"
			onmouseenter={handleMouseEnter}
			onmouseleave={handleMouseLeave}
		>
			<div
				class={`border ${
					completed() ? "border-blue-400" : "border-neutral-400"
				} w-3 aspect-square bg-transparent rounded-full p-0.5 cursor-pointer`}
				onclick={() => setCompleted(!completed())}
			>
				{completed() && (
					<div class="w-full aspect-square rounded-full bg-blue-400"></div>
				)}
			</div>
			<input
				class={`${
					completed() ? "line-through text-white/50" : ""
				} flex items-center w-full focus:outline-none bg-transparent`}
				type="text"
				value={props.text}
				onchange={(e) => updateTodo(props.id, e.currentTarget.value)}
			/>
			{isHovering() && (
				<button
					class="h-full aspect-square p-1 hover:cursor-pointer hover:bg-white/10 rounded-full  *:fill-white hover:*:fill-red-300"
					onclick={() => deleteTodo(props.id)}
					title="delete"
				>
					<DeleteSvg class="h-full aspect-square" />
				</button>
			)}
		</li>
	);
}

export default function TodoList() {
	const { store, createTodo } = useStoreContext();

	return (
		<ul class="w-10/12 md:w-8/12 xl:w-6/12 *:text-sm border border-neutral-800 rounded-md p-2 overflow-y-auto flex flex-col gap-0.5">
			<For each={store}>{(todo) => <Todo {...todo} />}</For>
			<li class="border-b border-neutral-700">
				<input
					type="text"
					class="focus:outline-none placeholder:text-neutral-600 bg-transparent hover:bg-white/5 rounded-sm px-2 py-0.5 w-full"
					placeholder="Add a todo"
					onkeydown={(e) => {
						if (e.key === "Enter" && e.currentTarget.value !== "") {
							createTodo(e.currentTarget.value);
							e.currentTarget.value = "";
						}
					}}
				/>
			</li>
		</ul>
	);
}
