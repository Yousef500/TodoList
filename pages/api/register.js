import {connectToDatabase} from "../../lib/mongodb";
import fs from "fs";
import jwt from "jsonwebtoken";
import {serialize} from "cookie";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
    if (req.method !== "POST") req.json({message: "Please use a post method"});
    const {db} = await connectToDatabase();
    const {username, email, password} = req.body;

    try {
        const user = await db.collection("Users").findOne({email});

        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const response = await db.collection("Users").insertOne({
                username,
                email,
                hashedPassword,
            });

            if (response.acknowledged) {
                const path = `./pages/api`;
                const jwtPrivateKey = fs.readFileSync(`${path}/jwtRS256.key`);

                const data = {time: Date(), username, email};

                const token = await jwt.sign(data, jwtPrivateKey, {
                    algorithm: "RS256",
                    expiresIn: 86400,
                });

                const serializedAccessToken = serialize("access_token", token, {
                    httpOnly: true,
                    maxAge: token.expiresIn,
                });

                res.setHeader('Set-Cookie', serializedAccessToken);

                res.status(200).json({username});
            }
        } else {
            res
                .status(400)
                .json({message: "Email already exists, please login instead."});
        }
    } catch (e) {
        console.log({e});
        res.status(400).json({message: e.message});
    }
};

export default handler;
