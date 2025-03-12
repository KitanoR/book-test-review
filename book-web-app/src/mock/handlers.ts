import { BookInputs } from "@/components/book/BookForm";
import { http, HttpResponse } from "msw";

export const bookHandlers = () => [
  http.get("http://127.0.0.1:8000/books", async ({ request }) => {
    const url = new URL(request.url);
    const authorName = url.searchParams.get("author_name");

    if (authorName === "search") {
      return HttpResponse.json([
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
    }

    if (authorName === "empty") {
      return HttpResponse.json([]);
    }

    return HttpResponse.json([
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
  }),
  http.get("http://127.0.0.1:8000/books/1", async () => {
    return HttpResponse.json({
      id: 1,
      title: "Modern Software Engineering",
      author_id: 1,
      year: 2019,
      status: "draft",
      author: {
        id: 1,
        name: "David Farley",
      },
    });
  }),
  http.post("http://127.0.0.1:8000/books", async ({ request }) => {
    const body = (await request.json()) as BookInputs;
    if (body?.title === "error") {
      return HttpResponse.json(
        {
          message: "Error message",
        },
        { status: 500 }
      );
    }
    return HttpResponse.json({
      id: 1,
      title: "Modern Software Engineering",
      author_id: 1,
      year: 2019,
      status: "draft",
    });
  }),
  http.put("http://127.0.0.1:8000/books/1", async ({ request }) => {
    const body = (await request.json()) as BookInputs;
    if (body?.title === "error") {
      return HttpResponse.json(
        {
          message: "Error message",
        },
        { status: 500 }
      );
    }

    return HttpResponse.json({
      message: "Book updated",
    });
  }),
  http.delete("http://127.0.0.1:8000/books/1", async () => {
    return HttpResponse.json({
      message: "Book deleted",
    });
  }),
  http.get("http://127.0.0.1:8000/authors", async () => {
    return HttpResponse.json([
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
  }),
];
