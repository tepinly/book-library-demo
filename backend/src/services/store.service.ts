import type { StoreCreationAttributes } from "../database/schema.js";
import {
	createStore,
	findStoreById,
	findStoresByBookId,
	soldOut,
} from "../repositories/store.repository.js";

export const FindStoreById = async (id: number) => findStoreById(id);

export const FindStoresByBookId = async (book_id: number) =>
	findStoresByBookId(book_id);

export const CreateStore = async (store: StoreCreationAttributes) =>
	createStore(store);

export const SoldOut = async (store_id: number, book_id: number) =>
	soldOut(store_id, book_id);
