import { screen, waitFor } from "@testing-library/react";
import { render } from "../../test-utils/render";
import BookActions from "./BookActions";
import userEvent from "@testing-library/user-event";
import { Toaster } from "../ui/toaster";
import { setupServer } from "msw/node";
import { bookHandlers } from "@/mock/handlers";

const refreshBooksMock = jest.fn();
const server = setupServer(...bookHandlers());

describe("BookActions", () => {
  beforeAll(() => server.listen());
  beforeEach(() => server.resetHandlers());
  afterAll(() => server.close());
  
  it("should render book action", () => {
    render(
      <BookActions
        title="book title"
        bookId={1}
        refreshBooks={refreshBooksMock}
      />
    );

    expect(screen.getAllByRole("button").length).toEqual(2);
    expect(screen.getByRole("link")).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/book/1");
  });

  it("should open the dialog Delete after clicking delete button in the table", async () => {
    render(
      <>
        <Toaster />
        <BookActions
          title="book title"
          bookId={1}
          refreshBooks={refreshBooksMock}
        />
      </>
    );
    await userEvent.click(screen.getByTestId("delete-button"));

    expect(screen.getByText("Are you sure?")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Cancel" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Delete" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('paragraph')
    ).toBeInTheDocument();
  });

  it("should call refresh and display toast function when delete button is clicked", async () => {
    render(
      <>
        <Toaster />
        <BookActions
          title="book title"
          bookId={1}
          refreshBooks={refreshBooksMock}
        />
      </>
    );
    await userEvent.click(screen.getByTestId("delete-button"));
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(refreshBooksMock).toHaveBeenCalled();
    });
    expect(screen.getByText("Book deleted")).toBeInTheDocument();
    expect(screen.getByText("book title has been deleted successfully")).toBeInTheDocument();
  });

  it("should close the dialog after clicking cancel button", async () => {
    render(
      <>
        <Toaster />
        <BookActions
          title="book title"
          bookId={1}
          refreshBooks={refreshBooksMock}
        />
      </>
    );
    await userEvent.click(screen.getByTestId("delete-button"));
    await userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    await waitFor(() => {
      expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
    });
  });

  it('should close the dialog after delele a book', async () => {
    render(
      <>
        <Toaster />
        <BookActions
          title="book title"
          bookId={1}
          refreshBooks={refreshBooksMock}
        />
      </>
    );
    await userEvent.click(screen.getByTestId("delete-button"));
    await userEvent.click(screen.getByRole("button", { name: "Delete" }));

    await waitFor(() => {
      expect(screen.queryByText("Are you sure?")).not.toBeInTheDocument();
    });
  });
});
