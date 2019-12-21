let rtcPeerConnection =null;


export default function initRTCPeerConnection(config){

	rtcPeerConnection= new RTCPeerConnection(config);
 
	function addLocalTrack(localMediaStream){
		if (localMediaStream){

			localMediaStream
				.getVideoTracks()
				.forEach(t => rtcPeerConnection.addTrack(t, localMediaStream));
		}
	
	}
    
	function addRemoteCandidate (candidate){
		rtcPeerConnection.addIceCandidate(
			new RTCIceCandidate(candidate)
		);
	}

	function addRemoteAnswer(remoteAnswer){
		setTimeout(() => {
			rtcPeerConnection.setRemoteDescription(
				new RTCSessionDescription(remoteAnswer)
			  );
		},1000);
	
	}
	function rtcEventHandler  (cb) {
	

		rtcPeerConnection.onicecandidate = e => {
			if (e.candidate !== null) {
				const { candidate } = e;
				cb({ candidate });
			}
		};
		rtcPeerConnection.onconnectionstatechange = () => {
			cb({ connectionState: rtcPeerConnection.connectionState });
		};
    
		rtcPeerConnection.onsignalingstatechange =() => {
			cb({ signalingState: rtcPeerConnection.signalingState });
		};
    
		rtcPeerConnection.ontrack = e => {
			cb({ remoteMediaStream: e.streams[0]  });
		};

		rtcPeerConnection.onerror = e => {
			cb({ error: e });
		};
		

	}
	return { rtcPeerConnection, addLocalTrack,addRemoteCandidate, rtcEventHandler,addRemoteAnswer };

}

