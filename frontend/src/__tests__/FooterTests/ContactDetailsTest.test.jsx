import { render, screen } from "@testing-library/react";
import Contactdetails from "../../Components/Footer/ContactDetails/Contactdetails";
import { expect } from "vitest";

describe("Contact details component", () => {
//not much to test in contact details, does it load all my links and are they the correct link?
  test("Contact detail links load when rendered", () => {
    render(<Contactdetails />);
    const emailLink = screen.getByLabelText("E-Mail");
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute("href", "mailto:jack.kazco@yahoo.ie");

    const linkedinLink = screen.getByLabelText("LinkedIn Link");
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/jack-wright-018b52289/"
    );

    const phoneLink = screen.getByLabelText("Phone Link");
    expect(phoneLink).toBeInTheDocument();
    expect(phoneLink).toHaveAttribute("href", "tel:+3530851593979");

    const githubLink = screen.getByLabelText("GitHub Link");
    expect(githubLink).toBeInTheDocument();
    expect(githubLink).toHaveAttribute(
      "href",
      "https://github.com/handsansanhand"
    );
  });
});
