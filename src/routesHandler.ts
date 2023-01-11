import {sendResponse} from "./helpers";
import { IncomingMessage, ServerResponse } from 'node:http';
import { controller } from './controller';

const RoutesHandler = (request: IncomingMessage, response: ServerResponse) => {
    const { url, method, headers } = request;
    const { pathname } = new URL(url!, `https://${headers.host}`);

    if (pathname === '/api/users' && method === 'GET') {
        controller.getAllUsers(response)
    } else if (pathname.startsWith('/api/users/') && method === 'GET') {


        console.log('get user req');


    } else if (pathname === "/api/users" && method === "POST") {
       controller.createUser(request, response)
    } else if (pathname.startsWith('/api/users/') && method === 'PUT') {


        console.log('put user');


    } else if (pathname.startsWith('/api/users/') && method === 'DELETE') {


        console.log('delete user');


    } else {
        sendResponse(response, 500,'Not found');
    }
}

export default RoutesHandler;