import { createSignal, createMemo, onCleanup, createEffect } from "solid-js";
import PauseSvg from "../svg/pause.svg";
import PlaySvg from "../svg/play.svg";
import RefreshSvg from "../svg/refresh.svg";

function formatString(num: number): string {
	return num.toString().padStart(2, "0");
}

export default function Timer() {
	// Number of minutes
	const maxTime = 60 * 10;

	const [time, setTime] = createSignal<number>(maxTime);
	const [isRunning, setIsRunning] = createSignal<boolean>(false);
	const isPaused = createMemo(
		() => !isRunning() && time() !== 0 && time() !== maxTime
	);

	const seconds = createMemo<string>(() => formatString(time() % 60));
	const minutes = createMemo<string>(() =>
		formatString(Math.floor(time() / 60))
	);

	// Use a ref for the interval ID
	let intervalId: number | undefined;

	// Function to start the timer
	const startTimer = () => {
		if (!isRunning()) {
			setIsRunning(true);
			intervalId = setInterval(() => {
				setTime((prev) => (prev > 0 ? prev - 1 : 0));
			}, 1000);
		}
	};

	// Function to stop the timer
	const stopTimer = () => {
		setIsRunning(false);
		clearInterval(intervalId);
	};

	// Function to toggle (start/stop) the timer
	const toggleTimer = () => {
		if (isRunning()) {
			stopTimer();
		} else {
			startTimer();
		}
	};

	// Function to reset the timer
	const resetTimer = () => {
		setTime(maxTime);
		stopTimer();
		setIsRunning(false);
		clearInterval(intervalId);
		intervalId = undefined;
	};

	// Clear interval on component unmount
	onCleanup(() => clearInterval(intervalId));

	// Effect to clear timer when time reaches 0
	createEffect(() => {
		if (time() === 0) {
			stopTimer();
		}
	});

	return (
		<div class="w-full px-4 flex flex-col items-center gap-2">
			<div class={`${isPaused() ? "animate-pulse" : ""} text-5xl `}>
				{minutes() + ":" + seconds()}
			</div>
			<div class="flex gap-2">
				<div
					onclick={toggleTimer}
					class="hover:cursor-pointer active:scale-95"
				>
					{isRunning() ? <PauseSvg /> : <PlaySvg />}
				</div>
				<div
					onclick={resetTimer}
					class="hover:cursor-pointer active:scale-95"
				>
					<RefreshSvg />
				</div>
			</div>
			<div class="min-w-40 h-0.5 w-full md:w-3/4 lg:w-1/2 max-w-60 bg-neutral-600 rounded-full">
				<div
					class="h-full bg-neutral-300 rounded-full transition-all duration-300"
					style={{ width: `${((maxTime - time()) / maxTime) * 100}%` }}
				></div>
			</div>
		</div>
	);
}
