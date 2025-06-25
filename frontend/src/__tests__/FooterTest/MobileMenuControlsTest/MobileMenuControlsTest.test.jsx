import MobileMenuControls from "../../../Components/MobileMenuControls/MobileMenuControls";
import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

//we have to mock the info modal that pops up, this will be used to test wether the info button works
vi.mock("../../../Components/Menu/InfoModal/InfoModal", () => ({
  default: ({ show, onClose, infoText }) =>
    show ? (
      <div>
        <div>InfoModal Content</div>
        <button onClick={onClose}>Close</button>
      </div>
    ) : null,
}));

describe("MobileMenuControls component", () => {
  //does the component have buttons when rendered?
  test("renders info and menu buttons", () => {
    render(
      <MemoryRouter>
        <MobileMenuControls />
      </MemoryRouter>
    );
    //load the buttons
    const infoButton = screen.getByRole("button", { name: "Open Info Modal" });
    const menuButton = screen.getByRole("button", { name: "Open Menu" });
    expect(infoButton).toBeInTheDocument();
    expect(menuButton).toBeInTheDocument();

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });
  //when i press info button or menu button, does the correct component load?
  test("opens info modal when info button is pressed", async () => {
    render(
      <MemoryRouter>
        <MobileMenuControls />
      </MemoryRouter>
    );
    const infoButton = screen.getByRole("button", { name: "Open Info Modal" });
    await userEvent.click(infoButton);

    expect(screen.getByText("InfoModal Content")).toBeInTheDocument();
  });

  test("opens menu popup when menu button is clicked", async () => {
    render(
      <MemoryRouter>
        <MobileMenuControls />
      </MemoryRouter>
    );

    const menuButton = screen.getByRole("button", { name: "Open Menu" });
    await userEvent.click(menuButton);

    const homeLink = await screen.findByText("Home");
    expect(homeLink).toBeInTheDocument();
  });
});
