import { SvgProps } from "./svg";

export default function CloseSvg(props: SvgProps) {
	return (
		<svg
			class={`${props.class}`}
			viewBox="-0.5 0 25 25"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>close</title>
			<path
				d="M3 21.32L21 3.32001"
				stroke="white"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<path
				d="M3 3.32001L21 21.32"
				stroke="white"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}
