import { createMemo, Accessor } from "solid-js";
import { concatenateClassNames } from "../../utils/utils";

interface DisplayTimerProps {
	className?: string;
	minutes: Accessor<string>;
	seconds: Accessor<string>;
	toggleTimer: () => void;
	resetTimer: () => void;
	isRunning: Accessor<boolean>;
	isPaused: Accessor<boolean>;
}

export function DisplayTimer(props: DisplayTimerProps) {
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
