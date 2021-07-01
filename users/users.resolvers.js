import client from '../client';

export default {
  User: {
    totalFollowing: ({id}) => client.user.count({
      where: {
        followers: {
          some: {
            id
          }
        }
      }
    }),
    totalFollowers: ({id}) => client.user.count({
      where: {
        following: {
          some:{
            id
          }
        }
      }
    }),
    isMe: ({id}, _, {loggedInUser}) => {
      if(!loggedInUser) {
        return false;
      }
      return id === loggedInUser.id
    },
    isFollowing: async ({id}, _, {loggedInUser}) => {
      if(!loggedInUser) {
        return false;
      }
      const exists = await client.user
        .findUnique({where:{username: loggedInUser.username}})
        .following({
          where:{
            id
          }
        });
      //다른 방법
      //const exists2 = await client.user.count({
      //  where: {username: loggedInUser.username},
      //  following: {
      //    some: {
      //      id
      //    }
      //  }
      //})
      //return Boolean(exists2);
      return exists.length !== 0;
    },
    photos: ({id}) => client.user.findUnique({where: {id}}).photos(),
  }
}