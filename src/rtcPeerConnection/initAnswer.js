export default function createAnswer (rtcPeerConnection,cb){

	return (offer) => {
		rtcPeerConnection
			.setRemoteDescription(new RTCSessionDescription(offer))
			.then(() => rtcPeerConnection.createAnswer())
			.then(answer => {
				rtcPeerConnection.setLocalDescription(answer);
				cb({ error: null,answer });
			})
			.catch(error => {
				cb({ error,answer: null });
			});
	};
}

