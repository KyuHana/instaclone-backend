import client from "../../client"; //prisma문법을 사용

export default {
  Query: {
    seeProfile: (_, { username }) => client.user.findUnique({ where: { username }}),
  }
}