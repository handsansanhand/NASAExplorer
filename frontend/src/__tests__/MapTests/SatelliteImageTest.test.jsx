import SatelliteImage from "../../Components/Map/MapPopup/SatelliteImage/SatelliteImage";
import { render, screen, waitFor } from "@testing-library/react";

vi.mock("../../Scripts/earth", () => ({
  retrieveSatelliteImage: vi.fn(),
}));
import { retrieveSatelliteImage } from "../../Scripts/earth";
beforeAll(() => {
  global.URL.createObjectURL = vi.fn(() => "mocked-url");
});

afterAll(() => {
  global.URL.createObjectURL.mockRestore?.();
});
//needs to show error text whenever its met with invalid co-ordinates
describe("SatelliteImage component", () => {
  //reset after each test
  beforeEach(() => {
    vi.clearAllMocks();
  });

  //error checking tests
  test("shows message when coordinates is empty array", () => {
    render(<SatelliteImage coordinates={[]} />);
    expect(screen.getByText(/No location data available/i)).toBeInTheDocument();
  });

  test("shows message when coordinates is undefined", () => {
    render(<SatelliteImage />);
    expect(screen.getByText(/No location data available/i)).toBeInTheDocument();
  });

  test("shows message when coordinates length !== 2", () => {
    render(<SatelliteImage coordinates={[1]} />);
    expect(screen.getByText(/No location data available/i)).toBeInTheDocument();
  });

  //does the loading popup appear when the image is loading?
  test("shows loading popup when fetching an image", async () => {
    retrieveSatelliteImage.mockImplementation(
      () => new Promise(() => {}) //this promise never resolves, so it will load forever
    );
    render(<SatelliteImage coordinates={[10, 20]} />);

    expect(screen.getByText(/Loading Satellite Image/i)).toBeInTheDocument();
  });

  //does it render the image after a sucessful fetch?
  test("renders after success", async () => {
    const fakeBlob = new Blob(["fake image content"], { type: "image/png" }); //mock value
    retrieveSatelliteImage.mockResolvedValue(fakeBlob); //when script is called, return the mock value

    render(<SatelliteImage coordinates={[0, 0]} />);

    const image = await waitFor(() => {
      return screen.getByAltText("Satellite View");
    });

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "mocked-url");
  });

  //does it show error text when the fetch fails?
  test("shows error after fail", async () => {
    retrieveSatelliteImage.mockRejectedValue(new Error("API down")); //say that it will return an error
    render(<SatelliteImage coordinates={[10, 20]} />);

    const errorMsg = await waitFor(() =>
      screen.getByText(/Unable to load satellite image/i)
    );
    expect(errorMsg).toBeInTheDocument(); //check if the error is caught and the error message displays
  })
});

