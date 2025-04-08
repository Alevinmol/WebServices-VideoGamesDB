const request = require("supertest");
const app = require("../../app"); // Import Express app

describe("GET /games", () => {
  it("should return a list of games", async () => {
    const res = await request(app).get("/games");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
