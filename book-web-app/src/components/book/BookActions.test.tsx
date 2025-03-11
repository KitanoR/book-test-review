import { screen } from "@testing-library/react";
import { render } from "../../test-utils/render";
import BookActions from "./BookActions";
import userEvent from "@testing-library/user-event";
import { Toaster } from "../ui/toaster";

const refreshBooksMock = jest.fn();

describe("BookActions", () => {
  it("should render", () => {
    render(<BookActions title="book title" bookId={1} refreshBooks={refreshBooksMock} />);
    
    expect(screen.getAllByRole('button').length).toEqual(2);
    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/book/1');
  });
});