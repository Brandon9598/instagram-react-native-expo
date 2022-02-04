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
	}

	signIn() {
		const { email, password, name } = this.state;
		auth
			.signInWithEmailAndPassword(email, password)
			.then((results) => {
				console.log(results);
			})
			.catch((err) => console.log(err));
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
				<Button onPress={() => this.signIn()} title="sign up" />
			</View>
		);
	}
}
