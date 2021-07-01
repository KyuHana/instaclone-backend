import client from "../../client";

export default {
  Query: {
    seeFollowers: async(_, {username, page}) => {
      const okUser = await client.user.findUnique({
        where:{username},
        select:{id:true} //해당 유저의 모든 정보가 아닌 id만 부른다
      });
      if(!okUser) {
        return {
          ok: false,
          error: `${username} doesn't user`
        }
      }
      const followers = await client.user.findUnique({where: {username}}).followers({
        take:5,
        skip:(page - 1) * 5
      });
      const totalFollowers = await client.user.count({
        where: { following: { some: { username }}}
      });
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5)
      }
    }

  }
}