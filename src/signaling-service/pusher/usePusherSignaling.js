import { useState, useEffect } from 'preact/hooks';

export default function PusherSignaling({ currentUser, roomId, target,name }) {
	const [message, setMessage] = useState(null);
	const [error,setError]=useState(null);
	const [partialMessage,setPartialMessage]= useState(null);
	const [messages,setMessages]= useState([]);
	useEffect(() => {
		if (currentUser) {
			currentUser.subscribeToRoomMultipart({
				roomId,
				hooks: {
					onMessage: m => {
						const msg =JSON.parse(m.parts[0].payload.content);
						
						if (msg.target ===name){
							if (msg.type==='offer' || msg.type==='answer'){
								setPartialMessage(msg);
							}
							else {
								setMessage(msg.msg);
							}
						}
					}
				},
				messageLimit: 0
			});
		}
	}, [currentUser]);

	useEffect(() => {
		if (partialMessage){
		
			if (messages.length===0){
				setMessages([partialMessage]);
			
			}
			else {
				const msg =messages.find( element => element.id===partialMessage.id);
				let fullContent =null;
			
				if (msg === undefined){
					setMessages(prev => [...prev,partialMessage]);
				}
				else
				if (msg.order==='first'){
					fullContent =  msg.content+partialMessage.content;
				}
				else {
					fullContent =  partialMessage.content+msg.content;
				}
				//	console.log('fullContent', fullContent);
				setMessages(prev => [...prev.filter(e => e.id ===partialMessage.id)]) ;
				setMessage({ sdp: JSON.parse(fullContent), type: msg.type });
			}
		}
	},[partialMessage]);
	useEffect(() => {
		if (messages.length>0){
		
		}
	},[messages]);
	function sendMessage(msg) {
		if (msg !== null && msg !== undefined && (msg.type ==='offer' || msg.type==='answer')) {
		
			
			const fullContent = JSON.stringify(msg);
			const id = new Date().getTime();
			const fisrtPart = { content: fullContent.substring(0,(fullContent.length /2)), id, order: 'first', target,name, type: msg.type };
			const secondPart ={ content: fullContent.substring((fullContent.length/2)), id,order: 'second',target,name, type: msg.type };

	
			currentUser
				.sendSimpleMessage({
					text: JSON.stringify( fisrtPart),
					roomId: currentUser.rooms[0].id
				})
				.then(response => currentUser.sendSimpleMessage({
					text: JSON.stringify( secondPart),
					roomId: currentUser.rooms[0].id
				})
				)
				.catch(e => {
					setError(e);
				});
		}
		else {
	
			currentUser
				.sendSimpleMessage({
					text: JSON.stringify({ msg,target,name }),
					roomId: currentUser.rooms[0].id
				})
				.catch(e => {
					setError(e);
				});
		}
		
	}

	return { message, sendMessage,error };
	
}
