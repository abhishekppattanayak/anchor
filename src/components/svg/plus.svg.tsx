import { SvgProps } from "./svg";

export default function PlusSvg(props: SvgProps) {
	return (
		<svg
			class={`${props.class}`}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>{props.title}</title>
			<path
				d="M4 12H20M12 4V20"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}
