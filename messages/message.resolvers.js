import client from "../client";

export default {
  Room: {
    users:({id}) => client.room.findUnique({where: {id}}).users(),
    messages:({id}, {page}) => client.message.findMany({
      where: {
        roomId: id,
      },
      take: 20,
      skip: (page-1)*20
    }),
    unreadTotal: ({id}, _, {loggedInUser}) => {
      if(!loggedInUser) {
        return 0
      }
      return client.message.count({
        where: {
          read: false,
          roomId:id,
          user: {
            id: {
              not: loggedInUser.id
            }
          }
        }
      })
    }
    
  },
  Message: {
    user: ({id}) => client.message.findUnique({where: {id}}).user()
  }
}