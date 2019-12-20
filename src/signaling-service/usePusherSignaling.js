import { h } from 'preact';
import { useEffect,useState } from 'preact/hooks';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';


export default function usePuherSignaling (pusherConfig){
	const { instanceLocator,userId,url,roomId } =pusherConfig;
	const [chatManager,setChatManager]= useState(null);
	const [currentUser,setCurrentUser]=useState(null);
	const [error,setError]=useState(null);
	const [message,setMessage]= useState(null);

	useEffect(() => {

		setChatManager(new ChatManager({
			instanceLocator,
			userId,
			tokenProvider: new TokenProvider({ url })
		}));
	},[]);

	useEffect(() => {
		if (chatManager){
			chatManager.connect()
				.then(cUser => {
					setCurrentUser(cUser);
					cUser.subscribeToRoomMultipart({
						roomId,
						hooks: {
						  onMessage: message => {
								setMessage(message);
						  },
						  messageLimit: 0
						} });
				})
				.catch(err => {
					setError(err);
				});
		}
	},[chatManager]);

	function sendMessage (msg){
		currentUser.sendSimpleMessage({
			text: msg,
			roomId: currentUser.rooms[0].id
		  });
	}
	return { error,currentUser,sendMessage,message };
}

