import { screen } from "@testing-library/react";
import { render } from "../../test-utils/render";
import DialogDelete from "./DialogDelete";
import { DialogRoot } from "@chakra-ui/react";
import userEvent from "@testing-library/user-event";

const onDeleteMock = jest.fn();
describe("DialogDelete component", () => {
  it("should render DialogDelete", () => {
    render(
      <DialogRoot open>
        <DialogDelete
          title="Book title"
          onDelete={onDeleteMock}
          loading={false}
        />
      </DialogRoot>
    );

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

  it("should call onDelete function when delete button is clicked", async () => {
    render(
      <DialogRoot open>
        <DialogDelete
          title="Book title"
          onDelete={onDeleteMock}
          loading={false}
        />
      </DialogRoot>
    );

    const deleteButton = screen.getByRole("button", { name: "Delete" });
    await userEvent.click(deleteButton);
    expect(onDeleteMock).toHaveBeenCalled();
  });
});
