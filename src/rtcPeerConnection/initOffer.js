export default function createOffer (rtcPeerConnection,cb){

	return () => {
		rtcPeerConnection
			.createOffer()
			.then(offer => {
				rtcPeerConnection.setLocalDescription(offer);
				cb({ error: null,offer });
			})
			.catch(error => {
				cb({ error,offer: null });
			});
	};


}