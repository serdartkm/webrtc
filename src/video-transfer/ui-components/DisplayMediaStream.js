import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import './style.css';
export default function DisplayMediaStream ({ mediaStream, width, height,style, name, localClose }) {
	const videoRef =useRef(null);


	useEffect(() => {
		if (mediaStream !==null && !localClose){
			videoRef.current.srcObject =mediaStream;
		}
	},[mediaStream]);

	useEffect(() => {
		if (localClose && videoRef.current.srcObject){
			videoRef.current.srcObject.getTracks().forEach(t => t.stop());
			videoRef.current.srcObject=null;
		}

	},[localClose]);
	
	 if (mediaStream !==null){
		return (<video  width={width} autoPlay  ref={videoRef} />);
	
	}

	
}