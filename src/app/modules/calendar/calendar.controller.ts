import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as CalendarService from "./calendar.service";

export const getCalendarItems = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as any;
    const { date } = req.query;

    const start = new Date(date as string);
    const end = new Date(start);
    end.setHours(23, 59, 59, 999);

    const data = await CalendarService.getCalendarItems(
      user.userId,
      start,
      end
    );

    res.json({
      success: true,
      data,
      empty: data.notes.length === 0 && data.files.length === 0,
    });
  }
);
