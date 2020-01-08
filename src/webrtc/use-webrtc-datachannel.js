import { useEffect, useState } from 'preact/hooks';
import useWebRTCState from './use-webrtc-state';

export default function useWebRTCDataChannel({ sendMessage, message, iceServers }){
	const [pc,setPc]= useState(null);
	const { signalingState, iceGatheringState,iceConnectionState,connectionState }= useWebRTCState({ pc,sendMessage });

	useEffect(() => {

	},[]);

}