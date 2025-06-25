import { expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import { render, screen } from "@testing-library/react";
//footer is just a wrapper class, so just needs to test if it renders without crashing and contains the two components
vi.mock("../../Components/Footer/ContactDetails/Contactdetails", () => {
  return {
    default: () => <div>Contactdetails Mock</div>,
  };
});

vi.mock("../../Components/MobileMenuControls/MobileMenuControls", () => {
  return {
    default: () => <div>MobileMenuControls Mock</div>,
  };
});
describe("Footer component", () => {
  //does footer render ok? and does it have a footer container element
  test("renders footer container with the right classes", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    const footerElement = screen.getByRole("contentinfo"); //implicit role
    expect(footerElement).toBeInTheDocument();
  });

  //make sure it renders contact details and mobile menu controls
  test("renders Contactdetails component", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText("Contactdetails Mock")).toBeInTheDocument();
  });
   //make sure it renders contact details and mobile menu controls
  test("renders MobileMenuControls component", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );
    expect(screen.getByText("MobileMenuControls Mock")).toBeInTheDocument();
  });
});
