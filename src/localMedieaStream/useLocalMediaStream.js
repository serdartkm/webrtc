import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import getMediaStream from './getMediaStream';
export default async function ({ mediaStreamConstraints }){

	const [localMediaStream, setLocalMediaStream]=useState(null);
	const [error,setError]= useState(null);
	useEffect(() => {

		getMediaStream(mediaStreamConstraints,(error,mediaStream) => {
			if (error){
				setError(error);
			}
			else {
				setLocalMediaStream(mediaStream);
			}
		});

	},[mediaStreamConstraints]);
	return { localMediaStream,error };
}