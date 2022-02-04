import React, { useState } from "react";
import { View, Image, TextInput, Button } from "react-native";
import { storage, auth, firestore, firebaseApp } from "../../lib/firebase";

export default function Save(props) {
	const [caption, setCaption] = useState("");

	const uploadImage = async () => {
		const uri = props.route.params.image;
		const childPath = `posts/${auth.currentUser.uid}/${Math.random().toString(
			36
		)}`;
		const response = await fetch(uri);
		const blob = await response.blob();

		const task = storage.ref().child(childPath).put(blob);

		const taskProgress = (snapshot) => {
			console.log(`transferred: ${snapshot.bytesTransferred}`);
		};

		const taskCompleted = () => {
			task.snapshot.ref.getDownloadURL().then((snapshot) => {
				savePostData(snapshot);
			});
		};

		const taskError = (snapshot) => {
			console.log(snapshot);
		};

		const savePostData = (downloadURL) => {
			firestore
				.collection("posts")
				.doc(auth.currentUser.uid)
				.collection("userPosts")
				.add({
					downloadURL,
					caption,
					creation: firebaseApp.firestore.FieldValue.serverTimestamp(),
				})
				.then(() => {
					props.navigation.popToTop();
				});
		};

		task.on("state_changed", taskProgress, taskError, taskCompleted);
	};

	return (
		<View style={{ flex: 1 }}>
			<Image source={{ uri: props.route.params.image }} />
			<TextInput
				placeholder="Write a caption"
				onChangeText={(caption) => setCaption(caption)}
			/>
			<Button title="Save" onPress={() => uploadImage()} />
		</View>
	);
}
