import { screen } from "@testing-library/react";
import { render } from "@/test-utils";
import BookActions from "./BookActions";

describe("BookActions", () => {
  it("should render", () => {
    render(<BookActions />);
    expect(screen.getByText("Book Actions")).toBeInTheDocument();
  });
});