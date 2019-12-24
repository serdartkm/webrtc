export default function createAnswer (rtcPeerConnection,cb){

	rtcPeerConnection.createAnswer()
		.then(answer => {
			rtcPeerConnection.setLocalDescription(answer);
		
			cb(null,answer );
		})
		.catch(error => {
		
			cb(error, null);
		});

}

