import { View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline'

const Header = ({ title, componentName }: any) => {
  const navigation = useNavigation();

  return (
    <View className=' p-2 flex-row items-center justify-between'>
      <View className='flex flex-row items-center'>
        <TouchableOpacity onPress={() => navigation.goBack()} className='p-2'>
          <ChevronLeftIcon className='h-6 w-6' size={34} color='#30a24f' />
        </TouchableOpacity>
        <Text className='text-2xl font-bold text-green-700 '>{title}</Text>
      </View>
    </View>
  )
}

export default Header