const { getNearMissObjects } = require("../controllers/nearEarthController");
const fetch = require("node-fetch");
jest.mock("node-fetch");
const { Response } = jest.requireActual("node-fetch");

const today = new Date();
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);

const todayStr = today.toISOString().split("T")[0];
const yesterdayStr = yesterday.toISOString().split("T")[0];

describe("getNearMissObjects", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  function mockFetchResponse(data, status = 200) {
    return Promise.resolve(
      new Response(JSON.stringify(data), {
        status,
      })
    );
  }
  //make a blank mock fetch response, and check to see if the query was sent with the right format
  it("should return near miss objects within specified begin and final dates", async () => {
    fetch.mockResolvedValue(mockFetchResponse({ near_earth_objects: {} }));

    const req = {
      query: {
        start_date: "2025-06-19",
        end_date: "2025-06-25",
      },
    };
    const jsonMock = jest.fn();
    const res = {
      json: jsonMock,
      status: jest.fn(() => res),
    };

    await getNearMissObjects(req, res);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("start_date=2025-06-19&end_date=2025-06-25")
    );

    expect(res.json).toHaveBeenCalled();
  });
  //does it use a fallback of a day when no start + end date have been specified?
  it("should return near miss objects within today and yesterday with no specified dates", async () => {
    fetch.mockResolvedValue(mockFetchResponse({ near_earth_objects: {} }));

    const req = {
      query: {},
    };
    const jsonMock = jest.fn();
    const res = {
      json: jsonMock,
      status: jest.fn(() => res),
    };

    await getNearMissObjects(req, res);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining(`start_date=${yesterdayStr}&end_date=${todayStr}`)
    );

    expect(res.json).toHaveBeenCalled();
  });
  //does it return a 500 status when the fetch returns an invalid request?
  it("should return a 500 error when the API fails", async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500,
      json: jest.fn().mockResolvedValue({ error: "Internal Server Error" }),
    });
    const req = {
      query: {},
    };
      const statusMock = jest.fn();
  const jsonMock = jest.fn();
  const res = {
    status: statusMock.mockReturnValue({ json: jsonMock }),
    json: jsonMock,
  };

  await getNearMissObjects(req, res);

  expect(statusMock).toHaveBeenCalledWith(500);
  expect(jsonMock).toHaveBeenCalledWith({
    error: "There was an error returning the near miss objects.",
    code: 500,
    message: { error: "Internal Server Error" },
  });
  });
});
