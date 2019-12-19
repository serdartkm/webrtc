/* eslint-disable react/prefer-stateless-function */
import './style';
import { Component } from 'preact';
import { useRef, useEffect, useState } from 'preact/hooks';
import getlocalUserMedia from './localMedieaStream/getMediaStream';

const DisplayMedia = () => {
	
	const videoRef =useRef(null);
	const [localMedia,setLocalMedia]= useState(null);
	const [error,setError]=useState(null);
	useEffect(() => {
		getlocalUserMedia({},(error,media) => {
			if (error){
				setError(error);
				debugger;
			}
			else {
				setLocalMedia(media);
				debugger;
			}
		});

	},[]);

	useEffect(() => {
		if (localMedia !==null){
			videoRef.current.srcObject =localMedia;
			debugger;
		}
	},[localMedia]);

	return (<video autoPlay style={{  backgroundColor: 'yellow' }} ref={videoRef} />);
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
