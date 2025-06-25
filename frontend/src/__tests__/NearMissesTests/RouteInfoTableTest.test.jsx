import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RouteInfoTable from "../../Components/NearMissesTable/RouteInfo/RouteInfoTable/RouteInfoTable";
import { describe } from "vitest";

/* Tests the:
    loading state
    data rendered via the path prop
    sorting works
    pagination
*/

const mockPath = [
  {
    Date: "2023-06-25",
    "Orbiting Body": "Earth",
    Speed: "99",
    "Miss Distance": "50000",
  },
  {
    Date: "2023-06-26",
    "Orbiting Body": "Mars",
    Speed: "1",
    "Miss Distance": "60000",
  },
];

describe("RouteInfoTable component", () => {
  //does it acutally render the rows
  test("renders rows correctly", async () => {
    render(<RouteInfoTable path={mockPath} />);

    //the loading test can be done quickly here
    expect(
      screen.getByText(/Loading Path Information.../i)
    ).toBeInTheDocument();

    await waitFor(() =>
      expect(
        screen.queryByText(/Loading Path Information.../i)
      ).not.toBeInTheDocument()
    );

    //check to see if the rows have been populated
    expect(screen.getByText("2023-06-25")).toBeInTheDocument();
    expect(screen.getByText("Earth")).toBeInTheDocument();
    expect(screen.getByText("99")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();

    expect(screen.getByText("2023-06-26")).toBeInTheDocument();
    expect(screen.getByText("Mars")).toBeInTheDocument();
  });

  //does the sorting functionality work?
  test("sorts column when header clicked", async () => {
    render(<RouteInfoTable path={mockPath} />);
    await waitFor(() =>
      expect(
        screen.queryByText(/Loading Path Information.../i)
      ).not.toBeInTheDocument()
    );

    const speedHeader = screen.getByRole("button", { name: /Speed/i });

    //initially, its not sorted, so will be 99 -> 1, and sorting it will first toggle ascending order and makeit 1->99
    const rowsBefore = screen.getAllByRole("row");
    expect(rowsBefore[1]).toHaveTextContent("99");
    expect(rowsBefore[2]).toHaveTextContent("1");

    await userEvent.click(speedHeader);

    const rowsAfter = screen.getAllByRole("row");
    // the order should flip because of sorting toggle
    expect(rowsAfter[1]).toHaveTextContent("1");
    expect(rowsAfter[2]).toHaveTextContent("99");
  });

  //does the pagination of the table work>
  test("changes rows per page", async () => {
    const largeMock = Array(10).fill(mockPath[0]); //make a large path of just the same data
    render(<RouteInfoTable path={largeMock} />);
    await waitFor(() =>
      expect(
        screen.queryByText(/Loading Path Information.../i)
      ).not.toBeInTheDocument()
    );

    expect(screen.getAllByRole("row").length).toBe(11); //1 header + 10 rows
    //the row select button is a combobox -> option {5}
    const rowsPerPageSelect = screen.getByRole("combobox");
    await userEvent.click(rowsPerPageSelect);

    const optionFive = await screen.findByRole("option", { name: "5" });
    await userEvent.click(optionFive);
    expect(screen.getAllByRole("row").length).toBe(6); //now 5 rows + 1 header
  });
});
