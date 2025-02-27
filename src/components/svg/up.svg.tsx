import { SvgProps } from "./svg";

export default function UpSvg(props: SvgProps) {
	return (
		<svg
			class={`${props.class}`}
			onclick={props.onclick}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12.3704 8.16485L18.8001 14.7953C19.2013 15.2091 18.9581 16 18.4297 16H5.5703C5.04189 16 4.79869 15.2091 5.1999 14.7953L11.6296 8.16485C11.8427 7.94505 12.1573 7.94505 12.3704 8.16485Z"
				fill="white"
			/>
		</svg>
	);
}
