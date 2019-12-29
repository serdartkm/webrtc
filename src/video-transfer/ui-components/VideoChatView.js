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
export default function VideoChatView({ media, UIState, target, name,mediaSize , handleSendMessage }) {
  
  const {  calling, recievingCall, connected, closeLabel } =UIState;
  const { remoteMediaStream, localMediaStream } =media;
 const { remoteStreamSize, localStreamSize } = mediaSize;

  function sendOffer (){
    handleSendMessage('offer');
  }

  function sendAnswer (){
    handleSendMessage('answer');
  }
  function sendClose (){
    handleSendMessage('close');
  }
  function sendDecline (){
    handleSendMessage('decline');
  }


  return (
    <div className="video-chat-view">

      <div className="media-container">
        <div className="local-media">
        {connected && <DisplayMediaStream name={target} style={{ backgroundColor: 'blue' }} width={localStreamSize.width} mediaStream={localMediaStream} />}
        </div>
        <div className="remote-media">
          
          {connected && <DisplayMediaStream name={target} style={{ backgroundColor: 'blue' }} width={remoteStreamSize.width} height={remoteStreamSize.height} mediaStream={remoteMediaStream} />}
        </div>
      </div>
      <div className="call-animation">
      {!connected && (
        <CallAnimation
	calling={calling}
	recievingCall={recievingCall}
	target={target}
        />
      )}
      </div>
      <div className="button-container">
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
            <button style={style.btn}  onClick={closeLabel ==='Decline' ? sendDecline: sendClose}>{closeLabel}</button>
          )}
        </div>
    </div>
  );
}
