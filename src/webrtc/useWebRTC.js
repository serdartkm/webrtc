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
	const [isCaller,setCaller] =useState(false);
	const [remoteOffer, setRemoteOffer]= useState(null);

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
						resetState();
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
		if (isCaller && pc){
			createSDP('offer');
		}
	},[isCaller,pc]);
	
	useEffect(() => {
		function messageRecived(){
			switch (message.type){
				case 'answer':
					if (pc.localDescription){
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
					}
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
		if (message && pc){
			messageRecived();
		}
	},[message, pc]);

	useEffect(() => {
		if (message && message.type ==='offer'){
			setPc(new RTCPeerConnection(iceServers));
			setRemoteOffer(message.sdp.sdp);
		}
	},[message]);

	useEffect(() => {
		if (remoteOffer && pc){
			pc.setRemoteDescription(remoteOffer)
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
		}
	},[remoteOffer,pc]);

	function createAnswer (){
		createSDP('answer');
	}
	function createOffer (){
		setPc(new RTCPeerConnection(iceServers));
		setCaller(true);
	}

	function createSDP(type){
		navigator.mediaDevices.getUserMedia({ video: true,audio: false })
			.then((stream) => {
				stream
					.getVideoTracks()
					.forEach(t => pc.addTrack(t,stream));
				setLocalMediaStream(stream);
			})
			.then(() =>  type==='answer' ? pc.createAnswer() : pc.createOffer() )
			.then((sdp) => {
				pc.setLocalDescription(sdp);
				debugger;
			})
			.then(() => {
				sendMessage({ sdp: pc.localDescription,type });
			})
			.catch((err) => {
			// eslint-disable-next-line no-debugger
				debugger;
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
			setConnectionState(null);
			setLocalMediaStream(null);
			setRemoteMediaStream(null);
			setError(null);
			setRemoteOffer(null);
			setCaller(false);
			setRemoteIceCandidates([]);
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