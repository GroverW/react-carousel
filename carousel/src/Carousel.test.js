import React from "react";
import { render, fireEvent, queryByTestId } from "@testing-library/react";
import Carousel from "./Carousel";

it("renders without crashing", () => {
  render(<Carousel />);
});

it("matches snapshot", () => {
  const { asFragment } = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
})

const img1Caption = "Photo by Richard Pasquarella on Unsplash";
const img2Caption = "Photo by Pratik Patel on Unsplash";

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText(img1Caption)).toBeInTheDocument();
  expect(queryByAltText(img2Caption)).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText(img1Caption)).not.toBeInTheDocument();
  expect(queryByAltText(img2Caption)).toBeInTheDocument();
});

it("works when you click on the left arrow", () => {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  expect(queryByAltText(img1Caption)).toBeInTheDocument();
  expect(queryByAltText(img2Caption)).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText(img1Caption)).not.toBeInTheDocument();
  expect(queryByAltText(img2Caption)).toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  //expect the third image to show, but not the first
  expect(queryByAltText(img1Caption)).toBeInTheDocument();
  expect(queryByAltText(img2Caption)).not.toBeInTheDocument();
})

it("hides the left arrow on the first page", () => {
  const { queryByTestId } = render(<Carousel />);

  // expect the left arrow to have hidden class, but not right arrow
  expect(queryByTestId("left-arrow")).toHaveClass("hidden");
  expect(queryByTestId("right-arrow")).not.toHaveClass("hidden");
  

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  //expect neither arrow to have hidden class
  expect(queryByTestId("left-arrow")).not.toHaveClass("hidden");
  expect(queryByTestId("right-arrow")).not.toHaveClass("hidden");
})

it("hides the right arrow on the last page", () => {
  const { queryByTestId } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  //expect neither arrow to have hidden class
  expect(queryByTestId("left-arrow")).not.toHaveClass("hidden");
  expect(queryByTestId("right-arrow")).not.toHaveClass("hidden");

  // move forward in the carousel
  fireEvent.click(rightArrow);

  // expect the right arrow to have hidden class, but not the left arrow
  expect(queryByTestId("left-arrow")).not.toHaveClass("hidden");
  expect(queryByTestId("right-arrow")).toHaveClass("hidden");  
})

it('image number should match image', () => {
  const { queryByText, queryByTestId } = render(<Carousel />);

  expect(queryByText("Image 1 of 3.")).toBeInTheDocument();
  expect(queryByText("Image 2 of 3.")).not.toBeInTheDocument();

  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  expect(queryByText("Image 2 of 3.")).toBeInTheDocument();
  expect(queryByText("Image 1 of 3.")).not.toBeInTheDocument();
})