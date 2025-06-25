import { render, screen } from "@testing-library/react";
import InfoModal from "../../Components/Menu/InfoModal/InfoModal";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";

const infoTextMock = ["This is line 1", "This is line 2"];
const onCloseMock = vi.fn();
//needs to test if it closes, renders + doesnt render
describe("InfoModal component", () => {
  //does it render when show is true?
  test("does render when onShow is true", () => {
    render(
      <InfoModal show={true} onClose={onCloseMock} infoText={infoTextMock} />
    );
    expect(screen.queryByText("Information")).toBeInTheDocument();
  });
  //does it not render when show is false?
  test("does not render when onShow is false", () => {
    render(
      <InfoModal show={false} onClose={onCloseMock} infoText={infoTextMock} />
    );
    expect(screen.queryByText("Information")).not.toBeInTheDocument();
  });
  test("closes when on close is pressed", async () => {
    render(
      <InfoModal show={true} onClose={onCloseMock} infoText={infoTextMock} />
    );

    const closeButton = screen.getByRole("button", { name: "Close Button" });
    await userEvent.click(closeButton);

    expect(onCloseMock).toBeCalledTimes(1);
  });
});
