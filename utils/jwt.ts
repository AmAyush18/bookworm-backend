require("dotenv").config();
import jwt from "jsonwebtoken";

export const SignAccessToken = function (id: number | undefined): string {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "1d",
  });
};

export const SignRefreshToken = function (id: number | undefined): string {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "10d",
  });
};
