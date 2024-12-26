import { User, Book } from ".";

export interface Transaction {
    id: number;
    userId: number;
    bookId: number;
    borrowedAt: Date;
    returnedAt?: Date;
    User?: User;
    Book?: Book;
    createdAt?: Date;
    updatedAt?: Date;
  }