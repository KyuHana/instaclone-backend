import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import {processHashtags} from '../photos.utils';

export default {
  Mutation: {
    editPhoto: protectedResolver(async(_, {id, caption}, {loggedInUser}) => {
      const okPhoto = await client.photo.findFirst({
        where: {
          id,
          userId: loggedInUser.id
        },
        include: {
          hashtags: {
            select: {
              hashtag: true
            }
          }
        }
      })
      console.log(okPhoto)
      if(!okPhoto) {
        return {
          ok: false,
          error: "photo isnt exists"
        }
      }
      await client.photo.update({
        where: {
          id
        },
        data: {
          caption,
          hashtags: {
            disconnect:okPhoto.hashtags,
            connectOrCreate:processHashtags(caption)
          }
        }
      })
      return {
        ok:true,
      }
    })
  }
}