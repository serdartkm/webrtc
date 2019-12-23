import VideoChatComponent from './VIdeoChatComponent';
import useLocalMediaStream from '../localMedieaStream/useLocalMediaStream';
export default function VideoChatDemo (){
    
	const { localMediaStream,mediaError }= useLocalMediaStream({ video: true,audio: false });
	return (<div style={{ display: 'flex' ,justifyContent: 'space-between' }}>
     
		<div style={{ flex: 1 }}>
            Client Mario
			<VideoChatComponent mediaError={mediaError} localMediaStream={localMediaStream} userId="mario" targetId="dragos" />
		</div>
		<div style={{ flex: 1 }}>Client Dragos

			<VideoChatComponent mediaError={mediaError} localMediaStream={localMediaStream} userId="dragos" targetId="mario" />
		</div>
	</div>);
}