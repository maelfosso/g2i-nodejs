const { 
  MONGODB_HOST, 
  MONGODB_PORT,
  MONGODB_DBNAME,
} = process.env;

export const config = {
  db: {
    uri: `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DBNAME}`
  },
  auth: 'XbPfbIHMI6arZ3Y922Bh'
}