import { useEffect, useState } from 'preact/hooks';
import useWebRTC from './use-webrtc';
import useUIState from './useUIState';
import useSignalingState from './useSignalingState';

export default function useWebRTCApp ({ sendMessage, message, localMediaStream,getLocalMedia, target, name,iceServers }){
	const [offer,setOffer] =useState(null);
	const [answer,setAnswer]=useState(null);
	const [candidate,setCandidate] =useState(null);
	const [close,setClose]=useState(false);
	const [decline,setDecline]=useState(false);
	const { remoteAnswer,remoteOffer,remoteCandidate, remoteClose }  =useSignalingState({ name, target,localAnswer: answer,localOffer: offer,localCandidate: candidate,localClose: close,localDecline: decline ,sendMessage,message });
	const { localOffer,localAnswer,localCandidate,localClose,localDecline, state, handleSendMessage, remoteMediaStream,webrtcError } =useWebRTC({ iceServers,remoteAnswer,remoteCandidate,remoteOffer,remoteClose,localMediaStream,getLocalMedia });
	const { calling, recievingCall, connected, closeLabel } = useUIState({ localClose,localAnswer,localOffer,localDecline,state,remoteAnswer,remoteOffer });
    
	useEffect(() => {
		if (localAnswer){
			setAnswer(localAnswer);
		}
	},[localAnswer]);

	useEffect(() => {
		if (localOffer){
			setOffer(localOffer);
		}
	},[localOffer]);

	useEffect(() => {
		if (localCandidate){
			setCandidate(localCandidate);
		}
	},[localCandidate]);

	useEffect(() => {
		if (localClose){
			setClose(true);
			resetState();
		}
	},[localClose]);
	useEffect(() => {
		if (localDecline){
			setDecline(true);
			resetState();
		}
	},[localDecline]);

	function resetState(){
	  setTimeout(() => {
			setAnswer(null);
			setCandidate(null);
			setOffer(null);
			setClose(false);
	  },0);
	}
	return { handleSendMessage ,UIState: { calling,recievingCall,connected,closeLabel, error: webrtcError }, media: { localMediaStream,remoteMediaStream }
	};
}