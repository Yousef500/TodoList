import jwt from "jsonwebtoken";
import fs from "fs";

const handler = (req, res) => {
  const path = `${__dirname}/../../../..`;
  const jwtPrivateKey = fs.readFileSync(`${path}/jwtRS256.key`);
  const refreshPrivateKey = fs.readFileSync(`${path}/refresh-private.key`);
  const data = {
    time: Date(),
    userId: 1,
  };

  const token = jwt.sign(data, jwtPrivateKey, {
    algorithm: "RS256",
    expiresIn: 3600,
  });
  const refreshToken = jwt.sign(data, refreshPrivateKey, {
    algorithm: "RS256",
    expiresIn: 86400,
  });

  res.json({ token, refreshToken });
};

export default handler;
