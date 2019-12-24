import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';

export default function DisplayMediaStream ({ mediaStream, width, height }) {
	const videoRef =useRef(null);


	useEffect(() => {
		if (mediaStream !==null){
			videoRef.current.srcObject =mediaStream;
		}
	},[mediaStream]);
	
	 if (mediaStream !==null){
		return (<video width={width} height={height} autoPlay style={{  backgroundColor: 'yellow' }} ref={videoRef} />);
	}

	
}