import { screen } from '@testing-library/react'
import { render } from '../../test-utils/render';
import Empty from './Empty'
 
describe('Empty component', () => {
  it('renders a heading', () => {
    render(<Empty />)
 
    expect(screen.getByText('Start adding books')).toBeInTheDocument();
    expect(screen.getByText('Add a new Book to get started')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Create new book'})).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Create new book'})).toHaveAttribute('href', '/book/create'); 
  })
})