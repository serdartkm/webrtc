import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import './style.css';
export default function DisplayMediaStream ({ mediaStream, width, height,style, name }) {
	const videoRef =useRef(null);


	useEffect(() => {
		if (mediaStream !==null){
			videoRef.current.srcObject =mediaStream;
		}
		else if (videoRef.current.srcObject && mediaStream===null){
			videoRef.current.srcObject.getTracks().forEach(t => t.stop());
			videoRef.current.srcObject=null;
		}
	},[mediaStream]);

	// useEffect(() => {
	// 	if (localClose && videoRef.current.srcObject){
	// 		videoRef.current.srcObject.getTracks().forEach(t => t.stop());
	// 		videoRef.current.srcObject=null;
	// 	}

	// },[localClose]);
	
	 if (mediaStream !==null){
		return (<video  width={width} autoPlay  ref={videoRef} />);
	
	}
	return null;
	
}