import { DataTypes, Model } from "sequelize";
import { sequelize } from "./client.js";

// Models
export type AuthorAttributes = {
	id: number;
	name: string;
};

export type AuthorCreationAttributes = Omit<AuthorAttributes, "id">;

export type BookAttributes = {
	id: number;
	name: string;
	pages: number;
	author_id: number;
};

export type BookCreationAttributes = Omit<BookAttributes, "id">;

export type StoreAttributes = {
	id: number;
	name: string;
	address: string;
};

export type StoreCreationAttributes = Omit<StoreAttributes, "id">;

export type StoreBookAttributes = {
	store_id: number;
	book_id: number;
	price: number;
	sold_out: boolean;
};

export class Author
	extends Model<AuthorAttributes, AuthorCreationAttributes>
	implements AuthorAttributes
{
	declare id: number;
	declare name: string;
}

export class Book
	extends Model<BookAttributes, BookCreationAttributes>
	implements BookAttributes
{
	declare id: number;
	declare name: string;
	declare pages: number;
	declare author_id: number;
}

export class Store
	extends Model<StoreAttributes, StoreCreationAttributes>
	implements StoreAttributes
{
	declare id: number;
	declare name: string;
	declare address: string;
}

export class StoreBook
	extends Model<StoreBookAttributes>
	implements StoreBookAttributes
{
	declare store_id: number;
	declare book_id: number;
	declare price: number;
	declare sold_out: boolean;
}

Author.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "Author",
	},
);

Book.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: DataTypes.STRING,
		pages: DataTypes.INTEGER,
		author_id: {
			type: DataTypes.INTEGER,
			references: {
				model: Author,
				key: 'id'
			}
		},
	},
	{
		sequelize,
		modelName: "Book",
	},
);

Store.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		name: DataTypes.STRING,
		address: DataTypes.STRING,
	},
	{
		sequelize,
		modelName: "Store",
	},
);

StoreBook.init(
	{
		store_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: Store,
				key: 'id'
			}
		},
		book_id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			references: {
				model: Book,
				key: 'id'
			}
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
		},
		sold_out: {
			type: DataTypes.BOOLEAN,
			defaultValue: false,
		},
	},
	{
		sequelize,
		tableName: "store_book",
		modelName: "StoreBook",
	},
);

// Associations

// One to many between Author and Book
Author.hasMany(Book, { foreignKey: 'author_id' });
Book.belongsTo(Author, { foreignKey: 'author_id' });

// Many to many between Store and Book
Store.belongsToMany(Book, { through: StoreBook, foreignKey: "store_id" });
Book.belongsToMany(Store, { through: StoreBook, foreignKey: "book_id" });

// Initialize database

export const initializeDatabase = async () => {
	try {
		await sequelize.authenticate();
		console.log("Connection to PostgreSQL has been established successfully.");

		await sequelize.sync();
		console.log("Database synchronized.");
	} catch (error) {
		console.error("Unable to connect to the database:", error);
	}
};
