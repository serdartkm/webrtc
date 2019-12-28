import { useEffect, useState } from 'preact/hooks';

export default function useTrackState ({ localMediaStream,rtcPeerConnection }){

	const [remoteMediaStream, setRemoteMediaStream] = useState(null);

	useEffect(() => {
		if (rtcPeerConnection){
			rtcPeerConnection.ontrack = e => {
				setRemoteMediaStream(e.streams[0]);
			};
		}
		else {
			setRemoteMediaStream(null);
		}
	},[rtcPeerConnection]);
    
	useEffect(() => {
		if (localMediaStream && rtcPeerConnection && rtcPeerConnection.getSenders().length === 0) {
			localMediaStream
				.getVideoTracks()
				.forEach(t => rtcPeerConnection.addTrack(t,localMediaStream));
		}
	}, [localMediaStream]);

	return { remoteMediaStream };
}