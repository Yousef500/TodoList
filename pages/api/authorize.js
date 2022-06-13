import jwt from "jsonwebtoken";
import fs from "fs";

const handler = async (req, res) => {
  try {
    const token = req.cookies.access_token;
    if (!token) return res.status(403).json({ message: "Unauthorized access" });
    const publicKey = fs.readFileSync("./pages/api/jwtRS256.key.pub");
    const verifiedUser = jwt.verify(token, publicKey, {
      algorithm: "RS256",
    });

    if (verifiedUser.email)
      return res.status(200).json({
        username: verifiedUser.username,
      });
  } catch (e) {
    console.log({ e });
    return res.status(403).json({ message: "Unauthorized access" });
  }
};

export default handler;
