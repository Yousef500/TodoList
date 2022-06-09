import jwt from "jsonwebtoken";
import fs from "fs";

const handler = (req, res) => {
  const jwtPublicKey = fs.readFileSync(
    `${__dirname}/../../../../jwtRS256.key.pub`
  );
  const token = req.headers.authorization;
  try {
    const data = jwt.verify(token.toString(), jwtPublicKey, {
      algorithms: ["RS256"],
    });
    res.json(data);
  } catch (e) {
    res.status(403).json({ message: e.message });
  }
};

export default handler;
