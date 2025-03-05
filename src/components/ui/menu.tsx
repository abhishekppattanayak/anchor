import { A } from "@solidjs/router";
import CloseSvg from "../svg/close.svg";

interface MenuProps {
	closeMenu: () => void;
}

export default function Menu(props: MenuProps) {
	const { closeMenu } = props;
	return (
		<aside class="fixed top-0 left-0 h-screen w-screen bg-neutral-900/50 backdrop-blur-sm flex flex-col gap-1 items-start justify-end py-1 px-2 text-sm">
			<A
				href="/help"
				class="hover:underline"
			>
				Help
			</A>
			<div
				class="aspect-square h-6 hover:cursor-pointer self-start p-1 hover:bg-white/5 rounded-sm"
				onclick={closeMenu}
			>
				<CloseSvg />
			</div>
		</aside>
	);
}
