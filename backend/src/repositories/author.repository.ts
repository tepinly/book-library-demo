import { Author, type AuthorCreationAttributes } from "../database/schema.js";

export const createAuthor = async (author: AuthorCreationAttributes) => {
	return await Author.create(author);
};

export const findAuthorById = async (id: number) => {
	return await Author.findByPk(id);
};
