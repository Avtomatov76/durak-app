import { View, Text, Button, Dimensions } from "react-native";

export default function HomeScreen(props: any) {
  return (
    <View style={{ flex: 1, width: Dimensions.get("screen").width }}>
      <View
        style={{
          flex: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        <Text style={{ alignSelf: "center" }}>Computer</Text>
        <Button
          title="Go to About"
          onPress={() => {
            props.navigation.navigate("About", {
              userId: 1,
              userName: "Awesome User",
            });
          }}
        />
      </View>
      <View
        style={{ flex: 1, backgroundColor: "blue", justifyContent: "center" }}
      >
        <Text
          style={{
            alignSelf: "center",
            color: "#FFFFFF",
          }}
        >
          Table
        </Text>
      </View>
      <View
        style={{ flex: 1, backgroundColor: "red", justifyContent: "flex-end" }}
      >
        <Text style={{ alignSelf: "center", color: "#FFFFFF" }}>Player</Text>
      </View>
    </View>
  );
}
