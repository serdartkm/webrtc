/* eslint-disable react/prefer-stateless-function */
import './style';
import { Component } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import useLocalMediaStream from './localMedieaStream/useLocalMediaStream';

const DisplayMedia = () => {
	const { error,localMediaStream } = useLocalMediaStream({ video: true,audio: false });
	const videoRef =useRef(null);

	useEffect(() => {
		if (localMediaStream){
			videoRef.current.srcObject =localMediaStream;
		}

		if (error){
			console.log('error',error);
		}

	},[localMediaStream,error]);

	return (<video ref={videoRef} />);
};

export default class App extends Component {
	render() {
		return (
			<div>
				<h1>Hello, World!</h1>
				<DisplayMedia />
			</div>
		);
	}
}
