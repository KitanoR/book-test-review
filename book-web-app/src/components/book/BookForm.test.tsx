import { screen, waitFor } from "@testing-library/react";
import { render } from "@/test-utils/render";
import BookForm, { BookInputs } from "./BookForm";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import { bookHandlers } from "@/mock/handlers";
import { useRouter } from "next/navigation";
import { Toaster } from "../ui/toaster";

const useRouterMocked = jest.mocked(useRouter);
const pushMock = jest.fn();
jest.mock("next/navigation");

const server = setupServer(...bookHandlers());

const initalValues: BookInputs = {
  title: "Modern Software Engineering",
  year: 2019,
  status: ["draft"],
  author: {
    value: 1,
    label: "David Farley",
  },
}

describe("BookForm", () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    server.resetHandlers();
    useRouterMocked.mockReturnValue({ 
      push: pushMock,
      query: { id: 1 },
    });
  });
  afterAll(() => server.close());

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render the form", () => {
    render(<BookForm />);

    expect(screen.getByRole('textbox', { name: /Title/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Year/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Status/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Author/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back home/i })).toBeInTheDocument();
  });

  it('should render the form with initialValues and edit mode', () => {
   
    render(<BookForm initialValues={initalValues} bookId={1} isEditForm />);

    expect(screen.getByRole('textbox', { name: /Title/i })).toHaveValue('Modern Software Engineering');
    expect(screen.getByRole('textbox', { name: /Year/i })).toHaveValue('2019');
    expect(screen.getAllByText('draft')).toHaveLength(2);
    expect(screen.getByText('David Farley')).toBeInTheDocument();
  });

  describe('Edit Author Name', () => {
    it('should display input to edit the author name after clicking edit author', async () => {
      render(<BookForm initialValues={initalValues} bookId={1} isEditForm />);

      const editAuthorButton = screen.getByRole('button', { name: /Edit author/i });
      await userEvent.click(editAuthorButton);

      expect(screen.getByRole('textbox', { name: /Author Name/i })).toBeInTheDocument();
    });

    it('should hide input to edit author after clicking cancel button', async () => {
      render(<BookForm initialValues={initalValues} bookId={1} isEditForm />);

      const editAuthorButton = screen.getByRole('button', { name: /Edit author/i });
      await userEvent.click(editAuthorButton);

      const cancelButton = screen.getByRole('button', { name: /Cancel/i });
      await userEvent.click(cancelButton);

      expect(screen.queryByRole('textbox', { name: /Author Name/i })).not.toBeInTheDocument();
    });
  });

  describe('Submit Form', () => {
    it('should submit the form with the correct values', async () => {
      render(
        <>
          <Toaster />
          <BookForm />
        </>
      );

      const titleInput = screen.getByRole('textbox', { name: /Title/i });
      const yearInput = screen.getByRole('textbox', { name: /Year/i });
      const statusInput = screen.getByRole('combobox', { name: /Status/i });
      const authorInput = screen.getByRole('combobox', { name: /Author/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });

      await userEvent.type(titleInput, 'Modern Software Engineering');
      await userEvent.type(yearInput, '2019');
      await userEvent.click(statusInput);
      await userEvent.click(screen.getByText('draft'));
      await userEvent.click(authorInput);
      await userEvent.click(screen.getByText('David Farley'));
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Book created')).toBeInTheDocument();
        expect(screen.getByText('Book has been created successfully')).toBeInTheDocument();
        expect(pushMock).toHaveBeenCalledWith('/book/home');
      });
    });

    it('should submit the form with the correct values with edited author name', async () => {
      render(
        <>
          <Toaster />
          <BookForm />
        </>
      );

      const titleInput = screen.getByRole('textbox', { name: /Title/i });
      const yearInput = screen.getByRole('textbox', { name: /Year/i });
      const statusInput = screen.getByRole('combobox', { name: /Status/i });
      const authorInput = screen.getByRole('combobox', { name: /Author/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });

      await userEvent.type(titleInput, 'Modern Software Engineering');
      await userEvent.type(yearInput, '2019');
      await userEvent.click(statusInput);
      await userEvent.click(screen.getByText('draft'));
      await userEvent.click(authorInput);
      await userEvent.click(screen.getByText('David Farley'));
      await userEvent.click(screen.getByRole('button', { name: /Edit author/i }));
      await userEvent.type(screen.getByRole('textbox', { name: /Author Name/i }), ' edited value');
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Book created')).toBeInTheDocument();
        expect(screen.getByText('Book has been created successfully')).toBeInTheDocument();
        expect(pushMock).toHaveBeenCalledWith('/book/home');
      });
    });

    it('should submit the form with the correct values with a new author', async () => {
      render(
        <>
          <Toaster />
          <BookForm />
        </>
      );

      const titleInput = screen.getByRole('textbox', { name: /Title/i });
      const yearInput = screen.getByRole('textbox', { name: /Year/i });
      const statusInput = screen.getByRole('combobox', { name: /Status/i });
      const authorInput = screen.getByRole('combobox', { name: /Author/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });

      await userEvent.type(titleInput, 'Modern Software Engineering');
      await userEvent.type(yearInput, '2019');
      await userEvent.click(statusInput);
      await userEvent.click(screen.getByText('draft'));
      await userEvent.type(authorInput, 'New Author');
      await userEvent.click(authorInput);
      await userEvent.click(screen.getByText('Create "New Author"'));
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Book created')).toBeInTheDocument();
        expect(screen.getByText('Book has been created successfully')).toBeInTheDocument();
        expect(pushMock).toHaveBeenCalledWith('/book/home');
      });
    });

    it('should submit book with values edited', async () => {
      render(
        <>
          <Toaster />
          <BookForm isEditForm bookId={1} initialValues={initalValues}/>
        </>
      );

      const titleInput = screen.getByRole('textbox', { name: /Title/i });

      await userEvent.type(titleInput, 'Modern Software Engineering Edited');
      await userEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.getByText('Book edited')).toBeInTheDocument();
        expect(screen.getByText('Book has been edited successfully')).toBeInTheDocument();
        expect(pushMock).toHaveBeenCalledWith('/book/home');
      });
    });


    it('should display error toast when there is an error creating book', async () => {
      render(
        <>
          <Toaster />
          <BookForm />
        </>
      );

      const titleInput = screen.getByRole('textbox', { name: /Title/i });
      const yearInput = screen.getByRole('textbox', { name: /Year/i });
      const statusInput = screen.getByRole('combobox', { name: /Status/i });
      const authorInput = screen.getByRole('combobox', { name: /Author/i });
      const submitButton = screen.getByRole('button', { name: /submit/i });

      await userEvent.type(titleInput, 'error');
      await userEvent.type(yearInput, '2019');
      await userEvent.click(statusInput);
      await userEvent.click(screen.getByText('draft'));
      await userEvent.click(authorInput);
      await userEvent.click(screen.getByText('David Farley'));
      await userEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Error creating book')).toBeInTheDocument();
        expect(screen.getByText('There was an error creating the book')).toBeInTheDocument();
        expect(pushMock).not.toHaveBeenCalledWith('/book/home');
      });
    });

    it('should display an error message when editing fails', async () => {
      render(
        <>
          <Toaster />
          <BookForm initialValues={initalValues} bookId={1} isEditForm />
        </>
      );

      const titleInput = screen.getByRole('textbox', { name: /Title/i });

      await userEvent.clear(titleInput);
      await userEvent.type(titleInput, 'error');
      await userEvent.click(screen.getByRole('button', { name: /submit/i }));

      await waitFor(() => {
        expect(screen.getByText('Error editing book')).toBeInTheDocument();
        expect(screen.getByText('There was an error editing the book')).toBeInTheDocument();
        expect(pushMock).not.toHaveBeenCalledWith('/book/home');
      });
    });
  });
});

