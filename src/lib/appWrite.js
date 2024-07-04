import { Client, Databases, ID } from "appwrite";

const client = new Client();
const DB_ID = "668689f800261d9049b1";
const COLLECTION_ID = "66868a1f000d42a5ba9c";
client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("668689370025f3dbcf86");

export const databases = new Databases(client);
export { DB_ID, COLLECTION_ID, ID };
