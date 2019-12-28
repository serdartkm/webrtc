export default async 	function createOffer (rtcPeerConnection,cb){
	try {
		const offer =await rtcPeerConnection.createOffer();
		await	rtcPeerConnection.setLocalDescription(new RTCSessionDescription(offer));
		//await setLocalOffer(offer);
		cb(null,offer);
	}
	catch (error) {
		cb(error,null);
		//setWebRtcStateError(error);
	}
}