import { Author, type AuthorCreationAttributes } from "../database/schema.js";
import {
	createAuthor,
	findAuthorById,
} from "../repositories/author.repository.js";

export const CreateAuthor = async (author: AuthorCreationAttributes) =>
	createAuthor(author);

export const FindAuthorById = async (id: number) => findAuthorById(id);
