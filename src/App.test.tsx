import React from 'react';
import { render, screen } from '@testing-library/react';
import App from  './App';
import AppWithRedux from "./AppWithRedux";
import AppWithReducer from "./AppWithReducer";

test('renders learn react link', () => {
  render(<AppWithRedux />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
