//test case which tests to see if the daily image modal works
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import DailyImageModal from "../../Components/DailyImageModal/DailyImageModal";
import { expect, test } from "vitest";

describe("DailyImageModal component", () => {
  const mockImageData = {
    url: "https://example.com/image.jpg",
    title: "Test Image Title",
    description: "This is a test description.",
    author: "Test Author",
  };

  const onHideMock = vi.fn();

  //does it show the content when its show value is true?
  test("renders modal content when show is true", () => {
    render(
      <DailyImageModal
        show={true}
        onHide={onHideMock}
        imageData={mockImageData}
      />
    );

    //check if the mock image data is actually in the rendered document
    expect(screen.getByText(/NASA Daily Astronomy Image/i)).toBeInTheDocument();
    expect(screen.getByText(mockImageData.title)).toBeInTheDocument();
    expect(screen.getByText(mockImageData.description)).toBeInTheDocument();
    expect(screen.getByText(/Test Author/i)).toBeInTheDocument();

    //check image also
    const image = screen.getByAltText(mockImageData.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockImageData.url);
  });

  //does the button register when clicked?
  test("calls onhide when close button is clicked", async () => {
    render(
      <DailyImageModal
        show={true}
        onHide={onHideMock}
        imageData={mockImageData}
      />
    );
    const closeButton = screen.getByRole("button");
    await userEvent.click(closeButton);

    expect(onHideMock).toHaveBeenCalledTimes(1);
  });

  test("does not load when show is false", () => {
    render(
      <DailyImageModal
        show={false}
        onHide={onHideMock}
        imageData={mockImageData}
      />
    );
    expect(screen.queryByText(/NASA Daily Astronomy Image/i)).not.toBeInTheDocument();
  });
});
