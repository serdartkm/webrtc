/* eslint-disable react/prefer-stateless-function */
import './style';
import { Component } from 'preact';
import VideoChatDemo from './demo-components/VideoChatDemo';
export default class App extends Component {
	render() {
		return (
			<div>
			
				<VideoChatDemo />
			
			</div>
		);
	}
}
