/* eslint-disable react/prefer-stateless-function */
import './style';
import { Component } from 'preact';
import VideoChatDemo from './video-transfer/demo-components/VideoChatDemo';
export default class App extends Component {
	render() {
		return (
			<div>
			
				<VideoChatDemo />
			
			</div>
		);
	}
}
