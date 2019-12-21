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
  const [remoteCandidate, setRemoteCandidate] = useState(null);
  const { localCandidate, rtcPeerConnection, addRemoteCandidate,addRemoteAnswer } = rtcConfig;
  const { currentUser, error: chatManagerError } = usePusher(pusherConfig);
  const [caller,setCaller] =useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (remoteCandidate) {
      addRemoteCandidate(remoteCandidate);
    }
  }, [remoteCandidate]);

  useEffect(() => {
    if (remoteAnswer) {
	console.log("rtcPeerConnection",rtcPeerConnection)
   addRemoteAnswer(remoteAnswer);
    }
  }, [remoteAnswer]);

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
              } else if (sdp.type === 'candidate') {
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
    currentUser.sendSimpleMessage({
      text: msg,
      roomId: currentUser.rooms[0].id
    });
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
    createAnswer(rtcPeerConnection, remoteOffer, (error, answer) => {
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
