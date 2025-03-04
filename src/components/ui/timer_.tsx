import { createEffect, createMemo, createSignal, Accessor } from "solid-js";
import { concatenateClassNames, formatString } from "../../utils/utils";

interface DisplayTimerProps {
	className?: string;
	minutes: Accessor<string>;
	seconds: Accessor<string>;
	toggleTimer: () => void;
	resetTimer: () => void;
	isRunning: Accessor<boolean>;
	isPaused: Accessor<boolean>;
}

function DisplayTimer(props: DisplayTimerProps) {
	const {
		className,
		minutes,
		seconds,
		toggleTimer,
		resetTimer,
		isRunning,
		isPaused,
	} = props;

	const _class = createMemo(() =>
		concatenateClassNames(
			className,
			"text-3xl font-light *:leading-none *:h-min flex active:scale-95 w-18 gap-1",
			isPaused() && "animate-pulse"
		)
	);

	const _title = createMemo(() => (isRunning() ? "pause" : "start"));

	return (
		<div class="flex items-center gap-4">
			<div
				class={_class()}
				onclick={toggleTimer}
				oncontextmenu={resetTimer}
				title={_title()}
			>
				<p>{minutes()}</p>
				<p>:</p>
				<p>{seconds()}</p>
			</div>
		</div>
	);
}

interface ProgressBarProps {
	maxTime: number;
	time: Accessor<number>;
}

function ProgressBar(props: ProgressBarProps) {
	const { maxTime, time } = props;
	return (
		<div class="min-w-40 h-0.5 w-full md:w-3/4 lg:w-1/2 max-w-60 bg-neutral-600 rounded-full">
			<div
				class="h-full bg-neutral-300 rounded-full transition-all duration-300"
				style={{ width: `${((maxTime - time()) / maxTime) * 100}%` }}
			></div>
		</div>
	);
}

interface TimerProps {
	minuteCount: 25 | 5;
}

export default function Timer(props: TimerProps) {
	const { minuteCount } = props;

	const maxTime = 10 * 60 * minuteCount;
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
