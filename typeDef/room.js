const { gql } = require("apollo-server");
const restaurant = gql`
    # This "Book" type defines the queryable fields for every book in our data source.
    type Room {
        _id: ID
        owner: String
        roomId: String
        roomIdShort: String
        roomStatus: String
        roomURL: String
        numberOfPlayers: Int
        players: [String]
        restaurants: [Restaurant]
        openDate: DateTime
        closeDate: DateTime
        winner: String
    }

    extend type Query {
        rooms: [Room]
    }

    extend type Mutation {
        createRoom(owner: String!): Room
        joinRoom(roomIdShort: String!, user: String!): String
    }

    extend type Subscription {
        roomUpdate(roomIdShort: String!): Room
    }
`;

export default restaurant;
