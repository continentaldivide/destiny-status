import { render, screen } from '@testing-library/react';
import Nav from './Nav';

describe('Nav', () => {
  it('cannot perform search while data is being fetched', () => {
    render(<Nav fetchingData={true} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });

    expect(submitButton).toBeDisabled();
  });
});
