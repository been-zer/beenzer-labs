import { SOCKET } from "../services/socket";
import { useState } from 'react';
import {
  SafeAreaView,
  Text,
  Alert,
  ActivityIndicator,
  ScrollView,
  View,
} from "react-native";
import { Card, Title, Paragraph } from 'react-native-paper';
import Header from "../components/Header";
import Footer from "../components/Footer";

const PostingMessage = ({ mintingOver, setMintingOver, setPosted }: any) => {

  const [mintLogs, setMintLogs] = useState<string[]>([])

  SOCKET.on('mintLogs', (data: string) => {
    if (data != 'true') {
      setMintLogs([...mintLogs, data])
      console.log(mintLogs)
    } else {
      setMintingOver(true);
      setMintLogs([]);
      console.log(mintingOver);
      setPosted(false);
    }
  })
  return (
    <SafeAreaView className="bg-zinc-900 h-screen">
      <Header title='Home' />
      <ScrollView>
        <Text className=" text-white text-6xl uppercase font-extrabold mb-2 p-4">
          Posting your NFT
        </Text>
        <View>
          {mintLogs.map((log, index) => {
            return (
              <Card className='mt-2 text-[#3f6212] bg-zinc-900' key={index}>
                <Card.Content>
                  <Paragraph className='mt-2 text-[#3f6212]'>{log}</Paragraph>
                </Card.Content>
              </Card>
            )
          })}
        </View >
        <ActivityIndicator size="large" color="green" />
      </ScrollView >
      <Footer />
    </SafeAreaView >
  );
};

export default PostingMessage;

