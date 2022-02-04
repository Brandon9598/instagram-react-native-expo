import React, { Component } from "react";
import { View, Button, TextInput } from "react-native";
import { auth } from "../../lib/firebase";
export default class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "",
			password: "",
		};

		this.signIn = this.signIn.bind(this);
		this.signOut = this.signOut.bind(this);
	}

	signIn() {
		const { email, password } = this.state;
		auth.signInWithEmailAndPassword(email, password);
	}
	signOut() {
		auth.signOut();
	}

	render() {
		return (
			<View>
				<TextInput
					placeholder="email"
					onChangeText={(email) => this.setState({ email })}
				/>
				<TextInput
					placeholder="password"
					secureTextEntry={true}
					onChangeText={(password) => this.setState({ password })}
				/>
				<Button onPress={() => this.signIn()} title="sign in" />
				<Button onPress={() => this.signOut()} title="sign out" />
			</View>
		);
	}
}
