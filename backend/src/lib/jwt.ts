import jwt from "jsonwebtoken";

type Payload = {
  userId: number;
};

const accessSecret = process.env.JWT_ACCESS_SECRET!;

export function generateAccessToken({ userId }: Payload) {
  return jwt.sign({ userId }, accessSecret, {
    expiresIn: "15m",
  });
}
