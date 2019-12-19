import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import getMediaStream from './getMediaStream';
export default  function ({ mediaStreamConstraints }){

	const [localMediaStream, setLocalMediaStream]=useState(null);
	const [error,setError]= useState(null);
	useEffect(() => {
			console.log("useLMS")
		getMediaStream(mediaStreamConstraints,(error,mediaStream) => {
			if (error){
                debugger
				setError(error);
			}
			else {
				setLocalMediaStream(mediaStream);
			}
		});

	},[error,localMediaStream]);
	return { localMediaStream,error };
}