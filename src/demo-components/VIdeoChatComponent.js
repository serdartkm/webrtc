/* eslint-disable react/prefer-stateless-function */
import { useEffect } from 'preact/hooks';
import useRTCPeerConnection from '../rtcPeerConnection/useRTCPeerConnection';
import usePusherSignaling from '../signaling-service/usePusherSignaling';
import DisplayMediaStream from '../ui-components/DisplayMediaStream';
import RTCConnectionState from '../ui-components/RTCConnectionState';
import RTCStateComponent from '../ui-components/RTCStateComponent';
import config from './servers';
export default function  VideoChatComponent ({ userId,localMediaStream,mediaError,targetId }) {
	const pusherConfig ={ roomId: '96d32222-d450-4341-9dc0-b3eccec9e37f' ,
		instanceLocator: 'v1:us1:655c56ba-ae22-49a7-9cdb-ccd682a39c84',
		userId,
		url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/655c56ba-ae22-49a7-9cdb-ccd682a39c84/token' };

	
	const { remoteMediaStream,rtcConfig, connectionState,signalingState,iceConnectionState,iceGatheringState, remoteTrackAdded,error } =useRTCPeerConnection({ config, localMediaStream });
	const { sendOffer,sendAnswer, caller }  =usePusherSignaling({ pusherConfig,rtcConfig,targetId });


	useEffect(() => {
		if (caller){
		
		}
	
	},[caller]);

	return (<div style={{ position: 'relative' }}>
		<div style={{ position: 'absolute',  backgroundColor: 'yellow' }}>
		
		
			<DisplayMediaStream height={150} width={150}  mediaStream={localMediaStream} mediaError={mediaError} />
			
		
		</div>
		<div style={{ height: '30vh', backgroundColor: 'blue' }} >
			<div>
				{caller && <div>Call from :{caller}</div>}
			Remote Media
			</div>
		
			<DisplayMediaStream  mediaStream={remoteMediaStream} />
			
		</div>
		<div>
			<div>
				<button onClick={sendOffer}>Call</button>
				<button onClick={sendAnswer}>Answer</button>
			</div>
			<RTCStateComponent  connectionState={connectionState} signalingState={signalingState} iceConnectionState={iceConnectionState} iceGatheringState={iceGatheringState}  />
		</div>
	</div> );
    
}