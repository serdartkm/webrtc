import { useEffect, useState } from 'preact/hooks';

export default function useConnectionState (rtcPeerConnection){
	const [connectionState, setConnectionState] = useState(null);
	const [signalingState, setSignalingState] = useState(null);
	const [clean,setClean] =useState(false);
	useEffect(() => {
		if (rtcPeerConnection){
			rtcPeerConnection.onconnectionstatechange = () => {
				setConnectionState(rtcPeerConnection.connectionState);
				switch (rtcPeerConnection.connectionState){
					case 'failed':
						resetState();
				}
			};

			rtcPeerConnection.onsignalingstatechange = () => {
				setSignalingState(rtcPeerConnection.signalingState);
				switch (rtcPeerConnection.signalingState){
					case 'closed':
						resetState();
				}
			};
		}

		else {
			setConnectionState(null);
			setSignalingState(null);
			setClean(false);
		}

	},[rtcPeerConnection]);
	function resetState (cb){
		rtcPeerConnection.ontrack =null;
		rtcPeerConnection.onicecandidate =null;
		rtcPeerConnection.onconnectionstatechange =null;
		rtcPeerConnection.onicegatheringstatechange =null;
		rtcPeerConnection.onsignalingstatechange =null;
		rtcPeerConnection.onnegotiationneeded =null;
		setClean(true);
	}
	return { connectionState,signalingState,clean };
}