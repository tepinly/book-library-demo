import {
	Author,
	Book,
	Store,
	StoreBook,
	type BookCreationAttributes,
} from "../database/schema.js";

export const findBooksPaginated = async (limit: number, offset: number) => {
	return await Book.findAll({
		limit,
		offset,
		include: [
			{ model: Author, attributes: ["name"] },
			{
				model: Store,
				through: {
					attributes: ["price", "sold_out"],
				},
			},
		],
	});
};

export const findBookById = async (id: number) => {
	return await Book.findByPk(id);
};

export const createBook = async (book: BookCreationAttributes) => {
	return await Book.create(book);
};
