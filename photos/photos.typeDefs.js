import { gql } from "apollo-server";

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    likes: Int!
    commentNumber: Int!
    comments: [Comment]
    hashtags: [Hashtag]
    isMine: Boolean!
    createdAt: String!
    updatedAt: String!
    isLiked: Boolean!
  }
  type Hashtag {
    id: Int!
    photos(page:Int): [Photo]
    hashtag: String!
    totalPhotos: Int!
    createdAt: String!
    updatedAt: String! 
  }
  type Like {
    id: Int!
    photo: Photo!
    createdAt: String!
    updatedAt: String!   
  }
`;