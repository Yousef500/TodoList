import { serialize } from "cookie";
const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const deleted = serialize("access_token", "deleted", {
        httpOnly: true,
        expires: new Date("Thu, 01 Jan 1970 00:00:00 GMT"),
      });

      res.setHeader("Set-Cookie", deleted);

      return res.status(200).json();
    } catch (e) {
      console.log({ e });
      return res.status(400).json({ message: "Problem logging out" });
    }
  }
};

export default handler;
