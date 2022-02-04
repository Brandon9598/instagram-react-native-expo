import { firestore, auth } from "../../lib/firebase";
import {
	USER_STATE_CHANGE,
	USER_POSTS_STATE_CHANGED,
} from "../constants/index";

export function fetchUser() {
	return (dispatch) => {
		firestore
			.collection("users")
			.doc(auth.currentUser.uid)
			.get()
			.then((snapshot) => {
				if (snapshot.exists) {
					console.log("User", snapshot.data());
					dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() });
				} else {
					console.log("does not exist");
					dispatch({ type: USER_STATE_CHANGE, currentUser: null });
				}
			})
			.catch((err) => {
				dispatch({ type: USER_STATE_CHANGE, currentUser: null });
			});
	};
}
export function fetchUserPosts() {
	return (dispatch) => {
		firestore
			.collection("posts")
			.doc(auth.currentUser.uid)
			.collection("userPosts")
			.orderBy("creation", "asc")
			.get()
			.then((snapshot) => {
				let posts = snapshot.docs.map((doc) => {
					const data = doc.data();
					const id = doc.id;
					return { id, ...data };
				});
				dispatch({ type: USER_POSTS_STATE_CHANGED, posts });
			})
			.catch((err) => {
				dispatch({ type: USER_POSTS_STATE_CHANGED, currentUser: [] });
			});
	};
}
