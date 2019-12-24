import { h } from 'preact';
import { useState,useEffect } from 'preact/hooks';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
export default function usePusher (config){
	const { instanceLocator,userId,url } =config;
	const [chatManager,setChatManager] =useState(null);
	const [currentUser,setCurrentUser]=useState(null);
	const [error,setError] =useState(null);

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
				
				})
				.catch(err => {
					setError(err);
					console.log("pusher error",error);
				
				});
		}
	},[chatManager]);
	return { currentUser,error };
}