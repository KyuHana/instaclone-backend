import client from '../../client';

export default {
  Query: {
    searchUsers: async (_, {keyword, page}) => 
      client.user.findMany({
        where: {
          username: {
            startsWith: keyword.toLowerCase(),
          },
        }
      }).then({
        take: 5,
        skip: (page - 1) * 5
      })
    }
}