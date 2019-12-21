/* eslint-disable react/prefer-stateless-function */
import { useEffect } from 'preact/hooks';
import useRTCPeerConnection from '../rtcPeerConnection/useRTCPeerConnection';
import usePusherSignaling from '../signaling-service/usePusherSignaling';
import DisplayMediaStream from '../ui-components/DisplayMediaStream';

export default function  VideoChatComponent ({ userId,localMediaStream,mediaError,targetId }) {
	const pusherConfig ={ roomId: '96d32222-d450-4341-9dc0-b3eccec9e37f' ,
		instanceLocator: 'v1:us1:655c56ba-ae22-49a7-9cdb-ccd682a39c84',
		userId,
		url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/655c56ba-ae22-49a7-9cdb-ccd682a39c84/token' };

	
	const { remoteMediaStream,rtcConfig } =useRTCPeerConnection({ localMediaStream });
	const { sendOffer,sendAnswer, caller, error }  =usePusherSignaling({ pusherConfig,rtcConfig,targetId });


	useEffect(() => {
		if (caller){
		
		}
	
	},[caller]);

	return (<div>
		<div>
			LocalMedia
			<DisplayMediaStream mediaStream={localMediaStream} mediaError={mediaError} />
			<button onClick={sendOffer}>Call</button>
			<button onClick={sendAnswer}>Answer</button>
		</div>
		<div>
			{caller && <div>Call from :{caller}</div>}
			Remote Media
			<DisplayMediaStream mediaStream={remoteMediaStream} />
		</div>
	</div> );
    
}