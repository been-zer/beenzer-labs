import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Properties = ({ props, propsTitle }: { props: string | number | undefined, propsTitle: string }) => {
   return (
      <View style={styles.rectangle}>
         <Text className='text-green-800'>{propsTitle}</Text>
         <Text className='text-white'>{props}</Text>
      </View>
   )
}

export default Properties

const styles = StyleSheet.create({
   rectangle: {
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      margin: 1,
   },
})