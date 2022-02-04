import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, Image } from "react-native";
import { Camera } from "expo-camera";
import * as ImagePicker from "expo-image-picker";

function Add({ navigation }) {
	const [hasPermission, setHasPermission] = useState(null);
	const [camera, setCamera] = useState(null);
	const [image, setImage] = useState(null);
	const [type, setType] = useState(Camera.Constants.Type.back);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync();
			setHasPermission(status === "granted");
		})();
	}, []);

	const takePicture = async () => {
		console.log("take picture");
		if (camera) {
			const data = await camera.takePictureAsync(null);
			console.log(data.uri);
			setImage(data.uri);
		}
	};

	const pickImage = async () => {
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [1, 1],
			quality: 1,
		});

		if (!result.cancelled) {
			setImage(result.uri);
		}
	};

	if (hasPermission === null) {
		return <View />;
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>;
	}
	return (
		<View style={styles.container}>
			<View style={styles.cameraContainer}>
				<Camera
					ref={(ref) => setCamera(ref)}
					style={styles.fixedRatio}
					type={type}
					ratio={"1:1"}
				/>
			</View>
			<Button
				style={styles.button}
				title="Flip Image"
				onPress={() => {
					setType(
						type === Camera.Constants.Type.back
							? Camera.Constants.Type.front
							: Camera.Constants.Type.back
					);
				}}
			/>
			<Button
				title="Take Picture"
				onPress={() => {
					takePicture();
				}}
			/>
			<Button title="Pick Image From Gallery" onPress={() => pickImage()} />
			<Button
				title="Save"
				onPress={() => navigation.navigate("Save", { image })}
			/>
			{image && (
				<Image
					source={{
						uri: image,
					}}
					style={{ flex: 1 }}
				/>
			)}
		</View>
	);
}

export default Add;

const styles = StyleSheet.create({
	cameraContainer: {
		flex: 1,
		flexDirection: "row",
	},
	fixedRatio: {
		flex: 1,
		aspectRatio: 1,
	},
	camera: {
		flex: 1,
	},
	container: { flex: 1, flexDirection: "column" },
});
