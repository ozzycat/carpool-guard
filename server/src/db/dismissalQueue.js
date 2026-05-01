import crypto from "crypto";

let dismissalQueue = [];

export function addToQueue(plate, info = {}) {
    const existing = dismissalQueue.find(c => c.plate === plate);
        if (existing) {
            existing.timestamp = Date.now();
            return existing;
        }

    const entry = {
        id: crypto.randomUUID(),
        plate,
        timestamp: Date.now(),
        position: dismissalQueue.length + 1,

        // merge car info
        isAuthorized: info.authorized ?? false,
        make: info.make ?? "",
        model: info.model ?? "",
        color: info.color ?? "",
        drivers: info.drivers ?? [],
        students: info.students ?? []
    };

    dismissalQueue.push(entry);
    return entry;
}

export function dismissCar(id) {
        dismissalQueue = dismissalQueue.filter(c => c.id !== id);

        dismissalQueue = dismissalQueue.map((c, index) => ({
        ...c,
        position: index + 1
    }));
}

export function getQueue() {
    return dismissalQueue;
}
