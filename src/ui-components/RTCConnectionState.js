import { h } from 'preact';

export default function RTCConnectionState ({ connectionState,signalingState, iceConnectionState,iceGatheringState,error, remoteTrackAdded }){

	return (<div >
		<div>
			<h3>RTCConnectionState</h3>
		</div>
		<div>connectionState: {connectionState}</div>
		<div>signalingState: {signalingState}</div>
		<div>iceCandidateState: {signalingState}</div>
		<div>iceConnectionState:{iceConnectionState}</div>
		<div>iceGatheringState:{iceGatheringState}</div>
		<div>remoteTrackAdded:{remoteTrackAdded.toString()}</div>
		<div>error:{error && error.message}</div>
	</div>);

}