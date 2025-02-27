import { createSignal, createMemo, onCleanup, createEffect } from "solid-js";
import PauseSvg from "../svg/pause.svg";
import PlaySvg from "../svg/play.svg";
import RefreshSvg from "../svg/refresh.svg";
import UpSvg from "../svg/up.svg";
import DownSvg from "../svg/down.svg";

function formatString(num: number): string {
	return num.toString().padStart(2, "0");
}

export default function Timer() {
	// Number of minutes
	const [maxTime, setMaxTime] = createSignal(60 * 25);

	const [time, setTime] = createSignal<number>(maxTime());
	const [isRunning, setIsRunning] = createSignal<boolean>(false);
	const isPaused = createMemo(
		() => !isRunning() && time() !== 0 && time() !== maxTime()
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

	// Function to add a minute
	const addOneMinute = () => {
		if (!isRunning()) {
			const newMaxTime = maxTime() + 60;
			setMaxTime(newMaxTime);
			setTime(newMaxTime);
		}
	};

	// Function to subtract a minute
	const subtractOneMinute = () => {
		if (!isRunning() && maxTime() > 0) {
			const newMaxTime = maxTime() - 60;
			setMaxTime(newMaxTime);
			setTime(newMaxTime);
		}
	};

	// Function to add a second
	const addOneSecond = () => {
		if (!isRunning()) {
			const newMaxTime = maxTime() + 1;
			setMaxTime(newMaxTime);
			setTime(newMaxTime);
		}
	};

	const subtractOneSecond = () => {
		if (!isRunning() && maxTime() > 0) {
			const newMaxTime = maxTime() - 1;
			setMaxTime(newMaxTime);
			setTime(newMaxTime);
		}
	};

	return (
		<div class="w-full px-4 flex flex-col items-center gap-2">
			<div
				class={`${
					isPaused() ? "animate-pulse" : ""
				} text-5xl flex items-center *:h-fit`}
			>
				<div class="flex items-center">
					<div>
						<UpSvg
							class="h-6 hover:cursor-pointer"
							onclick={addOneMinute}
						/>
						<DownSvg
							class="h-6 hover:cursor-pointer"
							onclick={subtractOneMinute}
						/>
					</div>
					<div>{minutes()}</div>
				</div>
				<span class="flex flex-col justify-center h-full leading-none">
					<span>:</span>
				</span>
				<div class="flex items-center">
					<div class="leading-none">{seconds()}</div>
					<div>
						<UpSvg
							class="h-6 hover:cursor-pointer"
							onclick={addOneSecond}
						/>
						<DownSvg
							class="h-6 hover:cursor-pointer"
							onclick={subtractOneSecond}
						/>
					</div>
				</div>
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
					style={{ width: `${((maxTime() - time()) / maxTime()) * 100}%` }}
				></div>
			</div>
		</div>
	);
}
