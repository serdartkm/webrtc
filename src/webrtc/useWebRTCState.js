import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export default function useWebRTCState({ config, localMediaStream }) {


	const [rtcPeerConnection, setRtcPeerConnection] = useState(null);
	const [connectionState, setConnectionState] = useState(null);
	const [iceConnectionState, setIceConnectionState] = useState(null);
	const [iceGatheringState, setIceGatheringState] = useState(null);
	const [signalingState, setSignalingState] = useState(null);
	const [remoteMediaStream, setRemoteMediaStream] = useState(null);
	const [remoteTrackAdded, setRemoteTrackAdded] = useState(false);
	const [localCandidate, setlocalCandidate] = useState(null);
	const [webrtcStateError, setWebRtcStateError] = useState(null);

	useEffect(() => {
		const rtcPeer = new RTCPeerConnection(config);
		rtcPeer.onicecandidate = e => {
			if (e.candidate !== null) {
				//console.log("e.candidate",e.candidate)
				const { candidate } = e;
				setlocalCandidate(candidate);
			}
		};
		rtcPeer.onconnectionstatechange = () => {
			setConnectionState(rtcPeer.connectionState);
		};

		rtcPeer.oniceconnectionstatechange = () => {
			setIceConnectionState(rtcPeer.iceConnectionState);
		};

		rtcPeer.onicegatheringstatechange = () => {
			setIceGatheringState(rtcPeer.iceConnectionState);
		};

		rtcPeer.onsignalingstatechange = () => {
			setSignalingState(rtcPeer.signalingState);
		};

		rtcPeer.ontrack = e => {
			setRemoteMediaStream(e.streams[0]);
			setRemoteTrackAdded(true);
		};

		rtcPeer.onerror = e => {
			setWebRtcStateError(e);
		};

		setRtcPeerConnection(rtcPeer);
	}, []);

	useEffect(() => {
		if (localMediaStream) {
			addLocalTrack(localMediaStream);
		}
	}, [localMediaStream]);

	function addLocalTrack(localMediaStream) {
		if (localMediaStream && rtcPeerConnection.getSenders().length === 0) {
			localMediaStream
				.getVideoTracks()
				.forEach(t => rtcPeerConnection.addTrack(t,localMediaStream));
		}
	}


	return {
		state: {
			connectionState, // for ui
			signalingState, // for ui
			iceConnectionState,
			iceGatheringState,
			remoteTrackAdded
		},
		webrtcStateError, // for ui
		remoteMediaStream, // for display
		localCandidate, //consumer is signaling server
		rtcPeerConnection
		
	};
}
