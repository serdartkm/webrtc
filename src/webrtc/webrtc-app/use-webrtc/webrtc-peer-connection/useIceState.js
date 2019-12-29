import { useEffect, useState } from 'preact/hooks';


export default function useIceState (rtcPeerConnection){
	const [iceConnectionState, setIceConnectionState] = useState(null);
	const [iceGatheringState, setIceGatheringState] = useState(null);
	const [localCandidate, setLocalCandidate]= useState(null);
	useEffect(() => {
		if (rtcPeerConnection){
			rtcPeerConnection.oniceconnectionstatechange = () => {
				setIceConnectionState(rtcPeerConnection.iceConnectionState);
			};
			rtcPeerConnection.onicegatheringstatechange = () => {
				setIceGatheringState(rtcPeerConnection.iceConnectionState);
			};
			rtcPeerConnection.onicecandidate = e => {
				if (e.candidate !== null) {
					const { candidate } = e;
					setLocalCandidate(candidate);
				}
			};
		}
		else {
			setIceConnectionState(null);
			setIceGatheringState(null);
			setLocalCandidate(null);
		}
	

	},[rtcPeerConnection]);
	return { iceConnectionState,iceGatheringState,localCandidate };
}