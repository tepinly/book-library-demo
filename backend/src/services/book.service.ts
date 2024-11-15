import type { BookAttributes } from "../database/schema.js";
import {
	createBook,
	findBooksPaginated,
} from "../repositories/book.repository.js";

export const FindBooksPaginated = async (page: number, limit: number) => {
	const offset = (page - 1) * limit;
	return await findBooksPaginated(limit, offset);
};

export const CreateBook = async (book: BookAttributes) => createBook(book);
