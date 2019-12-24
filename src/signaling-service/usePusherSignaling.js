/* eslint-disable brace-style */
/* eslint-disable indent */
import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import usePusher from './usePusher';
import createAnswer from '../rtcPeerConnection/createAnswer';
import createOffer from '../rtcPeerConnection/createOffer';

export default function usePuherSignaling({
  pusherConfig,
  rtcConfig,
  targetId
}) {
  const { roomId } = pusherConfig;
  const [localOffer, setLocalOffer] = useState(null);
  const [localAnswer, setLocalAnswer] = useState(null);
  const [remoteOffer, setRemoteOffer] = useState(null);
  const [remoteAnswer, setRemoteAnswer] = useState(null);
  const [remoteSdpIsSet, setRemoteSdpIsSet] = useState(false);
  const [remoteCandidate, setRemoteCandidate] = useState(null);
  const { localCandidate, rtcPeerConnection } = rtcConfig;
  const { currentUser, error: chatManagerError } = usePusher(pusherConfig);
  const [caller, setCaller] = useState(null);
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

  useEffect(() => {
    if (localOffer) {
      const offer = { sdp: localOffer, userId: currentUser.id, targetId };

      sendMessage(JSON.stringify(offer));
    }
  }, [localOffer]);

  useEffect(() => {
    if (localAnswer) {
      const answer = { sdp: localAnswer, userId: currentUser.id, targetId };
      sendMessage(JSON.stringify(answer));
    }
  }, [localAnswer]);

  useEffect(() => {
    if (localCandidate) {
      const candidate = {
        sdp: localCandidate,
        userId: currentUser.id,
        targetId
      };
      sendMessage(JSON.stringify(candidate));
    }
  }, [localCandidate]);

  useEffect(() => {
    if (currentUser) {
      currentUser.subscribeToRoomMultipart({
        roomId,
        hooks: {
          onMessage: message => {
            const { targetId, sdp, userId } = JSON.parse(
              message.parts[0].payload.content
            );

            if (targetId === currentUser.id) {
              if (sdp.type === 'offer') {
                setRemoteOffer(sdp);
                setCaller(userId);
              } else if (sdp.type === 'answer') {
                setRemoteAnswer(sdp);
              } else if (sdp.type === undefined) {
                setRemoteCandidate(sdp);
              }
            }
          }
        },
        messageLimit: 0
      });
    }
  }, [currentUser]);

  function sendMessage(msg) {
    if (msg !== null && msg !== undefined) {
      currentUser.sendSimpleMessage({
        text: msg,
        roomId: currentUser.rooms[0].id
      });
    }
  }

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
        sendMessage(localAnswer);
      }
    });
  }
  return {
    error,
    currentUser,
    sendMessage,
    sendOffer,
    sendAnswer,
    chatManagerError,
    caller
  };
}
