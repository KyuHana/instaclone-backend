import { loadFilesSync, mergeResolvers, mergeTypeDefs, makeExecutableSchema } from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`); //모든 typeDefs를 모은다.
const loadedResolvers = loadFilesSync(
  `${__dirname}/**/*.resolvers.js`
); //쿼리하고 뮤테이션들을 모은다
export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers = mergeResolvers(loadedResolvers); 