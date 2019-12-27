import { useState,useEffect }  from 'preact/hooks';

export default function useUIState ({ localOffer,localAnswer,remoteOffer,remoteAnswer, state, close }){


	const [calling,setCalling]=useState(false);
	const [recievingCall,setRecievingCall]=useState(false);
	const [connected,setConnected]=useState(false);

	const [closeLabel, setCloseLabel] =useState('');
	useEffect(() => {
		if (localOffer){
		
			setCalling(true);
		
			setCloseLabel('Cancel');
		}
	},[localOffer]);

	useEffect(() => {
		if (remoteOffer){
			setRecievingCall(true);
			setCloseLabel('Decline');
			
		}
	},[remoteOffer]);
    
	useEffect(() => {
		if (localOffer && state && state.connectionState==='connected'){
			setCalling(false);
			setRecievingCall(false);
			setConnected(true);
			setCloseLabel('End');
		}
	},[state,localOffer]);
	useEffect(() => {
		if (localAnswer && state && state.connectionState==='connected'){
			setCalling(false);
			setRecievingCall(false);
			setConnected(true);
			setCloseLabel('End');
		}
	},[state,localAnswer]);
	useEffect(() => {
		if (close){
			setConnected(false);
			setCalling(false);
			setRecievingCall(false);
		}

	},[close]);
	return {
		calling,
		recievingCall,
		connected,
		closeLabel
	};

}