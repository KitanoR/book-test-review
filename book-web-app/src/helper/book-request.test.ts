import { setupServer } from "msw/node";
import { bookHandlers } from "@/mock/handlers";
import {
  createBook,
  deleteBook,
  getAuthors,
  getBook,
  getBooks,
  updateBook,
} from "./book-requests";

const server = setupServer(...bookHandlers());

describe("Book Requests", () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should return a list of authors", async () => {
    const authors = await getAuthors();

    expect(authors).toEqual([
      {
        id: 1,
        name: "David Farley",
      },
      {
        id: 10,
        name: "Robert C. Martin",
      },
      {
        id: 2,
        name: "Caye edited hehhe",
      },
    ]);
  });

  describe("getBooks", () => {
    it("should return a list of books", async () => {
      const books = await getBooks();

      expect(books).toEqual([
        {
          id: 3,
          title: "Modern Software Engineering",
          author_id: 2,
          year: 2019,
          status: "draft",
          author: {
            id: 2,
            name: "David Farley",
          },
        },
        {
          id: 9,
          title: "Clean Code: A Handbook of Agile Software Craftsmanship",
          author_id: 10,
          year: 1993,
          status: "published",
          author: {
            id: 10,
            name: "Robert C. Martin",
          },
        },
      ]);
    });

    it("should return a list of books filtered by author name", async () => {
      const books = await getBooks({ author_name: "search" });

      expect(books).toEqual([
        {
          id: 9,
          title: "Book title search result",
          author_id: 10,
          year: 1993,
          status: "published",
          author: {
            id: 10,
            name: "Search author",
          },
        },
      ]);
    });

    it("should return an empty list when the author name does not exist", async () => {
      const books = await getBooks({ author_name: "empty" });

      expect(books).toEqual([]);
    });
  });

  it("should create a book", async () => {
    const book = {
      title: "Modern Software Engineering",
      author_id: 1,
      year: 2019,
      status: "draft",
      author_name: "David Farley",
      new_author: false,
    };

    const response = await createBook(book);

    expect(response).toEqual({
      id: 1,
      title: "Modern Software Engineering",
      author_id: 1,
      year: 2019,
      status: "draft",
    });
  });

  it("should edit a book", async () => {
    const book = {
      title: "Modern Software Engineering",
      author_id: 1,
      year: 2019,
      status: "draft",
      author_name: "David Farley",
      new_author: false,
    };

    const response = await updateBook(1, book);

    expect(response).toEqual({ message: "Book updated" });
  });

  it("should get a book by id", async () => {
    const book = await getBook(1);

    expect(book).toEqual({
      id: 1,
      title: "Modern Software Engineering",
      author_id: 1,
      year: 2019,
      status: ["draft"],
      author: {
        value: 1,
        label: "David Farley",
      },
    });
  });

  it("should delete a book", async () => {
    const response = await deleteBook(1);
    expect(response).toEqual({ message: "Book deleted" });
  });
});
