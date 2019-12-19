import { h } from 'preact';
import { useEffect,useState } from 'preact/hooks';
import getlocalUserMedia from './getMediaStream';
export default function useLocalMediaStream (mediaStreamConstraints) {
	
	
	const [localMedia,setLocalMedia]= useState(null);

	const [error,setError]=useState(null);
	useEffect(() => {

		getlocalUserMedia(mediaStreamConstraints,(error,media) => {
			if (error){
				setError(error);
			
			}
			else {
				setLocalMedia(media);
			
			}
		});

	},[]);

	return { error,localMedia };

}