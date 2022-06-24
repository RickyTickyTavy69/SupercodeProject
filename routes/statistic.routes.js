import Router from "express";
import StatisticController from "../controllers/statistic-controller.js";
const router = Router();

router.post("/createStatistic", StatisticController.createStat);

router.post("/saveStatistic", StatisticController.saveStat);

router.post("/getStatistics", StatisticController.getStat);

export default router;
