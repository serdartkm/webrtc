import { h } from 'preact';
import   './style.css';

export default function StateTable ({ rtcPeerConStates }){
	return (
		<table class="zebra">
			<thead>
				<tr>
					<th>ConnectionState</th>
					<th>Signaling State</th>
					<th>iceGatheringState</th>
					<th>iceConnectionState</th>
					<th>Timestamp</th>
				</tr>
			</thead>
			<tbody>
				{rtcPeerConStates && rtcPeerConStates.map((s) => (<tr>
					<td style={{ backgroundColor: s.connectionState.changed===true ? 'red' :'yellow' }}>{s.connectionState.state}</td>
					<td style={{ backgroundColor: s.signalingState.changed===true ? 'red' :'yellow' }}>{s.signalingState.state}</td>
					<td style={{ backgroundColor: s.iceGatheringState.changed===true ? 'red' :'yellow' }}>{s.iceGatheringState.state}</td>
					<td style={{ backgroundColor: s.iceConnectionState.changed===true ? 'red' :'yellow' }}>{s.iceConnectionState.state}</td>
					<td>{s.timestamp.time}</td>
				</tr>))}
			
			
			</tbody>
		</table>
	);
}