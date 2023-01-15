import { cpus } from 'os';
import cluster from 'cluster';
import * as dotenv from 'dotenv';
import server from "./server";
import * as http from "http";
import {users} from "./dumbDB";

dotenv.config();
const coresCount = cpus().length;
let port = process.env.PORT;

let currPort = parseInt(port) + 1;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running, port ${port}`);

    // Create an HTTP tunneling proxy
    http.createServer((request, response) => {
        let options = {
            hostname: 'localhost',
            port: currPort,
            path: request.url,
            method: request.method,
            headers: request.headers
        };

        let proxy = http.request(options, function (res) {
            response.writeHead(res.statusCode, res.headers)
            res.pipe(response, {
                end: true
            });

            if (currPort === parseInt(port) + coresCount) {
                currPort = parseInt(port) + 1;
            } else {
                currPort = currPort + 1;
            }
        });

        request.pipe(proxy, {
            end: true
        });
    }).listen(port);


    // Fork workers.
    for (let i = 0; i < coresCount; i++) {
        cluster.fork({
            PORT: parseInt(port) + 1 + i,
            CLUSTER_MODE: true
        });
    }


    function messageHandler(msg) {
        for (let i in cluster.workers) {
            if (cluster.workers[i].process.pid === msg.pid) {
                if (msg.msg === 'getAllUsers') {
                    cluster.workers[i].process.send({database: users});
                }
                if (msg.msg === 'createUser') {
                    users.push(msg.addedUser)
                }
                if (msg.msg === 'updateAllDb') {
                    users.splice(0, users.length, ...msg.db);
                }

            }
        }
    }


    for (const id in cluster.workers) {
        cluster.workers[id].on('message', messageHandler);
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });


} else {
    server.listen(port);
    console.log(`Worker ${process.pid} started, port ${port}`);
}