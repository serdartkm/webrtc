let rtcPeerConnection =null;

import initAnswer from './initAnswer';
import initOffer from './initOffer';

export default function initRTCPeerConnection(config){

	rtcPeerConnection= new RTCPeerConnection(config);
 
	function addLocalTrack(localMediaStream){
		localMediaStream
			.getVideoTracks()
			.forEach(t => self.rtcPeerConnection.addTrack(t, localMediaStream));
	}
    
	function addRemoteCandidate (candidate){
		rtcPeerConnection.addIceCandidate(
			new RTCIceCandidate(candidate)
		);
	}
	return (cb) => {

		const createAnswer = initAnswer(rtcPeerConnection,({ error,answer }) => {
			if (answer){
				cb({ answer });
			}
			else if (error){
				cb({ error });
			}
		});
        
		const createOffer = initOffer(rtcPeerConnection,({ error,offer }) => {
			if (offer){
				cb({ offer });
			}
			else if (error){
				cb({ error });
			}
		});

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
		return { rtcPeerConnection, createAnswer,createOffer,addLocalTrack,addRemoteCandidate };

	};
}

