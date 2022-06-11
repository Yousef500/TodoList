import jwt from "jsonwebtoken";
import fs from "fs";
import {connectToDatabase} from "../../lib/mongodb";

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const {db} = await connectToDatabase();
        const {email, password} = req.body;
        const user = await db.collection("Users").findOne({email});
        if (user) {
            if (user.password === password) {
                const path = `${__dirname}/../../../..`;
                const jwtPrivateKey = fs.readFileSync(`${path}/jwtRS256.key`);
                const refreshPrivateKey = fs.readFileSync(`${path}/refresh-private.key`);

                const data = {
                    time: Date(),
                    username: user.username,
                    email: user.email
                };

                const token = jwt.sign(data, jwtPrivateKey, {
                    algorithm: "RS256",
                    expiresIn: 3600,
                });
                const refreshToken = jwt.sign(data, refreshPrivateKey, {
                    algorithm: "RS256",
                    expiresIn: 86400,
                });

                res.status(200);
                res.json({token, refreshToken});
            } else {
                res.status(403);
                res.json({message: "Please check your credentials"});
            }
        } else {
            res.status(403);
            res.json({message: "This email doesn't exist, please register instead."});
        }
    } else {
        res.json({message: "You're using a GET method??"})
    }
};

export default handler;
