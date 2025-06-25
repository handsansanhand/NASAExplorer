import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, vi } from "vitest";

/* need to verify:
    loading popup appears when data is loading
    markers render
    initial render
*/

//have to mock the retrieve events function
vi.mock("../../Scripts/events", () => ({
  retrieveEvents: vi.fn(),
}));
import { retrieveEvents } from "../../Scripts/events";
import Map from "../../Components/Map/Map";

describe("Map component", () => {
  const mockEvents = [
    {
      id: "EONET_14034",
      title: "Tropical Storm Andrea",
      latestGeometry: {
        date: "2025-06-24T21:00:00Z",
        type: "Point",
        coordinates: [-47.4, 37.9],
      },
    },
    {
      id: "EONET_14019",
      title: "Tropical Storm Sepat",
      latestGeometry: {
        date: "2025-06-25T06:00:00Z",
        type: "Point",
        coordinates: [139.6, 32.7],
      },
    },
  ];

  beforeEach(() => {
    retrieveEvents.mockReset();
  });
  
  //does it render?
  test("map renders", () => {
    const { container } = render(<Map />);
    const mapWrapper = container.querySelector(".map-wrapper");
    expect(mapWrapper).toBeInTheDocument();
  });

  //when events are loading, does the popup load too?
  test("load popup appears when events are loading", async () => {
    //have to mock the implementation, basically say that retrieveEvents in this case returns the mockEvents after a short time
    retrieveEvents.mockImplementation(
      () =>
        new Promise((resolve) => setTimeout(() => resolve(mockEvents), 1000))
    );
    render(<Map />);
    expect(screen.getByText(/Loading Events.../i)).toBeInTheDocument();
  });

  //do the event markers load ok? and when i click on a marker, does it have the expected value?
  test("renders markers after events are loaded", async () => {
    retrieveEvents.mockResolvedValue(mockEvents);
    const { container } = render(<Map />);

    //wait for loading to disappear (takes 1 second)
    await waitFor(
      () => {
        expect(
          screen.queryByText(/Loading Events.../i)
        ).not.toBeInTheDocument();
      },
      { timeout: 2000 }
    );
    //take the markers, and check if there are the right amount of them
    const markers = container.querySelectorAll(".leaflet-marker-icon");
    expect(markers.length).toBe(mockEvents.length);

    await userEvent.click(markers[0]);
    await waitFor(() => {
      expect(screen.getByText("Tropical Storm Andrea")).toBeInTheDocument();
    });
  });


});
