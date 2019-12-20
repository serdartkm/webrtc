import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import initRTCPeerConnection from './initRTCPeerConnection';
export default function useRTCPeerConnection ({ config,localMediaStream,remoteCandidate }){

	const { rtcPeerConnection,createOffer,createAnswer,addLocalTrack,addRemoteCandidate } =initRTCPeerConnection(config);
	const [connectionState,setConnectionState]=useState(null);
	const [signalingState,setSignalingState]= useState(null);
	const [remoteMediaStream,setRemoteMediaStream] =useState(null);
	const [localCandidate,setlocalCandidate] =useState(null);
	const [localOffer,setLocalOffer]=useState(null);
	const [localAnswer,setLocalAnswer]=useState(null);
	const [error,setError]=useState(null);

	useEffect(() => {
		rtcPeerConnection(({ connectionState,signalingState,remoteMediaStream, candidate,error,offer,answer }) => {
			if (connectionState){
				setConnectionState(connectionState);
			}
			else if (signalingState){
				setSignalingState(signalingState);
			}
			else if (remoteMediaStream){
				setRemoteMediaStream(remoteMediaStream);
			}
			else if (candidate){
				setlocalCandidate(candidate);
			}
			else if (error){
				setError(error);
			}
			else if (offer){
				setLocalOffer(offer);
			}
			else if (answer){
				setLocalAnswer(answer);
			}
		});
	},[]);

	useEffect(() => {
		if (localMediaStream){
			addLocalTrack(localMediaStream);
		}
	},[localMediaStream]);

	useEffect(() => {
		if (remoteCandidate){
			addRemoteCandidate(remoteCandidate);
		}
	},[remoteCandidate]);

	return {
		  connectionState,// for ui
		  signalingState,// for ui
		  error, // for ui
		  remoteMediaStream,// for display
		  createAnswer, // for ui
		  createOffer, // for ui
		  localCandidate,//consumer is signaling server
		  localAnswer,//consumer is signaling server
		  localOffer//consumer is signaling server
	};

}