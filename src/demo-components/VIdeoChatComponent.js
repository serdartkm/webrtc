/* eslint-disable react/prefer-stateless-function */
import { useState,useEffect } from 'preact/hooks';
import DisplayMediaStream from '../ui-components/DisplayMediaStream';
import RTCStateComponent from '../ui-components/RTCStateComponent';
import useWebRTC from '../webrtc/useWebRTC';
import usePusherSignaling from '../signaling-service/usePusherSignaling';
import config from './servers';
export default function  VideoChatComponent ({ userId,localMediaStream,mediaError,targetId }) {
	const pusherConfig ={ roomId: '96d32222-d450-4341-9dc0-b3eccec9e37f' ,
		instanceLocator: 'v1:us1:655c56ba-ae22-49a7-9cdb-ccd682a39c84',
		userId,
		url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/655c56ba-ae22-49a7-9cdb-ccd682a39c84/token' };

	const [offer,setOffer] =useState(null);
	const [answer,setAnswer]=useState(null);
	const [candidate,setCandidate] =useState(null);
	const { remoteAnswer,remoteOffer,remoteCandidate, caller }  =usePusherSignaling({ pusherConfig,targetId,localAnswer: answer,localOffer: offer,localCandidate: candidate });
	const { localOffer,localAnswer,localCandidate, state,sendOffer,sendAnswer,remoteMediaStream,error } =useWebRTC({ remoteAnswer,remoteCandidate,remoteOffer,config,localMediaStream });

	useEffect(() => {
		if (localAnswer){
			setAnswer(localAnswer);
		}
	},[localAnswer]);

	useEffect(() => {
		if (localOffer){
			setOffer(localOffer);
		}
	},[localOffer]);

	useEffect(() => {
		if (localCandidate){
			setCandidate(localCandidate);
		}
	},[localCandidate]);
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
			<RTCStateComponent error={error}  connectionState={state.connectionState} signalingState={state.signalingState} iceConnectionState={state.iceConnectionState} iceGatheringState={state.iceGatheringState}  />
		</div>
	</div> );
    
}