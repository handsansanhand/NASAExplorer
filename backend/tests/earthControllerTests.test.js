const request = require("supertest");
const express = require("express");
const { getImage } = require("../controllers/earthController");
const fetch = require("node-fetch");

jest.mock("node-fetch", () => jest.fn());
const { Response } = jest.requireActual("node-fetch");

const app = express();
app.get("/", getImage);

/* Testing the earth controller, a single function which returns an earth image given lat + lon
    Tests: 
        invalid lat + lon
        bad response from api
        good response from api
*/
describe("GET earth image", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return 500 if lat or lon are missing", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(500);
    expect(response.body.error).toBe(
      "Cannot retrieve image, both latitude and longitude are required."
    );
  });
  it("should return an API error if fetch response status is not ok", async () => {
    fetch.mockResolvedValue(new Response("Bad Request", { status: 500 }));
    const response = await request(app).get("/");
    expect(response.status).toBe(500);
  });
  //have to mock the image data
  it("should return image data on success", async () => {
    const imageData = new Uint8Array([1, 2, 3]);

    fetch.mockResolvedValue(
      new Response(imageData, {
        status: 200,
        headers: { "Content-Type": "image/jpeg" },
      })
    );

    const response = await request(app).get("/").query({ lat: 10, lon: 20 });
    expect(response.status).toBe(200);
  });
});
