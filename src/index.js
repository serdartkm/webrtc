/* eslint-disable react/prefer-stateless-function */
import './style';
import ConnectingToPusher from './video-transfer/ui-components/ConnectingToPusher';
import Client from './video-transfer/demo-components/Client';
import usePusher,{ getPusherConfig } from './signaling-service/pusher/usePusher';
export default function App () {


	const { currentUser: gon } = usePusher(getPusherConfig({ userId: 'gon' }));
	const { currentUser: kon } = usePusher(getPusherConfig({ userId: 'kon' }));
	


	if (gon && kon)

		return (<div style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Client currentUser={gon} name="gon" target="kon" />;
			<Client currentUser={kon} name="kon" target="gon"  />;
		</div>);
	
	return <ConnectingToPusher />;
}

//master