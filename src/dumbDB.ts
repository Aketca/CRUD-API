export interface User {
    id?: string,
    username: string,
    age: number,
    hobbies: string[] | string | [],
}

export const users: User[] = [];