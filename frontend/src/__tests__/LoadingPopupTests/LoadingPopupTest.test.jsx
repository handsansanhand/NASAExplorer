import { describe, expect } from "vitest";
import LoadingPopup from "../../Components/LoadingPopup/LoadingPopup";
import { render, screen } from "@testing-library/react";

//just need to test if the text loads and the spinner
describe("Loading popup component", () => {
  const mockText = "Loading Test...";

  test("renders text component", () => {
    render(<LoadingPopup text={mockText} />);
    expect(screen.getByText(mockText)).toBeInTheDocument();
  });

  test("renders spinner component", () => {
    const { container } = render(<LoadingPopup text={mockText} />);
    const svgElement = container.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });
});
