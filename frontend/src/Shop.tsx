import { useEffect, useState } from "react";

type Book = {
	id: number;
	name: string;
	pages: string;
	Author: {
		name: string;
	};
	Stores: [
		{
			id: number;
			name: string;
			address: string;
			StoreBook: {
				price: number;
				sold_out: boolean;
				name: string;
			};
		},
	];
};

export const Shop = () => {
	const [books, setBooks] = useState<Book[]>([]);

	const fetchBooks = async () => {
		try {
			const response = await fetch(`${process.env.REACT_APP_API}/books`);
			const data = await response.json();
			setBooks(data);
		} catch (error) {
			console.error("Error fetching books:", error);
		}
	};

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		fetchBooks();
	}, []);

	const handleSell = async (bookId: number, storeId: number) => {
		try {
			await fetch(`${process.env.REACT_APP_API}/books/sold-out`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					bookId,
					storeId,
				}),
			});

			await fetchBooks();
		} catch (error) {
			console.error("Error updating store:", error);
		}
	};

	return (
		<div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
				{books.map((book: Book) => (
					<div key={book.id} className="bg-white rounded-lg shadow-md p-4">
						<h2 className="text-xl font-bold mt-2">{book.name}</h2>
						<p className="text-gray-600">by {book.Author.name}</p>
						<p className="text-gray-600">Pages {book.pages}</p>
						{book.Stores.map((store) => (
							<div key={store.name}>
								<p className="text-gray-600">Sold at: {store.name}</p>
								<p className="text-gray-600">Price {store.StoreBook.price}</p>
								{store.StoreBook.sold_out ? (
									<p className="text-gray-600">Sold out</p>
								) : (
									<button
										type="button"
										className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
										onClick={() => handleSell(book.id, book.Stores[0].id)}
									>
										Sell
									</button>
								)}
							</div>
						))}
					</div>
				))}
			</div>
		</div>
	);
};
