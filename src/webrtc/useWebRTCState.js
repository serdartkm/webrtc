import { useState, useEffect } from 'preact/hooks';
import useIceState from './useIceState';
import useNegotiationNeeded from './useNegotiationNeededState';
import useTrackState from './useTrackState';
import useConnectionState from './useConnectionState';

export default function useWebRTCState({ config, localMediaStream,remoteOffer }) {
	const [rtcPeer, setRtcPeer] = useState(null);
	const { iceConnectionState,iceGatheringState, localCandidate }= useIceState(rtcPeer);
	const { localAnswer,localAnswerError,localOffer,localOfferError } =useNegotiationNeeded({ rtcPeerConnection: rtcPeer,remoteOffer });
	const { remoteMediaStream } =useTrackState({ localMediaStream,rtcPeerConnection: rtcPeer });
	const { connectionState,signalingState,clean }= useConnectionState(rtcPeer);
	const [webrtcStateError, setWebRtcStateError] = useState(null);

	useEffect(() => {
		if (clean){
			setRtcPeer(null);
		}
	},[clean]);

	function initRTCPeerConnection(isCaller,remoteOffer){
		const rtcPeer = new RTCPeerConnection(config);
		rtcPeer.onerror = e => {
			setWebRtcStateError(e);
		};
		setRtcPeer(rtcPeer);
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
		rtcPeerConnection: rtcPeer,
		localOffer,
		localAnswer,
		localCandidate,
		initRTCPeerConnection
	};
}
