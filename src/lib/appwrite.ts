import { Client, Databases, Account } from "appwrite";

let client: Client | null = null;
let account: Account | null = null;
let databases: Databases | null = null;

function initializeAppwrite() {
  if (!client) {
    client = new Client()
      .setEndpoint("https://fra.cloud.appwrite.io/v1") // Appwrite API endpoint
      .setProject("6930cc5b003d48ab538e"); // Your actual Appwrite project ID

    account = new Account(client);
    databases = new Databases(client);
  }
  return { client, account, databases };
}

export function getAppwrite() {
  return initializeAppwrite();
}

export const getAccount = () => initializeAppwrite().account!;
export const getDatabases = () => initializeAppwrite().databases!;
export default getAppwrite();
