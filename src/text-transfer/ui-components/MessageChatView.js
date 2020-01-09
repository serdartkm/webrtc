import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './style.css';
export default function MessagingChatView ({ messageRecieved,sendMessage, state, initiateOffer }){
	const { connectionState }=state;
	const [message,setMessage] =useState(null);
	const [messages,setMessages]= useState([]);
	const [ready,setReady]=useState(false);
	useEffect(() => {
		if (messageRecieved){
			setMessages(prev => [...prev,messageRecieved]);
		}
	},[messageRecieved]);

	useEffect(() => {
		if (message){
			if (message.length>0 && connectionState==='connected'){
				setReady(true);
			}
			else {
				setReady(false);
			}
		}
	},[message,state]);
	function handleChange (e) {
		initiateOffer();
		setMessage((prev) => {
			if (prev.length < 100)
				e.target.value;
		});
	}
	return (<div className="root">
		<div className="message-container">{messages && messages.map((m) => <div className="message">{m.sender}: {m.message}</div>)}</div>
		<div className="controls">
			<input onInput={handleChange} value={message} type="text" placeholder="Enter message" />
			<button disabled={!ready} onClick={sendMessage}>Send</button>
		</div>
	</div>);
    
}