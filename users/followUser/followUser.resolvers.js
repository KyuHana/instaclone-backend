import client from '../../client';
import { protectedResolver } from '../users.utils';

export default {
  Mutation: {
    followUser: protectedResolver(async(_, {username}, {loggedInUser}) => {
      //이 코드들이 사용된다는 것은 유저가 존재한다는 것을 의미한다
      const okUser = await client.user.findUnique({
        where: {
          username
        }
      });
      if(!okUser) {
        return {
          ok: false,
          error: "no user you to follow"
        }
      }
      await client.user.update({
        where: {
          id: loggedInUser.id
        },
        data: {
          following: {
            connect: {
              username,
            }
          }
        }
      });
      return {
        ok:true,
      }
    })
  }
}