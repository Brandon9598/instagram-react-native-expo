import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { Component } from "react";
import { auth } from "./lib/firebase";
import { View, Text } from "react-native";

// COMPONENTS
import LoginScreen from "./components/auth/Login";
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import MainScreen from "./components/Main";
import AddScreen from "./components/main/Add";
import SaveScreen from "./components/main/Save";

// Redux
import { Provider, store } from "./lib/redux";

const Stack = createStackNavigator();
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loaded: false,
		};
	}

	componentDidMount() {
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
							options={{ headerShown: false }}
						/>
						<Stack.Screen name="Login" component={LoginScreen} />
						<Stack.Screen name="Register" component={RegisterScreen} />
					</Stack.Navigator>
				</NavigationContainer>
			);
		}

		return (
			<Provider store={store}>
				<NavigationContainer>
					<Stack.Navigator initialRouteName="Main">
						<Stack.Screen
							name="Main"
							navigation={this.props.navigation}
							component={MainScreen}
						/>
						<Stack.Screen
							name="Add"
							component={AddScreen}
							navigation={this.props.navigation}
						/>
						<Stack.Screen
							name="Save"
							component={SaveScreen}
							navigation={this.props.navigation}
						/>
					</Stack.Navigator>
				</NavigationContainer>
			</Provider>
		);
	}
}
