import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import { auth } from "../../lib/firebase";
export default class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
			name: "",
		};

		this.onSignUp = this.onSignUp.bind(this);
	}

	onSignUp() {
		const { email, password, name } = this.state;
		auth
			.createUserWithEmailAndPassword(email, password)
			.then((results) => {
				console.log(results);
			})
			.catch((err) => console.log(err));
	}

	render() {
		return (
			<View>
				<TextInput
					placeholder="name"
					onChangeText={(name) => this.setState({ name })}
				/>
				<TextInput
					placeholder="email"
					onChangeText={(email) => this.setState({ email })}
				/>
				<TextInput
					placeholder="password"
					secureTextEntry={true}
					onChangeText={(password) => this.setState({ password })}
				/>
				<Button onPress={() => this.onSignUp()} title="sign up" />
			</View>
		);
	}
}