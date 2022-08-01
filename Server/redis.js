import { createClient } from 'redis';

const client = createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

//When user create a new room, we persit the room name in redis along with the user name
export const createRoom = async (room, user, roomName) => {
    const roomObj = {
        room: room,
        name: roomName,
        users: [user]
    }
    await client.set(room, roomObj);
}

export const joinRoom = async (room, user) => {
    const roomObj = await client.get(room);
    if (roomObj) {
        const users = roomObj.users;
        users.push(user);

await client.set('key', 'value');
const value = await client.get('key');