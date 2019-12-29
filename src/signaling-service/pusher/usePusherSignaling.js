import { useState, useEffect } from 'preact/hooks';

export default function PusherSignaling({ currentUser, roomId }) {
	const [message, setMessage] = useState(null);
	const [error,setError]=useState(null);
	useEffect(() => {
		if (currentUser) {
			currentUser.subscribeToRoomMultipart({
				roomId,
				hooks: {
					onMessage: message => {
					
						setMessage(message.parts[0].payload.content);
					}
				},
				messageLimit: 0
			});
		}
	}, [currentUser]);

	function sendMessage(msg) {
		if (msg !== null && msg !== undefined) {
			currentUser
				.sendSimpleMessage({
					text: msg,
					roomId: currentUser.rooms[0].id
				})
				.then(response => {})
				.catch(e => {
					setError(e);
				});
		}
	}

	return { message, sendMessage,error };
	

}
