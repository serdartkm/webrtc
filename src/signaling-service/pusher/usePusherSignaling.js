import { useState, useEffect } from 'preact/hooks';

export default function PusherSignaling({ currentUser, roomId, target,name }) {
	const [message, setMessage] = useState(null);
	const [error,setError]=useState(null);
	useEffect(() => {
		if (currentUser) {
			currentUser.subscribeToRoomMultipart({
				roomId,
				hooks: {
					onMessage: m => {
						const msg =JSON.parse(m.parts[0].payload.content);
						if (msg.target ===name){
							setMessage(msg);
						}
						
					
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
					text: JSON.stringify( msg),
					roomId: currentUser.rooms[0].id
				})
				.then(response => {
				
				})
				.catch(e => {
					setError(e);
				
				});
		}
	}

	return { message, sendMessage,error };
	
}
