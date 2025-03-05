import { A } from "@solidjs/router";
import CloseSvg from "../components/svg/close.svg";

export default function HelpPage() {
	return (
		<main class="h-screen flex flex-col items-center py-1 pr-2 pl-2 md:pl-8 lg:pl-12">
			<div class="h-6 aspect-square rounded-sm p-1 m-1 bg-transparent hover:bg-white/10 hover:cursor-pointer self-end">
				<A href="/">
					<CloseSvg />
				</A>
			</div>
			<div class="h-full w-full flex-1 overflow-y-auto overflow-x-hidden">
				<h1 class="text-lg">
					<u class="underline-offset-4">How</u> to use?
				</h1>
				<ol class="list-decimal pl-6 font-light ">
					<li>
						To <b>start/pause</b> the timer, left-click the timer.
					</li>
					<li>
						To <b>reset</b> the timer, right-click the timer.
					</li>
				</ol>
			</div>
		</main>
	);
}
