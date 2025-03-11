import { screen } from '@testing-library/react'
import { render } from '../../test-utils/render';
import Header from "./Header";

describe('Header component', () => {
  it('renders the header', () => {
    render(<Header />)
  
    expect(screen.getByRole('link', { name: 'Books'})).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'About'})).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Close session'})).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'Next.js logo'})).toBeInTheDocument();
  })
})