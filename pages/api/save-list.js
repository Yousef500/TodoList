const handler = async (req, res) => {
  if (req.method === "POST") {
    const { info } = req.body;

    const email = info.email;
  } else {
    res.json({ message: "Please use a get method." });
  }
};

export default handler;
