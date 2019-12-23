import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';

export default function RTCStateComponent ({ rtcPeerConnection }){

	const [rtcPeerConStates, setRtcPeerConStates]= useState([]);

	useEffect(() => {
		console.log('PeerConnection change');
   
		if (rtcPeerConnection){
			const newState ={
				signalingState: rtcPeerConnection.signalingState,
				connectionState: rtcPeerConnection.connectionState,
				iceGatheringState: rtcPeerConnection.iceGatheringState,
				iceConnectionState: rtcPeerConnection.iceConnectionState };
			setRtcPeerConStates((preState) => [...preState, newState ]);
			console.log('PeerConnection change',newState);
		}
	
	},[rtcPeerConnection]);
	return (
	<div></div>
	);
}