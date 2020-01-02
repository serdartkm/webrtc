import { useState,useEffect } from 'preact/hooks';


export default function useWebRTC ({ iceServers, message,sendMessage, target, name, localMediaStream }){

	const [pc,setPc] =useState(null);
	const [error,setError] =useState(null);
	const [signalingState,setSignalingState] =useState(null);
	const [connectionState,setConnectionState]=useState(null);
	const [iceConnectionState, setIceConnectionState] = useState(null);
	const [iceGatheringState, setIceGatheringState] = useState(null);
	const [remoteMediaStream, setRemoteMediaStream] = useState(null);
	const [remoteOffer,setRemoteOffer]=useState(null);
	useEffect(() => {
		setPc(new RTCPeerConnection(iceServers));
	
	},[]);
	useEffect(() => {
		// if (localMediaStream){
		// 	if (localMediaStream && pc && pc.getSenders().length === 0) {
		// 		localMediaStream
		// 			.getVideoTracks()
		// 			.forEach(t => pc.addTrack(t,localMediaStream));
		// 	}
		// }
	},[localMediaStream]);
	useEffect(() => {
		if (pc){
			pc.onicecandidate = function(event) {
				if (event.candidate) {
				  // Send the candidate to the remote peer
				  sendMessage({ name,target,sdp: event.candidate, type: 'ice' });
				  console.log('event.candidate',event.candidate);
				}
				else {
				  // All ICE candidates have been sent
				}
			  };
			  pc.onconnectionstatechange = () => {
				setConnectionState(pc.connectionState);
				switch (pc.connectionState){
					case 'failed':
						resetState();
				}

				console.log('connectionState', pc.connectionState);
			};
			pc.onsignalingstatechange = () => {
				setSignalingState(pc.signalingState);
				switch (pc.signalingState){
					case 'closed':
						resetState();
				}
				console.log('signalingState', pc.signalingState);
			};
			
			pc.oniceconnectionstatechange = () => {
				setIceConnectionState(pc.iceConnectionState);
			};
			pc.onicegatheringstatechange = () => {
				setIceGatheringState(pc.iceConnectionState);
			};
			pc.ontrack = e => {
			//	setRemoteMediaStream(e.streams[0]);
			};
		}
		
	},[pc]);
    
	useEffect(() => {
		if (message){
			switch (message.type){
				case 'offer':
				 pc.setRemoteDescription(message.sdp).then(() => {
						setRemoteOffer(message.sdp);
				 }).catch((e) => {setError(e);});
					break;
				case 'answer':
					pc.setRemoteDescription(message.sdp).catch((error) => setError(error));
					break;
				case 'ice':
					pc.addIceCandidate(message.sdp).catch(e => {
						setError(e);
					  });
					break;
				case 'end':
					pc.close();
					  break;
				case 'decline':
					pc.close();
					  break;
				case 'ignore':
					pc.close();
					 break;
			}
		}
	},[message]);

	function createAnswer (){
	
		 pc.createAnswer()
			.then((answer) => pc.setLocalDescription(answer))
			.then(() => {
				
				sendMessage({ target,name,sdp: pc.localDescription,type: 'answer' });
			}).catch((error) => setError(error));
	}
	function createOffer (){
	
		pc.createOffer().then((offer) => pc.setLocalDescription((offer)).then(() => {
		
			sendMessage({ target,name,sdp: pc.localDescription, type: 'offer' });
		})).catch((e) => setError(e));
	}
	function closeConnection (type){
		switch (type){
			case 'decline':
				sendMessage({ target,name, type: 'decline' });
				setRemoteOffer(null);
				break;
			case  'end':
				sendMessage({ target,name, type: 'end' });
				pc.close();
				break;
			case 'ignore':
				setRemoteOffer(null);
				break;
			case 'cancel':
				pc.close();
				  break;
		}
	}
	function resetState (){
		if (pc){
			pc.onicecandidate =null;
			pc.onconnectionstatechange = null;
			pc.onsignalingstatechange = null;
			pc.oniceconnectionstatechange = null;
			pc.onicegatheringstatechange = null;
			pc.ontrack = null;
			setPc(null);
			setRemoteOffer(null);
			setSignalingState(null);
			setIceConnectionState(null);
			setIceGatheringState(null);
			setRemoteMediaStream(null);
			setConnectionState(null);
			setError(null);
		}
	}
	function handleSendMessage (type){
		switch (type){
			case 'offer':
				createOffer();
				break;
			case 'answer':
				createAnswer();
				break;
			case 'decline':
				closeConnection('decline');
				break;
			case 'end':
				closeConnection('end');
				break;
			case 'ignore':
				closeConnection('ignore');
				break;
			case 'cancel':
				closeConnection('cancel');
				break;
		}
	}

	return { webRTCError: error, state: { connectionState,signalingState, iceGatheringState,iceConnectionState, remoteOffer },remoteMediaStream, handleSendMessage };
}