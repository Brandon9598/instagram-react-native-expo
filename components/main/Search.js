import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	FlatList,
	TouchableOpacity,
} from "react-native";
import { firestore } from "../../lib/firebase";
export default function Search(props) {
	const [users, setUsers] = useState([]);

	const fetchUsers = (search) => {
		firestore
			.collection("users")
			.where("name", ">=", search)
			.get()
			.then((snapshot) => {
				let users = snapshot.docs.map((doc) => {
					const data = doc.data();
					const id = doc.id;
					return { id, ...data };
				});
				setUsers(users);
			})
			.catch();
	};

	return (
		<View>
			<TextInput
				placeholder="Type here..."
				onChangeText={(search) => fetchUsers(search)}
			/>
			<FlatList
				numColumns={1}
				horizontal={false}
				data={users}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() =>
							props.navigation.navigate("Profile", { uid: item.id })
						}
					>
						<Text>{item.name}</Text>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
}
