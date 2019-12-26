/** @jsx h */
import { h } from 'preact';
import VideoChatView from '../src/video-transfer/ui-components/VideoChatView';
import FetchMedia from '../src/video-transfer/ui-components/FetchMedia';
export default {
	title: 'VideoChatView'
};

const localStreamSize = { height: 100, width: 100 };
const remoteStreamSize = { height: 300, width: 500 };

const style = {
	height: '50vh',
	width: 500

	// debugging property

//	padding: 4
// background-color: orange;
};

function Container({ children }) {
	return <div style={style}>{children}</div>;
}

export function ready() {
	return (
		<Container>
			<VideoChatView
				calling={false}
				recievingCall={false}
				isCaller
				isCallee
				localStreamSize={localStreamSize}
				remoteStreamSize={remoteStreamSize}
			/>
		</Container>
	);
}

export function calling() {
	return (
		<Container>
			{' '}
			<VideoChatView
				closeLabel="Cancel"
				calling
				recievingCall={false}
				localStreamSize={localStreamSize}
				remoteStreamSize={remoteStreamSize}
			/>
		</Container>
	);
}

export function recievingCall() {
	return (
		<Container>
			{' '}
			<VideoChatView
				closeLabel="Decline"
				recievingCall
				localStreamSize={localStreamSize}
				remoteStreamSize={remoteStreamSize}
			/>
		</Container>
	);
}

export function connected() {
	return (

		<FetchMedia  constraint={{ video: { height: 100,width: 100 } }}>{({ localMediaStream }) => (<Container>
			{' '}
			<VideoChatView
				remoteMediaStream={localMediaStream}
				localMediaStream={localMediaStream}
				closeLabel="End"
				connected
				localStreamSize={localStreamSize}
				remoteStreamSize={remoteStreamSize}
			/>
		</Container>)}</FetchMedia>
		
	);
}
