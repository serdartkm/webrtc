import { useState, useEffect } from 'preact/hooks';

export default function PusherSignaling({ currentUser, roomId }) {
	const [message, setMessage] = useState(null);
	const [error,setError]=useState(null);
	useEffect(() => {
		if (currentUser) {
			currentUser.subscribeToRoomMultipart({
				roomId,
				hooks: {
					onMessage: m => {
						debugger
						setMessage(m.parts[0].payload.content);
					
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
				.then(response => {
				
				})
				.catch(e => {
					setError(e);
				
				});
		}
	}
	useEffect(()=>{
		if(message){
			debugger
		}
	},[message])
	return { message, sendMessage,error };
	
}
