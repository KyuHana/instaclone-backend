import client from "../../client";

export default {
  Query: {
    seePhotoLikes: async (_, {id}) => {
      const likes = await client.like.findMany({
        where: {
          photoId: id
        },
        select: {
          user: true
        }
      });
      console.log(likes[0].user);
      return likes.map((like) => like.user);
    }
  }
}