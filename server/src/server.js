import './config/env.js';

import Fastify from "fastify";
import fastifyWebsocket from "@fastify/websocket";
import cors from "@fastify/cors";
import { spawn } from "child_process";

// import db modules
import { getLiveCars, addCar } from "./db/liveCars.js";
import { getCarInfo } from "./db/carInfo.js";
import { getQueue, addToQueue } from "./db/dismissalQueue.js";
import { startDismissal, stopDismissal, isDismissalActive } from "./db/dismissalState.js";

// testing module
import { testConnection } from "./db/testDB.js"

const app = Fastify({ logger: true});

let pythonProcess = null;

// enable websocket
app.register(fastifyWebsocket);
const clients = new Set();

// register CORS so it can access the port for the python script
// must be registered before the websocket is made because it affects routing
await app.register(cors, {
  origin: "*", // or "http://localhost:5173" if you want to be strict
});

// create websocket endpoint for React to connect to
app.get("/ws", { websocket: true }, (socket, req) => {
  app.log.info("React client connected");

  socket.send(JSON.stringify({
    type: "initial",
    queue: getQueue()
  }));

  socket.on("close", () => {
    app.log.info("Client disconnected");
  });
});


app.post("/api/start-dismissal", (request, reply) => {
    try {
        if (pythonProcess) {
            return reply.code(400).send({ message: "Dismissal process already running" });
        }

        // set dismissal state in memory
        startDismissal();

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

    // set dismissal state in memory
    stopDismissal();

    return reply.send({ message: "Dismissal stopped" });
});

app.get("/api/dismissal-status", (request, reply) => {
    return reply.send({ active: isDismissalActive() });
});


// endpoint for LPR script
app.post("/api/plates", async (request, reply) => {
    const { plate } = request.body;

    if (!plate) {
        return reply.code(400).send({ error: "License plate is required" });
    }

    // update in memory list
    addCar(plate);

    // look up db information
    const info = await getCarInfo(plate);

    // update the dismissal queue
    const queueEntry = addToQueue(plate, info);

    for (const client of clients) {
        client.send(JSON.stringify({
            type: "queue_update",
            queue: getQueue()
        }));
    }
    
    return { status: "ok" };
});

// allow React to fetch current queue on page load
app.get("/api/queue", async (request, reply) => {
    return reply.send(getQueue());
});

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