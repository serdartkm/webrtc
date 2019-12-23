let rtcPeerConnection = null;

export default function initRTCPeerConnection(config) {
	rtcPeerConnection = new RTCPeerConnection(config);

	function addLocalTrack(localMediaStream) {
		if (localMediaStream && rtcPeerConnection.getSenders().length === 0) {
			localMediaStream
				.getVideoTracks()
				.forEach(t => rtcPeerConnection.addTrack(t));
		}
	}

	function addRemoteCandidate(candidate) {
		rtcPeerConnection.addIceCandidate(new RTCIceCandidate(candidate));
	}

	function addRemoteAnswer(remoteAnswer) {
		rtcPeerConnection.setRemoteDescription(
			new RTCSessionDescription(remoteAnswer)
		);
	}
	function rtcEventHandler(cb) {
		rtcPeerConnection.onicecandidate = e => {
			if (e.candidate !== null) {
				const { candidate } = e;
				cb({ candidate });
			}
		};
		rtcPeerConnection.onconnectionstatechange = () => {
			cb({ connectionState: rtcPeerConnection.connectionState });
		};
		rtcPeerConnection.oniceconnectionstatechange = () => {
			cb({ iceConnectionState: rtcPeerConnection.iceConnectionState });
		};
		rtcPeerConnection.onicegatheringstatechange = () => {
			cb({ iceGatheringState: rtcPeerConnection.iceGatheringState });
		};
		rtcPeerConnection.onsignalingstatechange = () => {
			cb({ signalingState: rtcPeerConnection.signalingState });
		};

		rtcPeerConnection.ontrack = e => {
			cb({ remoteMediaStream: e.streams[0] });
		};

		rtcPeerConnection.onerror = e => {
			cb({ error: e });
		};
	}
	return {
		rtcPeerConnection,
		addLocalTrack,
		addRemoteCandidate,
		rtcEventHandler,
		addRemoteAnswer
	};
}
