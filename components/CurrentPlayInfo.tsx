import { View, Text, Button, Dimensions } from "react-native";

export default function CurrentPlayInfo(props: any) {
  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Text
          style={{
            color: "#FFFFFF",
            marginRight: 30,
          }}
        >
          Trump: {props.suit}
        </Text>

        <Text
          style={{
            color: "#FFFFFF",
            marginRight: 30,
          }}
        >
          Turn: {props.turn}
        </Text>
        {/* <Text style={{ color: "#FFFFFF" }}>
          Cards in play: {props.numCards}
        </Text> */}
      </View>

      <View
        style={{
          display: "flex",
          width: Dimensions.get("screen").width,
          flexDirection: "row",
          marginBottom: 10,
        }}
      >
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ color: "#FFFFFF" }}>AI</Text>
          <Text style={{ color: "#FFFFFF", fontSize: 24 }}>
            {props.numCardsAi}
          </Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ color: "#FFFFFF", fontSize: 32 }}>{props.deck}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Text style={{ color: "#FFFFFF" }}>User</Text>
          <Text style={{ color: "#FFFFFF", fontSize: 24 }}>
            {props.numCardsUser}
          </Text>
        </View>
      </View>
    </>
  );
}
