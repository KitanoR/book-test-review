import { render, screen } from "@testing-library/react";  
import RootLayout from "@/app/layout";

describe("RootLayout", () => {
  it("should render the layout", () => {
    const { asFragment } = render(<RootLayout>Test</RootLayout>);

    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(asFragment()).toMatchSnapshot();
  });
});