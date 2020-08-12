const { gql } = require("apollo-server");

const shared = gql`
    # Define custom scalar
    scalar DateTime
`;

export default shared;
