import { ServerResponse, IncomingMessage } from "http";
import {sendResponse, parseData} from "./helpers";
import {v4 as uuidv4} from "uuid";
import {users} from "./dumbDB";

export class Controller {
    getAllUsers(response: ServerResponse) {
        sendResponse(response, 200, users)
    }
    getUser() {

    }
    async createUser(request: IncomingMessage, response: ServerResponse) {
        try {
            let body: any = await parseData(request, response);
            const isDataCorrect = body.hasOwnProperty("username") && body.hasOwnProperty("age") && body.hasOwnProperty("hobbies");
            if (isDataCorrect) {
                const user = {
                    id: uuidv4(),
                    username: body.username,
                    age: body.age,
                    hobbies: body.hobbies,
                };
                users.push(user);
                sendResponse(response, 201, user);
            } else {
                sendResponse(response, 500,'Incorrect data given');
            }
        } catch {
            sendResponse(response, 500,'Error on create user step');
        }
    }
    updateUser() {

    }
    deleteUser() {

    }
}

export const controller = new Controller()