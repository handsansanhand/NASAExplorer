const request = require("supertest");
const express = require("express");
const {
  getAllEvents,
  getEvents,
  getEventByID,
} = require("../controllers/eventsController");

const fetch = require("node-fetch");

jest.mock("node-fetch", () => jest.fn());
const { Response } = jest.requireActual("node-fetch");

const app = express();
app.get("/filterEvents", getEvents);
app.get("/events/:id", getEventByID);
app.get("/", getAllEvents);

/* Testing the events controller, multiple functions including:
    
    Functions+Tests: 
        getAllEvents:
            good response
            bad response
        getEvents
            return filtered events
            bad response from api
            correctly build string with category
            correctly build string without category
        getEventByID
            return event data on success
            bad response
*/

describe("Events controller", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockEvents = {
    events: [
      {
        id: "1",
        title: "Test Event",
        geometries: [
          { date: "2024-06-01", type: "Point", coordinates: [1, 1] },
          { date: "2024-06-15", type: "Point", coordinates: [2, 2] },
        ],
      },
    ],
  };

  describe("getAllEvents", () => {
    it("should return OK when valid", async () => {
      fetch.mockResolvedValue(
        new Response(JSON.stringify(mockEvents), { status: 200 })
      );
      const response = await request(app).get("/");
      expect(response.status).toBe(200);
    });
    it("should return 500 when API call fails", async () => {
      fetch.mockResolvedValue(new Response(null, { status: 500 }));

      const res = await request(app).get("/");

      expect(res.status).toBe(500);
      expect(res.body).toEqual({ error: "Failed to fetch daily images" });
    });
  });

  describe("getEvents", () => {
    it("should return filtered events when valid", async () => {
      const mockEvents = {
        events: [
          {
            id: "2",
            title: "Filtered Event",
            geometries: [
              { date: "2024-06-20", type: "Point", coordinates: [3, 3] },
            ],
          },
        ],
      };
      fetch.mockResolvedValue(
        new Response(JSON.stringify(mockEvents), { status: 200 })
      );

      const res = await request(app).get("/filterEvents");

      expect(res.status).toBe(200);
      expect(res.body[0].id).toBe("2");
    });

    it("should handle bad response from API", async () => {
      fetch.mockResolvedValue(new Response(null, { status: 500 }));

      const res = await request(app).get("/filterEvents");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Failed to fetch events");
    });

    it("should correctly build query string with category", async () => {
      const mockEvents = { events: [] };

      fetch.mockResolvedValue(
        new Response(JSON.stringify(mockEvents), { status: 200 })
      );

      const res = await request(app).get(
        "/filterEvents?category=severeStorms&days=10&limit=5"
      );

      expect(res.status).toBe(200);
      // additionally verify fetch called with correct URL
      const expectedURL = expect.stringContaining(
        "/categories/severeStorms?days=10&limit=5"
      );
      expect(fetch).toHaveBeenCalledWith(expectedURL);
    });
    it("should correctly build query string without category", async () => {
      const mockEvents = { events: [] };

      fetch.mockResolvedValue(
        new Response(JSON.stringify(mockEvents), { status: 200 })
      );

      const res = await request(app).get(
        "/filterEvents?source=NOAA&status=open&days=30&limit=3"
      );

      expect(res.status).toBe(200);
      const expectedURL = expect.stringContaining(
        "?source=NOAA&status=open&days=30&limit=3"
      );
      expect(fetch).toHaveBeenCalledWith(expectedURL);
    });
  });

  describe("getEventById", () => {
    it("should return event data on success", async () => {
      const mockEvent = {
        id: "123",
        title: "Test Event",
        geometries: [
          { date: "2024-06-20", type: "Point", coordinates: [1, 2] },
        ],
      };

      fetch.mockResolvedValue(
        new Response(JSON.stringify(mockEvent), { status: 200 })
      );

      const res = await request(app).get("/events/123");

      expect(res.status).toBe(200);
      expect(res.body).toEqual(mockEvent);
    });
    it("should handle bad response from API", async () => {
      fetch.mockResolvedValue(new Response(null, { status: 500 }));

      const res = await request(app).get("/events/123");

      expect(res.status).toBe(500);
      expect(res.body.error).toBe("Failed to fetch event");
    });
  });
});
