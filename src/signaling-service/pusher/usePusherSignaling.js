import { useState ,useEffect } from 'preact/hooks';

export default function usePusherSignaling ({ localOffer,localAnswer,localCandidate,localDecline,localClose,targetId,currentUser,roomId }){
	const [remoteOffer, setRemoteOffer]=useState(null);
	const [remoteAnswer,setRemoteAnswer]=useState(null);
	const [remoteCandidate,setRemoteCandidate]=useState(null);
	const [remoteClose,setRemoteClose]=useState(false);


	useEffect(() => {
		if (!localAnswer && !localAnswer && !localCandidate){
			resetState();
		}
	},[localOffer,localCandidate,localAnswer]);

	useEffect(() => {
		if (localOffer) {
			const offer = { sdp: localOffer, userId: currentUser.id, targetId, type: 'offer' };
			sendMessage(JSON.stringify(offer));
		}
	
	}, [localOffer]);
    
	useEffect(() => {
		if (localAnswer) {
			const answer = { sdp: localAnswer, userId: currentUser.id, targetId,type: 'answer'  };
			sendMessage(JSON.stringify(answer));
		
		}
	
	}, [localAnswer]);


	useEffect(() => {
		if (localCandidate) {
			const candidate = {
				sdp: localCandidate,
				userId: currentUser.id,
				targetId,
				type: 'candidate'
			};
			
			sendMessage(JSON.stringify(candidate));
		}
	}, [localCandidate]);

	useEffect(() => {
	
		if (localClose) {
			const close = { userId: currentUser.id, targetId,type: 'close'  };
			sendMessage(JSON.stringify(close));
			resetState();
		}

	},[localClose]);

	useEffect(() => {

		if (localDecline){
			const decline = { userId: currentUser.id, targetId,type: 'decline'  };
			sendMessage(JSON.stringify(decline));
			resetState();
		}

	},[localDecline]);

	useEffect(() => {
		if (currentUser) {
			currentUser.subscribeToRoomMultipart({
				roomId,
				hooks: {
					onMessage: message => {
						const { targetId, sdp,type } = JSON.parse(
							message.parts[0].payload.content
						);
						if (targetId === currentUser.id) {
							if (type === 'offer') {
							
								setRemoteOffer(sdp);
							
							}
							else if (type === 'answer') {
							
								setRemoteAnswer(sdp);
							}
							else if (type === 'candidate') {
								setRemoteCandidate(sdp);
							}
							else if (type ==='close'){
								setRemoteClose(true);
								resetState();
							}
							else if (type ==='decline'){
								setRemoteClose(true);
								resetState();
							}
						}
					}
				},
				messageLimit: 0
			});
		}
	}, [currentUser]);
	useEffect(() => {
	
	},[remoteClose]);
	function sendMessage(msg) {
	
		if (msg !== null && msg !== undefined) {
	  	currentUser.sendSimpleMessage({
				text: msg,
				roomId: currentUser.rooms[0].id
			}).then((response) => {
				
			}).catch((e) => {
			
			});

		}
	}
	function resetState (){
		setTimeout(() => {
			setRemoteAnswer(null);
			setRemoteOffer(null);
			setRemoteCandidate(null);
			setRemoteClose(false);
		},0);
	}
	return { remoteAnswer,remoteOffer,remoteCandidate, remoteClose };
}