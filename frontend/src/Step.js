import React, { useEffect, useState } from 'react';

import { setStep, setUsername } from './state/slices/dataSlice.ts';
import { useAppDispatch } from './state/hooks.ts';
import { useAppSelector } from './state/hooks.ts';
import { setRoom } from './state/slices/dataSlice.ts';


const stepHeader = (step) => {
	switch (step) {
		case 0:
			return 'Please type you nickname';
		case 1:
			return 'Create or join a room?';
		default:
			break;
	}
};

//creates an unique room id
function generateRoomId() {
	return (
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15)
	);
}

export const Step = ({ socket }) => {
    const dispatch = useAppDispatch();
    const step = useAppSelector(state => state.data.step);
    const username = useAppSelector(state => state.data.username);
    const room = useAppSelector(state => state.data.room);    
    const [usernameVar, setUsernameVar] = useState('');
    const [roomVar, setRoomVar] = useState('');

    const joinRoom = () => {
        if (username !== '' && roomVar !== '') {
            console.log(roomVar)
            dispatch(setRoom(roomVar))
            socket.emit('join_room', { room: roomVar, username });
		}
	};

	const createRoom = () => {
		if (username !== '') {
			const newRoom = generateRoomId();
			dispatch(setRoom(newRoom));
            socket.emit('join_room',{ room: newRoom, username } );
		}
	};


	return (
		<div className="step-container">
			<div className="step-header">
				<h3>{stepHeader(step)}</h3>
			</div>
			<div className="step-body">
                {step === 0 && (
                    <>
                        <input
                            type="text"
                            defaultValue={usernameVar}
                            placeholder={'Enter username here'}
                            onChange={(event) => {
                                setUsernameVar(event.target.value);
                            }}
                        />
                        <button onClick={() => {
                            dispatch(setStep(1));
                            dispatch(setUsername(usernameVar));
                        }
                        }>Next</button>
                    </>
                )}
                {step === 1 &&
                    <div className="App-header">
                        <div className="joinChatContainer">
                        <h3>Join A Chat</h3>
                        <input
                            type="text"
                            placeholder="Room ID..."
                            onChange={(event) => {
                                setRoomVar(event.target.value);
                            }}
                        />
                        <button onClick={joinRoom}>Join A Room</button>
                    </div>
                    <div className="joinChatContainer">
                        <h3>Create A Chat</h3>
                        <button onClick={createRoom}>Join A Room</button>
                    </div>
                </div>
                }
			</div>
		</div>
	);
};