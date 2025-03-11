import { screen } from "@testing-library/react";
import { render } from "../../test-utils/render";

import Book from "./Books";
import userEvent from "@testing-library/user-event";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: 'mocked data' }),
  })
);

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
    status: "draft",
    author: {
      id: 2,
      name: "David Farley",
    },
  },
];

describe("Books component", () => {
  it("should render Book list component", () => {
    render(<Book initialData={initialData} />);

    expect(screen.getByRole('link', { name: "Create Book" })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('row', { name: 'title book Caye edited 2020 draft'})).toBeInTheDocument();
    expect(screen.getByRole('row', { name: 'Modern Software Engineering David Farley 2019 draft' })).toBeInTheDocument();
  });

  it('should filter books by author name', async () => {
    render(<Book initialData={initialData} />);

    await userEvent.type(screen.getByRole('textbox'), 'Caye edited');

    expect(screen.getByRole('row', { name: 'title book Caye edited 2020 draft'})).toBeInTheDocument();
  });
});
