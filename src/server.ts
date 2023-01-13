import {createServer} from "http";
import routesHandler from "./routesHandler";

const server = createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Content-Type", "application/json");
    routesHandler(request, response);
});

export default server;