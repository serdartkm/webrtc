import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import useLocalMediaStream from '../localMedieaStream/useLocalMediaStream';


export default function DisplayLocalMedia () {
	const videoRef =useRef(null);
	const { localMedia,error }=useLocalMediaStream({ video: true,audio: false });

	useEffect(() => {
		if (localMedia !==null){
			videoRef.current.srcObject =localMedia;
		}
	},[localMedia]);
	if (error){
		return <div>{error.message}</div>;
	}
	 if (localMedia !==null){
		return (<video autoPlay style={{  backgroundColor: 'yellow' }} ref={videoRef} />);
	}
	return <div>Loading...</div>;
	
}