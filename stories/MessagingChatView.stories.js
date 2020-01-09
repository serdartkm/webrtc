import { h } from 'preact';
import MessagingChatView from '../src/text-chat/ui-components/MessageChatView';

export default {
	title: 'MessagingChatView'
};
const readyState={
	connectionState: 'connected'
};

export function ready (){

	return <MessagingChatView state={readyState} messageRecieved={{ sender: 'Dan', message: 'hello' }} />;
}


export function preparing (){

	return <MessagingChatView state={state} messageRecieved={{ sender: 'Dan', message: 'hello' }} />;
}