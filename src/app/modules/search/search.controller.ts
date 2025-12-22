import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import * as SearchService from "./search.service";

export const globalSearch = catchAsync(async (req: Request, res: Response) => {
  const user = req.user as any;
  const { q } = req.query;

  const result = await SearchService.globalSearch(user.userId, q as string);

  res.json({ success: true, data: result });
});
