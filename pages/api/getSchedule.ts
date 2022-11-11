import type { NextApiRequest, NextApiResponse } from "next";
import { createCurrentDates, getAmongDate } from "../../utils/dateHelper";
import prisma from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Date[] | null>
) {
  try {
    const currentDate = new Date();
    const month = new Date(
      `${currentDate.getFullYear()}-${Number(req.query.month)}`
    );
    const nextMonth = new Date(
      `${currentDate.getFullYear()}-${Number(req.query.month) + 1}`
    );
    const userId = Number(req.query.userId);
    const schedules = await prisma.schedules.findMany({
      where: {
        userId,
        startDate: {
          gte: month,
          lt: nextMonth,
        },
      },
    });
    if (schedules.length !== 0) {
      const days = schedules.map((schedule) =>
        createCurrentDates(
          getAmongDate(schedule.startDate, schedule.endDate),
          Number(req.query.month)
        )
      );
      let disableDays: Date[] = [];
      for (let i = 0; i < days.length; i++) {
        for (let j = 0; j < days[i].length; j++) {
          disableDays.push(days[i][j]);
        }
      }
      res.status(200).json(disableDays);
    } else {
      res.status(200).json(null);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(null);
  }
}
