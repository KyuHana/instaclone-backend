import express from 'express';
import logger from "morgan";
import http from 'http';
import { ApolloServer } from "apollo-server-express";
import {typeDefs, resolvers} from './schema.js'; //모든 typeDefs와 resolvers를 불러온다.
import {getUser, protectResolver} from './users/users.utils';
require("dotenv").config();

const PORT = process.env.PORT;//port 번호
const apollo = new ApolloServer({ //모든 resolver와 type을 모은다
  resolvers,
  typeDefs,
  context: async (ctx) => { //각각의 파일들에 전달할 context
    console.log("no");
    console.log(ctx.req.headers);
    if(ctx.req) { //http통신
      return {
        loggedInUser: await getUser(ctx.req.headers.token),
      };
    } else { //ws통신
      const {connection: {context}} = ctx;
      return {
        loggedInUser: context.loggedInUser
      }
    }
  },
  subscriptions: { //subscribe가 일어나면 해야할 행동들
    onConnect: async ({token}) => { //연결됬을때
      if(!token) { 
        throw new Error("you can't listen");
      }
      const loggedInUser = await getUser(token);
      return { //return은context의 매개변수로 간다
        loggedInUser
      }
    } 
  }
});
const app = express(); //정적인 상태를 가질수 있는
app.use(logger("tiny"));
app.use("/static", express.static("uploads"));
apollo.applyMiddleware({app});

const httpServer = http.createServer(app);
apollo.installSubscriptionHandlers(httpServer)

httpServer.listen(PORT, () => {
    console.log(`server is run on http://localhost:${PORT}`);
});