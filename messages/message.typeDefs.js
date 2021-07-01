import { gql } from "apollo-server";

export default gql`
  type Message {
    id: Int!
    payload: String!
    user: User!
    room: Room!
    read: Boolean!
    createdAt: String!
    updatedAt: String!
  }
  type Room {
    id: Int!
    users: [User]
    unreadTotal: Int!
    messages(page: Int!): [Message]
    createdAt: String!
    updatedAt: String!
  }
`;