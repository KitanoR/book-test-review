import { screen } from "@testing-library/react";
import { render } from "../../test-utils/render";

import BookTable from "./BookTable";

const initialData = [
  {
    id: 1,
    title: "title book",
    author_id: 1,
    year: 2020,
    status: "draft",
    author: {
      id: 1,
      name: "Caye edited",
    },
  },
  {
    id: 3,
    title: "Modern Software Engineering",
    author_id: 2,
    year: 2019,
    status: "published",
    author: {
      id: 2,
      name: "David Farley",
    },
  },
];

describe("BookTable component", () => {
  it("should render Book list component", () => {
    render(<BookTable books={initialData} refreshBooks={jest.fn()} />);

    expect(screen.getByRole('row', { name: 'title book Caye edited 2020 draft'})).toBeInTheDocument();
    expect(screen.getByRole('row', { name: 'Modern Software Engineering David Farley 2019 published' })).toBeInTheDocument();
  });

  it('should display empty message when there are not books', () => {
    render(<BookTable books={[]} refreshBooks={jest.fn()} />);

    expect(screen.getByText('Start adding books')).toBeInTheDocument();
    expect(screen.getByText('Add a new Book to get started')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create new book'})).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Create new book'})).toHaveAttribute('href', '/book/create'); 
  });
});
