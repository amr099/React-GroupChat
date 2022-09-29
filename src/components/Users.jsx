import React from "react";
import { collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const Users = () => {
    let usersCol = collection(db, "Users");
    const [users] = useCollectionData(usersCol);

    return (
        <>
            {/* <h2> All users : </h2> */}
            <ul>
                {users?.map((user) => (
                    <>
                        <li key={Math.random()}>
                            <div className='row'>
                                {user.name}{" "}
                                <div
                                    className='status'
                                    style={
                                        user.status === "online"
                                            ? { backgroundColor: "green" }
                                            : { backgroundColor: "red" }
                                    }
                                ></div>
                            </div>
                            {/* <img src={user.picURL} alt='photo'></img> */}
                        </li>
                    </>
                ))}
            </ul>
        </>
    );
};
