const { firestore } = require("./db/firestore");
import PubSub from "graphql-firestore-subscriptions";

const pubsub = new PubSub();

export default {
    roomUpdate: {
        resolve: (payload) => {
            console.log(payload);
            return payload;
        },
        subscribe: (_, { roomIdShort }) => {
            console.log("Subscription started for room: " + roomIdShort);
            try {
                if (!pubsub.handlers.has("UPDATE_ROOM_" + roomIdShort)) {
                    console.log("creating handler here");
                    pubsub.registerHandler(
                        "UPDATE_ROOM_" + roomIdShort,
                        (broadcast) =>
                            // Note, that `onSnapshot` returns a unsubscribe function which
                            // returns void.
                            firestore
                                .collection("rooms")
                                .onSnapshot((snapshot) => {
                                    console.log("start snapshot code");

                                    snapshot
                                        .docChanges()
                                        .filter(
                                            (change) =>
                                                change.type === "modified"
                                        )
                                        .map((item) => {
                                            console.log(item.doc.data());
                                            if (
                                                item.doc.data().roomIdShort ==
                                                    roomIdShort &&
                                                (item.doc.data().roomStatus ==
                                                    "OPEN" ||
                                                    item.doc.data()
                                                        .roomStatus == "VOTING")
                                            ) {
                                                broadcast(item.doc.data());
                                            }
                                        });
                                })
                    );
                }
            } catch (e) {
                console.log(e);
            }

            return pubsub.asyncIterator("UPDATE_ROOM_" + roomIdShort);
        },
    },
};
