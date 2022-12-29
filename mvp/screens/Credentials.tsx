import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { SOCKET } from "../services/socket";
import OpenURLButton from './OpenURLButton'


const Credentials = ({ setProfile }: any) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')

  const regex = new RegExp(/(\s*([\0\b\'\"\n\r\t\%\_\\]*\s*(((select\s*.+\s*from\s*.+)|(insert\s*.+\s*into\s*.+)|(update\s*.+\s*set\s*.+)|(delete\s*.+\s*from\s*.+)|(drop\s*.+)|(truncate\s*.+)|(alter\s*.+)|(exec\s*.+)|(\s*(all|any|not|and|between|in|like|or|some|contains|containsall|containskey)\s*.+[\=\>\<=\!\~]+.+)|(let\s+.+[\=]\s*.*)|(begin\s*.*\s*end)|(\s*[\/\*]+\s*.*\s*[\*\/]+)|(\s*(\-\-)\s*.*\s+)|(\s*(contains|containsall|containskey)\s+.*)))(\s*[\;]\s*)*)+)/i)

  const phantomURL = 'https://phantom.app/'

  const handleUsername = (text: string) => {
    if (text.match(regex)) {
    }
    else {
      setUsername(text.replace(/ /g, ''))
    }
  }

  const login = (username: string) => {
    if (username.length < 3) {
      setError("Minimum 3 letters 🤓")
    } else {
      SOCKET.emit('userName', username)
      SOCKET.on('userNameAv', (usernameAv) => {
        if (usernameAv) {
          SOCKET.on('newUserCreated', (newUserCreated) => {
            if (newUserCreated) {
              SOCKET.on('userInfo', (userInfo) => {
                setProfile(userInfo)
                navigation.navigate('Home', { username })
              })
            }
          })
        }
        else {
          Alert.alert("Username already used, please chose another one 🐨")
        }
      })
    }
  }



  let errorText = null
  if (error) {
    errorText = <Text className='text-white'>{error}</Text>
  }

  return (
    <SafeAreaView className="bg-zinc-800">
      <View className="flex flex-col justify-center items-center h-full">
        <Text className="text-3xl text-green-600">Welcome 🔥</Text>
        <TextInput
          className="border-2 border-green-600 text-white rounded-lg w-80 h-10 my-4 p-3"
          placeholder="Username"
          placeholderTextColor="white"
          onChangeText={handleUsername}
        />
        <TouchableOpacity
          className=" absolute bottom-40 w-52 bg-green-600  p-4 rounded-2xl mx-28"
          onPress={() => login(username)}
        >
          <Text className="font-semibold text-center ">
            {" "}
            Create account 🚀{" "}
          </Text>
        </TouchableOpacity>
        {errorText}
        <OpenURLButton url={phantomURL}>
          Already have an account ?
          Change my wallet
        </OpenURLButton>
      </View>


    </SafeAreaView>
  );
}

export default Credentials;



