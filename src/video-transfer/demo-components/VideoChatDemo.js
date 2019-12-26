import VideoChatComponent from './VIdeoChatComponent';
import useLocalMediaStream from '../localMedieaStream/useLocalMediaStream';
export default function VideoChatDemo (){
    
	const { localMediaStream,mediaError ,getLocalMedia }= useLocalMediaStream({ video: true,audio: false });
	return (<div style={{ display: 'flex' ,justifyContent: 'space-between',width: 1100 }}>
		<VideoChatComponent getLocalMedia={getLocalMedia} mediaError={mediaError} localMediaStream={localMediaStream} userId="mario" targetId="dragos" />
		<VideoChatComponent getLocalMedia={getLocalMedia} mediaError={mediaError} localMediaStream={localMediaStream} userId="dragos" targetId="mario" />
	
	</div>);
}