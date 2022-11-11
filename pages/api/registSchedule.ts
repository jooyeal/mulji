import type { NextApiRequest, NextApiResponse } from "next";
import { dateFormatToKr } from "../../utils/dateHelper";
import prisma from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const krStartDate = dateFormatToKr(new Date(req.body.startDate));
    const krEndDate = dateFormatToKr(new Date(req.body.endDate));
    await prisma.schedules.create({
      data: {
        userId: req.body.userId,
        startDate: krStartDate,
        endDate: krEndDate,
      },
    });
    res.status(200).end();
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
