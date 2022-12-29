import React from 'react'
import { View, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Keyboard, TouchableWithoutFeedback, TextInput, Text, FlatList } from 'react-native'
import Header from '../components/Header';
import {SOCKET,socketGetMessages, socketNewMessage,socketLikeMessage, socketAddEmoji} from "../services/socket"


const MessageScreen = ({route, publicKey}: any) => {
  const { friend } = route.params;
  const [messages, setMessages] = React.useState<any>([])
  const [pubkey, setPubkey] = React.useState('')
  const [message, setMessage] = React.useState('')
  const [timestamp, setTimestamp] = React.useState(0)
  const [emoji, setEmoji] = React.useState('')
  const [friends, setFriends] = React.useState('')
  const [pubkey2, setPubkey2] = React.useState('')

React.useEffect(() => {
  getMessages(friend.__pubkey__, publicKey);
}, [])


const NewMessage = (receiver: string, sender: string, message: string) =>{
  console.log('Hello ===>',receiver, sender, message)
    SOCKET.emit("newMessage", receiver, sender, message);
  }

  SOCKET.on("newMessageRes", (res: Boolean) => {
    console.log("res", res)
  if (res) {
    console.log("were in the if statement")
    SOCKET.emit("getMessages", pubkey, pubkey2);
  };
})

SOCKET.on("getMessagesRes", (msgsFromSocket: any[]) => {
  console.log("msgsFromSocket", msgsFromSocket)
  setMessages(msgsFromSocket)
});


const getMessages = (pubkey: string, pubkey2: string) => {
  SOCKET.emit("getMessages", pubkey, pubkey2);
}

return (
  //display messages in a flatlist with a whatsapp like UI where the messages are displayed on the left and right side of the screen depending on who sent the message using tailwindcss for styling
  <SafeAreaView className='bg-zinc-900' style={{flex: 1}}>
    <Header title={friend._username_} />
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{flex: 1}}
      keyboardVerticalOffset={5}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <FlatList
      data={messages}
      keyExtractor={(item) => item._timestamp.toString()}
      renderItem={({ item }) => (
                  <View  style={{flexDirection: 'row', justifyContent: 'space-between', padding: 10}}>
                    <View style={{backgroundColor: '#ffffff', padding: 10, borderRadius: 5}}>
                      <Text>{item._message}</Text>
                    </View>
                  </View>
                )}
              />
              </TouchableWithoutFeedback>
    <View style={{flexDirection: 'row', alignItems: 'center', width: '100%', padding: 15}}>
      <TextInput
        style={{borderBottomColor: '#c3e3df', borderBottomWidth: 1, width: '80%', borderColor: 'transparent', backgroundColor: '#ECECEC', padding: 10, color: 'grey', borderRadius: 30}}
        placeholder="Type a message"
        value={message}
        onChangeText={setMessage}
      />

      <Text style={{color: '#16a34a', marginLeft: 10, fontWeight: 'bold'}} onPress={() => NewMessage(friend.__pubkey__, publicKey, message)}>Send</Text>
    </View>
    </KeyboardAvoidingView>
  </SafeAreaView>
)
  }

  export default MessageScreen