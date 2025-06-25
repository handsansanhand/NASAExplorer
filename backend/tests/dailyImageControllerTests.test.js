const request = require("supertest");
const express = require("express");
const { getDailyImage } = require("../controllers/dailyImageController");
const fetch = require("node-fetch");

jest.mock("node-fetch");
const { Response } = jest.requireActual("node-fetch");

const app = express();
app.get("/", getDailyImage);

/* Needs to test if the get request works, and when it fails */
describe("GET dailyImage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  //this is the mocked response
  const mockData = {
    url: "https://example.com/image.jpg",
    title: "Test Image",
    explanation: "An amazing image of space.",
    copyright: "NASA",
  };
  //does it work when the response from the api is 200?
  it("should return daily image data on sucess", async () => {
    fetch.mockResolvedValue(
      new Response(JSON.stringify(mockData), { status: 200 })
    );

    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body.image_url).toBe(mockData.url);
    expect(response.body.image_title).toBe(mockData.title);
    expect(response.body.image_description).toBe(mockData.explanation);
    expect(response.body.image_author).toBe(mockData.copyright);
  });
  //does it return an error when its not 200?
  it("should return 500 status on fail", async () => {
    fetch.mockResolvedValue(
      new Response("Internal Server Error", { status: 500 })
    );
    const response = await request(app).get("/");
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch daily image" });
  });
});
