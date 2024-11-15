import e from "express";
import {
	Store,
	StoreBook,
	type StoreCreationAttributes,
} from "../database/schema.js";

export const findStoreById = async (id: number) => {
	return await Store.findByPk(id);
};

export const findStoresByBookId = async (book_id: number) => {
	return await StoreBook.findAll({
		where: {
			book_id,
		},
		include: [{ model: Store, attributes: ["name"] }],
	});
};

export const createStore = async (store: StoreCreationAttributes) => {
	return await Store.create(store);
};

export const soldOut = async (store_id: number, book_id: number) => {
	return await StoreBook.update(
		{ sold_out: true },
		{
			where: {
				store_id,
				book_id,
			},
		},
	);
};
