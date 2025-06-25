import NearMissesTable from "../../Components/NearMissesTable/NearMissesTable";
import { render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import * as nearMissesModule from "../../Scripts/nearMisses";

/* Near misses table is a quite large file, so minimum test requirements:
    Renders table headers and rows when data is present
    Shows a loading popup when loading is true
    Opens modal when View button is clicked
    Pagination controls render
*/

vi.mock("../../Scripts/nearMisses", () => ({
  retrieveNearMisses: vi.fn(),
  retrieveNearMissInformation: vi.fn(),
}));

describe("NearMissesTable component", () => {
  const mockData = {
    1: {
      date: "2024-06-24",
      time: "12:30",
      distance: "500000",
    },
  };
  //set the return value of retrieving near misses to the mocked value
  beforeEach(() => {
    nearMissesModule.retrieveNearMisses.mockResolvedValue(mockData);
    nearMissesModule.retrieveNearMissInformation.mockResolvedValue({});
  });

  //does the loading popup appear?
  test("loading popup appears", () => {

    nearMissesModule.retrieveNearMisses.mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(mockEvents), 1000))
    );
    render(<NearMissesTable />);
    expect(screen.getByText(/Loading Data.../i)).toBeInTheDocument();
  });
  //does the table render with the mocked data?
  test("renders table headers and rows", async () => {
    render(<NearMissesTable />);

    await waitFor(() => {
      expect(screen.getByText("date")).toBeInTheDocument();
    });

    //does the data appear?
    expect(screen.getByText("2024-06-24")).toBeInTheDocument();
    expect(screen.getByText("500000")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /path information/i })
    ).toBeInTheDocument();
  });

  //does the view modal get opened when the path information button is clicked?
  test("view modal opens when path info button clicked", async () => {
    render(<NearMissesTable />);

    //have to wait for the content to show
    await waitFor(() => {
      expect(screen.getByText("date")).toBeInTheDocument();
    });

    const pathInfoButton = screen.getByRole("button", {
      name: /path information/i,
    });
    await userEvent.click(pathInfoButton);

    await waitFor(() => {
      expect(screen.getByRole("dialog")).toBeInTheDocument(); //wait for it to be popped up
    });
    //there should also be a close button
    const closeButton = screen.getByRole("button", { name: /Close/i });
    expect(closeButton).toBeInTheDocument();
  });
  test("renders pagination controls", async () => {
    render(<NearMissesTable />);

    await waitFor(() => {
      expect(screen.getByText("date")).toBeInTheDocument();
    });

    expect(screen.getByLabelText("Rows per page:")).toBeInTheDocument();
  });
});
