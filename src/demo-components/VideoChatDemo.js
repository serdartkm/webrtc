import VideoChatComponent from './VIdeoChatComponent';
import useLocalMediaStream from '../localMedieaStream/useLocalMediaStream';
export default function VideoChatDemo (){
    
	const { localMediaStream,mediaError }= useLocalMediaStream({ video: true,audio: false });
	return (<div>
        WebRTC VideoChat Demo
		<div>
            Client Mario
			<VideoChatComponent mediaError={mediaError} localMediaStream={localMediaStream} userId="mario" targetId="dragos" />
		</div>
		<div>Client Dragos

			<VideoChatComponent mediaError={mediaError} localMediaStream={localMediaStream} userId="dragos" targetId="mario" />
		</div>
	</div>);
}