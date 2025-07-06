import TrainsController from "../controller/trainsController.js";
import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/addTrain", verifyToken, verifyAdmin, TrainsController.createTrainController);
router.get("/allTrains", TrainsController.getAllTrainsController);
router.get("/getTrain/:train_id", TrainsController.getTrainByIdController);
router.get("/getAllTrainsBySourceAndDestination", TrainsController.getTrainBySourceAndDestinationController);

export default router;