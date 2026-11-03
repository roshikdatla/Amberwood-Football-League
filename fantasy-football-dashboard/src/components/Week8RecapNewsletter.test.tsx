import React from 'react';
import { render, screen } from '@testing-library/react';
import Week8RecapNewsletter from './Week8RecapNewsletter';
import issue from '../data/week8Recap2026.json';

test('renders the complete Week 8 issue and essential tournament rules', () => {
  render(<Week8RecapNewsletter />);
  expect(screen.getByRole('heading', {name: issue.headline})).toBeTruthy();
  expect(issue.recaps).toHaveLength(6);
  expect(issue.rankings).toHaveLength(12);
  expect(issue.previews).toHaveLength(6);
  expect(screen.getByText(/bottom two seeds get first-round byes/i)).toBeTruthy();
  expect(screen.getByText(/highest-scoring team outside the top five/i)).toBeTruthy();
});
