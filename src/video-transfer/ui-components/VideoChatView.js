/* eslint-disable indent */
import { h } from 'preact';
import CallAnimation from './CallAnimation';
import DisplayMediaStream from './DisplayMediaStream';

const style ={
	btn: {
		padding: 5,
		margin: 5,
		width: 100
	}
};
export default function VideoChatView({
  calling,
  recievingCall,
  connected,
  closeLabel,
  sendOffer,
  sendAnswer,
  sendClose,
  remoteMediaStream,
  localMediaStream,
  target,
  name,
  remoteStreamSize,
  localStreamSize
}) {
  return (
    
      <div style={{ position: 'relative', backgroundColor: 'yellow',  width: remoteStreamSize.width, height: '100%' }}>
        <div style={{ position: 'absolute', left: 4, top: 4 }}>
          {connected && <DisplayMediaStream name={name} style={{ backgroundColor: 'brown',border: '2px solid white' }} width={localStreamSize.width} height={localStreamSize.height} localStreamSize={localStreamSize} mediaStream={localMediaStream} />}
        </div>
        <div style={{ position: 'absolute', top: 10 }}>
          {!connected && (
            <CallAnimation calling={calling} recievingCall={recievingCall} target={target} />
          )}
          {connected && <DisplayMediaStream name={target} style={{ backgroundColor: 'blue' }} width={remoteStreamSize.width} height={remoteStreamSize.height} mediaStream={remoteMediaStream} />}
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', position: 'absolute', bottom: 10 }}>
          {!connected && !calling && !recievingCall  && (
            <button style={style.btn} onClick={sendOffer}>
              Call
            </button>
          )}
          {!connected && recievingCall && (
            <button style={style.btn}   onClick={sendAnswer}>
              Answer
            </button>
          )}
          {(connected || calling || recievingCall) && (
            <button style={style.btn}  onClick={sendClose}>{closeLabel}</button>
          )}
        </div>
      </div>
  
  );
}
