import withHandler from "@/libs/server/withHandler";
import {NextApiRequest, NextApiResponse} from "next";
import client from "@/libs/server/client";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const records = await client.record.findMany({
      orderBy: {
        score: "desc",
      },
      take: 10,
    });

    return res.json({ok: true, records: records});
  }
  if (req.method === "POST") {
    const body = req.body;
    const {name, score} = JSON.parse(body);
    await client.record.create({
      data: {
        name,
        score,
      },
    });

    return res.json({ok: true});
  }
}

export default withHandler({methods: ["GET", "POST"], handler});
