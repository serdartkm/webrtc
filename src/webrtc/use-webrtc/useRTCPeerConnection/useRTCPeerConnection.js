import { useState, useEffect } from 'preact/hooks';
import useIceState from './useIceState';
import useNegotiationNeeded from './useNegotiationNeededState';
import useTrackState from './useTrackState';
import useConnectionState from './useConnectionState';

export default function useRTCPeerConnection({ iceServers, localMediaStream,remoteOffer }) {
	const [rtcPeerConnection, setRTCPeerConnection] = useState(null);
	const { iceConnectionState,iceGatheringState, localCandidate }= useIceState(rtcPeerConnection);
	const { localAnswer,localAnswerError,localOffer,localOfferError } =useNegotiationNeeded({ rtcPeerConnection,remoteOffer });
	const { remoteMediaStream } =useTrackState({ localMediaStream,rtcPeerConnection });
	const { connectionState,signalingState,clean }= useConnectionState(rtcPeerConnection);
	const [webrtcStateError, setWebRtcStateError] = useState(null);

	useEffect(() => {
		if (clean){
			setRTCPeerConnection(null);
		}
	},[clean]);
	useEffect(() => {
		if (rtcPeerConnection){
			rtcPeerConnection.onerror = e => {
				setWebRtcStateError(e);
			};
		}
	},[]);
	function initRTCPeerConnection(isCaller,remoteOffer){
		setRTCPeerConnection(new RTCPeerConnection(iceServers));
	}
	return {
		state: {
			connectionState,
			signalingState,
			iceConnectionState,
			iceGatheringState
		},
		webrtcStateError,
		localAnswerError,
		localOfferError,
		remoteMediaStream,
		rtcPeerConnection,
		localOffer,
		localAnswer,
		localCandidate,
		initRTCPeerConnection
	};
}
