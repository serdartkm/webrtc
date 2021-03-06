import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import useLocalMediaStream from '../localMedieaStream/useLocalMediaStream';

export default function FetchMedia ({ children,constraint }){
	const { localMediaStream,getLocalMedia } = useLocalMediaStream(constraint);

	useEffect(() => {
		getLocalMedia();
	},[]);

	return (<div>{children({ localMediaStream })}</div>);
}