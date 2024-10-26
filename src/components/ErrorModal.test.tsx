import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ErrorModal from "./ErrorModal";

describe("ErrorModal Component", () => {
  // Mock setShowModal function
  const mockSetShowModal = jest.fn();

  // Reset mock function before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders with default error message when no message prop is provided", () => {
    render(<ErrorModal setShowModal={mockSetShowModal} />);

    expect(screen.getByText(/Something went wrong/)).toBeInTheDocument();
    expect(
      screen.getByText(/please refresh the page and try again/)
    ).toBeInTheDocument();
  });

  test("renders with custom error message when message prop is provided", () => {
    const customMessage = "Custom error message";
    render(
      <ErrorModal setShowModal={mockSetShowModal} message={customMessage} />
    );

    expect(screen.getByText(new RegExp(customMessage))).toBeInTheDocument();
    expect(
      screen.getByText(/please refresh the page and try again/)
    ).toBeInTheDocument();
  });

  test("closes modal when close button is clicked", () => {
    render(<ErrorModal setShowModal={mockSetShowModal} />);

    const closeButton = screen.getByText("×");
    fireEvent.click(closeButton);

    expect(mockSetShowModal).toHaveBeenCalledTimes(1);
    expect(mockSetShowModal).toHaveBeenCalledWith(false);
  });
});
