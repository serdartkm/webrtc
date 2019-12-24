/* eslint-disable brace-style */
/* eslint-disable indent */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import createAnswer from './createAnswer';
import createOffer from './createOffer';
import useWebRTCState from './useWebRTCState';

export default function useWebRTC({ remoteOffer,remoteAnswer,remoteCandidate, config,localMediaStream }) {

  const { localCandidate, rtcPeerConnection, state,remoteMediaStream } =useWebRTCState({ config,localMediaStream });
  const [localOffer, setLocalOffer] = useState(null);
  const [localAnswer, setLocalAnswer] = useState(null);
  const [remoteSdpIsSet, setRemoteSdpIsSet] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (remoteOffer) {
      rtcPeerConnection
        .setRemoteDescription(new RTCSessionDescription(remoteOffer))
        .then(() => {
          setRemoteSdpIsSet(true);
        })
        .catch(error => {
          setError(error);
        });
    }
    if (remoteAnswer) {
      rtcPeerConnection
        .setRemoteDescription(new RTCSessionDescription(remoteAnswer))
        .then(() => {
          setRemoteSdpIsSet(true);
        })
        .catch(error => {
          setError(error);
        });
    }
  }, [remoteOffer, remoteAnswer]);

  useEffect(() => {
    // add iceCandidate() must be called after setting the ansfer and offer with setRemoteDescription
    if (remoteCandidate && remoteSdpIsSet) {
      rtcPeerConnection
        .addIceCandidate(new RTCIceCandidate(remoteCandidate))
        .catch(e => {
          setError(e);
        });
    }
  }, [remoteCandidate, remoteSdpIsSet]);

  //localOffer,localAnswer,localCandidate


  function sendOffer() {
    createOffer(rtcPeerConnection, (error, offer) => {
      if (error) {
        setError(error);
      } else if (offer) {
        setLocalOffer(offer);
      }
    });
  }
  function sendAnswer() {
    createAnswer(rtcPeerConnection, (error, answer) => {
      if (error) {
        setError(error);
      } else if (answer) {
        setLocalAnswer(answer);
       
      }
    });
  }
  return {
    remoteMediaStream,
    localAnswer,
    localOffer,
    localCandidate,
    error,
    sendOffer,
    sendAnswer,
    state
  };
}
