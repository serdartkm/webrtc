import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import StateTable from './state-table';
export default function RTCStateView ({ signalingState,connectionState,iceConnectionState,iceGatheringState }){

	const [rtcPeerConStates, setRtcPeerConStates]= useState([]);

	useEffect(() => {
	
		const newState ={
			signalingState: { state: signalingState,changed: false },
			connectionState: { state: connectionState,changed: true },
			iceGatheringState: { state: iceGatheringState,changed: false },
			iceConnectionState: { state: iceConnectionState,changed: false },
			timestamp: { time: new Date().toLocaleString() }
		};
		setRtcPeerConStates((preState) => [...preState, newState ]);
		
	
	},[connectionState]);
    
	useEffect(() => {
		const newState ={
			signalingState: { state: signalingState,changed: false },
			connectionState: { state: connectionState,changed: false },
			iceGatheringState: { state: iceGatheringState,changed: false },
			iceConnectionState: { state: iceConnectionState,changed: true },
			timestamp: { time: new Date().toLocaleString()  }
        
		};
		setRtcPeerConStates((preState) => [...preState, newState ]);
	},[iceConnectionState]);
	useEffect(() => {
		const newState ={
			signalingState: { state: signalingState,changed: false },
			connectionState: { state: connectionState,changed: false },
			iceGatheringState: { state: iceGatheringState,changed: true },
			iceConnectionState: { state: iceConnectionState,changed: false },
			timestamp: { time: new Date().toLocaleString()   }
        
		};
		setRtcPeerConStates((preState) => [...preState, newState ]);
	},[iceGatheringState]);
	useEffect(() => {
		const newState ={
			signalingState: { state: signalingState,changed: true },
			connectionState: { state: connectionState,changed: false },
			iceGatheringState: { state: iceGatheringState,changed: false },
			iceConnectionState: { state: iceConnectionState,changed: false },
			timestamp: { time: new Date().toLocaleString()   }
        
		};
		setRtcPeerConStates((preState) => [...preState, newState ]);
	},[signalingState]);

	return (
		<StateTable rtcPeerConStates={rtcPeerConStates} />
	);
}