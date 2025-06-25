import { vi } from "vitest";
import CustomSlider from "../../Components/Map/Slider/CustomSlider";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";


//need to test if a change is commited whenever the sldier is moved/released
describe("Map slider component", () => {
  test("value change on slider move", async () => {
    const onValueCommitMock = vi.fn();
    render(<CustomSlider onValueCommit={onValueCommitMock} />);
    //theres no mouse drag for user event, so needs to press the left arrow key instead
    const slider = screen.getByRole("slider");
    slider.focus();
    await userEvent.keyboard("{arrowleft}");

    expect(onValueCommitMock).toHaveBeenCalled();
  });
});
