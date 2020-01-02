import { useState ,useEffect } from 'preact/hooks';

export default function useRemoteState ({ localOffer,localAnswer,localCandidate,localDecline,localClose,name,target, message, sendMessage }){
	const [remoteOffer, setRemoteOffer]=useState(null);
	const [remoteAnswer,setRemoteAnswer]=useState(null);
	const [remoteCandidate,setRemoteCandidate]=useState(null);
	const [remoteClose,setRemoteClose]=useState(false);

	useEffect(() => {
		if (message){
		
			debugger
			const { target, sdp,type } = JSON.parse(message);
			if (target === name) {

				if (type === 'offer') {
					setRemoteOffer(sdp);
					debugger
					console.log("name", name);
					console.log("target",target);
				
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
	},[message]);
	useEffect(() => {
		if (!localAnswer && !localAnswer && !localCandidate){
			resetState();
		}
	},[localOffer,localCandidate,localAnswer]);

	useEffect(() => {
		if (localOffer) {
			const offer = { sdp: localOffer, name, target, type: 'offer' };
			sendMessage(JSON.stringify(offer));
			debugger;
		}
	
	}, [localOffer]);
    
	useEffect(() => {
		if (localAnswer) {
			const answer = { sdp: localAnswer, name, target,type: 'answer'  };
			sendMessage(JSON.stringify(answer));
			debugger;
		}
	
	}, [localAnswer]);

	useEffect(() => {
		if (localCandidate) {
			const candidate = {
				sdp: localCandidate,
				name,
				target,
				type: 'candidate'
			};
			
			sendMessage(JSON.stringify(candidate));
		}
	}, [localCandidate]);

	useEffect(() => {
		if (localClose) {
			const close = { name, target,type: 'close'  };
			sendMessage(JSON.stringify(close));
			resetState();
		}
	},[localClose]);

	useEffect(() => {
		if (localDecline){
			const decline = { name, target,type: 'decline'  };
			sendMessage(JSON.stringify(decline));
			resetState();
		}
	},[localDecline]);

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