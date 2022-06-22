import {connectToDatabase} from "../../lib/mongodb";
import fs from "fs";
import jwt from "jsonwebtoken";
import {serialize} from "cookie";
import bcrypt from "bcrypt";

const handler = async (req, res) => {
    const {username, email} = req;

    if (username && email) {
        try {
            const {db} = await connectToDatabase();
            const user = await db.collection("Users").findOne({email});
            if (!user.email) {
                const salt = await bcrypt.genSalt(10)
                const hashedPassword = await bcrypt.hash('Pa$$w0rd', salt);
                const result = await db.collection("Users").insertOne({
                    username,
                    email,
                    hashedPassword
                });
            }
            const data = {username, email, time: Date()};
            const privateKey = fs.readFileSync('./pages/api/jwtRS256.key');
            const token = await jwt.sign(data, privateKey, {algorithm: 'RS256', expiresIn: 86400});
            const serializedAccessToken = serialize('access_token', token, {
                httpOnly: true,
                maxAge: 86400
            })
            res.setHeader('Set-Cookie', serializedAccessToken)
            return res.status(200).json({username: username});
        } catch (e) {
            console.log({e})
            return res.status(400).json({message: e.message})
        }
    }
}

export default handler;