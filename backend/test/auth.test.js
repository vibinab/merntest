import request from "supertest";
import app from "../src/app.js";
import User from "../src/models/User.js";

// jest.mock("../src/models/User.js");
import { jest } from "@jest/globals";

jest.unstable_mockModule("../src/models/User.js", () => ({
  default: {
    findOne: jest.fn(),
  },
}));

describe("Auth API", () => {
  test("POST /api/auth/login - should return token for valid credentials", async () => {
    const mockUser = { email: "test@example.com", password: "hashedpassword" };

    User.findOne.mockResolvedValue(mockUser);

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password" });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
