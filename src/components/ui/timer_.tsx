import { createEffect, createMemo, createSignal } from "solid-js";
import { formatString, notify } from "../../utils/utils";
import { DisplayTimer } from "./displaytimer";
import { ProgressBar } from "./progressbar";

interface TimerProps {
	minuteCount: 25 | 5;
}

export default function Timer(props: TimerProps) {
	const { minuteCount } = props;

	const maxTime = 10 * 60 * minuteCount; // unit := centiseconds
	const [time, setTime] = createSignal(maxTime);
	const [isRunning, setIsRunning] = createSignal(false);
	const isPaused = createMemo(
		() => !isRunning() && time() !== maxTime && time() !== 0
	);

	const seconds = createMemo(() =>
		formatString(Math.floor((time() % 600) / 10))
	);
	const minutes = createMemo(() => formatString(Math.floor(time() / 600)));

	// Ref to store the interval ID
	let intervalId: number | undefined = undefined;

	// Function to start the timer
	const startTimer = () => {
		if (!isRunning()) {
			intervalId = setInterval(() => {
				setIsRunning(true);
				setTime((prev) => (prev > 0 ? prev - 1 : 0));
			}, 100);
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

	// Effect to stop the timer when it reaches 0
	createEffect(() => {
		if (time() === 0) {
			stopTimer();
			notify("Time to take a break!");
		}
	});

	return (
		<div class="w-full flex flex-col gap-2 items-center">
			<DisplayTimer
				className="hover:cursor-pointer"
				minutes={minutes}
				seconds={seconds}
				toggleTimer={toggleTimer}
				resetTimer={resetTimer}
				isRunning={isRunning}
				isPaused={isPaused}
			/>
			<ProgressBar
				maxTime={maxTime}
				time={time}
			/>
		</div>
	);
}
