import { h }  from 'preact';

import VideoChatComponent from './VIdeoChatComponent';
import useLocalMediaStream from '../localMedieaStream/useLocalMediaStream';
import usePusher,{ getPusherConfig } from '../../signaling-service/pusher/usePusher';
import ConnectingToPusher from '../../video-transfer/ui-components/ConnectingToPusher';

export default function VideoChatDemo (){

	const { currentUser: mario,pusherError: pusherErrorMario, connecting: marioConnecting } = usePusher(getPusherConfig({ userId: 'mmario' }));

	const { currentUser: dragos,pusherError: pusherErrorDragos, connecting: dragosConnecting } = usePusher(getPusherConfig({ userId: 'ddragos' }));

	const { localMediaStream,mediaError ,getLocalMedia }= useLocalMediaStream({ video: true,audio: false });

	if (mario && dragos)

		return (<div style={{ display: 'flex' ,justifyContent: 'space-between',width: 1400 }}>
			<VideoChatComponent currentUser={mario} pusherError={pusherErrorMario} connecting={marioConnecting} getLocalMedia={getLocalMedia} mediaError={mediaError} localMediaStream={localMediaStream}
				userId="mmario" targetId="ddragos"
			/>
			<VideoChatComponent currentUser={dragos} pusherError={pusherErrorDragos} connecting={dragosConnecting} getLocalMedia={getLocalMedia} mediaError={mediaError} localMediaStream={localMediaStream}
				userId="ddragos" targetId="mmario"
			/>
		</div>);

	return <ConnectingToPusher />;
}