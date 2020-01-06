import { useState,useEffect } from 'preact/hooks';


export default function useWebRTC ({ iceServers, message,sendMessage, target, name, mediaConstraints }){

	const [pc,setPc] =useState(null);
	const [error,setError] =useState(null);
	const [signalingState,setSignalingState] =useState(null);
	const [connectionState,setConnectionState]=useState(null);
	const [iceConnectionState, setIceConnectionState] = useState(null);
	const [iceGatheringState, setIceGatheringState] = useState(null);
	const [remoteMediaStream, setRemoteMediaStream] = useState(null);
	const [localMediaStream,setLocalMediaStream] =useState(null);
	const [remoteIceCandidates,setRemoteIceCandidates]=useState([]);
	useEffect(() => {
		setPc(new RTCPeerConnection(iceServers));
	
	},[]);
	useEffect(() => {
		if (pc){
			pc.onicecandidate = function(e) {
				if (e.candidate){
				
					sendMessage({ sdp: e.candidate,type: 'ice' });
				}
			  };
			  pc.onconnectionstatechange = () => {
				setConnectionState(pc.connectionState);
				switch (pc.connectionState){
					case 'failed':
						
				}
			
			};
			pc.onsignalingstatechange = () => {
				setSignalingState(pc.signalingState);
				switch (pc.signalingState){
					case 'closed':
					
				}
			};
			
			pc.oniceconnectionstatechange = () => {
				setIceConnectionState(pc.iceConnectionState);
			};
			pc.onicegatheringstatechange = () => {
				setIceGatheringState(pc.iceConnectionState);
			};
			pc.ontrack = e => {
				setRemoteMediaStream(e.streams[0]);
			};

		
		}

		return () => {
			resetState();
		};
		
	},[pc]);
	
	
	useEffect(() => {
		function messageRecived(){
			switch (message.type){
				case 'offer':
					pc.setRemoteDescription(message.sdp.sdp)
						.then(() => {
							if (remoteIceCandidates.length >0){
								for ( let ice in remoteIceCandidates){
									if (ice){
									
										pc.addIceCandidate(remoteIceCandidates[ice]);
									}
								}
							}
						})
						.catch((err) => {
							setError(err);
							// eslint-disable-next-line no-debugger
							debugger;
						});
					break;
				case 'answer':
				
					pc.setRemoteDescription(message.sdp.sdp)
						.then(() => {
						
							if (remoteIceCandidates.length >0){
							
								for ( let ice in remoteIceCandidates){
									if (ice){
								
										pc.addIceCandidate(remoteIceCandidates[ice]);
									}
								}
							}

						})
						.catch((err) => {
							// eslint-disable-next-line no-debugger
							debugger;
							setError(err);
						});
					break;
				case 'ice':
				
					if (pc.remoteDescription){
					
						pc.addIceCandidate(message.sdp);
					}
				 else {
						setRemoteIceCandidates((prev) => [...prev,message.sdp]);
				 }
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
		if (message){
		
			messageRecived();
			
		}
		
	},[message]);

	function createAnswer (){
	
		navigator.mediaDevices.getUserMedia({ video: true,audio: false })
			.then((stream) => {
				stream
					.getVideoTracks()
					.forEach(t => pc.addTrack(t,stream));
				setLocalMediaStream(stream);
			})
			.then(() => pc.createAnswer())
			.then((answer) => {
				pc.setLocalDescription(answer);
			})
			.then(() => {
				sendMessage({ sdp: pc.localDescription,type: 'answer' });
			})
			.catch((err) => {
				// eslint-disable-next-line no-debugger
				debugger;
			});
	}
	function createOffer (){

		navigator.mediaDevices.getUserMedia({ video: true,audio: false })
			.then((stream) => {
				stream
					.getVideoTracks()
					.forEach(t => pc.addTrack(t,stream));
				setLocalMediaStream(stream);
			})
			.then(() => pc.createOffer())
			.then((offer) => {
				pc.setLocalDescription(offer);
			})
			.then(() => {
			
				sendMessage({ sdp: pc.localDescription, type: 'offer' });
			})
			.catch((err) => {
				// eslint-disable-next-line no-debugger
				debugger;
				setError(err);

		  /* handle the error */
			});
	}


	function closeConnection (type){
		switch (type){
			case 'decline':
				sendMessage({ type: 'decline' });
			
				break;
			case  'end':
				sendMessage({ type: 'end' });
				pc.close();
				break;
			case 'ignore':
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
			setSignalingState(null);
			setIceConnectionState(null);
			setIceGatheringState(null);
			setRemoteMediaStream(null);
			setConnectionState(null);
			setLocalMediaStream(null);
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

	return { webRTCError: error, state: { connectionState,signalingState, iceGatheringState,iceConnectionState },localMediaStream,remoteMediaStream, handleSendMessage };
}