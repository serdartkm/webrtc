import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';

export default function useRTCConnection (){

	const [rtcConnection,setRTCConnection] =useState(null);
	const [connectionState,setConnectionState]=useState(null);
	const [signalingState,setSignalingState]= useState(null);

	useEffect(() => {


	},[]);

	return rtcConnection;

}