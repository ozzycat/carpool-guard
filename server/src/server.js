import Fastify from "fastify";
import platesRoutes from "./routes/plates.js";

const app = Fastify({ logger: true});

app.register(platesRoutes, { prefix: "/api/plates"});

app.listen({ port: 8000}, (err, address) => {
    if (err) {
        app.log.error(err);
        process.exit(1);
    }

    app.log.info(`Server running at ${address}`);
});