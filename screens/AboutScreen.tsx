import { View, Text, Button } from "react-native";

export default function AboutScreen(props: any) {
  return (
    <View>
      <Text>This is 'About' Page!!</Text>
      <Button
        title="Go to Home"
        onPress={() => {
          props.navigation.navigate("Home", {
            userId: 1,
            userName: "Awesome User",
          });
        }}
      />
    </View>
  );
}
