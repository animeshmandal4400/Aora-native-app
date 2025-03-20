import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const appwriteConfig = {
    endpoint:'https://cloud.appwrite.io/v1',
    platform:'com.animesh.aora',
    projectId:'67d9106a00257269f805',
    databaseId:'67d9127d00342e7fcc87',
    usersCollectionId:'67d912b4002112669480',
    videosCollectionId:'67d912e50032eb84317a',
    storageId:'67d91c1200388072c2d8'
}

const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform)
;

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client)

export const createUser = async( email, password, username) =>{
    try {
        const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username
        )
    if(!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);
    await signIn(email,password);
    const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar : avatarUrl
        }
    )

    } catch (error) {
        console.log(error)
        throw new Error(error);
    }    

}

export async function signIn(email,password) {
        try {
            const session= await account.createEmailPasswordSession(email, password);
            return session;
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
}    


export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      throw new Error(error);
    }
}

export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  export async function getAllPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
  }

  export async function getLatestPosts() {
    try {
        const posts = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.videosCollectionId,
            [Query.orderDesc('$createdAt', Query.limit(7))]
        )
        return posts.documents;
    } catch (error) {
        throw new Error(error)
    }
  }