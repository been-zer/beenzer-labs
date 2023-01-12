import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Dispatch, SetStateAction } from 'react'

const DisplayButton = ({ title, setDisplay, display }:
   { title: string, setDisplay: Dispatch<SetStateAction<string>>, display: string }) => {

   const changeDisplay = (display: string) => {
      setDisplay(display)
   }

   return (
      <TouchableOpacity className='justify-center items-center mb-2 mt-2' onPress={() => changeDisplay(title)}>
         <Text className={title === display ? 'text-green-500 underline font-extrabold text-2xl' : 'text-white'}>{title}</Text>
      </TouchableOpacity>
   )
}

const styles = StyleSheet.create({
   underlineText: {
      textDecorationLine: 'underline',
      textDecorationStyle: 'solid',
      textDecorationColor: 'white',
      color: 'white',
      fontWeight: 'bold'
   },
   normalText: {
      color: 'white',
      fontWeight: 'bold'
   }
})

export default DisplayButton