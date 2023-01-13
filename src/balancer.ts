import { cpus } from 'os';
import cluster from 'cluster';
import * as dotenv from 'dotenv';
import server from "./server";

dotenv.config();
const coresCount = cpus().length;
let port = process.env.PORT;


if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running, port ${port}`);

    // Fork workers.
    for (let i = 0; i < coresCount; i++) {
        cluster.fork({ PORT: parseInt(port) + 1 + i });
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });

    cluster.on("message", (worker, message) => {
        console.log(message);
        worker.send(message);
    })
} else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    server.listen(port);

    console.log(`Worker ${process.pid} started, port ${port}`);
}