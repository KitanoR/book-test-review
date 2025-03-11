import { BookInputs } from "@/components/book/BookForm";

const host =
  typeof window === "undefined"
    ? process.env.SERVER_API_URL
    : process.env.NEXT_PUBLIC_API_URL;

export interface Author {
  id: number;
  name: string;
}

export interface Book {
  id: number;
  title: string;
  author_id: number;
  year: number;
  status: string;
  author: Author;
  author_name?: string;
}

interface GetBooks {
  author_name?: string;
}

export interface BookRequest {
  title: string;
  author_id?: number;
  year: number;
  status: string;
  author_name?: string;
  new_author: boolean;
}

export const getAuthors = async (): Promise<Author[]> => {
  const response = await fetch(`${host}/authors`);
  const authors = await response.json();
  return authors;
};

export const getBooks = async ({ author_name }: GetBooks = {}): Promise<
  Book[]
> => {
  let url = `${host}/books`;
  if (author_name) {
    url = `${host}/books?author_name=${author_name}`;
  }
  const response = await fetch(url);
  const books = await response.json();
  return books;
};

export const getBook = async (bookId: number): Promise<BookInputs> => {
  const response = await fetch(`${host}/books/${bookId}`);
  const responseData = await response.json();
  const book = {
    ...responseData,
    status: [responseData.status],
    author: { value: responseData.author.id, label: responseData.author.name },
  };
  return book;
};

export const createBook = async (book: BookRequest) => {
  const response = await fetch(`${host}/books/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return response;
};

export const updateBook = async (bookId: number, book: BookRequest) => {
  const response = await fetch(`${host}/books/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  return response;
};

export const deleteBook = async (bookId: number) => {
  const response = await fetch(`${host}/books/${bookId}`, {
    method: "DELETE",
  });
  return response;
};
