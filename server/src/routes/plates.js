export default async function (app) {
    app.get("/", async () => {
        return [
            {
                plate: "TEST123",
                confidence: 99.0,
                timestamp: new Date().toISOString(),
                camera_id: "mock-camera"
            }
        ];
    });

    app.post("/", async (req) => {
        const { plate, confidence, timestamp, camera_id } = req.body;
        // TODO: insert into DB
        return { status: 'received', plate, confidence, timestamp, camera_id };
    });
}