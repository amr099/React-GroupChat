import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
// import { updateDoc, doc } from "firebase/firestore";
// import { db } from "../firebase-config";

export function LogOut({ user }) {
    const Out = async () => {
        // let userRef = await doc(db, "Users", user.email);
        // await updateDoc(userRef, {
        //     status: "offline",
        // });
        signOut(auth);
    };

    return (
        <>
            <button className='dropdown-modal' onClick={Out}>
                SignOut
            </button>
        </>
    );
}
