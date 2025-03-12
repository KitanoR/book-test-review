import { screen } from '@testing-library/react';
import { render } from '@/test-utils/render';
import { setupServer } from "msw/node";
import { bookHandlers } from "@/mock/handlers";
import { useRouter } from "next/navigation";
import editPage from './page';

const useRouterMocked = jest.mocked(useRouter);
jest.mock("next/navigation");

const server = setupServer(...bookHandlers());

describe('BookCreatePage', () => {
  beforeAll(() => server.listen());
  beforeEach(() => {
    server.resetHandlers();
    useRouterMocked.mockReturnValue({ 
      push: jest.fn(),
    });
  });
  afterAll(() => server.close());

  it('should render the page', async () => {
    const EditPage = await editPage({ params: new Promise((resolve) => resolve({ bookId: 1 })) });
    render(EditPage);

    expect(screen.getByText('Edit Books Interview')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Title/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Year/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Status/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Author/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back home/i })).toBeInTheDocument();
  });

  it('should load the form with the correct values', async() => {
    const EditPage = await editPage({ params: new Promise((resolve) => resolve({ bookId: 1 })) });
    render(EditPage);

    expect(screen.getByRole('textbox', { name: /Title/i })).toHaveValue('Modern Software Engineering');
    expect(screen.getByRole('textbox', { name: /Year/i })).toHaveValue('2019');
    expect(screen.getAllByText('draft')).toHaveLength(2);
    expect(screen.getByText('David Farley')).toBeInTheDocument();
  })
});