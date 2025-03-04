/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import "./index.css";

document.addEventListener("selectstart", (e: Event) => {
	const target = e.target as HTMLElement;
	if (target.tagName !== "INPUT" && target.tagName !== "TEXTAREA") {
		e.preventDefault();
	}
});

document.addEventListener("contextmenu", (e: MouseEvent) => {
	e.preventDefault();
});

render(() => <App />, document.getElementById("root") as HTMLElement);
