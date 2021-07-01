import client from '../../client';
import pubsub from '../../pubsub';
import {protectedResolver} from '../../users/users.utils';
import { NEW_MESSAGE } from '../constants';

export default {
  Mutation: {
    sendMessage: protectedResolver(
      async(_, {payload, roomId, userId}, {loggedInUser}) => {
        let room = null;
        if(userId) {
          const user = await client.user.findUnique({
            where: {
              id: userId
            },
            select: {
              id: true
            }
          });
          if(!user) {
            return {
              ok: false,
              error: "this user does not exists."
            }
          };
          room = await client.room.create({
            data: {
              users: {
                connect: [
                  {
                    id: userId
                  },
                  {
                    id: loggedInUser.id
                  }
                ]
              }
            }
          });
        } else if(roomId) {
          room = await client.room.findUnique({
            where: {
              id: roomId
            },
            select: {
              id: true
            }
          });
          if(!room) {
            return {
              ok: false,
              error: "room not found."
            }
          }
        }
        const message = await client.message.create({
          data: {
            payload,
            room: {
              connect: {
                id: room.id
              }
            },
            user: {
              connect: {
                id: loggedInUser.id
              }
            }
          }
        });
        pubsub.publish(NEW_MESSAGE, { roomUpdates: {...message}});
        return {
          ok: true,
        }
    })
  }
}