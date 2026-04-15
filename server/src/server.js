import Fastify from "fastify";
import fastifyWebsocket from "@fastify/websocket";

// import db modules
import { getLiveCars, addCar } from "./db/liveCars.js";
import { getCarInfo } from "./db/carInfo.js";

const app = Fastify({ logger: true});

// enable websocket
app.register(fastifyWebsocket);

// create websocket endpoint for React to connect to
app.get("/ws", { websocket: true }, (connection, req) => {
    app.log.info("React client connected");

    // grab live car list instantly when React connects
    connection.socket.send(JSON.stringify({
        type: "initial",
        cars: getLiveCars()
    }));
});

// endpoint for LPR script
app.post("/api/plates", async (req, reply) => {
    const { plate } = req.body;

    if (!plate) {
        return reply.code(400).send({ error: "License plate is required" });
    }

    // update in memory list
    const entry = addCar(plate);

    // query database for potential information
    const info = await getCarInfo(plate);

    // broadcast to all connected WebSocket clients
    app.websocketServer.clients.forEach(client => {
        client.send(JSON.stringify({
            type: "new_plate",
            plate: entry,
            info
        }));
    });

    return { status: "ok" };
});

// allow React to fetch current list on page load
app.get("/api/live-cars", async () => getLiveCars());

// start server
app.listen({ port: 8000 }, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }
    app.log.info(`Server running at ${address}`);
});