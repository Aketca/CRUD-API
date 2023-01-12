interface User {
    id: string,
    username: string,
    age: number,
    hobbies: string[] | string | [],
}

export const users: User[] = [
    {
        id: '1',
        username: 'test',
        age: 12,
        hobbies: ['asdasd', 'asdasd']
    }
];