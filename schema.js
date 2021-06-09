import { loadFilesSync, mergeResolvers, mergeTypeDefs, makeExecutableSchema } from 'graphql-tools';
console.log('1'); 
console.log(`${__dirname}`); 
const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.js`);
const loadedTypess = loadFilesSync(`${__dirname}/**/*.queries.js`);
console.log(loadedTypess);
console.log(loadedTypes);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.{queries, mutations}.js`);
console.log(loadedResolvers);
const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);
console.log(typeDefs);
console.log(resolvers);
const schema = makeExecutableSchema(typeDefs, resolvers);

export default schema;