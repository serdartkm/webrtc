import { useState ,useEffect } from 'preact/hooks';

export default function usePusherSignaling ({ localOffer,localAnswer,localCandidate,targetId,currentUser,roomId }){
	const [remoteOffer, setRemoteOffer]=useState(null);
	const [remoteAnswer,setRemoteAnswer]=useState(null);
	const [remoteCandidate,setRemoteCandidate]=useState(null);
	const [caller,setCaller]=useState(null);
	const [signalingError,setSignalingError] =useState(null);
	useEffect(() => {
		if (localOffer) {
			const offer = { sdp: localOffer, userId: currentUser.id, targetId };
			sendMessage(JSON.stringify(offer));
		}
	}, [localOffer]);
    
	useEffect(() => {
		if (localAnswer) {
			const answer = { sdp: localAnswer, userId: currentUser.id, targetId };
			sendMessage(JSON.stringify(answer));
		}
	}, [localAnswer]);
    
	useEffect(() => {
		if (localCandidate) {
			const candidate = {
				sdp: localCandidate,
				userId: currentUser.id,
				targetId
			};
			sendMessage(JSON.stringify(candidate));
		}
	}, [localCandidate]);


	useEffect(() => {
		if (currentUser) {
			currentUser.subscribeToRoomMultipart({
				roomId,
				hooks: {
					onMessage: message => {
						const { targetId, sdp, userId } = JSON.parse(
							message.parts[0].payload.content
						);
						if (targetId === currentUser.id) {
							if (sdp.type === 'offer') {
								setRemoteOffer(sdp);
								setCaller(userId);
							}
							else if (sdp.type === 'answer') {
								setRemoteAnswer(sdp);
							}
							else if (sdp.type === undefined) {
								setRemoteCandidate(sdp);
							}
						}
					}
				},
				messageLimit: 0
			});
		}
	}, [currentUser]);

	function sendMessage(msg) {
		if (msg !== null && msg !== undefined) {
			currentUser.sendSimpleMessage({
				text: msg,
				roomId: currentUser.rooms[0].id
			});
		}
	}
	return { remoteAnswer,remoteOffer,remoteCandidate,caller,signalingError };
}