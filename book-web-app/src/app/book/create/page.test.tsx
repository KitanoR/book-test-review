import { screen } from '@testing-library/react';
import { render } from '@/test-utils/render';
import { useRouter } from "next/navigation";
import BookCreatePage from './page';
import { bookHandlers } from '@/mock/handlers';
import { setupServer } from 'msw/node';

const useRouterMocked = jest.mocked(useRouter);
jest.mock("next/navigation");

const server = setupServer(...bookHandlers());

describe('BookCreatePage', () => {
  beforeEach(() => {
    useRouterMocked.mockReturnValue({ 
      push: jest.fn(),
    });
    server.resetHandlers()
  });

  beforeAll(() => server.listen());
  afterAll(() => server.close());

  it('should render the page', () => {
    render(<BookCreatePage />);

    expect(screen.getByText('Create a new Book')).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Title/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /Year/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Status/i })).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: /Author/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Back home/i })).toBeInTheDocument();
  });
});