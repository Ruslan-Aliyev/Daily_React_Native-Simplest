import { useEffect, useState } from 'react';
import { SafeAreaView, Text, Button } from "react-native";
import { router } from 'expo-router';
import Daily, {
  DailyMediaView,
  DailyEventObjectParticipant,
  DailyCall,
  DailyParticipant,
  MediaStreamTrack,
} from '@daily-co/react-native-daily-js';

export default function CallScreen() {
	const [callObject, setCallObject] = useState<DailyCall>();
	const ROOM = 'https://ruslanaliyev.daily.co/ruslanaliyev_room1';
	const [muted, setMuted] = useState(false);

	useEffect(() => {
		if (callObject) return;

		const callObject = Daily.createCallObject();
		callObject.setLocalVideo(false);
		setCallObject(callObject);

		return () => {
			console.log('Exiting call page');
			leaveRoom();
			callObject.destroy();
		};
	}, []);
	const leaveRoom = async () => {
		if (!callObject) return;
		await callObject.leave(); 
	};

	useEffect(() => {
		if (!callObject) return;
		joinRoom(callObject);
	}, [callObject]);
	const joinRoom = (callObject) => {
		console.log(`Joining room : ${ROOM}`);
		callObject.join({
			url: `${ROOM}`,
		});
		callObject.setLocalAudio(!muted);
	};

	useEffect(() => {
		if (!callObject) return;
		callObject.setLocalAudio(!muted);
	}, [callObject]);

	useEffect(() => {
		if (!callObject) return;
		callObject
			.on('joined-meeting', handleCallEvents)
			.on('left-meeting', handleCallEvents)
			.on('participant-joined', handleCallEvents)
			.on('participant-updated', handleCallEvents)
			.on('participant-left', handleCallEvents)
			.on('error', handleCallEvents);
		return () => {};
	}, [callObject]);
	const handleCallEvents = (event: DailyEventObjectParticipant) => { 
		if (!callObject) return;
		console.log(event.action);
	};

	return (
		<SafeAreaView>
			<Text>Call</Text>
			<Button
				onPress={() => {setMuted(!muted)}}
				title={muted ? "Unmute" : "Mute"}
			/>
			<Button
				onPress={() => { router.back() }}
				title="End Call"
			/>
		</SafeAreaView>
	);
}