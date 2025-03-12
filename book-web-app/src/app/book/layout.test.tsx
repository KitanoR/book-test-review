import { screen } from "@testing-library/react";
import { render } from "@/test-utils/render";
import Layout from "./layout";

describe("Book Layout", () => {
  it("should render layout", () => {
    render(<Layout>Test</Layout>);

    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Books'})).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About'})).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close session'})).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Next.js logo'})).toBeInTheDocument();
  });
});