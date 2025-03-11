import Search from './Search';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils/render';

const onChangeMock = jest.fn();

describe('Search component', () => {
 
  it('should renders a search input', () => {
    render(<Search onChange={onChangeMock} />);

    expect(screen.getByPlaceholderText('Search books by Author')).toBeInTheDocument();
  });

  it('should call onChange after typing a term', async () => {
    render(<Search onChange={onChangeMock} />);

    const input = screen.getByPlaceholderText('Search books by Author');
    await userEvent.type(input, 'test');

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });
    expect(onChangeMock).toHaveBeenCalledWith('test');
  });
});