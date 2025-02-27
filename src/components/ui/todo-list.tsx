import { createSignal, For } from "solid-js";

interface ITodo {
	id: number;
	text: string;
}

function Todo(props: ITodo) {
	const [completed, setCompleted] = createSignal<boolean>(false);
	const [text, setText] = createSignal<string>(props.text);

	return (
		<li class="flex items-center gap-2">
			<div
				class={`border ${
					completed() ? "border-blue-400" : "border-neutral-400"
				} w-3 aspect-square bg-transparent rounded-full p-0.5 cursor-pointer`}
				onclick={() => setCompleted(!completed())}
			>
				{completed() && <div class="w-full aspect-square rounded-full bg-blue-400" ></div>}
			</div>
			<input
				class={`${
					completed() ? "line-through text-white/50" : ""
				} flex items-center w-full focus:outline-none bg-transparent`}
				type="text"
				value={text()}
				onchange={(e) => setText(e.target.value)}
			/>
		</li>
	);
}

export default function TodoList() {
	const [todos, setTodos] = createSignal<ITodo[]>([]);

	return (
		<ul class="border border-neutral-800 rounded-md p-2 overflow-y-auto flex flex-col gap-2">
			<For each={todos()}>{(todo) => <Todo {...todo} />}</For>
			<li class="border-b border-neutral-700">
				<input
					type="text"
					class="focus:outline-none placeholder:text-neutral-600 bg-transparent"
					placeholder="Add a todo"
					onkeydown={(e) => {
						if (e.key === "Enter" && e.currentTarget.value !== "") {
							setTodos([
								...todos(),
								{
									id: todos().length + 1,
									text: e.currentTarget.value,
								},
							]);
							e.currentTarget.value = "";
						}
					}}
				/>
			</li>
		</ul>
	);
}
