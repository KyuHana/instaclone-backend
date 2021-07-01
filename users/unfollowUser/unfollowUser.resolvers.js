import client from '../../client';
import {protectedResolver} from '../users.utils';
export default {
  Mutation: {
    unfollowUser: protectedResolver(async(_, {username}, {loggedInUser}) => {
      const okUser = await client.user.findUnique({
        where: {
          username
        }
      })
      if(!okUser) {
        return {
          ok: false,
          error: "cant find unfollow user"
        }
      }
      await client.user.update({
        where: {
          id:loggedInUser.id,
        },
        data: {
          following: {
            disconnect: {
              username
            }
          }
        }
      })
      return {
        ok: true
      }
    })

  }
}