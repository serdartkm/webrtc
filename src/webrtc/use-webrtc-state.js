import { useEffect, useState } from 'preact/hooks';

export default function useWebRTCState ({ pc, sendMessage }){
   
	const [signalingState,setSignalingState] =useState(null);
	const [connectionState,setConnectionState]=useState(null);
	const [iceConnectionState, setIceConnectionState] = useState(null);
	const [iceGatheringState, setIceGatheringState] = useState(null);
	const [remoteMediaStream, setRemoteMediaStream] = useState(null);

	useEffect(() => {
		if (pc){
			pc.onicecandidate = function(e) {
				if (e.candidate){
					sendMessage({ sdp: e.candidate,type: 'ice' });
				}
			  };
			  pc.onconnectionstatechange = () => {
				setConnectionState(pc.connectionState);
			};
			pc.onsignalingstatechange = () => {
				setSignalingState(pc.signalingState);
			};
			pc.oniceconnectionstatechange = () => {
				setIceConnectionState(pc.iceConnectionState);
			};
			pc.onicegatheringstatechange = () => {
				setIceGatheringState(pc.iceGatheringState);
			};
			pc.ontrack = e => {
				setRemoteMediaStream(e.streams[0]);
			};
		}
	},[pc]);
    
	return { signalingState,connectionState,iceConnectionState,iceGatheringState, remoteMediaStream };
}