import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = { children: JSX.Element | JSX.Element[] }

const ItemWrapper = ({ children }: Props) => {
    return (
        <View className="flex-row content-center  bg-zinc-400 w-11/12 rounded-3xl p-16 pb-16 my-3 mx-4 ">
            {children}
        </View>
    )
}

export default ItemWrapper

const styles = StyleSheet.create({})