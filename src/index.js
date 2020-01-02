/* eslint-disable react/prefer-stateless-function */
import './style';
import ConnectingToPusher from './video-transfer/ui-components/ConnectingToPusher';
import Client from './video-transfer/demo-components/Client';
import usePusher,{ getPusherConfig } from './signaling-service/pusher/usePusher';

export default function App () {

	const { currentUser: reno } = usePusher(getPusherConfig({ userId: 'reno' }));
	const { currentUser: breno } = usePusher(getPusherConfig({ userId: 'breno' }));
	
	if (reno && breno)

		return (<div style={{ display: 'flex' }}>
			<Client currentUser={reno} name="reno" target="breno" />;
			<Client currentUser={breno} name="breno" target="reno" />;
		</div>);
	
	return <ConnectingToPusher />;
}

//master