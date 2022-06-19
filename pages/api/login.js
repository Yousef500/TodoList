import jwt from "jsonwebtoken";
import fs from "fs";
import {connectToDatabase} from "../../lib/mongodb";
import {serialize} from "cookie";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
    if (req.method === "POST") {
        try {
            const {db} = await connectToDatabase();
            const {email, password} = req.body;
            const user = await db.collection("Users").findOne({email});
            if (user && password) {
                const match = await bcrypt.compare(password, user.hashedPassword);
                if (match) {
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
                    res.json({message: "Please check your credentials"});
                }
            } else {
                res.status(403);
                res.json({
                    message: "This email doesn't exist, please register instead.",
                });
            }
        } catch (e) {
            console.log({e});
            return res.status(400).json({message: e.message})
        }
    } else {
        res.json({message: "You're using a GET method??"});
    }
};

export default handler;
