import prisma from "./db.config";

/**
 * Check if a book with the given ISBN exists.
 * @param isbn - The ISBN of the book.
 * @returns The book record if it exists, otherwise null.
 */
export const checkISBNExistence = async (isbn: string) => {
  return await prisma.book.findUnique({
    where: {
      isbn,
    },
  });
};

/**
 * Check if a book with the given title and author already exists.
 * @param title - The title of the book.
 * @param author - The author of the book.
 * @returns True if no matching book exists, otherwise false.
 */
export const isBookAvailable = async (title: string, author: string) => {
  const existingBook = await prisma.book.findFirst({
    where: {
      title,
      author,
    },
  });

  return !existingBook;
};

/**
 * Create a new book record in the database.
 * @param bookData - The book details to be added.
 * @returns The newly created book record.
 */
export const createBook = async (bookData: {
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  isbn?: string;
}) => {
  return await prisma.book.create({
    data: bookData,
  });
};

/**
 * Update an existing book record in the database.
 * @param bookId - The ID of the book to be updated.
 * @param updatedBookData - The updated book details.
 * @returns The updated book record.
 */
export const updateBook = async (bookId: number, updatedBookData: any) => {
  return await prisma.book.update({
    where: {
      id: bookId,
    },
    data: updatedBookData,
  });
};

/**
 * Delete an existing book record in the database.
 * @param bookId - The ID of the book to be deleted.
 */
export const deleteBook = async (bookId: number) => {
  await prisma.book.delete({
    where: {
      id: bookId,
    },
  });
};

/**
 * Retrieve a book record by its ID.
 * @param bookId - The ID of the book.
 * @returns The book record if found, otherwise null.
 */
export const getBookById = async (bookId: number) => {
  return await prisma.book.findUnique({
    where: {
      id: bookId,
    },
  });
};

export const countBooks = async (searchQuery: string) => {
    return await prisma.book.count({
      where: {
        // Search logic: If there's a search query, search by title or author
        OR: [
          {
            title: {
              contains: searchQuery,
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            author: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      },
    });
  };
  

export const getAllBooks = async (page: number, limit: number, searchQuery: string) => {
    const offset = (page - 1) * limit;
  
    return await prisma.book.findMany({
      where: {
        // Search logic: If there's a search query, search by title or author
        OR: [
          {
            title: {
              contains: searchQuery,
              mode: "insensitive", // Case-insensitive search
            },
          },
          {
            author: {
              contains: searchQuery,
              mode: "insensitive",
            },
          },
        ],
      },
      skip: offset, // For pagination
      take: limit,  // Limit the number of books per page
      orderBy: {
        createdAt: "desc", // Sorting by the creation date
      },
    });
};
  