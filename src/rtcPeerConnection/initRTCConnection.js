let rtcPeerConnection =null;

export default function initRTCConnection(config,cb){

	rtcPeerConnection= new RTCPeerConnection(config);
    
	rtcPeerConnection.onicecandidate = e => {
		if (e.candidate !== null) {
			const { candidate } = e;
			cb(null,candidate);
		}
	};

	rtcPeerConnection.ontrack = e => {
		cb(null,e);
	};
	rtcPeerConnection.onconnectionstatechange = () => {
		cb(null,  );
	};
	return rtcPeerConnection;


}


/*
import servers from './servers'

const useMediaStream = ({ self,
    mediaConfig = { video: true, audio: false },
    sendCandidate,
    mediaStream = null
}) => {
    self.rtcPeerConnection = new RTCPeerConnection(servers);
    const gotLocalMediaStream = localMediaStream => {
        self.setState({ localMediaStream });
        localMediaStream
            .getVideoTracks()
            .forEach(t => self.rtcPeerConnection.addTrack(t, localMediaStream));
    };
    const handleLocalMediaStreamError = error => {
        self.setState((prevState) => ({ errors: [...prevState.errors, error] }))
    };
    if (mediaStream === null) {
        navigator.mediaDevices
            .getUserMedia(mediaConfig)
            .then(gotLocalMediaStream)
            .catch(handleLocalMediaStreamError);
    }
    else {
        mediaStream
            .getVideoTracks()
            .forEach(t => self.rtcPeerConnection.addTrack(t, mediaStream));
        self.setState({ localMediaStream: mediaStream });
    }
 
    self.rtcPeerConnection.onconnectionstatechange = () => {

        console.log("connectionState.....", self.rtcPeerConnection.connectionState )
        self.setState({ connectionState: self.rtcPeerConnection.connectionState })
    };
    self.rtcPeerConnection.onsignalingstatechange = () => {
        self.setState({ signalingState: self.rtcPeerConnection.signalingState })
    };
    self.rtcPeerConnection.ontrack = e => {
        self.setState({ remoteMediaStream: e.streams[0] });
    };
}
export default useMediaStream
*/