import Express from "express";

import { prismaClient } from "../../../db";

const router = Express.Router();

router.get("/upcoming", async (req, res) => {
  const contests = await prismaClient.contest.findMany({
    where: {
      hidden: false,
      endTime: {
        gt: new Date(),
      },
    },
  });
  res.json({ contests });
});

router.get("/past", async (req, res) => {
  // limit to 10 contests
  const contests = await prismaClient.contest.findMany({
    where: {
      hidden: false,
      endTime: {
        lt: new Date(),
      },
    },
    take: 10,
  });
  res.json({ contests });
});

export default router;
