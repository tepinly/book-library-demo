import express from "express";
import { initializeDatabase } from "./database/schema.js";
import { CreateBook, FindBooksPaginated } from "./services/book.service.js";
import { CreateAuthor, FindAuthorById } from "./services/author.service.js";
import cors from "cors";
import {
	CreateStore,
	FindStoresByBookId,
	SoldOut,
} from "./services/store.service.js";

await initializeDatabase();

const corsOptions = {
	origin: ["http://localhost:3000", "http://frontend:3000"],
	methods: ["GET", "POST", "PUT", "DELETE"],
	allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
const port = 5000;

app.get("/books", async (req, res) => {
	const page = req.query.page ? Number.parseInt(req.query.page as string) : 1;
	const limit = req.query.limit
		? Number.parseInt(req.query.limit as string)
		: 10;
	const books = await FindBooksPaginated(page, limit);
	res.json(books);
});

app.post("/books", async (req, res) => {
	const book = req.body;
	const createdBook = await CreateBook(book);
	res.json(createdBook);
});

app.post("/stores", async (req, res) => {
	const store = req.body;
	const createdStore = await CreateStore(store);
	res.json(createdStore);
});

app.get("/books/stores/:id", async (req, res) => {
	const id = Number.parseInt(req.params.id);
	const book = await FindStoresByBookId(id);
	res.json(book);
});

app.post("/books/sold-out", async (req, res) => {
	const { bookId, storeId } = req.body;
	const soldOut = await SoldOut(storeId, bookId);
	res.json(soldOut);
});

app.get("/authors/:id", async (req, res) => {
	const id = Number.parseInt(req.params.id);
	const author = await FindAuthorById(id);
	res.json(author);
});

app.post("/authors", async (req, res) => {
	const author = req.body;
	const createdAuthor = await CreateAuthor(author);
	res.json(createdAuthor);
});

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
