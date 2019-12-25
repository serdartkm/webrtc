import { useState,useEffect }  from 'preact/hooks';

export default function useUIState ({ localOffer,localAnswer,remoteOffer,remoteAnswer, state }){

	const [displayRemoteStream,setDisplayRemoteStream]= useState(false);
	const [displayLocalStream,setDisplayLocaStream]=useState(false);
	const [disableCallButton,setDisableCallButton]=useState(false);
	const [disableAnswerButton,setDisableAnswerButtob]=useState(false);
	const [calling,setCalling]=useState(false);
	const [recievingCall,setRecievingCall]=useState(false);
	const [displayCallAnimation,setDisplayCallAnimation]=useState(true);

	useEffect(() => {
		if (localOffer){
			setDisableCallButton(true);
			setCalling(true);
		}
	},[localOffer]);

	useEffect(() => {
		if (localAnswer){
			setDisableAnswerButtob(true);
		}
	},[localAnswer]);
    
	useEffect(() => {
		if (remoteOffer){
			setRecievingCall(true);
		}
	},[remoteOffer]);
    
	useEffect(() => {
		if (state && state.connectionState==='connected'){
			setDisplayRemoteStream(true);
			setDisplayLocaStream(true);
			setCalling(false);
			setRecievingCall(false);
			setDisplayCallAnimation(false);
		}
	},[state]);

	return {
		disableAnswerButton,
		displayCallAnimation,
		disableCallButton,
		displayLocalStream,
		displayRemoteStream,
		calling,
		recievingCall
	};

}