import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Reorder button', () => {
  render(<App />);
  const reorderButton = screen.getByText(/Reorder/i);
  expect(reorderButton).toBeInTheDocument();
});
