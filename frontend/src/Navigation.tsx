import { Link } from "react-router-dom";

export const Navigation = () => {
	return (
		<div>
			<nav>
				<ul>
					<li>
						<Link to="/">Shop</Link>
					</li>
					<li>
						<Link to="/store">Store</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
};
