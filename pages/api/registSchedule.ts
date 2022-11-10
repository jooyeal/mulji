import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    console.log(req.body.startDate);
    await prisma.schedules.create({
      data: {
        userId: req.body.userId,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
      },
    });
    res.status(200);
  } catch (e) {
    res.status(500).json(e);
  }
}
