import { render, screen } from '@testing-library/react';
import App from './App';

test('renders rules button', () => {
  render(<App />);
  const rulesButton = screen.getByText(/rules/i);
  expect(rulesButton).toBeInTheDocument();
});
