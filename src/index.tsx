/* @refresh reload */
import { render } from "solid-js/web";
import App from "./App";
import "./index.css";

document.addEventListener("selectstart", (event) => {
	if (
		(event.target as HTMLElement).tagName !== "INPUT" &&
		(event.target as HTMLElement).tagName !== "TEXTAREA"
	) {
		event.preventDefault();
	}
});

render(() => <App />, document.getElementById("root") as HTMLElement);
