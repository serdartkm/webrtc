import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export default function useWebRTCState({ config, localMediaStream }) {

	const [rtcPeer, setRtcPeer] = useState(null);
	const [connectionState, setConnectionState] = useState(null);
	const [iceConnectionState, setIceConnectionState] = useState(null);
	const [iceGatheringState, setIceGatheringState] = useState(null);
	const [signalingState, setSignalingState] = useState(null);
	const [remoteMediaStream, setRemoteMediaStream] = useState(null);
	const [remoteTrackAdded, setRemoteTrackAdded] = useState(false);
	const [localCandidate, setlocalCandidate] = useState(null);
	const [webrtcStateError, setWebRtcStateError] = useState(null);
	const [localOffer,setLocalOffer] =useState(null);
	const [localAnswer,setLocalAnswer] =useState(null);


	useEffect(() => {
		if (localMediaStream && rtcPeer && rtcPeer.getSenders().length === 0) {
			localMediaStream
				.getVideoTracks()
				.forEach(t => rtcPeer.addTrack(t,localMediaStream));
		}
	}, [localMediaStream]);

	function initRTCPeerConnection(isCaller,remoteOffer){

		const rtcPeer = new RTCPeerConnection(config);
		rtcPeer.onicecandidate = e => {
			if (e.candidate !== null) {
				const { candidate } = e;
				setlocalCandidate(candidate);
			}
		};
		rtcPeer.onconnectionstatechange = () => {
			setConnectionState(rtcPeer.connectionState);
			switch (rtcPeer.connectionState){
				case 'failed':
				 resetState();
			}
		};
		rtcPeer.oniceconnectionstatechange = () => {
			setIceConnectionState(rtcPeer.iceConnectionState);
		};
		rtcPeer.onicegatheringstatechange = () => {
			setIceGatheringState(rtcPeer.iceConnectionState);
		};
		rtcPeer.onsignalingstatechange = () => {
			setSignalingState(rtcPeer.signalingState);
			switch (rtcPeer.signalingState){
				case 'closed':
				 resetState();
			}
		};

		rtcPeer.ontrack = e => {
			setRemoteMediaStream(e.streams[0]);
			setRemoteTrackAdded(true);
		};
		rtcPeer.onnegotiationneeded= async() => {
			if (isCaller){
				createOffer();
			}
			else if (!isCaller){
				createAnswer();
			}
		};

		rtcPeer.onerror = e => {
			setWebRtcStateError(e);
		};
		setRtcPeer(rtcPeer);

		async 	function createOffer (){
			try {
				const offer =await rtcPeer.createOffer();
			 await	rtcPeer.setLocalDescription(new RTCSessionDescription(offer));
			 await setLocalOffer(offer);
			}
			catch (error) {
				setWebRtcStateError(error);
				debugger;
			}
		}
		async 	function createAnswer (){
			try {
				await rtcPeer.setRemoteDescription(new RTCSessionDescription(remoteOffer));
				const answer =await rtcPeer.createAnswer();
				await	rtcPeer.setLocalDescription(answer);
				await setLocalAnswer(answer);
		   }
		   catch (error) {
			   debugger;
			   setWebRtcStateError(error);
		   }
		}
		function resetState (){
			rtcPeer.ontrack =null;
			rtcPeer.onicecandidate =null;
			rtcPeer.onconnectionstatechange =null;
			rtcPeer.onicegatheringstatechange =null;
			rtcPeer.onsignalingstatechange =null;
			rtcPeer.onnegotiationneeded =null;
			setRtcPeer(null);
			setRemoteMediaStream(null);
			setConnectionState(null);
			setIceConnectionState(null);
			setIceGatheringState(null);
			setSignalingState(null);
			setLocalAnswer(null);
			setLocalOffer(null);
			setlocalCandidate(null);
			setWebRtcStateError(null);
		}
	}
	return {
		state: {
			connectionState,
			signalingState,
			iceConnectionState,
			iceGatheringState,
			remoteTrackAdded
		
		},
		webrtcStateError,
		remoteMediaStream,
		rtcPeerConnection: rtcPeer,
		localOffer,
		localAnswer,
		localCandidate,
		initRTCPeerConnection
	};
}
