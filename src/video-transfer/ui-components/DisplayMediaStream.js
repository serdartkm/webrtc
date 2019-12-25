import { h } from 'preact';
import { useRef, useEffect } from 'preact/hooks';

export default function DisplayMediaStream ({ mediaStream, width, height,style, name }) {
	const videoRef =useRef(null);


	useEffect(() => {
		if (mediaStream !==null){
			videoRef.current.srcObject =mediaStream;
		}
	},[mediaStream]);
	
	 if (mediaStream !==null){
		return (<div style={{ display: 'flex',justifyContent: 'center' }}>
			<h3 style={{ position: 'absolute',bottom: 0,left: 2, color: 'white' }}>{name}</h3>
			<video  height={height}  autoPlay style={style} ref={videoRef} />
		</div>);
	}

	
}