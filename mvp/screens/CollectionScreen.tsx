import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator, FlatList, Alert } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { SOCKET } from "../services/socket";
import { useEffect, useState } from "react";
import NFTsDetails from "./NFTsDetails";
import { userNFTs } from './../types/types';
import Header from './../components/Header';

const CollectionScreen = ({ profile, setAvatar, avatar }: any) => {
  const navigation = useNavigation();
  const [userNFTsArray, setUserNFTsArray] = useState<userNFTs[]>([]);
  const [userNFTs, setUserNFTs] = useState<any>([]);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [NFTselected, setNFTselected] = useState<userNFTs>({} as userNFTs);


  useEffect(() => {
    SOCKET.emit("getUserNFTs", profile[0].__pubkey__);
    SOCKET.on("userNFTs", (allNFTs: any) => {
      setUserNFTs(allNFTs);
    })
  }, [])

  useEffect(() => {
    userNFTs.forEach((nft: any) => {
      const allNFTsPic = {
        Token: nft.__token__,
        Link: nft._asset,
        City: nft._city,
        Creator: nft._creator,
        Date: nft._date,
        Description: nft._description,
        Number: nft._id_,
        Latitude: nft._latitude,
        Longitude: nft._longitude,
        Supply: nft._supply,
        Time: nft._time,
        Timestamp: nft._timestamp,
        Type: nft._type,
        Username: nft._username,
      };
      setUserNFTsArray((prevState) => [...prevState, allNFTsPic]);
    })
  }, [userNFTs])

  const newProfilPic = (newValue: string) => {
    const pubkey = profile[0].__pubkey__ as string
    const update = '_pfp'
    const value = newValue
    Alert.alert('Your profile picture has been updated! 🎉 🎉 🎉')
    setAvatar(value)

    updateDB(pubkey, update, value)
  }

  const updateDB = (pubkey: string, update: string, value: string) => {
    SOCKET.emit("updateUser", pubkey, update, `__${value}`);
  }

  const handleShowDetails = (nft: userNFTs) => {
    setShowDetails(!showDetails)
    setNFTselected(nft)
  }
  return (
    <>
      {!showDetails ? (
        <SafeAreaView className="bg-zinc-900 h-screen w-screen">
          <Header title="Profile" />
          <ScrollView>
            <Text className=" text-white text-2xl uppercase font-extrabold mb-2 p-4">
              Your collection
            </Text>
            <>
              <View style={styles.collection}>
                {userNFTsArray.length ? (
                  <FlatList
                    data={userNFTsArray}
                    numColumns={2}
                    renderItem={({ item }) => {
                      const borderColor = item.Creator === profile[0].__pubkey__ ? 'black' : 'red';
                      return (
                        <TouchableOpacity onPress={() => handleShowDetails(item)} onLongPress={() => newProfilPic(item.Link)}>
                          <Image
                            source={{ uri: item.Link }}
                            style={{ width: 150, height: 150, margin: 10, borderWidth: 1, borderColor, borderRadius: 10 }}
                          />
                        </TouchableOpacity>
                      );
                    }}

                    keyExtractor={(item) => item.Token}
                  />
                ) : (
                  <ActivityIndicator className="mt-5 content-center" size="large" color="green" />)}
              </View>
            </>
          </ScrollView>
        </SafeAreaView >) : (
        NFTselected && (
          <NFTsDetails NFTselected={NFTselected} />))
      }
    </>
  )
}

const styles = StyleSheet.create({
  picture: {
    width: 100,
    height: 100,
    resizeMode: "cover"
  },
  collection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignContent: 'center',
  }
})

export default CollectionScreen;