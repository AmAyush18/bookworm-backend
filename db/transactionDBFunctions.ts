import prisma from "./db.config";

// Function to check if a book is available for borrowing
export const checkBookAvailability = async (bookId: number) => {
  return await prisma.book.findUnique({
    where: { id: bookId },
  });
};

// Function to create a borrow transaction
export const borrowBook = async (userId: number, bookId: number) => {
  return await prisma.transactions.create({
    data: {
      userId,
      bookId,
    },
  });
};

// Function to update borrowedCount of the Book after borrowing
export const updateBorrowedCount = async (bookId: number) => {
  return await prisma.book.update({
    where: { id: bookId },
    data: {
      borrowedCount: { increment: 1 },
      isAvailable: false
    },
  });
};

// Function to update transaction after returning a book
export const returnBook = async (transactionId: number) => {
  return await prisma.transactions.update({
    where: { id: transactionId },
    data: {
      returnedAt: new Date(),
    },
  });
};

// Function to find a transaction by bookId and userId
export const findBorrowedBook = async (userId: number, bookId: number) => {
  return await prisma.transactions.findFirst({
    where: {
      userId,
      bookId,
      returnedAt: null, // Ensure the book is still borrowed
    },
  });
};
