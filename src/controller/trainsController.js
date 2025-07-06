import TrainsService from "../service/trainsService.js";

class TrainsController {
    static createTrainController = async (req, res) => {
        try {
            const trainData = req.body;
            const newTrain = await TrainsService.createTrainService(trainData);
            res.status(201).json(newTrain);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static getAllTrainsController = async (req, res) => {
        try {
            const trains = await TrainsService.getAllTrainsService();
            res.status(200).json(trains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static getTrainByIdController = async (req, res) => {
        try {
            const { train_id } = req.params;
            const train = await TrainsService.getTrainByIdService(train_id);
            if (!train) {
                return res.status(404).json({ error: "Train not found" });
            }
            res.status(200).json(train);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static getTrainBySourceAndDestinationController = async (req, res) => {
        try {
            const { source, destination } = req.query;
            if (!source || !destination) {
                return res.status(400).json({ error: "Source and destination are required" });
            }
            const trains = await TrainsService.getTrainBySourceAndDestinationService(source, destination);
            res.status(200).json(trains);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default TrainsController;