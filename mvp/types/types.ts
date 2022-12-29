
export interface User {
  pubKey: string;
  name: string;
  email: string;
  description: string;
  avatar: string;
}

export interface NFT {
  title: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  asset: string;
  __id__: string;
}




export interface NFT {
  id: string;
  name: string;
  description: string;
  image: string;
  owner: string;
  price: number;
  likes: number;
  comments: string[];
}



export interface Message {
  id: string;
  sender: string;
  receiver: string;
  message: string;
  timestamp: string;
}

export interface Friend {
  pubKey: string
  pubKey2: string
  timestamp: string;
}

export interface UserState {
  user: User;
  friends: User[];
}

export interface NFTState {
  nfts: NFT[];
}

export interface MessageState {
  messages: Message[];
}

export interface FriendState {
  friends: Friend[];
}

export interface RootState {
  user: UserState;
  nfts: NFTState;
  messages: MessageState;
  friends: FriendState;
}

export interface AppDispatch {
  (arg0: { type: string; payload: any; }): void;
  (arg0: { type: string; }): void;
}

export interface userNFTs {
  Token: string,
  Link: string,
  City: string,
  Creator: string,
  Username: string
  Date: string,
  Description: string,
  Number: number,
  Latitude: number,
  Longitude: number,
  Supply: number,
  Time: string,
  Timestamp: number,
  Type: string,
}

// Path: client/slices/userSlice.ts

export const selectUser = (state: RootState) => state.user.user;
export const selectFriends = (state: RootState) => state.user.friends;