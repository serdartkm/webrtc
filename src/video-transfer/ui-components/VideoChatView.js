/* eslint-disable indent */
import { h } from 'preact';
import CallAnimation from './CallAnimation';
import DisplayMediaStream from './DisplayMediaStream';
import './style.css';
const style = {
  btn: {
    padding: 5,
    margin: 5,
    width: 100
  }
};
export default function VideoChatView({ remoteMediaStream,localMediaStream, state, target, name,mediaSize , handleSendMessage }) {
  const { connectionState, signalingState } =state;

  const { remoteStreamSize, localStreamSize } = mediaSize;


  function sendOffer (){
    handleSendMessage('offer');
  }

  function sendAnswer (){
    handleSendMessage('answer');
  }
  function sendEnd (){
    handleSendMessage('end');
  }
  function sendDecline (){
    handleSendMessage('decline');
  }

  function sendIgnore (){
    handleSendMessage('ignore');
  }
  function sendCancel (){
    handleSendMessage('cancel');
  }
  return (
    <div className="video-chat-view">

      <div className="media-container">
        <div className="local-media">
        {connectionState ==='connected' && signalingState !=='closed' && <DisplayMediaStream name={target} style={{ backgroundColor: 'blue' }} width={localStreamSize.width} mediaStream={localMediaStream} />}
        </div>
        <div className="remote-media">
          {connectionState ==='connected' && signalingState !=='closed' && <DisplayMediaStream name={target} style={{ backgroundColor: 'blue' }} width={remoteStreamSize.width} height={remoteStreamSize.height} mediaStream={remoteMediaStream} />}
        </div>
      </div>
      <div className="call-animation">
      {connectionState !=='connected' && (
        <CallAnimation
	calling={signalingState ==='have-local-offer'}
	recievingCall={signalingState ==='have-remote-offer'}
	target={target}
        />
      )}
      </div>
      <div className="button-container">
          {(connectionState !=='connected' || signalingState ==='closed')  && signalingState !=='have-local-offer' && signalingState !=='have-remote-offer' && (
            <button style={style.btn} onClick={sendOffer}>
              Call
            </button>
          )}
          {connectionState !=='connected'  && signalingState ==='have-remote-offer' && (
            <button style={style.btn}   onClick={sendAnswer}>
              Answer
            </button>
            
          )}
          {(connectionState !=='connected'  && signalingState ==='have-remote-offer') && (
            <button style={style.btn}  onClick={sendDecline}>Decline</button>
          )}
             {(connectionState ==='connected' && signalingState !=='closed') && (
            <button style={style.btn}  onClick={sendEnd}>End</button>
          )}
             {(connectionState !=='connected' && signalingState ==='have-remote-offer') && (
            <button style={style.btn}  onClick={sendIgnore}>Ignore</button>
          )}
              {connectionState !=='connected'  && signalingState ==='have-local-offer' && (
            <button style={style.btn} onClick={sendCancel}>
              Cancel
            </button>
          )}
        </div>
    </div>
  );
}
