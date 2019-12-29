import { h }  from 'preact';
import usePusher,{ getPusherConfig } from '../../signaling-service/pusher/usePusher';

import useWebRTCPusherApp from '../../webrtc/webrtc-pusher-app';
import VideoChatView from '../ui-components/VideoChatView';

const mediaSize ={
	localStreamSize: { height: 100, width: 100 },
	remoteStreamSize: { height: 300, width: 500 }
};

const mediaConstrains ={ video: true,audio: false };
const roomId ='96d32222-d450-4341-9dc0-b3eccec9e37f' ;

export default function Client  ({ userId }){

	const { currentUser } = usePusher(getPusherConfig({ userId }));
	const { handleSendMessage,UIState,media,pusherError,webRTCError } =useWebRTCPusherApp({ mediaConstrains,currentUser,roomId });

	return (
		<div style={{ height: '70vh', width:500 }}>
			<VideoChatView mediaSize={mediaSize} handleSendMessage={handleSendMessage} UIState={UIState} media={media} pusherError={pusherError} webRTCError={webRTCError} />
		</div>
	);

}