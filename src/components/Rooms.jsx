import React from "react";
import { collection } from "firebase/firestore";
import { db } from "../firebase-config";
import { useCollectionData } from "react-firebase-hooks/firestore";

export const Rooms = ({ getRoomMsgs }) => {
    let roomsCol = collection(db, "Rooms");
    const [rooms] = useCollectionData(roomsCol);

    // useEffect(() => {
    //     const unsub = onSnapshot(doc(db, "Rooms", selectedRoom), () => {
    //         getRoomMsgs(selectedRoom);
    //         console.log("realtime effect");
    //     });

    //     return () => {
    //         unsub();
    //     };
    // }, [selectedRoom]);

    // async function getRoomMsgs(room) {
    //     try {
    //         setSelectedRoom(room);
    //         const roomMsgs = await getDoc(doc(db, "Rooms", room));
    //         setMessages(roomMsgs.data().messages);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    return (
        <div className='rooms'>
            <ul>
                {rooms?.map((room) => (
                    <li key={Math.random()}>
                        <button onClick={() => getRoomMsgs(room.name)}>
                            {room.name}
                        </button>
                    </li>
                ))}
            </ul>{" "}
        </div>
    );
};
