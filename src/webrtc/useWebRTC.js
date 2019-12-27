/* eslint-disable brace-style */
/* eslint-disable indent */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import useWebRTCState from './useWebRTCState';

export default function useWebRTC({
  remoteOffer,
  remoteAnswer,
  remoteCandidate,
  remoteClose,
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
 const [localClose,setLocalClose]= useState(false);
  useEffect(() => {
    if (webrtcStateError) {
      setWebrtcError(webrtcStateError);
    }
  }, [webrtcStateError]);
useEffect(() => {
  if (remoteClose){
   rtcPeerConnection.close();
  }
},[remoteClose]);
  useEffect(() => {
    if (remoteAnswer) {
      init();
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
    if (remoteClose){
      rtcPeerConnection.close();
    }
  },[remoteClose]);

  useEffect(() => {
    // add iceCandidate() must be called after setting the ansfer and offer with setRemoteDescription
    if (remoteCandidate && rtcPeerConnection && localOffer ) {
      init();
      rtcPeerConnection
        .addIceCandidate(new RTCIceCandidate(remoteCandidate))
        .catch(e => {
          setWebrtcError(e);
        });
    }
  }, [remoteCandidate,rtcPeerConnection, localOffer]);

  useEffect(() => {
    // add iceCandidate() must be called after setting the ansfer and offer with setRemoteDescription
    if (remoteCandidate && rtcPeerConnection && localAnswer ) {
      init();
      rtcPeerConnection
        .addIceCandidate(new RTCIceCandidate(remoteCandidate))
        .catch(e => {
          setWebrtcError(e);
        });
    }
  }, [remoteCandidate,rtcPeerConnection, localAnswer]);

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
 function init(){
   setLocalClose(false);
 }
  function sendClose(){
   rtcPeerConnection.close();
    setLocalClose(true);
  }

  return {
    remoteMediaStream,
    localAnswer,
    localOffer,
    localCandidate,
    webrtcError,
    sendOffer,
    sendAnswer,
    state,
    sendClose,
    localClose
  };
}
