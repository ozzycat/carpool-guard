// used to maintain live list of cars after they've been scanned in

let liveCars = [];

export function getLiveCars() {
    return liveCars;
}

export function addCar(plate) {
    const entry = {
        plate,
        timestamp: Date.now()
    };

    liveCars.push(entry);
    return entry;
}

export function clearCars() {
    liveCars = [];
}