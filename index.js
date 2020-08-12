const { ApolloServer } = require("apollo-server");
const { GraphQLDateTime } = require("graphql-iso-date");
const { firestore } = require("./db/firestore");
import typeDefs from "./typeDef/index";
import Mutation from "./mutations";
import Subscription from "./subscriptions";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const resolvers = {
    DateTime: GraphQLDateTime,
    Query: {
        rooms: async () => {
            const response = await firestore.collection("rooms").get();
            return response.docs.map((room) => {
                const parsedRoom = room.data();
                if (room.data().openDate) {
                    parsedRoom.openDate = new Date(room.data().openDate);
                }
                if (room.data().closeDate) {
                    parsedRoom.closeDate = new Date(room.data().closeDate);
                }
                return parsedRoom;
            });
        },
    },
    Mutation,
    Subscription,
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    subscriptions: {
        onConnect: (connectionParams, webSocket, context) => {
            console.log("connect...");
        },
        onDisconnect: (webSocket, context) => {
            console.log("disconnect...");
        },
    },
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
