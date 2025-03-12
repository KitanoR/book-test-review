import { redirect } from 'next/navigation';
import Home from './page';

const redirectMocked = jest.mocked(redirect);

jest.mock('next/navigation', () => ({
  redirect: jest.fn(),
}));

describe('Page', () => {
    it('should redirect the initial page to the book/home page', () => {
      Home();

      expect(redirectMocked).toHaveBeenCalledWith('/book/home');
    });
})
