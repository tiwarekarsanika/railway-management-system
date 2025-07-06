import TrainsRepository from "../repository/trainsRepository.js";
import BookingRepository from "../repository/bookingsRepository.js";
import TrainStationsRepository from "../repository/trainStationsRepository.js";

class TrainsService {
    static createTrainService = async (trainData, stationMappings) => {
        const createdTrain = await TrainsRepository.createTrain(trainData);

        const updatedMappings = stationMappings.map((station) => ({
            ...station,
            train_code: createdTrain.train_code,
        }));
        // console.log("Updated Mappings:", updatedMappings);
        const insertedStations = await TrainStationsRepository.createTrainStationMapping(updatedMappings);
        // console.log("Inserted Stations:", insertedStations);
        // console.log("Created Train:", createdTrain);
        return {
            train: createdTrain,
            stations_added: insertedStations.length
        };
    }

    static getAllTrainsService = async () => {
        return TrainsRepository.getAllTrains();
    }

    static getTrainByIdService = async (train_id) => {
        return TrainsRepository.getTrainById(train_id);
    }

    static getTrainBySourceAndDestinationService = async (source, destination) => {
        const allTrains = await TrainsRepository.getTrainBySourceAndDestination(source, destination);
        const trainsWithDetails = [];

        for (const train of allTrains) {
            const bookings = await BookingRepository.getAllBookingsForATrainId(train.train_id);

            const bookedSeats = bookings.reduce((total, booking) => {
                return total + (booking.number_of_seats || 0);
            }, 0);

            const available_seats = train.total_seats - bookedSeats;

            if (available_seats > 0) {
                train.available_seats = available_seats;
                const stations = await TrainStationsRepository.getAllTrainStationsByTrainId(train.train_code);
                train.stations = stations;
                trainsWithDetails.push(train);
            }
        }

        return trainsWithDetails;
    }
}

export default TrainsService;
