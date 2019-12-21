export default function createAnswer (rtcPeerConnection,offer,cb){
	rtcPeerConnection
		.setRemoteDescription(new RTCSessionDescription(offer))
		.then(() => rtcPeerConnection.createAnswer())
		.then(answer => {
			rtcPeerConnection.setLocalDescription(answer);
		
			cb(null,answer );
		})
		.catch(error => {
		
			cb(error, null);
		});

}

