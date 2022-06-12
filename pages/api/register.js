import { connectToDatabase } from "../../lib/mongodb";
import fs from "fs";
import jwt from "jsonwebtoken";

const handler = async (req, res) => {
  if (req.method !== "POST") req.json({ message: "Please use a post method" });
  const { db } = await connectToDatabase();
  const { username, email, password } = req.body;

  try {
    const user = await db.collection("Users").findOne({ email });

    if (!user) {
      const response = await db.collection("Users").insertOne({
        username,
        email,
        password,
      });

      if (response.acknowledged) {
        const path = `./pages/api`;
        const jwtPrivateKey = fs.readFileSync(`${path}/jwtRS256.key`);
        const refreshPrivateToken = fs.readFileSync(
          `${path}/refresh-private.key`
        );

        const data = { username, email, password };

        const token = jwt.sign(data, jwtPrivateKey, {
          algorithm: "RS256",
          expiresIn: 3600,
        });
        const refreshToken = jwt.sign(data, refreshPrivateToken, {
          algorithm: "RS256",
        });

        res.status(200).json({ token, refreshToken, username, email });
      }
    } else {
      res
        .status(400)
        .json({ message: "Email already exists, please login instead." });
    }
  } catch (e) {
    console.log({ e });
    res.status(400).json({ message: e.message });
  }
};

export default handler;
