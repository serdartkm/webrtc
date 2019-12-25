/* eslint-disable brace-style */
/* eslint-disable indent */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import useWebRTCState from './useWebRTCState';

export default function useWebRTC({
  remoteOffer,
  remoteAnswer,
  remoteCandidate,
  config,
  localMediaStream,
  getLocalMedia
}) {
  const {
    localCandidate,
    localOffer,
    localAnswer,
    rtcPeerConnection,
    state,
    remoteMediaStream,
    webrtcStateError,
    initRTCPeerConnection
  } = useWebRTCState({ config, localMediaStream });
  const [webrtcError, setWebrtcError] = useState(null);

  useEffect(() => {
    if (webrtcStateError) {
      setWebrtcError(webrtcStateError);
    }
  }, [webrtcStateError]);

  useEffect(() => {
    if (remoteAnswer) {
      rtcPeerConnection
        .setRemoteDescription(new RTCSessionDescription(remoteAnswer))
        .then(() => {
  
        })
        .catch(error => {
          setWebrtcError(error);
        });
    }
  }, [remoteAnswer]);

  useEffect(() => {
    // add iceCandidate() must be called after setting the ansfer and offer with setRemoteDescription
    if (remoteCandidate && rtcPeerConnection&& rtcPeerConnection.remoteDescription) {
      rtcPeerConnection
        .addIceCandidate(new RTCIceCandidate(remoteCandidate))
        .catch(e => {
          setWebrtcError(e);
        });
    }
  }, [remoteCandidate,rtcPeerConnection]);

  //localOffer,localAnswer,localCandidate
  useEffect(() => {
    if (rtcPeerConnection) {
      getLocalMedia();
    }
  }, [rtcPeerConnection]);

  function sendOffer() {
    initRTCPeerConnection(true);
  }
  function sendAnswer() {
    initRTCPeerConnection(false, remoteOffer);
  }
  return {
    remoteMediaStream,
    localAnswer,
    localOffer,
    localCandidate,
    webrtcError,
    sendOffer,
    sendAnswer,
    state
  };
}
