import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { test, vi } from "vitest";
import MapLegend from "../../Components/Map/MapLegend/MapLegend";

/* This needs to mostly test button functionalities, and how they change the updateFilter
signature: function MapLegend({ updateFilter, className = "" })
*/
describe("Map legend component", () => {
  let updateFilter;

  beforeEach(() => {
    updateFilter = vi.fn();
  });

  //does it render ok?
  test("renders headers and buttons", () => {
    render(<MapLegend updateFilter={updateFilter} />);

    expect(screen.getByText(/Filter By Status/i)).toBeInTheDocument();
    expect(screen.getByText(/Filter By Event/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Clear Filter/i })
    ).toBeInTheDocument();
  });

  //when the status is changed, does it update filter?
  test("update filter called when status changed", async () => {
    render(<MapLegend updateFilter={updateFilter} />)
    
    const closedButton = screen.getByText("Closed");
    await userEvent.click(closedButton);

    expect(updateFilter).toHaveBeenCalledWith({ status: "closed" });
  })

  //when the category is changed, does it update the filter?
    test("update filter called when status changed", async () => {
    render(<MapLegend updateFilter={updateFilter} />)
    
    const wildFireButton = screen.getByText("Wildfires");
    await userEvent.click(wildFireButton);

    expect(updateFilter).toHaveBeenCalledWith({ category: 8 });
  })

  test("reset button clears filters", async () => {
     render(<MapLegend updateFilter={updateFilter} />)
    
    const resetButton = screen.getByText("Clear Filter");
    await userEvent.click(resetButton);

    expect(updateFilter).toHaveBeenCalledWith({ status: "open" ,category: null });
  })

});
