import { createServer } from "http";
import * as dotenv from 'dotenv';
import routesHandler from './routesHandler';

dotenv.config();

const server = createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    routesHandler(request, response);
});


const port = process.env.PORT;

server.listen(port);

export default server;
