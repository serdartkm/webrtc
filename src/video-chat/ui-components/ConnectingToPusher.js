import { h } from 'preact';
import pusher from './pusher.png';
export default function ConnectingToPusher (){

	return (<div>
		<h1>Connecting to...</h1>
		<div> <img src={pusher} /> </div>
	</div>);
}