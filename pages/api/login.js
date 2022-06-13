import jwt from "jsonwebtoken";
import fs from "fs";
import { connectToDatabase } from "../../lib/mongodb";
import { serialize } from "cookie";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { db } = await connectToDatabase();
    const { email, password } = req.body;
    const user = await db.collection("Users").findOne({ email });
    if (user) {
      if (user.password === password) {
        const path = `./pages/api`;
        const jwtPrivateKey = fs.readFileSync(`${path}/jwtRS256.key`);

        const data = {
          time: Date(),
          username: user.username,
          email: user.email,
        };

        const token = jwt.sign(data, jwtPrivateKey, {
          algorithm: "RS256",
          expiresIn: 86400,
        });

        const serializedAccessToken = serialize("access_token", token, {
          httpOnly: true,
          maxAge: token.expiresIn,
        });

        res.setHeader("Set-Cookie", serializedAccessToken);
        res.status(200);
        res.json({username: user.username});
      } else {
        res.status(403);
        res.json({ message: "Please check your credentials" });
      }
    } else {
      res.status(403);
      res.json({
        message: "This email doesn't exist, please register instead.",
      });
    }
  } else {
    res.json({ message: "You're using a GET method??" });
  }
};

export default handler;
