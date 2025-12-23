import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { formatFileSize } from "../../utils/fileSize";
import * as DashboardService from "./dashboard.service";

export const getStorageOverview = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as any;

    const data = await DashboardService.getStorageOverview(user.userId);

    res.json({
      success: true,
      data: {
        total: formatFileSize(data.total),
        used: formatFileSize(data.used),
        available: formatFileSize(data.available),
      },
    });
  }
);

export const getDashboardSummary = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as any;

    const summary = await DashboardService.getDashboardSummary(user.userId);

    res.json({
      success: true,
      data: {
        folders: summary.folders.count,
        notes: summary.notes.count,
        images: {
          count: summary.images.count,
          size: formatFileSize(summary.images.size),
        },
        pdfs: {
          count: summary.pdfs.count,
          size: formatFileSize(summary.pdfs.size),
        },
      },
    });
  }
);

export const getRecentItems = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.user as any;

    const items = await DashboardService.getRecentItems(user.userId);

    res.json({
      success: true,
      data: items,
    });
  }
);
