import { Accessor } from "solid-js";

interface ProgressBarProps {
	maxTime: Accessor<number>;
	time: Accessor<number>;
}

export function ProgressBar(props: ProgressBarProps) {
	const { maxTime, time } = props;
	return (
		<div class="min-w-40 h-0.5 w-full md:w-3/4 lg:w-1/2 max-w-60 bg-neutral-600 rounded-full">
			<div
				class="h-full bg-neutral-300 rounded-full transition-all duration-300"
				style={{ width: `${((maxTime() - time()) / maxTime()) * 100}%` }}
			></div>
		</div>
	);
}
