/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable react/jsx-indent-props */
import usePusherSignaling from '../../signaling-service/pusher/usePusherSignaling';
import iceServers from '../servers';
import useWebRTC from '../use-webrtc';
import useLocalMediaStream from '../../video-transfer/localMedieaStream/useLocalMediaStream';

export default function  useWebRTCPusherApp ({ mediaConstrains,currentUser, roomId, name,target  }) {

	const { localMediaStream,getLocalMedia } =useLocalMediaStream(mediaConstrains);
	const { message, sendMessage,error: pusherError }  = usePusherSignaling({ currentUser,roomId });
	const { handleSendMessage,media,UIState, webRTCError } =useWebRTC({ sendMessage,message,localMediaStream,getLocalMedia, iceServers, name,target });
	return  { handleSendMessage,media,UIState,pusherError,webRTCError };
}