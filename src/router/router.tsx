import { Router, Route } from "@solidjs/router";
import IndexPage from "../pages/Index";
import HelpPage from "../pages/Help";

export default function PageRouter() {
	return (
		<Router>
			<Route
				path="/"
				component={IndexPage}
			/>
			<Route
				path="/help"
				component={HelpPage}
			/>
		</Router>
	);
}
