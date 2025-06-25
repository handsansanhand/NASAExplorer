//test case which tests to see if the daily image modal works
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import DailyImageModal from "../Components/DailyImageModal/DailyImageModal";

describe("DailyImageModal component", () => {
  const mockImageData = {
    url: "https://example.com/image.jpg",
    title: "Test Image Title",
    description: "This is a test description.",
    author: "Test Author",
  };

  const onHideMock = vi.fn();

  test("renders modal content when show is true", () => {
    render(
      <DailyImageModal show={true} onHide={onHideMock} imageData={mockImageData} />
    );

    // Check title
    expect(screen.getByText(/NASA Daily Astronomy Image/i)).toBeInTheDocument();

    // Check image title
    expect(screen.getByText(mockImageData.title)).toBeInTheDocument();

    // Check description
    expect(screen.getByText(mockImageData.description)).toBeInTheDocument();

    // Check author
    expect(screen.getByText(/Test Author/i)).toBeInTheDocument();

    // Check image
    const image = screen.getByAltText(mockImageData.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockImageData.url);
  });

});
