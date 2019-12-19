let mediaStream =null;

export default async  function getMediaStream (mediaStreamConstraints,cb){

	try {
        debugger
		mediaStream =await  navigator.mediaDevices.getUserMedia({ video: true, audio: false });
		cb(null,mediaStream);
	}
	catch (error) {
        debugger
		cb(error,null);
	}


}