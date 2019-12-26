import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import './style.css';
export default function DisplayMediaStream ({ mediaStream, width, height,style, name }) {
	const videoRef =useRef(null);


	useEffect(() => {
		if (mediaStream !==null){
			videoRef.current.srcObject =mediaStream;
		}
	},[mediaStream]);
	
	 if (mediaStream !==null){
		return (<video  width={width} autoPlay  ref={videoRef} />);
	
	}

	
}