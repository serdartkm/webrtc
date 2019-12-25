/* eslint-disable react/prefer-stateless-function */
import { useState,useEffect } from 'preact/hooks';
import RTCStateComponent from '../ui-components/RTCStateView';
import useWebRTC from '../../webrtc/useWebRTC';
import usePusherSignaling from '../../signaling-service/pusher/usePusherSignaling';
import usePusher from '../../signaling-service/pusher/usePusher';
import config from './servers';
import ConnectingToPusher from '../ui-components/ConnectingToPusher';
import VideoChatView from '../ui-components/VideoChatView';
import useWebRTCUIState from '../../webrtc/useWebRTCUIState';

export default function  VideoChatComponent ({ userId,localMediaStream,mediaError,targetId, getLocalMedia }) {
	const pusherConfig ={
		instanceLocator: 'v1:us1:655c56ba-ae22-49a7-9cdb-ccd682a39c84',
		userId,
		url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/655c56ba-ae22-49a7-9cdb-ccd682a39c84/token' };
	const { currentUser,pusherError, connecting } =usePusher(pusherConfig);
	const [offer,setOffer] =useState(null);
	const [answer,setAnswer]=useState(null);
	const [candidate,setCandidate] =useState(null);
	const { remoteAnswer,remoteOffer,remoteCandidate }  =usePusherSignaling({ currentUser,roomId: '96d32222-d450-4341-9dc0-b3eccec9e37f',targetId,localAnswer: answer,localOffer: offer,localCandidate: candidate });
	const { localOffer,localAnswer,localCandidate, state,sendOffer,sendAnswer,remoteMediaStream,webrtcError } =useWebRTC({ remoteAnswer,remoteCandidate,remoteOffer,config,localMediaStream,getLocalMedia });
	const {
		disableAnswerButton,
		disableCallButton,
		calling,
		recievingCall,
		connected,
		isCaller,
		isCallee,
		closeLabel
	  } = useWebRTCUIState({
		localAnswer,
		localOffer,
		state,
		remoteAnswer,
		remoteOffer
	  });
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

	if (connecting){
		return <ConnectingToPusher />;
	}
	
	return (<div style={{ position: 'relative', display: 'flex',flexDirection: 'column', alignItems: 'center', height: '40vh' }}>
		<VideoChatView
			remoteStreamSize={{ height: 300, width: 300 }}
			localStreamSize={{ height: 100, width: 100 }}
			target={targetId}
			name={userId}
			closeLabel={closeLabel}
			localMediaStream={localMediaStream}
			remoteMediaStream={remoteMediaStream}
			sendOffer={sendOffer}
			sendAnswer={sendAnswer}
			disableAnswerButton={disableAnswerButton}
			disableCallButton={disableCallButton}
			calling={calling}
			recievingCall={recievingCall}
			isCallee={isCallee}
			isCaller={isCaller}
			connected={connected}
		/>
		<RTCStateComponent
			connectionState={state.connectionState}
			signalingState={state.signalingState}
			iceConnectionState={state.iceConnectionState}
			iceGatheringState={state.iceGatheringState}
		/>
		<div style={{ color: 'red',fontSize: 20 }}>{pusherError && pusherError.message}</div>
		<div style={{ color: 'red',fontSize: 20 }}>{webrtcError && webrtcError.message}</div>
	</div>
	);
    
}