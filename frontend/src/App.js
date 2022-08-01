import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';
import { Step } from './Step';
import { useAppSelector } from './state/hooks.ts';


const socket = io.connect('http://rbchat.duckdns.org:3001');

function App() {
	const username = useAppSelector(state => state.data.username);
	const room = useAppSelector(state => state.data.room);
	const [showChat, setShowChat] = useState(false);

	const closeRoom = () => {
		socket.emit('leave_room', room);
		setShowChat(false);
	};

	return (
		<div className="App">
			<div className="App">
				{!room ? (
					<Step socket={ socket } />
				) : (
					<Chat
						socket={socket}
						username={username}
						room={room}
						closeFn={closeRoom}
					/>
				)}
			</div>
		</div>
	);
}

export default App;
