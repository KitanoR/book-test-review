import { screen } from '@testing-library/react'
import { render } from '../../test-utils/render';
import DialogDelete from './DialogDelete'
import { DialogRoot } from '@chakra-ui/react';
import userEvent from '@testing-library/user-event';
 
const onDeleteMock = jest.fn();
describe('DialogDelete component', () => {
  it('should render DialogDelete', () => {
    render(<DialogRoot open>
      <DialogDelete title="Book title" onDelete={onDeleteMock} loading={false} />
    </DialogRoot>)
 
    expect(screen.getByText('Start adding books')).toBeInTheDocument();
    expect(screen.getByText('Add a new Book to get started')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create new book'})).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Create new book'})).toHaveAttribute('href', '/book/create'); 
  });

  it('should call onDelete function when delete button is clicked', async () => {
    render(<DialogRoot open>
      <DialogDelete title="Book title" onDelete={onDeleteMock} loading={false} />
    </DialogRoot>)
 
    const deleteButton = screen.getByRole('button', { name: 'Delete'});
    await userEvent.click(deleteButton);
    expect(onDeleteMock).toHaveBeenCalled();
  });
})