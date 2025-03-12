import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test-utils/render";
import Book from "./Books";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { bookHandlers } from "@/mock/handlers";

const server = setupServer(...bookHandlers());

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

jest.mock('lodash/debounce', () => {
  return (fn: (val?: string[] | string) => void) => {
    const debouncedFn = (...args: string[]) => {
      if (args[0] === 'search' || args[0] === 'empty') {
        return fn(...args);
      }
    };

    debouncedFn.flush = () => fn();

    return debouncedFn;
  };
});

describe("Books component", () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());

  it("should render Book list component", () => {
    render(<Book initialData={initialData} />);

    expect(screen.getByRole('link', { name: "Create Book" })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('row', { name: 'title book Caye edited 2020 draft'})).toBeInTheDocument();
    expect(screen.getByRole('row', { name: 'Modern Software Engineering David Farley 2019 draft' })).toBeInTheDocument();
  });

  it('should handle empty search result', async () => {
    render(<Book initialData={initialData} />);

    await userEvent.type(screen.getByRole('textbox'), 'empty');

    await waitFor(() => {
      expect(screen.getByText('Add a new Book to get started')).toBeInTheDocument();
      expect(screen.getByText('Start adding books')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Create new book'})).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Create new book'})).toHaveAttribute('href', '/book/create');
    });
  });

  it('should refresh books after delete one book', async () => {
    render(<Book initialData={initialData} />);

    await userEvent.click(screen.getAllByTestId('delete-button')[0]);
    await userEvent.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(() => {
      expect(screen.getByRole('row', { name: 'Modern Software Engineering David Farley 2019 draft'})).toBeInTheDocument();
      expect(screen.getByRole('row', { name: 'Clean Code: A Handbook of Agile Software Craftsmanship Robert C. Martin 1993 published'})).toBeInTheDocument();
      expect(screen.queryByRole('row', { name: 'title book Caye edited 2020 draft'})).not.toBeInTheDocument();
    });
  });

  it('should filter books by author name', async () => {
    render(<Book initialData={initialData} />);

    await userEvent.type(screen.getByRole('textbox'), 'search');

    await waitFor(() => {
      expect(screen.getByRole('row', { name: 'Book title search result Search author 1993 published'})).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.queryByRole('row', { name: 'title book Caye edited 2020 draft'})).not.toBeInTheDocument();
    });
  });
});
