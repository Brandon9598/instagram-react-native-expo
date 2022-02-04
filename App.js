import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
const Stack = createStackNavigator();

import React, { Component } from "react";
import { auth } from "./lib/firebase";

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
			loggedIn: false,
		};
	}

	compondentDidMount() {
		auth.onAuthStateChanged((user) => {
			if (!user) {
				this.setState({
					loggedIn: false,
					loaded: true,
				});
			} else {
				this.setState({
					loggedIn: true,
					loaded: true,
				});
			}
		});
	}

	render() {
		const { loggedIn, loaded } = this.state;
		if (!loaded) {
			return (
				<View style={{ flex: 1, justifyContent: "center" }}>
					<Text>Loading</Text>
				</View>
			);
		}

		if (!loggedIn) {
			return (
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Landing">
						<Stack.Screen
							name="Landing"
							component={LandingScreen}
							navigation={Stack}
							options={{ headerShown: false }}
						/>
						<Stack.Screen
							name="Register"
							component={RegisterScreen}
							navigation={Stack}
							options={{ headerShown: false }}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			);
		}

		return (
			<View style={{ flex: 1, justifyContent: "center" }}>
				<Text>Logged In</Text>
			</View>
		);
	}
}
