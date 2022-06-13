import jwt from "jsonwebtoken";
import fs from "fs";
import { connectToDatabase } from "../../lib/mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { list } = req.body;
    try {
      const token = req.cookies.access_token;
      const publicKey = fs.readFileSync("./pages/api/jwtRS256.key.pub");
      const verified = jwt.verify(token, publicKey, { algorithm: "RS256" });
      if (verified.email) {
        const { db } = await connectToDatabase();
        const result = await db.collection("Lists").replaceOne(
          { user: verified.email },
          {
            user: verified.email,
            list,
          }
        );

        if (result.modifiedCount === 0) {
          const result = await db.collection("Lists").insertOne({
            user: email,
            list,
          });
          if (result.acknowledged) return res.status(201).json();
        }

        if (result.acknowledged) {
          return res.status(201).json();
        }
      } else {
        res.status(401).json({ message: "Unauthorized access." });
      }
    } catch (e) {
      res.status(401).json({ message: e.message });
      console.log(e)
    }
  } else {
    res.json({ message: "Please use a get method." });
  }
};

export default handler;
