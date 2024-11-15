import { Route, Routes } from "react-router-dom";
import { Shop } from "./Shop";
import { Store } from "./Store";
import { Navigation } from "./Navigation";

const App = () => {
	return (
		<div>
			<Navigation />
			<Routes>
				<Route path="/" element={<Shop />} />
				<Route path="/store" element={<Store />} />
			</Routes>
		</div>
	);
};
export default App;
