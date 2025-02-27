import { SvgProps } from "./svg";

export default function DownSvg(props: SvgProps) {
	return (
		<svg
      class={`${props.class}`}
      onclick={props.onclick}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12.3704 15.8351L18.8001 9.20467C19.2013 8.79094 18.9581 8 18.4297 8H5.5703C5.04189 8 4.79869 8.79094 5.1999 9.20467L11.6296 15.8351C11.8427 16.055 12.1573 16.0549 12.3704 15.8351Z"
				fill="white"
			/>
		</svg>
	);
}
