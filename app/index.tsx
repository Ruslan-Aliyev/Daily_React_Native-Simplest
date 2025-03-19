import { SafeAreaView, Text, Button, Platform } from "react-native";
import { router } from 'expo-router';
import { Permission, PERMISSIONS, requestMultiple, checkMultiple } from 'react-native-permissions';

export default function HomeScreen() {
	let microphonePermission:Permission = (Platform.OS === 'ios') ? PERMISSIONS.IOS.MICROPHONE : PERMISSIONS.ANDROID.RECORD_AUDIO;
	let microphonePermissionKey:any = (Platform.OS === 'ios') ? "ios.permission.MICROPHONE" : "android.permission.RECORD_AUDIO";

	const initCall = async () => {
	    // let checkedStatuses:any = await checkMultiple([
	    //   microphonePermission,
	    // ]);
	    
	    // let needRequesting:Permission[] = [];

	    // if (checkedStatuses[microphonePermissionKey] === "granted") {
	    //   // Do nothing (at least for now)
	    // } else {
	    //   needRequesting.push(microphonePermission);
	    // }

	    // if (needRequesting.length > 0) {
	    //   let requestedStatuses:any = await requestMultiple(needRequesting);
	      
	    //   if (requestedStatuses[microphonePermissionKey] !== "granted") {
	    //     setLoading(false);
	    //     return;
	    //   }
	    // }

		router.navigate('/call');
	};

	return (
		<SafeAreaView>
			<Text>Home</Text>
			<Button
				onPress={initCall}
				title="Start Call"
			/>
		</SafeAreaView>
	);
}