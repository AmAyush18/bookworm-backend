import { Transaction } from "./transactionType";

export interface Book {
    id: number;
    title: string;
    author: string;
    isbn: string; 
    publishedYear: number;
    isAvailable: boolean;
    borrowedCount: boolean;
    Transactions?: Transaction[];
    createdAt?: Date;
    updatedAt?: Date;
  }