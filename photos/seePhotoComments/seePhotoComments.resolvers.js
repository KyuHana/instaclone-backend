import client from "../../client";

export default {
  Query: {
    seePhotoComments: (_, {id, page}) => client.comment.findMany({
      where: {
        photoId: id
      },
      take: 10,
      skip:(page-1)*10,
      orderBy: {
        createdAt: "asc"
      },
    }),
  },
};