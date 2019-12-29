/* eslint-disable react/prefer-stateless-function */
import './style';
import { Component } from 'preact';
import Client from './video-transfer/demo-components/Client';
export default class App extends Component {
	render() {
		return (<div style={{ display: 'flex' }}>
			<Client userId="mmario" />;
			<Client userId="ddragos" />;
		</div>);
			
	
	}
}

//master