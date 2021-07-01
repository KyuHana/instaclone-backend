import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    login: async(_, {username, password}) => {
      //find user with args.username
      const user = await client.user.findFirst({where:{username}});
      if(!user) {
        return {
          ok: false,
          error: "User not found"
        }
      } 
      const passwordOk = await bcrypt.compare(password, user.password);
      if(!passwordOk) {
        return {
          ok: false,
          error: "password is wrong"
        }
      }
      //로그인 정보가 옳을 시
      const token = await jwt.sign({id: user.id}, process.env.SECRET_KEY);
      return {
        ok: true,
        token
      }
    }
  },
};
