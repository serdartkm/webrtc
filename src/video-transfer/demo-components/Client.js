import { h }  from 'preact';
import useWebRTCPusherApp from '../../webrtc/webrtc-pusher-app';
import VideoChatView from '../ui-components/VideoChatView';
import RTCStateView from '../ui-components/RTCStateView';

const mediaSize ={
	localStreamSize: { height: 100, width: 100 },
	remoteStreamSize: { height: 300, width: 500 }
};

const mediaConstraints ={ video: true,audio: false };
// const roomId ='96d32222-d450-4341-9dc0-b3eccec9e37f' ;
export default function Client  ({ name,target,currentUser }){

	const { handleSendMessage,state,remoteMediaStream,localMediaStream, pusherError,webRTCError } =useWebRTCPusherApp({ currentUser, roomId: '0d3729a6-d4c2-4af0-8e7a-1efc9ea0f428', name,target,mediaConstraints });

	return (
		<div style={{ height: '30vh', width: 600 }}>
			<VideoChatView mediaSize={mediaSize} handleSendMessage={handleSendMessage} state={state} localMediaStream={localMediaStream} remoteMediaStream={remoteMediaStream} pusherError={pusherError}
				webRTCError={webRTCError}
			/>
			<div>{webRTCError && webRTCError.message}</div>
			<div>{pusherError && pusherError.message}</div>
			<RTCStateView  {...state} />
		</div>
	);

}