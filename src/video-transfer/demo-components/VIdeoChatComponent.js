/* eslint-disable react/prefer-stateless-function */
import { useState,useEffect } from 'preact/hooks';
import RTCStateComponent from '../ui-components/RTCStateView';
import useWebRTC from '../../webrtc/useWebRTC';
import usePusherSignaling from '../../signaling-service/pusher/usePusherSignaling';
import config from './servers';
import VideoChatView from '../ui-components/VideoChatView';
import useWebRTCUIState from '../../webrtc/useWebRTCUIState';

export default function  VideoChatComponent ({ userId,localMediaStream,mediaError,targetId, getLocalMedia,currentUser,pusherError,connecting }) {

	const [offer,setOffer] =useState(null);
	const [answer,setAnswer]=useState(null);
	const [candidate,setCandidate] =useState(null);
	const [close,setClose]=useState(false);
	const [decline,setDecline]=useState(false);
	const { remoteAnswer,remoteOffer,remoteCandidate, remoteClose }  =usePusherSignaling({ currentUser,roomId: '96d32222-d450-4341-9dc0-b3eccec9e37f',targetId,localAnswer: answer,localOffer: offer,localCandidate: candidate,localClose: close,localDecline: decline });
	const { localOffer,localAnswer,localCandidate,localClose,localDecline, state,sendOffer,sendAnswer,sendClose,sendDecline,remoteMediaStream,webrtcError } =useWebRTC({ remoteAnswer,remoteCandidate,remoteOffer,remoteClose,config,localMediaStream,getLocalMedia });
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
		localClose,
		localAnswer,
		localOffer,
		localDecline,
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

	useEffect(() => {
		if (localClose){
			setClose(true);
			resetState();
		}
	},[localClose]);
	useEffect(() => {
		if (localDecline){
			setDecline(true);
			resetState();
		}
	},[localDecline]);

	function resetState(){
	  setTimeout(() => {
			setAnswer(null);
			setCandidate(null);
			setOffer(null);
			setClose(false);
	  },0);
	}
	return [ <div>
		<div style={{  height: '50vh', width: 600 }}>
			<VideoChatView
				remoteStreamSize={{ height: 300, width: 600 }}
				localStreamSize={{ height: 100, width: 100 }}
				target={targetId}
				name={userId}
				closeLabel={closeLabel}
				localMediaStream={localMediaStream}
				remoteMediaStream={remoteMediaStream}
				sendOffer={sendOffer}
				sendClose={sendClose}
				sendAnswer={sendAnswer}
				sendDecline={sendDecline}
				disableAnswerButton={disableAnswerButton}
				disableCallButton={disableCallButton}
				calling={calling}
				recievingCall={recievingCall}
				isCallee={isCallee}
				isCaller={isCaller}
				connected={connected}
			/>
		</div>,
		<RTCStateComponent
			connectionState={state.connectionState}
			signalingState={state.signalingState}
			iceConnectionState={state.iceConnectionState}
			iceGatheringState={state.iceGatheringState}
		/>,
		<div style={{ color: 'red',fontSize: 20 }}>{pusherError && pusherError.message}</div>,
		<div style={{ color: 'red',fontSize: 20 }}>{webrtcError && webrtcError.message}</div>

	</div>

	
	];
    
}