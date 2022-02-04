import { firestore, auth } from "../../lib/firebase";
import { USER_STATE_CHANGE } from "../constants/index";

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
