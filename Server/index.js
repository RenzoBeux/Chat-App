'use strict';

const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');

const { Server } = require('socket.io');
const { v4: uuidv4 } = require('uuid');

const { clear, updateIpAddress } = require('duckdns');

const { networkInterfaces } = require('os');

const ip = Object.values(networkInterfaces())
	.flat()
	.find((i) => i.family == 'IPv4' && !i.internal).address;

(async function () {
	const res = await updateIpAddress(
		ip,
		'rbchat.duckdns.org',
		'ce7ff3d8-96e8-4f98-b91c-ca3566aade10'
	);
	console.log(res);
})();

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: 'http://localhost:3000',
		method: ['GET', 'POST', 'PUT', 'DELETE'],
	},
});

const generateRoomID = () => uuidv4();

io.on('connection', (socket) => {

	socket.on('createRoom', async (data) => {
		const roomObj = {
			room: generateRoomID(),
			name: data.roomName,
			users: [user],
		};
	})

	socket.on('join_room', (data) => {
		socket.join(data.room);

		//Tells everyone else the user joined
		socket.broadcast
			.to(data)
			.emit('user_joined', { username: data.username });

		console.log(`${socket.id} joined ${data}`);
	});

	socket.on('leave_room', (data) => {
		socket.leave(data);
		console.log(`${socket.id} leaved ${data}`);
	});

	socket.on('send_message', (data) => {
		socket.to(data.room).emit('receive_message', data);
	});

	socket.on('disconnect', () => {
		console.log('user disconnected', socket.id);
	});
});

server.listen(3001, () => {
	console.log('Server is running on port 3000');
});
