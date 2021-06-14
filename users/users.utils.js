import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    if(!token) {
      return null;
    }
    const { id } = await jwt.verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({where: { id }});
    if(user) {
      return user;
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

export const protectResolver = (user) => {
  if(!user) {
    return {
      ok: false,
      error: "you need to login"
    }
  }
};

export function protectedResolver(ourResolver) {
  return function (root, args, context, info) { 
    //실행하지않은 함수를 반환
    //서버가 실행할 함수
    if(!context.loggedInUser) {
      return {
        ok: false,
        error: "Please log in to perform this action.",
      };
    }
    return ourResolver(root, args, context, info);
  }
}