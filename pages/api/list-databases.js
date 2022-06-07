import {listAllDbs} from "../../services/UserServices";

const handler = async (req, res) => {
    const dbs = await listAllDbs();
    res.json(dbs)
}

export default handler;