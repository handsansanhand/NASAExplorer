import RouteInfo from "../../Components/NearMissesTable/RouteInfo/RouteInfo";
import { render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import * as nearMissesModule from "../../Scripts/nearMisses";

vi.mock("../../Scripts/nearMisses", () => ({
  retrieveNearMissInformation: vi.fn(),
}));

/*should have tests for:
    Switching from past to future

*/
describe("RouteInfo component", () => {
  const mockAsteroidPath = {
    name: "Test Asteroid",
    pastPath: [{ id: 1, lat: 50.0, lon: 4.0 }],
    futurePath: [{ id: 2, lat: 60.0, lon: 5.0 }],
  };

  beforeEach(() => {
    nearMissesModule.retrieveNearMissInformation.mockResolvedValue(
      mockAsteroidPath
    );
  });

  //does the loading popup appear?
  test("loading popup appears", () => {
    nearMissesModule.retrieveNearMissInformation.mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(mockEvents), 1000))
    );
    render(<RouteInfo />);
    expect(
      screen.getByText(/Loading Path Information.../i)
    ).toBeInTheDocument();
  });

  test("renders asteroid name when rendered", async () => {
    render(<RouteInfo id="123" />);

    //wait for it to load
    await waitFor(() => {
      expect(screen.getByText("Name: Test Asteroid")).toBeInTheDocument();
    });
  });

  test("switches status when clicked", async () => {
    render(<RouteInfo id="123" />);
    await waitFor(() => {
      expect(screen.getByText("Name: Test Asteroid")).toBeInTheDocument();
    });

    const futureButton = screen.getByRole("button", { name: "Future" });
    await userEvent.click(futureButton);

    expect(futureButton).toHaveClass("p-highlight");
  });
});
