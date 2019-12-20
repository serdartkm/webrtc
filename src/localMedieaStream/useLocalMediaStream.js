import { h } from 'preact';
import { useEffect,useState } from 'preact/hooks';
import getlocalUserMedia from './getMediaStream';
export default function useLocalMediaStream (mediaStreamConstraints) {
	
	
	const [localMediaStream,setLocalMediaStream]= useState(null);

	const [error,setError]=useState(null);
	useEffect(() => {

		getlocalUserMedia(mediaStreamConstraints,(error,media) => {
			if (error){
				setError(error);
			
			}
			else {
				setLocalMediaStream(media);
			
			}
		});

	},[]);

	return { error,localMediaStream };

}