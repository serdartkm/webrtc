import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import initRTCPeerConnection from './initRTCPeerConnection';
export default function useRTCPeerConnection ({ config,localMediaStream }){

	const { rtcEventHandler, rtcPeerConnection,addLocalTrack,addRemoteCandidate,addRemoteAnswer } =initRTCPeerConnection(config);
	const [connectionState,setConnectionState]=useState(null);
	const [signalingState,setSignalingState]= useState(null);
	const [remoteMediaStream,setRemoteMediaStream] =useState(null);
	const [localCandidate,setlocalCandidate] =useState(null);
	const [error,setError]=useState(null);

	useEffect(() => {
		rtcEventHandler(({ connectionState,signalingState,remoteMediaStream, candidate,error,offer,answer }) => {
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
		
		});
	},[]);

	useEffect(() => {
		if (localMediaStream){
			addLocalTrack(localMediaStream);
		}
	},[localMediaStream]);


	return {
		  connectionState,// for ui
		  signalingState,// for ui
		  error, // for ui
		  remoteMediaStream,// for display

		  rtcConfig: {
			localCandidate,//consumer is signaling server
			rtcPeerConnection,
			addRemoteCandidate,
			addRemoteAnswer
		  }
	
	
	};

}