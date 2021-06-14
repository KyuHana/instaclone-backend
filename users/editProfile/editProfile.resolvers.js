import fs from 'fs';
import bcrypt from 'bcrypt';
import client from '../../client';
import { protectedResolver } from '../users.utils';

console.log(process.cwd());

  const resolverFn = async (
        _, 
        {firstName, lastName, username, email, password:newPassword, bio, avatar}, 
        {loggedInUser, protectResolver}
        ) => {
        const { filename, createReadStream } = await avatar;
        const readStream = createReadStream();
        const writeStream = fs.createWriteStream(process.cwd() + "/uploads/" + filename);
        readStream.pipe(writeStream)
        let uglyPassword = null;
        if(newPassword) {
          uglyPassword = await bcrypt.hash(newPassword, 10);
        }ç
        const updatedUser = await client.user.update({
          where: {
            id: loggedInUser.id
        }, 
          data: {
            firstName,
            lastName,
            username,
            email, 
            ...(uglyPassword && { password : uglyPassword}),
            bio,
        }
        });      
        
        if(updatedUser.id) {
          return {
            ok: true
          }
        } else {
          return {
            ok: false,
            error: "cant remake your profile"
          }
        }
  }
  
  export default {
    Mutation: {
      editProfile: protectedResolver(resolverFn)
    }
  }