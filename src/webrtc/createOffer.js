export default function createOffer (rtcPeerConnection,cb){

	rtcPeerConnection
		.createOffer()
		.then(offer => {
			rtcPeerConnection.setLocalDescription(offer);
		
			cb(null,offer);
	
		})
		.catch(error => {
			cb(error, null);
		
		});
	
}