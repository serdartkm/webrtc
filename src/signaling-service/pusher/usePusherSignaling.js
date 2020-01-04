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
						
							setPartialMessage(msg);
						}
					}
				},
				messageLimit: 0
			});
		}
	}, [currentUser]);
	useEffect(() => {
		if (message){
			debugger;
		}
	},[message]);
	useEffect(() => {
		if (partialMessage){
		
			if (messages.length===0){
				setMessages([partialMessage]);
				debugger ;
			}
			else {
				const msg =messages.find( element => element.id===partialMessage.id);
				let fullContent =null;
				debugger;
				if(msg === undefined){
					setMessages(prev => [...prev,partialMessage]);
					debugger
				}
				if (msg.order==='first'){
					fullContent =  msg.content + partialMessage.content;
					debugger
				}
				else {
					debugger
					fullContent =  partialMessage.content + msg.content;
				}
				setMessages(prev => [...prev.filter(e => e.id ===partialMessage.id)]) ;
				setMessage(fullContent);
			}
		}
	},[partialMessage]);
	useEffect(()=>{
		if(messages.length>0){
			debugger;
		}
	},[messages])
	function sendMessage(msg) {
		if (msg !== null && msg !== undefined) {
			const fullContent = JSON.stringify(msg);
			const id = new Date().getTime();
			const fisrtPart = { content: fullContent.substring(0,(fullContent.length /2)), id, order: 'first', target,name };
			const secondPart ={ content: fullContent.substring((fullContent.length/2)), id,order: 'second',target,name };
			currentUser
				.sendSimpleMessage({
					text: JSON.stringify( fisrtPart),
					roomId: currentUser.rooms[0].id
				})
				.then(response => {
				
					currentUser.sendSimpleMessage({
						text: JSON.stringify( secondPart),
						roomId: currentUser.rooms[0].id
					});
				}
				)
				.catch(e => {
					setError(e);
				});
		}
	}

	return { message, sendMessage,error };
	
}
