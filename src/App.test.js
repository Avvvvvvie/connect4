import { render, screen } from '@testing-library/react';
import App from './App';

test('renders buttons', () => {
  render(<App />);
  const loadButton = screen.getByText(/Load Game/i);
  const saveButton = screen.getByText(/Save Game/i);
  const resetButton = screen.getByText(/Reset Game/i);
  expect(loadButton).toBeInTheDocument();
  expect(saveButton).toBeInTheDocument();
  expect(resetButton).toBeInTheDocument();
});
