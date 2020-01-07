/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/jsx-indent-props */
import { useEffect, useState } from 'preact/hooks';
import usePusherSignaling from '../../signaling-service/pusher/usePusherSignaling';
import iceServers from '../servers';
import useWebRTC from '../useWebRTC';

export default function  useWebRTCPusherApp ({ mediaConstraints,currentUser, roomId, name,target   }) {
	const [closed, setClosed ]= useState(false);
	const { message, sendMessage,error: pusherError }  = usePusherSignaling({ currentUser,roomId, target,name,closed });
	const { handleSendMessage ,state, webRTCError,remoteMediaStream } =useWebRTC({ sendMessage,message, mediaConstraints,iceServers, name,target });
	const { signalingState } =state;
	// useEffect(() => {
	// 	debugger;
	// 	if (signalingState && signalingState ==='closed'){
	// 		setClosed(true);
	// 		debugger;
	// 	}
	// },[signalingState]);
	return  { handleSendMessage,remoteMediaStream,state,pusherError,webRTCError };
}