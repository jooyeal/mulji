import type { NextApiRequest, NextApiResponse } from "next";
import {
  createCurrentDates,
  dateFormatToKr,
  deleteDuplication,
  getAmongDate,
} from "../../utils/dateHelper";
import prisma from "../../utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const currentDate = new Date();
    const month = new Date(
      `${currentDate.getFullYear()}-${Number(req.query.month)}`
    );
    const nextMonth =
      req.query.month === "12"
        ? new Date(`${Number(currentDate.getFullYear()) + 1}-1`)
        : new Date(
            `${currentDate.getFullYear()}-${Number(req.query.month) + 1}`
          );
    const allUserSchedules = await prisma.schedules.findMany({
      where: {
        startDate: {
          gte: month,
          lt: nextMonth,
        },
      },
    });

    if (allUserSchedules.length !== 0) {
      const days = allUserSchedules.map((schedule) =>
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
      res.status(200).json(deleteDuplication(disableDays));
    } else {
      res.status(200).json(null);
    }
  } catch (e) {
    console.log(e);
    res.status(500).json(e);
  }
}
