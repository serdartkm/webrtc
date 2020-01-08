import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
export default function MessagingChatView ({ messageRecieved,sendMessage, state, initiateOffer }){
	const [message,setMessage] =useState(null);
	const [messages,setMessages]= useState([]);

	useEffect(() => {
		if (messageRecieved){
			setMessages(prev => [...prev,messageRecieved]);
		}
	},[messageRecieved]);

	function handleChange (e) {
		initiateOffer();
		setMessage(e.target.value);
	}
	return (<div>
		<div>{messages && messages.map((m) => <div>{m.sender}: {m.message}</div>)}</div>
		<input onInput={handleChange} value={message} type="text" placeholder="Enter message" />
		<button onClick={sendMessage}>Send</button>
	</div>);
    
}