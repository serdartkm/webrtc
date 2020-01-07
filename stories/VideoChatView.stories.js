/** @jsx h */
import { h } from 'preact';
import VideoChatView from '../src/video-transfer/ui-components/VideoChatView';
import FetchMedia from '../src/video-transfer/ui-components/FetchMedia';
export default {
	title: 'VideoChatView'
};
const mediaSize ={
	localStreamSize: { height: 100, width: 100 },
	remoteStreamSize: { height: 250, width: 250 }
};


const style = {
	height: '50vh',
	width: 500

	// debugging property

//	padding: 4
// background-color: orange;
};

const readyUiState ={
	connected: false,
	callBtnVisible: true,
	cancellBtnVisible: false,
	answerBtnVisible: false,
	declineBtnVisible: false,
	ignoreBtnVisible: false,
	calling: false,
	recievingCall: false,
	callEnded: false


};

const callingUiState ={
	connected: false,
	callBtnVisible: false,
	cancellBtnVisible: true,
	answerBtnVisible: false,
	declineBtnVisible: false,
	ignoreBtnVisible: false,
	calling: true,
	recievingCall: false,
	callEnded: false


};

const recievingUiState ={
	connected: false,
	callBtnVisible: false,
	cancellBtnVisible: false,
	answerBtnVisible: true,
	declineBtnVisible: true,
	ignoreBtnVisible: true,
	calling: false,
	recievingCall: true,
	callEnded: false


};

const connectedUiState ={
	connected: true,
	callBtnVisible: false,
	cancellBtnVisible: false,
	answerBtnVisible: false,
	declineBtnVisible: false,
	ignoreBtnVisible: false,
	calling: false,
	recievingCall: false,
	callEndBtnVisible: true


};
function Container({ children }) {
	return <div style={style}>{children}</div>;
}

export function ready() {
	return (
		<Container>
			<VideoChatView
				uiState={readyUiState}
		
				mediaSize={mediaSize}
			/>
		</Container>
	);
}

export function calling() {
	return (
		<Container>
			{' '}
			<VideoChatView
				uiState={callingUiState}
				target="dragos"
				mediaSize={mediaSize}
			/>
		</Container>
	);
}

export function recievingCall() {
	return (
		<Container>
			{' '}
			<VideoChatView
				uiState={recievingUiState}
				target="dragos"
				mediaSize={mediaSize}
			/>
		</Container>
	);
}

export function connected() {
	return (

		<FetchMedia  constraint={{ video: { height: 100,width: 100 } }}>{({ localMediaStream }) => (<Container>
			{' '}
			<VideoChatView
				uiState={connectedUiState}
				target="dragos"
				mediaSize={mediaSize}
			/>
		</Container>)}</FetchMedia>
		
	);
}
