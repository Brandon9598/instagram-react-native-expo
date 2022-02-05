import React, { Component } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchUser, fetchUserPosts } from "../redux/actions/index";
import { auth } from "../lib/firebase";

// Components
import FeedScreen from "../components/main/Feed";
import ProfileScreen from "../components/main/Profile";
import SearchScreen from "../components/main/Search";

const Tab = createMaterialBottomTabNavigator();
const EmptyScreen = () => {
	return null;
};
export class Main extends Component {
	componentDidMount() {
		this.props.fetchUser();
		this.props.fetchUserPosts();
	}

	render() {
		return (
			<Tab.Navigator initialRouteName="Feed" labeled={false}>
				<Tab.Screen
					name="Feed"
					component={FeedScreen}
					options={{
						tabBarIcon: ({ color, size = 26 }) => (
							<MaterialCommunityIcons name="home" color={color} size={size} />
						),
						headerShown: false,
					}}
				/>
				<Tab.Screen
					name="Search"
					component={SearchScreen}
					navigation={this.props.navigation}
					options={{
						tabBarIcon: ({ color, size = 26 }) => (
							<MaterialCommunityIcons
								name="magnify"
								color={color}
								size={size}
							/>
						),
						headerShown: false,
					}}
				/>
				<Tab.Screen
					name="AddContainer"
					component={EmptyScreen}
					listeners={({ navigation }) => ({
						tabPress: (event) => {
							event.preventDefault();
							navigation.navigate("Add");
						},
					})}
					options={{
						tabBarIcon: ({ color, size = 26 }) => (
							<MaterialCommunityIcons
								name="plus-box"
								color={color}
								size={size}
							/>
						),
						headerShown: false,
					}}
				/>
				<Tab.Screen
					name="Profile"
					component={ProfileScreen}
					navigation={this.props.navigation}
					listeners={({ navigation }) => ({
						tabPress: (event) => {
							event.preventDefault();
							navigation.navigate("Profile", { uid: auth.currentUser.uid });
						},
					})}
					options={{
						tabBarIcon: ({ color, size = 26 }) => (
							<MaterialCommunityIcons
								name="account-circle"
								color={color}
								size={size}
							/>
						),
						headerShown: false,
					}}
				/>
			</Tab.Navigator>
		);
	}
}

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser,
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators({ fetchUser, fetchUserPosts }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
