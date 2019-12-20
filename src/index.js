/* eslint-disable react/prefer-stateless-function */
import './style';
import { Component } from 'preact';
import useLocalMediaStream from './localMedieaStream/useLocalMediaStream';
import useRTCPeerConnection from './rtcPeerConnection/useRTCPeerConnection';
import usePusherSignaling from './signaling-service/usePusherSignaling';
import DisplayMediaStream from './ui-components/DisplayMediaStream';

//import DisplayLocalMedia from './ui-components/DisplayLocalMedia';
const pusherConfig ={ roomId: '96d32222-d450-4341-9dc0-b3eccec9e37f' ,
	instanceLocator: 'v1:us1:655c56ba-ae22-49a7-9cdb-ccd682a39c84',
	userId: 'dragos',
	url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/655c56ba-ae22-49a7-9cdb-ccd682a39c84/token' };


const Signaling =() => {
	const { localMediaStream,mediaError }= useLocalMediaStream({ video: true,audio: false });
	const { remoteMediaStream,rtcConfig } =useRTCPeerConnection({ localMediaStream });
	const { sendCall,sendRespond }  =usePusherSignaling({ pusherConfig,rtcConfig });

	return (<div>
		<div>
			LocalMedia
			<DisplayMediaStream mediaStream={localMediaStream} mediaError={mediaError} />
			<button onClick={sendCall}>Call</button>
			<button onClick={sendRespond}>Answer</button>
		</div>
		<div>
			Remote Media
			<DisplayMediaStream mediaStream={remoteMediaStream} />
		</div>
	</div>);

};

export default class App extends Component {
	render() {
		return (
			<div>
				<h1>Hello, World!</h1>
				<Signaling />
			
			</div>
		);
	}
}
