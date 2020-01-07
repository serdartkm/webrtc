/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/jsx-indent-props */
import usePusherSignaling from '../../signaling-service/pusher/usePusherSignaling';
import iceServers from '../servers';
import useWebRTC from '../useWebRTC';

export default function  useWebRTCPusherApp ({ mediaConstraints,currentUser, roomId, name,target   }) {

	const { message, sendMessage,error: pusherError }  = usePusherSignaling({ currentUser,roomId, target,name,closed });
	const { handleSendMessage ,state, webRTCError,remoteMediaStream,localMediaStream } =useWebRTC({ sendMessage,message, mediaConstraints,iceServers, name,target });
	
	return  { handleSendMessage,remoteMediaStream,state,pusherError,webRTCError,localMediaStream };
}