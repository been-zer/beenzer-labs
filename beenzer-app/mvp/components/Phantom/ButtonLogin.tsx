import { Button, View } from "react-native";

const ButtonLogin = ({ title, onPress }: { title: string; onPress: () => Promise<void> }) => {
  return (
    <View className="my-10">
      <Button title={title} onPress={onPress} />
    </View>
  );
};

export default ButtonLogin