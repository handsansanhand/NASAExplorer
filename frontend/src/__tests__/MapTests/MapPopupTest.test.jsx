import MapPopup from "../../Components/Map/MapPopup/MapPopup";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, expect, vi } from "vitest";

vi.mock("../../Scripts/events", () => ({
  retrieveEventByID: vi.fn(),
}));

import { retrieveEventByID } from "../../Scripts/events";

describe("MapPopup component", () => {
  const mockEventData = {
    id: "EONET_9999",
  };

  const fetchedEvent = {
    id: "EONET_13365",
    title: "Wildfire in Russian Federation 1023710",
    description: "",
    link: "https://eonet.gsfc.nasa.gov/api/v2.1/events/EONET_13365",
    categories: [
      {
        id: 8,
        title: "Wildfires",
      },
    ],
    sources: [
      {
        id: "GDACS",
        url: "https://www.gdacs.org/report.aspx?eventtype=WF&eventid=1023710",
      },
    ],
    geometries: [
      {
        date: "2025-04-22T19:00:00Z",
        type: "Point",
        coordinates: [116.28876433875847, 53.30396108851382],
      },
    ],
  };

  beforeEach(() => {
    retrieveEventByID.mockReset();
  });

  //does the popup not render when show is false?
  test("doesn't render when show is false", () => {
    const { container } = render(
      <MapPopup show={false} onHide={() => {}} eventData={mockEventData} />
    );
    expect(container).toBeEmptyDOMElement();
  });

  //does the popup render the event details when its called? and is it correct?
  test("renders event details when event is fetched", async () => {
    retrieveEventByID.mockResolvedValue(fetchedEvent); //mock the return value

    render(
      <MapPopup show={true} onHide={() => {}} eventData={mockEventData} />
    );

    await waitFor(() => {
      expect(
        screen.getByText("Wildfire in Russian Federation 1023710")
      ).toBeInTheDocument();
      expect(screen.getByText("Wildfires")).toBeInTheDocument();
      expect(screen.getByText("GDACS")).toBeInTheDocument();
      expect(
        screen.getByText(new Date("2025-04-22T19:00:00Z").toLocaleString())
      ).toBeInTheDocument();
    });
  });

  //does the modal close when the  button is pressed?
  test("calls onHide when close button is clicked", async () => {
    retrieveEventByID.mockResolvedValue(fetchedEvent);
    const handleHide = vi.fn();

    render(
      <MapPopup show={true} onHide={handleHide} eventData={mockEventData} />
    );

    //wait till it loads
    await waitFor(() => {
      expect(screen.getByText("Wildfire in Russian Federation 1023710")).toBeInTheDocument();
    });

    //try clicking it and see if handle hide was called
    const closeButton = screen.getByRole("button", { name: /Close/i });
    await userEvent.click(closeButton);

    expect(handleHide).toHaveBeenCalled();
  })
});
