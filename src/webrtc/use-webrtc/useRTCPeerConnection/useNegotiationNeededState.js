import { useEffect, useState } from 'preact/hooks';
import createOffer from './createOffer';
import createAnswer from './createAnswer';

export default function useNegotiationNeededState ({ rtcPeerConnection,remoteOffer }){

	const [localOffer,setLocalOffer]=useState(null);
	const [localAnswer,setLocalAnswer]=useState(null);
	const [localOfferError,setLocalOfferError] =useState(null);
	const [localAnswerError,setLocalAnswerError]=useState(null);
    
	useEffect(() => {
		if (rtcPeerConnection){
			rtcPeerConnection.onnegotiationneeded=() => {
				 if (remoteOffer){
					createAnswer(rtcPeerConnection,remoteOffer,(error,answer) => {
						if (error){
							setLocalAnswerError(error);
						}
						else {
							setLocalAnswer(answer);
						}
					});
				}
				else {
					createOffer(rtcPeerConnection,(error,offer) => {
						if (error){
							setLocalOfferError(error);
						}
						else {
							setLocalOffer(offer);
						}
					});
				}
			};
		}
		else {
			setLocalOffer(null);
			setLocalAnswer(null);
			setLocalAnswerError(null);
			setLocalOfferError(null);
		}
	},[rtcPeerConnection]);
    
    
	return { localAnswer,localAnswerError,localOffer,localOfferError };
}