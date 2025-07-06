import TrainsRepository from "../repository/trainsRepository.js";
import BookingRepository from "../repository/bookingsRepository.js";

class TrainsService {
    static createTrainService = async (trainData) => {
        return TrainsRepository.createTrain(trainData);
    }

    static getAllTrainsService = async () => {
        return TrainsRepository.getAllTrains();
    }

    static getTrainByIdService = async (train_id) => {
        return TrainsRepository.getTrainById(train_id);
    }

    static getTrainBySourceAndDestinationService = async (source, destination) => {
        const allTrains = await TrainsRepository.getTrainBySourceAndDestination(source, destination);
        const trainsWithSeats = [];

        for (const train of allTrains) {
            const bookings = await BookingRepository.getAllBookingsForATrainId(train.train_id);
            
            const bookedSeats = bookings.reduce((total, booking) => {
                return total + (booking.number_of_seats || 0);
            }, 0);

            const available_seats = train.total_seats - bookedSeats;

            if (available_seats > 0) {
                train.available_seats = available_seats;
                trainsWithSeats.push(train);
            }
        }

        return trainsWithSeats;
    }
}

export default TrainsService;
