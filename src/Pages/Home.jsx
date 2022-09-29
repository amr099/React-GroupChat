import Message from "../components/Message.jsx";
import Form from "../components/Form.jsx";
import { useState, useEffect, useContext } from "react";
import { collection, onSnapshot, getDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { AuthContext } from "../context/AuthContext";
import { CreateRoomModal } from "../components/CreateRoomModal.jsx";
// import { Users } from "./Users";
import { Rooms } from "../components/Rooms";
import Profile from "../components/Profile";

export default function Home() {
    const { user } = useContext(AuthContext);

    let usersCol = collection(db, "Users");
    const [users, loading, error, snapshot] = useCollectionData(usersCol);

    const [loggedUserName, setLoggedUserName] = useState("");
    const [selectedRoom, setSelectedRoom] = useState("Room 1");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        setLoggedUserName(users?.find((usr) => usr.id === user.email).name);
        console.log("username effect");
    }, [users, user.email]);

    useEffect(() => {
        const unsub = onSnapshot(doc(db, "Rooms", selectedRoom), () => {
            getRoomMsgs(selectedRoom);
            console.log("realtime effect");
        });

        return () => {
            unsub();
        };
    }, [selectedRoom]);

    async function getRoomMsgs(room) {
        try {
            setSelectedRoom(room);
            const roomMsgs = await getDoc(doc(db, "Rooms", room));
            setMessages(roomMsgs.data().messages);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        let win = document.getElementById("window");
        win.scrollTop = win.scrollHeight;
    }, [messages]);

    return (
        <>
            <div className='container column'>
                <div className='nav row between'>
                    <figure>
                        <h1> TechChat </h1>
                    </figure>
                    <Profile loggedUserName={loggedUserName} users={users} />
                </div>

                <div className='row between'>
                    <div className='column rooms-container'>
                        <CreateRoomModal loggedUserName={loggedUserName} />
                        <Rooms getRoomMsgs={getRoomMsgs} />
                    </div>

                    <div className='column window'>
                        <Message
                            loggedUserName={loggedUserName}
                            messages={messages}
                            users={users}
                        />
                        <Form
                            selectedRoom={selectedRoom}
                            loggedUser={loggedUserName}
                        ></Form>
                    </div>

                    {/* <div className='users'>
                        <Users />
                    </div> */}
                </div>
            </div>
        </>
    );
}
