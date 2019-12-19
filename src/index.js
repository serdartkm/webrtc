/* eslint-disable react/prefer-stateless-function */
import './style';
import { Component } from 'preact';
import { useRef, useEffect } from 'preact/hooks';
import useLocalMediaStream from './localMedieaStream/useLocalMediaStream';

const DisplayMedia = () => {
	debugger
	const { error,localMediaStream } = useLocalMediaStream({ video: true,audio: false });
	const videoRef =useRef(null);

	useEffect(() => {
		debugger
		if (localMediaStream){
			debugger
			videoRef.current.srcObject =localMediaStream;
		}

		if (error){
			debugger
			console.log('error',error);
		}

	},[]);

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
