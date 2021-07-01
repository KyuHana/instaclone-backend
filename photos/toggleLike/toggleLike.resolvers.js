import {protectedResolver} from '../../users/users.utils';
import client from '../../client';

export default {
  Mutation: {
    toggleLike:protectedResolver(async(_, {id}, {loggedInUser}) => {
      const okPhoto = await client.photo.findUnique({
        where: {
          id
        }
      });
      if(!okPhoto) {
        return {
          ok: false,
          errro: "Photo not found"
        }
      }
      const likeWhere = {
        photoId_userId: {
          userId: loggedInUser.id,
          photoId: id
        }
      };
      const like = await client.like.findUnique({
        where: likeWhere
      });
      if(like) {
        await client.like.delete({
          where: likeWhere
        })
      } else {
        await client.like.create({
          data: {
            user: {
              connect: {
                id: loggedInUser.id
              }
            },
            photo: {
              connect: {
                id: okPhoto.id
              }
            }
          },
        })
      }
      return {
        ok: true,
      }
    })
  }
}