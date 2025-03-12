import { screen } from "@testing-library/react";
import { render } from "@/test-utils/render";
import Home from "./page";
import { setupServer } from "msw/node";
import { bookHandlers } from "@/mock/handlers";

const server = setupServer(...bookHandlers());

describe("Home Book page", () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render home page", async () => {
    const pageComponent = await Home();
    render(pageComponent);

    expect(screen.getByRole("heading")).toHaveTextContent("Books Interview");
    expect(screen.getByRole('link', { name: "Create Book" })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('row', { name: 'Book Author Year Status Actions'})).toBeInTheDocument();
    expect(screen.getByRole('row', { name: 'Modern Software Engineering David Farley 2019 draft'})).toBeInTheDocument();
    expect(screen.getByRole('row', { name: 'Clean Code: A Handbook of Agile Software Craftsmanship Robert C. Martin 1993 published' })).toBeInTheDocument();
  });
});

