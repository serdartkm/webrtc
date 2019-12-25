/** @jsx h */
import { h } from 'preact';
import VideoChatView from '../src/video-transfer/ui-components/VideoChatView';

export default {
	title: 'VideoChatView'
};

const localStreamSize={ height: 100,width: 100 };
const remoteStreamSize={ height: 300,width: 300 };

export function ready ()  {
	
	return   <VideoChatView  calling={false} recievingCall={false} isCaller isCallee localStreamSize={localStreamSize} remoteStreamSize={remoteStreamSize} />;
}

export function calling ()  {

	return   <VideoChatView closeLabel="Cancel" calling recievingCall={false} localStreamSize={localStreamSize} remoteStreamSize={remoteStreamSize}  />;
}

export function recievingCall ()  {


	return   <VideoChatView closeLabel="Decline"  recievingCall  localStreamSize={localStreamSize} remoteStreamSize={remoteStreamSize} />;
}

export function connected ()  {
	return   <VideoChatView closeLabel="End"    connected localStreamSize={localStreamSize} remoteStreamSize={remoteStreamSize} />;
}