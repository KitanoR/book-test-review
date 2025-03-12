import { screen } from "@testing-library/react";
import { render } from "@/test-utils/render";
import Layout from "./layout";

describe("Create Book Layout", () => {
  it("should render layout", () => {
    render(<Layout>Test</Layout>);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});