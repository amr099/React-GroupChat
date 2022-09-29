import React, { useState } from "react";
import Modal from "react-modal";
import {
    setDoc,
    doc,
    collection,
    addDoc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";
import { db } from "../firebase-config";
import { v4 as uuid } from "uuid";

export const CreateRoomModal = ({ loggedUserName }) => {
    let createRoom = async (e) => {
        e.preventDefault();
        let roomName = e.target[0].value;

        let newRoomDoc = doc(db, "Rooms", roomName);

        await setDoc(newRoomDoc, {
            name: roomName,
            creator: loggedUserName,
            messages: [],
        });

        // let newRoomCol = await collection(newRoomDoc, roomName);

        // await addDoc(newRoomCol, {
        //     message: `${loggedUserName} has created  ' ${roomName} ' Room succesfully!`,
        //     user: loggedUserName,
        //     time: new Date().toLocaleString(),
        // });

        await updateDoc(newRoomDoc, {
            messages: arrayUnion({
                message: `${loggedUserName} has created  ' ${roomName} ' Room succesfully!`,
                user: loggedUserName,
                time: new Date().toLocaleString(),
            }),
        });

        await setDoc(doc(db, "RoomsData", roomName), {
            lastUpdated: new Date().toLocaleString(),
        });

        closeModal();
    };

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }
    const customStyles = {
        content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
        },
    };
    return (
        <div>
            <button className='create-room-button' onClick={openModal}>
                Create New Room
            </button>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                <label>Room name</label>
                <form onSubmit={createRoom}>
                    <input type='text' className='modal-input' />
                    <button className='modal-button'>Create</button>
                </form>
            </Modal>
        </div>
    );
};
