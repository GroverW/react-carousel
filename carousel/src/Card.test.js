import React from 'react';
import { render, fireEvent } from "@testing-library/react";
import Card from './Card';
import Carousel from './Carousel';

it('renders without crashing', () => {
  render(<Card />);
});

it('matches snapshot', () => {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
})

