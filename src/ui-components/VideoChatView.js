/* eslint-disable indent */
import { h } from 'preact';
import useWebRTCUIState from '../webrtc/useWebRTCUIState';
import CallAnimation from './CallAnimation';
import DisplayMediaStream from './DisplayMediaStream';
export default function VideoChatView({
  localOffer,
  localAnswer,
  remoteOffer,
  remoteAnswer,
  state,
  sendOffer,
  sendAnswer,
  remoteMediaStream,
  localMediaStream
}) {
  const {
    displayCallAnimation,
    disableAnswerButton,
    disableCallButton,
    displayLocalStream,
    displayRemoteStream,
    calling,
    recievingCall
  } = useWebRTCUIState({
    localAnswer,
    localOffer,
    state,
    remoteAnswer,
    remoteOffer
  });
  return (
    <div>
      <div style={{ position: 'relative', backgroundColor: 'yellow' }}>
        <div>
          {displayLocalStream && (
            <DisplayMediaStream mediaStream={localMediaStream} />
          )}
        </div>
        <div>
          {displayCallAnimation && (
            <CallAnimation calling={calling} recievingCall={recievingCall} />
          )}
          {displayRemoteStream && (
            <DisplayMediaStream mediaStream={remoteMediaStream} />
          )}
        </div>
        <div>
          <button disabled={disableCallButton} onClick={sendOffer}>
            Call
          </button>
          <button disabled={disableAnswerButton} onClick={sendAnswer}>
            Answer
          </button>
        </div>
      </div>
    </div>
  );
}
