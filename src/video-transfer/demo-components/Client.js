import { h }  from 'preact';

import useWebRTCPusherApp from '../../webrtc/webrtc-pusher-app';
import VideoChatView from '../ui-components/VideoChatView';

const mediaSize ={
	localStreamSize: { height: 100, width: 100 },
	remoteStreamSize: { height: 300, width: 500 }
};

const mediaConstrains ={ video: true,audio: false };
// const roomId ='96d32222-d450-4341-9dc0-b3eccec9e37f' ;
export default function Client  ({ name,target,currentUser }){


	const { handleSendMessage,UIState,media,pusherError,webRTCError } =useWebRTCPusherApp({ mediaConstrains,currentUser, roomId: '0cc69727-c8bb-4b50-b79d-275d6d14e150', name,target });

	return (
		<div style={{ height: '70vh', width: 500 }}>
			<VideoChatView mediaSize={mediaSize} handleSendMessage={handleSendMessage} UIState={UIState} media={media} pusherError={pusherError} webRTCError={webRTCError} />
		</div>
	);

}