export default async 	function createAnswer (rtcPeerConnection,remoteOffer,cb){
	try {
		await rtcPeerConnection.setRemoteDescription(new RTCSessionDescription(remoteOffer));
		const answer =await rtcPeerConnection.createAnswer();
		await	rtcPeerConnection.setLocalDescription(answer);
		cb(null,answer);
	}
	catch (error) {
		cb(error,null);
	}
}