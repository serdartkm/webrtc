/* eslint-disable brace-style */
/* eslint-disable indent */
import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import useWebRTCState from "./useWebRTCState";

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
  const [localClose, setLocalClose] = useState(false);
  const [localDecline, setLocalDecline] = useState(false);

  useEffect(() => {
    if (!localAnswer && !localCandidate && !localOffer) {
      resetState();
    }
  }, [localCandidate, localOffer, localAnswer]);
  useEffect(() => {
    if (webrtcStateError) {
      setWebrtcError(webrtcStateError);
    }
  }, [webrtcStateError]);

  useEffect(() => {
    if (remoteClose && rtcPeerConnection) {
      rtcPeerConnection.close();
      resetState();
    }
  }, [remoteClose]);

  useEffect(() => {
    if (
      remoteAnswer &&
      rtcPeerConnection &&
      !rtcPeerConnection.remoteDescription
    ) {
      rtcPeerConnection
        .setRemoteDescription(new RTCSessionDescription(remoteAnswer))
        .then(() => {})
        .catch(error => {
          setWebrtcError(error);
        });
    }
  }, [remoteAnswer]);

  useEffect(() => {
    if (remoteClose && rtcPeerConnection) {
      rtcPeerConnection.close();
    }
  }, [remoteClose]);

  useEffect(() => {
    // add iceCandidate() must be called after setting the ansfer and offer with setRemoteDescription
    if (
      remoteCandidate &&
      rtcPeerConnection &&
      rtcPeerConnection.remoteDescription &&
      localOffer
    ) {
      rtcPeerConnection
        .addIceCandidate(new RTCIceCandidate(remoteCandidate))
        .then(() => {})
        .catch(e => {
          setWebrtcError(e);
        });
    }
  }, [remoteCandidate, rtcPeerConnection, localOffer]);
  useEffect(() => {}, [localOffer]);
  useEffect(() => {
    // add iceCandidate() must be called after setting the ansfer and offer with setRemoteDescription
    if (
      remoteCandidate &&
      rtcPeerConnection &&
      rtcPeerConnection.remoteDescription &&
      localAnswer
    ) {
      rtcPeerConnection
        .addIceCandidate(new RTCIceCandidate(remoteCandidate))
        .then(() => {})
        .catch(e => {
          setWebrtcError(e);
          debugger;
        });
    }
  }, [remoteCandidate, rtcPeerConnection, localAnswer]);

  //localOffer,localAnswer,localCandidate
  useEffect(() => {
    if (rtcPeerConnection) {
      getLocalMedia();
    }
  }, [rtcPeerConnection]);

  useEffect(() => {}, [remoteOffer]);
  function sendOffer() {
    initRTCPeerConnection(true);
  }
  function sendAnswer() {
    initRTCPeerConnection(false, remoteOffer);
  }
  function resetState() {
    setLocalClose(false);
    setLocalDecline(false);
  }
  function sendClose() {
    rtcPeerConnection.close();
    setLocalClose(true);
    setTimeout(() => {
      resetState();
    }, 0);
  }

  function sendDecline() {
    setLocalDecline(true);
    setTimeout(() => {
      resetState();
    }, 0);
  }
  return {
    //state
    remoteMediaStream,
    localAnswer,
    localOffer,
    localCandidate,
    localDecline,
    webrtcError,
    state,
    //functions
    localClose,
    sendOffer,
    sendAnswer,
    sendClose,
    sendDecline
  };
}
