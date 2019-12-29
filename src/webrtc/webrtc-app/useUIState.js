import { useState, useEffect } from 'preact/hooks';

export default function useUIState({
	localOffer,
	localAnswer,
	remoteOffer,
	localDecline,
	remoteAnswer,
	state,
	localClose
}) {
	const [calling, setCalling] = useState(false);
	const [recievingCall, setRecievingCall] = useState(false);
	const [connected, setConnected] = useState(false);
	const [closeLabel, setCloseLabel] = useState('');
	function resetState() {
		setCalling(false);
		setRecievingCall(false);
		setConnected(false);
		setCloseLabel('');
	}
	useEffect(() => {
		if (localOffer) {
			setCalling(true);

			setCloseLabel('Cancel');
		}
	}, [localOffer]);

	useEffect(() => {
		if (remoteOffer) {
			setRecievingCall(true);
			setCloseLabel('Decline');
		}
	}, [remoteOffer]);

	useEffect(() => {
		if (localOffer && state && state.connectionState === 'connected') {
			setCalling(false);
			setRecievingCall(false);
			setConnected(true);
			setCloseLabel('End');
		}
	}, [state, localOffer]);
	useEffect(() => {
		if (!localAnswer && !localOffer) {
			setConnected(false);
			setCalling(false);
			setRecievingCall(false);
		}
	}, [localOffer, localAnswer]);
	useEffect(() => {
		if (localAnswer && state && state.connectionState === 'connected') {
			setCalling(false);
			setRecievingCall(false);
			setConnected(true);
			setCloseLabel('End');
		}
	}, [state, localAnswer]);
	useEffect(() => {
		if (localClose || localDecline) {
			resetState();
		}
	}, [localClose, localDecline]);
	return {
		calling,
		recievingCall,
		connected,
		closeLabel
	};
}
