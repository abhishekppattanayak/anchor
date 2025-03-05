import StoreContextProvider from "./context/StoreProvider";
import PageRouter from "./router/router";

function App() {
	return (
		<StoreContextProvider>
			<PageRouter />
		</StoreContextProvider>
	);
}

export default App;
