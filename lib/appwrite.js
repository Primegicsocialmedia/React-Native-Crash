import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora777",
  projectId: "66eaf41a00321ff105fd",
  databaseId: "66eaf6dd001989568553",
  userCollectionId: "66eaf790001334b704d0",
  videoCollectionId: "66eaf7da0039075ad41a",
  storageId: "66eaf9f600219ace6c8c",
};

const {
endpoint,
platform,
projectId,
databaseId,
userCollectionId,
videoCollectionId,
storageId,
} = appwriteConfig

const client = new Client();

client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register User

export const createUser = async (email, password, username) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );
    

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// Sign In

export const signIn = async (email, password)  => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
   
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]

    )
    
    if (!currentUser) throw Error
    return currentUser.documents[0]


  } catch (error) {
    console.log(error)
  }
}

export const getAllPosts = async () => {
 try {
  const post = await databases.listDocuments(
    databaseId,
    videoCollectionId
  )
  return post.documents
 } catch (error) {
    throw new Error(error)
 }
}

export const getLatestPosts = async () => {
  try {
   const post = await databases.listDocuments(
     databaseId,
     videoCollectionId,
     [Query.orderDesc('$createdAt', Query.limit(7))]
   )
   return post.documents
  } catch (error) {
     throw new Error(error)
  }
 }

