// sockets
import { io } from "socket.io-client";

export const SOCKET = io('https://5d48-147-161-98-37.eu.ngrok.io', { transports: ["websocket"] });
export const socketConnection = (pubKey: String) => {
  console.log('new connection', pubKey);
  SOCKET.emit('newConnection', pubKey);
  SOCKET.on('serverConnection', (message) => { console.log(message) });
}

export const socketMint = (
  buffer: Buffer,
  type: String,
  creator: String,
  supply: Number = 1,
  username: String,
  description: String,
  city: String,
  latitude: Number,
  longitude: Number
) => {
  SOCKET.emit(
    "newMint",
    buffer,
    type,
    creator,
    supply,
    username,
    description,
    city,
    latitude,
    longitude
  );
};

export const socketUserNFTs = async () => {
  SOCKET.on("userNFTs", (nfts: Array<any>) => {
    console.log('userNFTs', nfts);
    return nfts;
  });
};

export const socketUserFriends = async () => {
  SOCKET.on("userFriends", (friends: Array<any>) => {
    console.log(friends);
    return friends;
  });
};

export const socketSearchUser = (search: any) => {
  SOCKET.emit("searchUsers", search);
  SOCKET.on("searchUsersRes", (users: Array<String>) => {
    console.log("Usersssssssss", users);
    search(users);
  });
};

export const socketGetAllNFTs = () => {
  SOCKET.emit("getAllNFTs", "please");
  SOCKET.on("allNFTs", (nfts: Array<any>) => {
    console.log('nft', nfts);
    return nfts;
  });
};

export const socketGetUser = (user: String) => {
  SOCKET.emit("getUser", user);
  SOCKET.on("getUserRes", (userRes: object) => {
    console.log('socketGetUser', userRes);
    return userRes;
  });
};

export const socketAddFriend = (pubkey: String, pubkey2: String) => {
  SOCKET.emit("addFriend", pubkey, pubkey2);
  SOCKET.on("addFriendRes", (res: Boolean) => {
    return res;
  });
};

export const socketDeleteFriend = (pubkey: String, pubkey2: String) => {
  SOCKET.emit("deleteFriend", pubkey, pubkey2);
  SOCKET.on("deleteFriendRes", (res: Boolean) => {
    return res;
  });
};

export const socketGetMessages = (pubkey: string, pubkey2: string) => {
  SOCKET.emit("getMessages", pubkey,pubkey2);
  SOCKET.on("getMessagesRes", (messages: Array<Object>) => {
    return messages;
  });
};

export const socketNewMessage = (receiver: string, sender: string, message: string) => {
  SOCKET.emit("newMessage", receiver, sender, message);
  SOCKET.on("newMessageRes", (res: Boolean) => {
  if (res) {
    SOCKET.emit("getMessages", receiver);
    SOCKET.on("getMessagesRes", (messages: Array<Object>) => {
      return messages;
    });
  };
  });
};

export const socketLikeMessage = (friends: Array<String>, timestamp: Number) => {
  SOCKET.emit("likeMessage", friends, timestamp);
  SOCKET.on("likeMessageRes", (res: Boolean) => {
    return res;
  });
};

export const socketAddEmoji = (friends: Array<String>, timestamp: Number, emoji: String) => {
  SOCKET.emit("addEmoji", friends, timestamp, emoji);
  SOCKET.on("addEmojiRes", (res: Boolean) => {
    return res;
  });
};
