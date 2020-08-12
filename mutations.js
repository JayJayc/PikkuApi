import { Room, newRoomToObject } from "./db/docObjects/room";
const { firestore } = require("./db/firestore");
let admin = require("firebase-admin");

export default {
    createRoom: async (_, { owner }) => {
        try {
            console.log("hi");
            let roomRef = await firestore.collection("rooms").doc();
            const roomId = roomRef.id;
            const roomObject = new Room(owner, roomId);
            return await roomRef
                .set(newRoomToObject(roomObject))
                .then(async () => {
                    return await roomRef
                        .get()
                        .then((doc) => {
                            if (!doc.exists) {
                                console.log("No such document!");
                            } else {
                                console.log("Document data:", doc.data());
                                return {
                                    roomIdShort: doc.data().roomIdShort,
                                    roomURL: doc.data().roomURL,
                                };
                            }
                        })
                        .catch((err) => {
                            console.log("Error getting document", err);
                        });
                });
        } catch (e) {
            console.log(e);
        }
    },
    joinRoom: (_, { roomIdShort, user }) => {
        try {
            console.log("HERE");
            let roomRef = firestore.collection("rooms");
            return roomRef
                .where("roomIdShort", "==", roomIdShort)
                .where("roomStatus", "==", "OPEN")
                .limit(1)
                .get()
                .then((snapshot) => {
                    if (snapshot.empty) {
                        console.log("No matching documents.");
                        return;
                    }
                    if (snapshot.docs[0].data().players.includes(user)) {
                        return "ERROR: User exists";
                    }
                    return firestore
                        .collection("rooms")
                        .doc(snapshot.docs[0].id)
                        .update({
                            players: admin.firestore.FieldValue.arrayUnion(
                                user
                            ),
                            numberOfPlayers: admin.firestore.FieldValue.increment(
                                1
                            ),
                        })
                        .then((res) => {
                            console.log(res);
                            if (res) {
                                console.log("done");
                                return "Joined";
                            }
                        });
                });
        } catch (e) {
            console.log(e);
        }
    },
    addRestaurant: async (_, { owner, roomIdShort, restaurant }) => {
        try {
            let roomRef = await firestore
                .collection("rooms")
                .where("roomIdShort", "==", roomIdShort)
                .where("owner", "==", owner)
                .where("roomStatus", "==", "OPEN")
                .limit(1)
                .get()
                .then((query) => {
                    const room = query.docs[0];
                    console.log("adding new restaurant");
                    room.ref.update({
                        restaurants: admin.firestore.FieldValue.arrayUnion(
                            restaurant
                        ),
                    });
                });
        } catch (e) {
            console.log(e);
        }
    },
};
