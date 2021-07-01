import { withFilter } from "apollo-server-express";
import client from "../../client";
import pubsub from "../../pubsub";
import { NEW_MESSAGE } from "../constants";

export default {
  Subscription: {
    roomUpdates: {
      subscribe: async(root, args, context, info) => {

        const room = await client.room.findFirst({
          where: {
            id: args.id,
            users: {
              some: {
                id: context.loggedInUser.id
              }
            }
          },
          select: {
            id: true
          }
        });
        if(!room) {
          throw new Error("you shall not see this.");
        }
        return withFilter(
          () => pubsub.asyncIterator(NEW_MESSAGE), //NEW_MESSAGE is triggered then action
          ({roomUpdates}, {id}) => { //this condition is true then action
            return roomUpdates.roomId === id;
          }
        )(root, args, context, info);
      }
    }
  }
} 