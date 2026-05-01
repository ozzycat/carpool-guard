import './config/env.js';

import Fastify from "fastify";
import fastifyWebsocket from "@fastify/websocket";
import cors from "@fastify/cors";
import { spawn } from "child_process";

// import db modules
import { getLiveCars, addCar } from "./db/liveCars.js";
import { getCarInfo } from "./db/carInfo.js";
// testing module
import { testConnection } from "./db/testDB.js"

const app = Fastify({ logger: true});

let pythonProcess = null;

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

await app.register(cors, {
  origin: "*", // or "http://localhost:5173" if you want to be strict
});


app.post("/api/start-dismissal", (request, reply) => {
    try {
        if (pythonProcess) {
            return reply.code(400).send({ message: "Dismissal process already running" });
        }

        // spawn process and set up listeners
        pythonProcess = spawn("python", ["python/lpr_service.py"]);

        pythonProcess.stdout.on("data", (data) => {
            app.log.info(`PYTHON: ${data}`);
        });

        pythonProcess.stderr.on("data", (data) => {
            console.error(`PYTHON ERROR`, data.toString());
        });

        pythonProcess.on("close", (code) => {
            console.log(`Python process exited with code ${code}`);
            pythonProcess = null;
        });

        return reply.send({message: "Dismissal started"});
    } catch (err) {
        app.log.error(err);
        return reply.code(500).send({error: "Failed to start dismissal"});
    }
});

app.post("/api/stop-dismissal", (request, reply) => {
    if (!pythonProcess) {
        return reply.code(400).send({ message: "No dismissal process running" });
    }

    // kill the child process and clean up the reference
    pythonProcess.kill("SIGTERM");
    pythonProcess = null;

    return reply.send({ message: "Dismissal stopped" });
});

// endpoint for LPR script
app.post("/api/plates", async (request, reply) => {
    const { plate } = request.body;

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
app.listen({ port: 8000 }, async (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }

    testConnection()
        .then(now => {
            app.log.info(`Database connected successfully. Server time: ${now}`);
        })
        .catch(dbErr => {
            console.log("Database connection failed:", dbErr);
            process.exit(1);
        });

    app.log.info(`Server running at ${address}`);
});