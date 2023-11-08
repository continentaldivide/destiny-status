import { render, screen } from '@testing-library/react';
import MissingItem from '../app/_components/MissingItem';

describe('MissingItem', () => {
  it('displays text', () => {
    render(<MissingItem />);

    const text = screen.getByText('sparrow or ship not equipped');

    expect(text).toBeInTheDocument();
  });
});
