/* eslint-disable react/prefer-stateless-function */
import './style';
import { Component } from 'preact';
import DisplayLocalMedia from './ui-components/DisplayLocalMedia';


export default class App extends Component {
	render() {
		return (
			<div>
				<h1>Hello, World!</h1>
				<DisplayLocalMedia />
			</div>
		);
	}
}
