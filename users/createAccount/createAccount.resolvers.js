import bcrypt from "bcrypt";
import client from "../../client";

export default {
  Mutation: {
    createAccount: async ( //async await 순차적으로 위에서 아래로 내러간다
      _,  
      {firstName,lastName,username,email,password }
    ) => {
      // check if username or email does exits on DB
      try {
        const existingUser = await client.user.findFirst({
          where: {
            OR: [
              {
                username,
              },
              {
                email,
              }
            ]
          }
        });
        if(existingUser) {
          throw new Error("This username, email already used")
        }
        const uglyPassword = await bcrypt.hash(password, 10);
        //hash password
        return client.user.create({data: {
          username, email, firstName, lastName, password: uglyPassword,
        }}) //만든거를 리턴한다
        //save and return the user
      }
      catch(e) {
        return e;
      }
    },
  },
};
