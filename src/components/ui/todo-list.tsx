import { createSignal, For } from "solid-js";
import { ITodo } from "../../types/interface";
import { useStoreContext } from "../../context/StoreProvider";
import DeleteSvg from "../svg/delete.svg";
import PlusSvg from "../svg/plus.svg";

function TodoChild(props: ITodo) {
	const { updateChild, deleteChild } = useStoreContext();
	const [completed, setCompleted] = createSignal(false);
	const [isHovering, setIsHovering] = createSignal(false);
	const [deleted, setDeleted] = createSignal(false);

	const handleMouseEnter = () => setIsHovering(true);
	const handleMouseLeave = () => setIsHovering(false);

	const handleDelete = () => {
		setDeleted(true);
		setTimeout(() => deleteChild(props.parentId, props.id), 249);
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		const target = e.target as HTMLInputElement;
		if (e.key === "Enter") {
			target.blur();
		}
	};

	return (
		<li
			class={`${
				deleted() && "animate-delete"
			} flex flex-col justify-center px-1 py-0.5`}
		>
			<div
				class="flex items-center gap-2 px-1 py-0.5 rounded-sm hover:bg-white/5"
				onmouseenter={handleMouseEnter}
				onmouseleave={handleMouseLeave}
			>
				<div
					class={`border ${
						completed() ? "border-blue-400" : "border-neutral-400"
					} w-3 aspect-square bg-transparent rounded-full p-0.5 cursor-pointer shrink-0`}
					onclick={() => setCompleted(!completed())}
				>
					{completed() && (
						<div class="w-full aspect-square rounded-full bg-blue-400"></div>
					)}
				</div>
				<input
					class={`${
						completed() ? "line-through text-white/50" : ""
					} flex items-center w-full focus:outline-none bg-transparent leading-0`}
					type="text"
					placeholder="Add a subtask"
					value={props.text}
					onchange={(e) =>
						updateChild(props.parentId, props.id, e.currentTarget.value)
					}
					onKeyPress={handleKeyPress}
				/>
				{isHovering() && (
					<button
						class="h-full aspect-square p-1 hover:cursor-pointer hover:bg-white/10 rounded-full"
						onclick={handleDelete}
						title="delete"
					>
						<DeleteSvg
							class="h-full aspect-square fill-white hover:fill-red-300"
							title="delete"
						/>
					</button>
				)}
			</div>
		</li>
	);
}

function Todo(props: ITodo) {
	const { children } = props;
	const { updateTodo, deleteTodo, createChild } = useStoreContext();
	const [completed, setCompleted] = createSignal(false);
	const [isHovering, setIsHovering] = createSignal(false);
	const [deleted, setDeleted] = createSignal(false);

	const handleMouseEnter = () => setIsHovering(true);
	const handleMouseLeave = () => setIsHovering(false);

	const handleDelete = () => {
		setDeleted(true);
		setTimeout(() => deleteTodo(props.id), 249);
	};

	const handleKeyPress = (e: KeyboardEvent) => {
		const target = e.target as HTMLInputElement;
		if (e.key === "Enter") {
			target.blur();
		}
	};

	return (
		<li
			class={`${
				deleted() && "animate-delete"
			} flex flex-col justify-center px-1 py-0.5`}
		>
			<div
				class="flex items-center gap-2 px-1 py-0.5 rounded-sm hover:bg-white/5"
				onmouseenter={handleMouseEnter}
				onmouseleave={handleMouseLeave}
			>
				<div
					class={`border ${
						completed() ? "border-blue-400" : "border-neutral-400"
					} w-3 aspect-square bg-transparent rounded-full p-0.5 cursor-pointer shrink-0`}
					onclick={() => setCompleted(!completed())}
				>
					{completed() && (
						<div class="w-full aspect-square rounded-full bg-blue-400"></div>
					)}
				</div>
				<input
					class={`${
						completed() ? "line-through text-white/50" : ""
					} flex items-center w-full focus:outline-none bg-transparent leading-0`}
					type="text"
					value={props.text}
					onchange={(e) => updateTodo(props.id, e.currentTarget.value)}
					onkeypress={handleKeyPress}
				/>
				{isHovering() && (
					<>
						<button
							class="h-full aspect-square p-0.5 hover:cursor-pointer hover:bg-white/10 rounded-full"
							onclick={createChild.bind(null, props.id, "")}
							title="add"
						>
							<PlusSvg
								class="h-full aspect-square *:stroke-white hover:*:stroke-blue-400"
								title="add"
							/>
						</button>
						<button
							class="h-full aspect-square p-1 hover:cursor-pointer hover:bg-white/10 rounded-full"
							onclick={handleDelete}
							title="delete"
						>
							<DeleteSvg
								class="h-full aspect-square fill-white hover:fill-red-300"
								title="delete"
							/>
						</button>
					</>
				)}
			</div>

			<ul class="pl-2 flex flex-col">
				<For each={children}>
					{(child) => (
						<TodoChild
							{...child}
							parentId={props.id}
						/>
					)}
				</For>
			</ul>
		</li>
	);
}

export default function TodoList() {
	const { store, createTodo } = useStoreContext();

	return (
		<ul class="w-10/12 md:w-8/12 xl:w-6/12 *:text-sm border border-neutral-800 rounded-md p-2 overflow-x-hidden overflow-y-auto flex flex-col gap-0.5">
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
