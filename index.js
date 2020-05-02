const { ApolloServer, gql } = require("apollo-server");
const { GraphQLDateTime } = require("graphql-iso-date");
const { firestore } = require("./db/firestore");
import { NewRoom, newRoomToObject } from "./db/docObjects/room";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const typeDefs = gql`
    # Define custom scalar
    scalar DateTime

    # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

    # This "Book" type defines the queryable fields for every book in our data source.
    type Room {
        _id: ID
        owner: String
        roomId: String
        roomIdShort: String
        roomStatus: String
        roomURL: String
        winner: String
        numberOfPlayers: Int
        openDate: DateTime
        closeDate: DateTime
    }

    type Query {
        rooms: [Room]
    }

    type Mutation {
        createRoom(owner: String!): NewRoom
    }
`;

const resolvers = {
    Query: {
        rooms: async () => {
            const response = await firestore.collection("rooms").get();
            return response.docs.map((room) => {
                const parsedRoom = room.data();
                parsedRoom.openDate = room.data().openDate.toDate();
                parsedRoom.closeDate = room.data().closeDate.toDate();
                return parsedRoom;
            });
        },
    },
    DateTime: GraphQLDateTime,
    Mutation: {
        createRoom: async (_, { owner }) => {
            let roomRef = await firestore.collection("rooms").doc();
            const roomId = roomRef.id;
            const roomObject = new NewRoom(owner, roomId);
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
                                    roomIdShort: roomdoc.data().roomIdShort,
                                    roomURL: roomdoc.data().roomURL,
                                };
                            }
                        })
                        .catch((err) => {
                            console.log("Error getting document", err);
                        });
                });
        },
    },
};
const server = new ApolloServer({
    typeDefs,
    resolvers,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
