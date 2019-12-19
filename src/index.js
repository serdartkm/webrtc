/* eslint-disable react/prefer-stateless-function */
import './style';
import { Component } from 'preact';
import {useRef} from 'preact/hooks';
import useLocalMediaStream from './localMedieaStream/useLocalMediaStream';

export default class App extends Component {
	render() {
		return (
			<div>
				<h1>Hello, World!</h1>
			</div>
		);
	}
}
